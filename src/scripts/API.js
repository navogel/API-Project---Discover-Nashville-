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

export default API;
