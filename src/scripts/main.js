//declare array variables
const allArrays = {
	park: [],
	concert: [],
	restaurant: [],
	meetup: []
};

const itinObj = {
	park: {},
	concert: {},
	restaurant: {},
	meetup: {}
};

// web Component station

const searchResult = {
	concert: (object, i) => {
		return `
        <section >
        <button id="${i}" name="concert" class="button">${object.name}</button>
        </section>
        `;
	},

	park: (object, i) => {
		let parkData = `
        <section >
        <button id="${i}" name="park" class="button">${object.park_name}</h1>
        </section>`;
		return parkData;
	},

	meetup: (object, i) => {
		return `
		<section >
		<button id="${i}" name="meetup" class="button">${object.name.text}</button>
		</section>
		`;
	},
	restaurant: (object, i) => {
		return `
        <section >
        <button  id="${i}" name="restaurant" class="button">${object.restaurant.name}</button>
        </section>
        `;
	},
}

const createItinerary = {
	concert: object => {
		return `
			<p class="iText">${object.name}</p>
			<img class="pinConcert" src="/src/images/pin.png" />
		`;
	},
	park: object => {
		return `
			<p class="iText">${object.park_name}</p>
			<img class="pinPark" src="/src/images/pin.png" />
		`;
	},
	meetup: object => {
		return `
			<p class="iText">${object.name.text}</p>
			<img class="pinMeetup" src="/src/images/pin.png" />
		`;
	},
	restaurant: object => {
		return `
			<p class="iText">${object.restaurant.name}</p>
			<img class="pinRestaurant" src="/src/images/pin.png"/>
		`;
	}
};

//API station

const API = {
	tmArray: search => {
		return fetch(
			`https://app.ticketmaster.com/discovery/v2/events/?keyword=${search}&city=nashville&apikey=lRJ3piseoa0cn3eSi7wBxk5W9Th0WQc3`
		)
			.then(events => events.json())
			.then(object => {
				console.log(object._embedded.events);
				return object._embedded.events;
			});
	},

	parkList: search => {
		return fetch(
			`https://data.nashville.gov/resource/74d7-b74t.json?$q=${search}`
		)
			.then(parkData => parkData.json())
			.then(parsedParkData => {
				console.table(parsedParkData);
				return parsedParkData;
				//renderParkData(parsedParkData)
			});
	},
	eventbrite: search => {
		return fetch(
			`https://www.eventbriteapi.com/v3/events/search/?q=${search}&location.address=nashville&token=U4TQ4FVUMOLUNIZEGIQX`,
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
	restaurantList: search => {
		return fetch(
			`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=${search}&apikey=6e72e09f0a9e5501ab2d5645e8fac52d`
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
		allArrays.concert.length = 0;
		searchResultsContainer.innerHTML = "";
		array.forEach(item => {
			i++;
			allArrays.concert[i] = item;
			searchResultsContainer.innerHTML += searchResult.concert(item, i);
		});
	},
	parkResult: data => {
		let i = -1;
		allArrays.park.length = 0;
		searchResultsContainer.innerHTML = "";
		data.forEach(item => {
			i++;
			allArrays.park[i] = item;
			searchResultsContainer.innerHTML += searchResult.park(item, i);
		});
	},
	ebResults: array => {
		let i = -1;
		allArrays.meetup.length = 0;
		searchResultsContainer.innerHTML = "";
		array.forEach(item => {
			i++;
			allArrays.meetup[i] = item;
			searchResultsContainer.innerHTML += searchResult.meetup(item, i);
			// console.log(i);
		});
	},
	restaurantResults: array => {
		let i = -1;
		allArrays.restaurant.length = 0;
		(searchResultsContainer.innerHTML = ""),
			array.forEach(item => {
				i++;
				allArrays.restaurant[i] = item;
				searchResultsContainer.innerHTML += searchResult.restaurant(item, i);
			});
	}
};

//array variables

//add event listeners to buttons

document.querySelector("#search-parks").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	API.parkList(searchTerm).then(data => {
		DOM.parkResult(data);
		document.querySelector(".rightContainer").style.display = "block";
		document.querySelector(".itineraryWrapper").style.display = "block";
		document.querySelector("#searchContainer").style.marginTop = "1em";
		document.querySelector("#details-page").style.display = "none";
	});
});

document.querySelector("#search-concerts").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	API.tmArray(searchTerm).then(data => {
		DOM.tmResults(data);
		document.querySelector(".rightContainer").style.display = "block";
		document.querySelector(".itineraryWrapper").style.display = "block";
		document.querySelector("#searchContainer").style.marginTop = "1em";
		document.querySelector("#details-page").style.display = "none";
	});
});

document.querySelector("#search-meetups").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	API.eventbrite(searchTerm).then(data => {
		DOM.ebResults(data);
		document.querySelector(".rightContainer").style.display = "block";
		document.querySelector(".itineraryWrapper").style.display = "block";
		document.querySelector("#searchContainer").style.marginTop = "1em";
		document.querySelector("#details-page").style.display = "none";
	});
});

