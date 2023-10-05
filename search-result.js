const storedLocation = localStorage.getItem("Location");
const storedCheckIn = localStorage.getItem("CheckIn");
const storedCheckOut = localStorage.getItem("CheckOut");
const storedGuest = localStorage.getItem("Guest");

console.log(storedCheckIn, storedCheckOut, storedGuest, storedLocation);

const searchInfo = document.getElementById("search-details");
searchInfo.innerText = `${storedLocation}`;

const url = `https://airbnb13.p.rapidapi.com/search-location?location=${storedLocation}&checkin=2023-11-16&checkout=2023-11-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "25d57f00e4msh37f4cf32b357060p132dfdjsn85e942f413d9",
    "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
  },
};

console.log("I m here");

window.addEventListener("DOMContentLoaded", () => {
  async function fetchdata() {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      getCards(result.results);
    } catch (error) {
      console.error(error);
    }
  }
  function getCards(data) {
    const lat = data[0].lat;
    const long = data[0].lng;

    const map = document.getElementById("map");
    map.innerHTML = `<iframe
    src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed"
    frameborder="0"
    id="mapFrame"
  ></iframe>
    `;
    const room_container = document.querySelector(".left-col");
    const n = data.length;
    let p = document.createElement("p");
    p.innerText = `${n}+ stays in ${data[0].city}`;
    room_container.appendChild(p);
    for (let room = 0; room < n / 2; room++) {
      const house = document.createElement("div");
      house.setAttribute("class", "house");
      const freebies = data[room].previewAmenities.join(" ");
      house.innerHTML = `
              <div class="house-img">
                          <img src="${data[room].images[0]}" alt="">
                      </div>
                      <div class="house-info">
                          <div class="house-title">
                              <p>${data[room].name}</p>
                              <h3>${data[room].type}</h3>
                          </div>
                          <i class="ri-heart-line"></i>
                          <div class="house-offerings">
                              <p id="offering">${data[room].persons} guests · Entire Home · ${data[room].beds} beds · ${data[room].bathrooms} bath</p>
                          <p>${freebies}</p>
                          </div>
                          <p id="house-rating">${data[room].rating} <i class="ri-star-fill"></i> (${data[room].reviewsCount} reviews)</p>
                          <div class="house-price">
                              <h4>${data[room].price.currency} ${data[room].price.rate}<span>/ night</span></h4>
                          </div>
                      </div>
              `;
      const house_redirect = house.querySelector(".house-img img");
      house_redirect.addEventListener("click", (e) => {
        e.preventDefault();
        houseFullDetails(data[room]);
      });
      // adding cost breakdown
      const house_title = house.querySelector(".house-title");
      const btn = document.createElement("button");
      btn.innerText = "cost breakdown";
      btn.addEventListener("click", () => {
        CostBreak(data[room]);
      });
      house_title.appendChild(btn);
    //   map_details.push({ latitude: data[room].lat, lagtitude: data[room].lng });
      room_container.appendChild(house);
    }
  }
  fetchdata();
});
