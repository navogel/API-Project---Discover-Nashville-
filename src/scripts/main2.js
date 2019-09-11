import DOM from "../scripts/DOM.js";
import API from "../scripts/API.js";
import OBJ from "../scripts/OBJ.js";
import WEB from "../scripts/WEB.js";

const searchResultsContainer = document.querySelector(
	"#search-results-container"
);
const spinnerContainer = document.querySelector("#spinner-container");
const spinnerText = document.querySelector("#spinner-text");
const resultsTitle = document.querySelector(".resultsTitle");

//add event listeners to search buttons

document.querySelector("#search-parks").addEventListener("click", event => {
	//create search term from search bar field
	let searchTerm = document.querySelector("#search-bar").value;
	//display hidden elements from first load
	document.querySelector("#body").style.flexDirection = "row";
	document.querySelector(".rightContainer").style.display = "flex";
	document.querySelector(".itineraryWrapper").style.display = "flex";
	document.querySelector(".title-card").style.display = "none";
	//reset search results container to empty
	searchResultsContainer.innerHTML = "";
	//display spinner and text
	spinnerContainer.style.display = "inline";
	spinnerText.innerHTML = "searching parks...";
	//call API and pass search results to DOM
	API.parkList(searchTerm).then(data => {
		DOM.parkResult(data);
		resultsTitle.innerHTML = " Parks ";
		document.querySelector(".resultsTitle").style.display = "block";
	});
});

document.querySelector("#search-concerts").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	document.querySelector("#body").style.flexDirection = "row";
	document.querySelector(".rightContainer").style.display = "flex";
	document.querySelector(".itineraryWrapper").style.display = "flex";
	document.querySelector(".title-card").style.display = "none";
	searchResultsContainer.innerHTML = "";
	spinnerContainer.style.display = "inline";
	spinnerText.innerHTML = "searching events...";
	API.tmArray(searchTerm).then(data => {
		DOM.tmResults(data);
		resultsTitle.innerHTML = " Events ";
		document.querySelector(".resultsTitle").style.display = "block";
	});
});

document.querySelector("#search-meetups").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	document.querySelector("#body").style.flexDirection = "row";
	document.querySelector(".rightContainer").style.display = "flex";
	document.querySelector(".itineraryWrapper").style.display = "flex";
	document.querySelector(".title-card").style.display = "none";
	searchResultsContainer.innerHTML = "";
	spinnerContainer.style.display = "inline";
	spinnerText.innerHTML = "searching meetups...";
	API.eventbrite(searchTerm).then(data => {
		DOM.ebResults(data);
		resultsTitle.innerHTML = " Meetups ";
		document.querySelector(".resultsTitle").style.display = "block";
	});
});

document
	.querySelector("#search-restaurants")
	.addEventListener("click", event => {
		let searchTerm = document.querySelector("#search-bar").value;
		document.querySelector("#body").style.flexDirection = "row";
		document.querySelector(".rightContainer").style.display = "flex";
		document.querySelector(".itineraryWrapper").style.display = "flex";
		document.querySelector(".title-card").style.display = "none";
		searchResultsContainer.innerHTML = "";
		spinnerContainer.style.display = "inline";
		spinnerText.innerHTML = "searching restaurants...";
		API.restaurantList(searchTerm).then(data => {
			DOM.restaurantResults(data);
			resultsTitle.innerHTML = " Restaurants ";
			document.querySelector(".resultsTitle").style.display = "block";
		});
	});

//add event listener to search results container --> add to itinerary container

document
	.querySelector("#search-results-container")
	.addEventListener("click", event => {
		let i = event.target.id;
		if (event.target.name.startsWith("concert")) {
			document.querySelector(".i1-concert").style.backgroundImage =
				"url('/src/images/concert.jpg')";
			OBJ.itinObj.concert = OBJ.concertArray[i];
			document.querySelector(
				".i1-concert"
			).innerHTML = WEB.createConcertItinerary(OBJ.itinObj.concert);
		} else if (event.target.name.startsWith("restaurant")) {
			document.querySelector(".i1-restaurant").style.backgroundImage =
				"url('/src/images/restaurant.jpg')";
			OBJ.itinObj.restaurant = OBJ.restaurantArray[i].restaurant;
			document.querySelector(
				".i1-restaurant"
			).innerHTML = WEB.createRestaurantItinerary(OBJ.itinObj.restaurant);
		} else if (event.target.name.startsWith("park")) {
			document.querySelector(".i1-park").style.backgroundImage =
				"url('/src/images/park.jpg')";
			OBJ.itinObj.park = OBJ.parkArray[i];
			document.querySelector(".i1-park").innerHTML = WEB.createParkItinerary(
				OBJ.itinObj.park
			);
		} else if (event.target.name.startsWith("meetup")) {
			document.querySelector(".i1-meetup").style.backgroundImage =
				"url('/src/images/meetup.jpg')";
			OBJ.itinObj.meetup = meetupArray[i];
			document.querySelector(
				".i1-meetup"
			).innerHTML = WEB.createMeetupItinerary(OBJ.itinObj.meetup);
		}
	});

//accordian function

window.addEventListener("click", event => {
	if (!event.target.matches(".dropbtn")) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	} else if (event.target.matches(".dropbtn")) {
		if (event.target.querySelector("#myDropdown").classList.contains("show")) {
			event.target.querySelector("#myDropdown").classList.toggle("show");
		} else {
			var dropdowns = document.getElementsByClassName("dropdown-content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains("show")) {
					openDropdown.classList.remove("show");
				}
			}
			event.target.querySelector("#myDropdown").classList.toggle("show");
		}
	}
});

// document.querySelector("#search-results-container").addEventListener("click", event => {
// 	let i = event.target.id;
// 	if (event.target.name.startsWith("concert")) {
// 		document.querySelector(".i1-concert").style.backgroundImage = "url('/src/images/concert.jpg')";
// 		OBJ.itinObj.concert = OBJ.concertArray[i];
// 		document.querySelector(".i1-concert").innerHTML = WEB.createConcertItinerary(OBJ.itinObj.concert);
// 	} else if (event.target.name.startsWith("restaurant")) {
// 		document.querySelector(".i1-restaurant").style.backgroundImage = "url('/src/images/restaurant.jpg')";
// 		OBJ.itinObj.restaurant = OBJ.restaurantArray[i].restaurant;
// 		document.querySelector(".i1-restaurant").innerHTML = WEB.createRestaurantItinerary(OBJ.itinObj.restaurant);
// 	} else if (event.target.name.startsWith("park")) {
// 		document.querySelector(".i1-park").style.backgroundImage = "url('/src/images/park.jpg')";
// 		OBJ.itinObj.park = OBJ.parkArray[i];
// 		document.querySelector(".i1-park").innerHTML = WEB.createParkItinerary(OBJ.itinObj.park);
// 	} else if (event.target.name.startsWith("meetup")) {
// 		document.querySelector(".i1-meetup").style.backgroundImage = "url('/src/images/meetup.jpg')";
// 		itinObj.meetup = meetupArray[i];
// 		document.querySelector(".i1-meetup").innerHTML = WEB.createMeetupItinerary(OBJ.itinObj.meetup);
// 	}
// });

//save itinobj

// saveItinerary = save => {
// 	fetch("http://localhost:8088/itinerary", {
// 		method: "POST",
// 		body: JSON.stringify(save),
// 		headers: {
// 			"Content-Type": "application/json"
// 		}
// 	})
// 		.then(res => res.json())
// 		.then(response => console.log("Success:", JSON.stringify(response)))
// 		.catch(error => console.log("Error:", error));
// };