document
	.querySelector("#search-restaurants")
	.addEventListener("click", event => {
		let searchTerm = document.querySelector("#search-bar").value;
		API.restaurantList(searchTerm).then(data => {
			DOM.restaurantResults(data);
			document.querySelector(".rightContainer").style.display = "block";
			document.querySelector(".itineraryWrapper").style.display = "block";
			document.querySelector("#searchContainer").style.marginTop = "1em";
			document.querySelector("#details-page").style.display = "none";
		});
	});


const detailsContainer = {
	concert: object => {
		return `
		<div>
			<p class="iText">${object.name}</p>
		</div>
		`;
	},
	park: object => {
		return `
		<div>
			<p class="iText">${object.park_name}</p>
			<p class="iText">${object.mapped_location.human_address}</p>
			<p class="iText">${object.mapped_location.human_address}</p>
			<div id="map"></div>	
		</div>
		`;
	},
	meetup: object => {
		return `
			
		<div>
			<p class="iText">${object.name.text}</p>
		</div>
		
		`;
	},
	restaurant: object => {
		return `
			
		<div>
			<p class="iText">${object.restaurant.name}</p>
		</div>
		
		`;
	}
};


// function initMap() {
// 	// The location of Uluru
// 	var uluru = {lat: -25.344, lng: 131.036};
// 	// The map, centered at Uluru
// 	var map = new google.maps.Map(
// 		document.getElementById('map'), {zoom: 4, center: uluru});
// 	// The marker, positioned at Uluru
// 	var marker = new google.maps.Marker({position: uluru, map: map});
//   }

  const itinerarySelector = {
	park:  (object, key) => {document.querySelector(".i1-park").innerHTML = createItinerary[key](object)},
	concert: (object, key) => {document.querySelector(".i1-concert").innerHTML = createItinerary[key](object)},
	restaurant: (object, key) => {document.querySelector(".i1-restaurant").innerHTML = createItinerary[key](object)},
	meetup: (object, key) => {document.querySelector(".i1-meetup").innerHTML = createItinerary[key](object)}
};

const detailsObject = {
	object: {},
	key: {},
	id: {}
}

document.querySelector("#search-results-container").addEventListener("click", event => {
	let i = event.target.id;
	let key = event.target.name
	// itinObj[key] = allArrays[key][i];

	detailsObject.object = allArrays[key][i];
	detailsObject.key = key;
	detailsObject.id = i;
	document.querySelector("#details-page").style.display = "inline";
	document.querySelector("#details-container").innerHTML = detailsContainer[key](detailsObject.object);
	console.log(detailsObject)
	// itinerarySelector[key](itinObj[key], key);
})

// confirmSave
  document.querySelector("#save-to-itinerary").addEventListener("click", event => {
	let i = detailsObject.id;
	let key = detailsObject.key
	itinObj[key] = detailsObject.object;
	console.log(itinObj[key])
	itinerarySelector[key](detailsObject.object, key);
	document.querySelector("#details-page").style.display = "none";
})




// document.querySelector("#search-results-container").addEventListener("click", event => {
// 		let i = event.target.id;
// 		let key = event.target.name
// 		if (event.target.name.startsWith("concert")) {
// 			document.querySelector(".i1-concert").style.backgroundImage =
// 				"url('/src/images/concert.jpg')";
// 			itinObj.concert = concertArray[i];
// 			console.log(itinObj.concert);
// 			document.querySelector(".i1-concert").innerHTML = WEB.createConcertItinerary(itinObj.concert);
// 			console.log(itinObj);
// 		} else if (event.target.name.startsWith("restaurant")) {
// 			document.querySelector(".i1-restaurant").style.backgroundImage =
// 				"url('/src/images/restaurant.jpg')";
// 			itinObj.restaurant = restaurantArray[i].restaurant;
// 			document.querySelector(
// 				".i1-restaurant"
// 			).innerHTML = WEB.createRestaurantItinerary(itinObj.restaurant);
// 			console.log(itinObj);
// 		} else if (event.target.name.startsWith("park")) {
// 			document.querySelector(".i1-park").style.backgroundImage =
// 				"url('/src/images/park.jpg')";
// 			itinObj.park = parkArray[i];
// 			document.querySelector(".i1-park").innerHTML = WEB.createParkItinerary(
// 				itinObj.park
// 			);
// 			console.log(itinObj);
// 		} else if (event.target.name.startsWith("meetup")) {
// 			document.querySelector(".i1-meetup").style.backgroundImage =
// 				"url('/src/images/meetup.jpg')";
// 			itinObj.meetup = meetupArray[i];
// 			document.querySelector(
// 				".i1-meetup"
// 			).innerHTML = WEB.createMeetupItinerary(itinObj.meetup);
// 			console.log(itinObj);
// 		}
// 	});

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
