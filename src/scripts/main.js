//declare array variables

const meetupArray = [];
const concertArray = [];
const parkArray = [];
const restaurantArray = [];
const itinObj = {
	park: {},
	restaurant: {},
	meetup: {},
	concert: {}
};

// web Component station

const WEB = {
	tmSearchResults: (item, i) => {
		return `
        <section >
        <button id="${i}" name="concertArray" class="button">${item.name}</button>
        </section>
        `;
	},

	createHTML: (item, i) => {
		let parkData = `
        <section >
        <button id="${i}" name="parkArray" class="button">${item.park_name}</h1>
        </section>`;
		return parkData;
	},

	ebResultsHTML: (item, i) => {
		return `
		<section >
		<button id="${i}" name="meetupArray" class="button">${item.name.text}</button>
		</section>
		`;
	},
	restaurantHTML: (item, i) => {
		return `
        <section >
        <button  id="${i}" name="restaurantArray" class="button">${item.restaurant.name}</button>
        </section>
        `;
	},

	createItinerary: () => {
		return `
		
		
		<div class="i1-park">
			<p class="iText">${itinerary.park}</p>
		</div>
		<div class="i1-concert">
			<p class="iText">${itinerary.concert}</p>
		</div>
		<div class="i1-meetup">
			<p class="iText">${itinerary.meetup}</p>
		</div>
		<div class="i1-restaurant">
			<p class="iText">${itinerary.restaurant}</p>
		</div>
		`;
	},

	createConcertItinerary: object => {
		return `
			
		<div class="i1-concert">
			<p class="iText">${object.type}</p>
		</div>
		
		`;
	},
	createParkItinerary: object => {
		return `
			
		<div class="i1-concert">
			<p class="iText">${object.type}</p>
		</div>
		
		`;
	},
	createMeetupItinerary: object => {
		return `
			
		<div class="i1-concert">
			<p class="iText">${object.type}</p>
		</div>
		
		`;
	},
	createRestaurantItinerary: object => {
		return `
			
		<div class="i1-concert">
			<p class="iText">${object.type}</p>
		</div>
		
		`;
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
	restaurantList: searchTerm => {
		return fetch(
			`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=${searchTerm}&apikey=6e72e09f0a9e5501ab2d5645e8fac52d`
		)
			.then(result => result.json())
			.then(parsedResult => {
				console.log(parsedResult.restaurants);
				return parsedResult.restaurants;
			});
	}
};

//DOM station
const searchResultsContainer = document.querySelector(
	"#search-results-container"
);

const DOM = {
	tmResults: array => {
		let i = -1;
		concertArray.length = 0;
		searchResultsContainer.innerHTML = "";
		array.forEach(item => {
			i++;
			concertArray[i] = item;
			searchResultsContainer.innerHTML += WEB.tmSearchResults(item, i);
		});
	},
	parkResult: data => {
		let i = -1;
		parkArray.length = 0;
		searchResultsContainer.innerHTML = "";
		data.forEach(item => {
			i++;
			parkArray[i] = item;
			searchResultsContainer.innerHTML += WEB.createHTML(item, i);
		});
	},
	ebResults: array => {
		let i = -1;
		meetupArray.length = 0;
		searchResultsContainer.innerHTML = "";
		array.forEach(item => {
			i++;
			meetupArray[i] = item;
			searchResultsContainer.innerHTML += WEB.ebResultsHTML(item, i);
			// console.log(i);
		});
	},
	restaurantResults: array => {
		let i = -1;
		restaurantArray.length = 0;
		(searchResultsContainer.innerHTML = ""),
			array.forEach(item => {
				i++;
				restaurantArray[i] = item;
				searchResultsContainer.innerHTML += WEB.restaurantHTML(item, i);
			});
	}
};

//array variables

//add event listeners to buttons

document.querySelector("#search-parks").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	document.querySelector(".rightContainer").style.display = "block";
	document.querySelector(".itineraryWrapper").style.display = "block";
	document.querySelector("#searchContainer").style.marginTop = "1em";
	API.parkList(searchTerm).then(data => {
		DOM.parkResult(data);
	});
}),
	document
		.querySelector("#search-concerts")
		.addEventListener("click", event => {
			let searchTerm = document.querySelector("#search-bar").value;
			document.querySelector(".rightContainer").style.display = "block";
			document.querySelector(".itineraryWrapper").style.display = "block";
			document.querySelector("#searchContainer").style.marginTop = "1em";
			API.tmArray(searchTerm).then(data => DOM.tmResults(data));
		}),
	document.querySelector("#search-meetups").addEventListener("click", event => {
		let searchTerm = document.querySelector("#search-bar").value;
		document.querySelector(".rightContainer").style.display = "block";
		document.querySelector(".itineraryWrapper").style.display = "block";
		document.querySelector("#searchContainer").style.marginTop = "1em";
		API.eventbrite(searchTerm).then(data => {
			DOM.ebResults(data);
		});
	}),
	document
		.querySelector("#search-restaurants")
		.addEventListener("click", event => {
			let searchTerm = document.querySelector("#search-bar").value;
			document.querySelector(".rightContainer").style.display = "block";
			document.querySelector(".itineraryWrapper").style.display = "block";
			document.querySelector("#searchContainer").style.marginTop = "1em";
			API.restaurantList(searchTerm).then(data => {
				DOM.restaurantResults(data);
			});
		});

// const saveButton = button => {
// 	itinerary[button.name] = button.value;
// 	document.querySelector(
// 		"#itinerary-container"
// 	).innerHTML = WEB.createItinerary();
// };

document
	.querySelector("#search-results-container")
	.addEventListener("click", event => {
		let i = event.target.id;
		if (event.target.name.startsWith("concert")) {
			itinObj.concert = concertArray[i];
			console.log(itinObj.concert);
			document.querySelector(
				"#itinerary-container"
			).innerHTML = WEB.createConcertItinerary(itinObj.concert);
		} else if (event.target.name.startsWith("restaurant")) {
			itinObj.restaurant = restaurantArray[i];
			document.querySelector(
				"#itinerary-container"
			).innerHTML = WEB.createRestaurantItinerary(itinObj.restaurant);
		} else if (event.target.name.startsWith("park")) {
			itinObj.park = parkArray[i];
			document.querySelector(
				"#itinerary-container"
			).innerHTML = WEB.createRestaurantItinerary(itinObj.park);
		} else if (event.target.name.startsWith("meetup")) {
			itinObj.meetup = meetupArray[i];
			document.querySelector(
				"#itinerary-container"
			).innerHTML = WEB.createRestaurantItinerary(itinObj.meetup);
		}
	});

//   function savePark(clickedPark) {
// 		let selectedPark = clickedPark.value
// 		itinerary.parkName = selectedPark
//    	    console.log(selectedPark)
//     	document.querySelector("#itinerary-container").innerHTML = WEB.createItinerary()
// }

// function saveConcert(clickedConcert) {
// 		let selectedConcert = clickedConcert.value
// 		itinerary.concert = selectedConcert
//     	console.log(selectedConcert)
//    		document.querySelector("#itinerary-container").innerHTML = WEB.createItinerary()
// }

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

//   function saveEvent(clickedEvent) {
// 	let selectedMeepups = clickedEvent.value
// 	itinerary.meetups = selectedMeepups
// 	console.log(selectedMeepups)
// 	document.querySelector("#itinerary-container").innerHTML = WEB.createItinerary()
// }
