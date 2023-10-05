window.addEventListener("DOMContentLoaded",()=>{
    
  const form=document.getElementById("form-1");
  form.addEventListener("submit",(e)=>{
      e.preventDefault();
      const location = document.querySelector(".location-input input").value;
    const checkIn = document.querySelector(".check-in input").value;
    const checkOut = document.querySelector(".check-out input").value;
    const guest = document.querySelector(".geust-no input").value;
    
    localStorage.setItem("Location",JSON.stringify(location));
    localStorage.setItem("CheckIn",checkIn);
    localStorage.setItem("CheckOut",checkOut);
    localStorage.setItem("Guest",JSON.stringify(guest));
    window.location.href='search-result.html'
  })
})

// console.log(localStorage.getItem("Location"));



// const location = localStorage.getItem("Location");

const url = 'https://airbnb13.p.rapidapi.com/search-location?location=Paris&checkin=2023-11-16&checkout=2023-11-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '25d57f00e4msh37f4cf32b357060p132dfdjsn85e942f413d9',
		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
	}
};

async function fetchdata(){
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
console.log("I m here");
// fetchdata();