// web Component station

const WEB = {
	tmSearchResults: dataObj => {
		return `
        <section>
        <h1>${dataObj.name}</h1>
        
        </section>
        `;
	},
	createHTML: dataObj => {
		let parkData = `
        <section>
        <h1>${dataObj.park_name}</h1>
        
        </section>`;
		return parkData;
	},
	ebResultsHTML: arrayItem => {
		return `
        <section>
        <h1>${arrayItem.name.text}</h1>
        </section>
        `;
	},
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
	}
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
		var i = 0
		array.forEach(item => {
			i++
			searchResultsContainer.innerHTML += `
			<section>
			<h1>${i}</h1>
			<h1>${item.name.text}</h1>
			</section>
			`
		});
	}
};

//call eventbrite

//call ticketmaster

//call parks

//add event listeners to buttons

document.querySelector("#search-parks").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	API.parkList(searchTerm).then(data => {
		DOM.parkResult(data);
	});
});

document.querySelector("#search-concerts").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	API.tmArray(searchTerm).then(data => DOM.tmResults(data));
});

document.querySelector("#search-meetups").addEventListener("click", event => {
	let searchTerm = document.querySelector("#search-bar").value;
	API.eventbrite(searchTerm).then(data => {
		DOM.ebResults(data);
	});
});

//zomato

function lookUp(searchTerm) {
	fetch(
		`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=${searchTerm}&apikey=6e72e09f0a9e5501ab2d5645e8fac52d`
	)
		.then(result => result.json())
		.then(parsedResult => {
			console.log(parsedResult.restaurants);
			parsedResult.restaurants.forEach(element => {
				document.querySelector(
					"#restuarantResultsContainer"
				).innerHTML += `<h1>${element.restaurant.name}</h1>`;
			});
		});
}

document
	.querySelector("#search-restaurants")
	.addEventListener("click", event => {
		let searchTerm = document.querySelector("#search-bar").value;
		lookUp(searchTerm);
	});
