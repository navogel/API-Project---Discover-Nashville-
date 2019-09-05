// web Component station

const WEB = {
	tmSearchResults: dataObj => {
		return `
        <section>
        <button class="button" value="${dataObj.name}" onclick="saveConcert(this)">${dataObj.name}</button>
        </section>
        `;
	},
	
	createHTML: dataObj => {
		let parkData = `
        <section>
        <button class="button" value="${dataObj.park_name}" onclick="savePark(this)">${dataObj.park_name}</h1>
        </section>`;
		return parkData;
	},
	
	ebResultsHTML: item => {
		return `
		<section>
		<button class="button" value="${item.name.text}" onclick="saveEvent(this)">${item.name.text}</button>
		</section>
		`;
	},
	restaurantHTML: arrayItem => {
		return `
        <section>
        <button class="button" value="${arrayItem.restaurant.name}" onclick="saveRestaurant(this)">${arrayItem.restaurant.name}</h1>
        </section>
        `;
	},

	createItinerary: () => {
		return `
		<div>
		
		<h1>Park: ${itinerary.parkName}</h1>
		<h1>Concert: ${itinerary.concert}</h1>
		<h1>Meetup: ${itinerary.meetups}</h1>
		<h1>Restaurant: ${itinerary.restaurant}</h1>
		</div>` 
	}
	
};

//API station

const API = {
	tmArray: tacos => {
		return fetch(
			`https://app.ticketmaster.com/discovery/v2/events/?keyword=${tacos}&city=nashville&apikey=lRJ3piseoa0cn3eSi7wBxk5W9Th0WQc3`
		)
			.then(events => events.json())
			.then(object => {
				console.log(object._embedded.events);
				return object._embedded.events;
			});
	},
	
	parkList: searchTerm => {
		return fetch(
			`https://data.nashville.gov/resource/74d7-b74t.json?$q=${searchTerm}`
		)
			.then(parkData => parkData.json())
			.then(parsedParkData => {
				console.table(parsedParkData);
				return parsedParkData;
				//renderParkData(parsedParkData)
			});
	},
	eventbrite: searchTerm => {
		return fetch(
			`https://www.eventbriteapi.com/v3/events/search/?q=${searchTerm}&location.address=nashville&token=U4TQ4FVUMOLUNIZEGIQX`,
			{
				headers: {
					Accept: "application/json"
				}
			}
		)
			.then(object => object.json())
			.then(parsedObject => {
				console.table(parsedObject);
				return parsedObject.events;
			});
	},
	restaurantList: searchTerm =>{
		return fetch(
			`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=${searchTerm}&apikey=6e72e09f0a9e5501ab2d5645e8fac52d`
		)
			.then(result => result.json())
			.then(parsedResult => {
				console.log(parsedResult.restaurants);
				return parsedResult.restaurants
				
			}); 
	},
};

//DOM station
const searchResultsContainer = document.querySelector(
	"#search-results-container"
);

const DOM = {
	tmResults: array => {
		searchResultsContainer.innerHTML = "";
		array.forEach(element => {
			searchResultsContainer.innerHTML += WEB.tmSearchResults(element);
		});
	},
	parkResult: data => {
		searchResultsContainer.innerHTML = "";
		data.forEach(item => {
			searchResultsContainer.innerHTML += WEB.createHTML(item);
		});
	},
	ebResults: array => {
		searchResultsContainer.innerHTML = "";
		array.forEach(item => {
			searchResultsContainer.innerHTML += WEB.ebResultsHTML(item);
		});
	},
	restaurantResults: array => {

		searchResultsContainer.innerHTML = "",
		array.forEach(item => {
			searchResultsContainer.innerHTML += WEB.restaurantHTML(item);
		}
		)
},
}

//call eventbrite

//call ticketmaster

//call parks

//add event listeners to buttons

document.querySelector("#search-parks").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	API.parkList(searchTerm).then(data => {
		DOM.parkResult(data);
	});
}),

document.querySelector("#search-concerts").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	API.tmArray(searchTerm).then(data => DOM.tmResults(data));
}),

document.querySelector("#search-meetups").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	API.eventbrite(searchTerm).then(data => {
		DOM.ebResults(data);
	});
}),
document.querySelector("#search-restaurants").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	API.restaurantList(searchTerm).then(data => {DOM.restaurantResults(data)});
}) 




const itinerary = {
		parkName: "",
		concert: "",
		meetups: "",
		restaurant: ""

  }

  function savePark(clickedPark) {
		let selectedPark = clickedPark.value
		itinerary.parkName = selectedPark
   	    console.log(selectedPark)
    	document.querySelector("#itinerary-container").innerHTML = WEB.createItinerary()
}

function saveConcert(clickedConcert) {
		let selectedConcert = clickedConcert.value
		itinerary.concert = selectedConcert
    	console.log(selectedConcert)
   		document.querySelector("#itinerary-container").innerHTML = WEB.createItinerary()
}

// 	document.getElementById("save").addEventListener('click', (event) => {
// 		let selectedMeepups = document.querySelector('input[name="meetup"]:checked').value
// 		itinerary.meetups = selectedMeepups
//     	console.log(selectedMeepups)
//     	document.querySelector("#itinerary-container").innerHTML = WEB.createItinerary()
// })



// function saveEvent(clickedEvent) {
// 		itinerary.meetups = clickedEvent.value.text
//     	console.log(clickedEvent.value.text)
//     	document.querySelector("#itinerary-container").innerHTML = WEB.createItinerary()
//   }

  function saveEvent(clickedEvent) {
	let selectedMeepups = clickedEvent.value
	itinerary.meetups = selectedMeepups
	console.log(selectedMeepups)
	document.querySelector("#itinerary-container").innerHTML = WEB.createItinerary()
}


function saveRestaurant(clickedRestaurant) {
		let selectedRestaurant = clickedRestaurant.value
		itinerary.restaurant = selectedRestaurant
		console.log(selectedRestaurant)
		document.querySelector("#itinerary-container").innerHTML = WEB.createItinerary()
}
