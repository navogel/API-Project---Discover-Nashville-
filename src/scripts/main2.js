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

const savedItins = [];

// web Component station

const WEB = {
	concertSearchResults: (item, i) => {
		return `
        <section >
        <button id="${i}" name="concertArray" class="button">${item.name}</button>
        </section>
        `;
	},

	parkSearchResults: (item, i) => {
		let parkAddress = JSON.parse(item.mapped_location.human_address);
		let parkData = `
        <section >
        <button title="${parkAddress.address}, ${parkAddress.city} ${parkAddress.state}" id="${i}" name="parkArray" class="button">${item.park_name}</h1>
        </section>`;
		return parkData;
	},

	meetupSearchResults: (item, i) => {
		return `
		<section >
		<button id="${i}" name="meetupArray" class="button">${item.name.text}</button>
		</section>
		`;
	},
	restaurantSearchResults: (item, i) => {
		return `
        <section >
        <button  id="${i}" name="restaurantArray" class="button">${item.restaurant.name}</button>
        </section>
        `;
	},
	createConcertItinerary: object => {
		return `
			<p class="iText">${object.name}</p>
            <img class="pinConcert" src="/src/images/pin.png" />
		`;
	},
	createParkItinerary: object => {
		return `
			<p class="iText">${object.park_name}</p>
            <img class="pinPark" src="/src/images/pin.png" />
		`;
	},
	createMeetupItinerary: object => {
		return `
			<p class="iText">${object.name.text}</p>
            <img class="pinMeetup" src="/src/images/pin.png" />
		`;
	},
	createRestaurantItinerary: object => {
		return `
		<p class="iText">${object.name}</p>
        <img class="pinRestaurant" src="/src/images/pin.png"/>
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
		return fetch(`https://data.nashville.gov/resource/74d7-b74t.json?$q=${searchTerm}`)
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
const searchResultsContainer = document.querySelector("#search-results-container");
const spinnerContainer = document.querySelector("#spinner-container");
const spinnerText = document.querySelector("#spinner-text");

const DOM = {
	//take api results and add them to a local array, pass the index to the web component for ID
	tmResults: array => {
		let i = -1;
		//reset array and container before each search
		concertArray.length = 0;
		spinnerContainer.style.display = "none";
		//iterate through array and each each result to the search results container
		array.forEach(item => {
			i++;
			concertArray[i] = item;
			//pass object + index number to web component
			searchResultsContainer.innerHTML += WEB.concertSearchResults(item, i);
		});
	},
	parkResult: data => {
		let i = -1;
		parkArray.length = 0;
		spinnerContainer.style.display = "none";
		data.forEach(item => {
			i++;
			parkArray[i] = item;
			searchResultsContainer.innerHTML += WEB.parkSearchResults(item, i);
		});
	},
	ebResults: array => {
		let i = -1;
		meetupArray.length = 0;
		spinnerContainer.style.display = "none";
		array.forEach(item => {
			i++;
			meetupArray[i] = item;
			searchResultsContainer.innerHTML += WEB.meetupSearchResults(item, i);
			// console.log(i);
		});
	},
	restaurantResults: array => {
		let i = -1;
		restaurantArray.length = 0;
		spinnerContainer.style.display = "none";
		array.forEach(item => {
			i++;
			restaurantArray[i] = item;
			searchResultsContainer.innerHTML += WEB.restaurantSearchResults(item, i);
		});
	}
};

//add event listeners to search buttons

document.querySelector("#search-parks").addEventListener("click", event => {
	//create search term from search bar field
	let searchTerm = document.querySelector("#search-bar").value;
	//display hidden elements from first load
	document.querySelector(".rightContainer").style.display = "block";
	document.querySelector(".itineraryWrapper").style.display = "block";
	document.querySelector("#searchContainer").style.marginTop = "1em";
	//reset search results container to empty
	searchResultsContainer.innerHTML = "";
	//display spinner and text
	spinnerContainer.style.display = "inline";
	spinnerText.innerHTML = "searching parks...";
	//call API and pass search results to DOM
	API.parkList(searchTerm).then(data => {
		DOM.parkResult(data);
	});
});

document.querySelector("#search-concerts").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	document.querySelector(".rightContainer").style.display = "block";
	document.querySelector(".itineraryWrapper").style.display = "block";
	document.querySelector("#searchContainer").style.marginTop = "1em";
	searchResultsContainer.innerHTML = "";
	spinnerContainer.style.display = "inline";
	spinnerText.innerHTML = "searching events...";
	API.tmArray(searchTerm).then(data => {
		DOM.tmResults(data);
	});
});

document.querySelector("#search-meetups").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	document.querySelector(".rightContainer").style.display = "block";
	document.querySelector(".itineraryWrapper").style.display = "block";
	document.querySelector("#searchContainer").style.marginTop = "1em";
	searchResultsContainer.innerHTML = "";
	spinnerContainer.style.display = "inline";
	spinnerText.innerHTML = "searching meetups...";
	API.eventbrite(searchTerm).then(data => {
		DOM.ebResults(data);
	});
});

document.querySelector("#search-restaurants").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	document.querySelector(".rightContainer").style.display = "block";
	document.querySelector(".itineraryWrapper").style.display = "block";
	document.querySelector("#searchContainer").style.marginTop = "1em";
	searchResultsContainer.innerHTML = "";
	spinnerContainer.style.display = "inline";
	spinnerText.innerHTML = "searching restaurants...";
	API.restaurantList(searchTerm).then(data => {
		DOM.restaurantResults(data);
	});
});

//add event listener to search results container --> add to itinerary container

document.querySelector("#search-results-container").addEventListener("click", event => {
	let i = event.target.id;
	if (event.target.name.startsWith("concert")) {
		document.querySelector(".i1-concert").style.backgroundImage = "url('/src/images/concert.jpg')";
		itinObj.concert = concertArray[i];
		document.querySelector(".i1-concert").innerHTML = WEB.createConcertItinerary(itinObj.concert);
	} else if (event.target.name.startsWith("restaurant")) {
		document.querySelector(".i1-restaurant").style.backgroundImage = "url('/src/images/restaurant.jpg')";
		itinObj.restaurant = restaurantArray[i].restaurant;
		document.querySelector(".i1-restaurant").innerHTML = WEB.createRestaurantItinerary(itinObj.restaurant);
	} else if (event.target.name.startsWith("park")) {
		document.querySelector(".i1-park").style.backgroundImage = "url('/src/images/park.jpg')";
		itinObj.park = parkArray[i];
		document.querySelector(".i1-park").innerHTML = WEB.createParkItinerary(itinObj.park);
	} else if (event.target.name.startsWith("meetup")) {
		document.querySelector(".i1-meetup").style.backgroundImage = "url('/src/images/meetup.jpg')";
		itinObj.meetup = meetupArray[i];
		document.querySelector(".i1-meetup").innerHTML = WEB.createMeetupItinerary(itinObj.meetup);
	}
});

//save itinobj

document.querySelector(".saveItin").addEventListener("click", event => {
	savedItins.push(itinObj);
	console.log(savedItins);
});
