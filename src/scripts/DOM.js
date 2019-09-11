import WEB from "../scripts/WEB.js";
import OBJ from "../scripts/OBJ.js";

//DOM station

const searchResultsContainer = document.querySelector("#search-results-container");
const spinnerContainer = document.querySelector("#spinner-container");
const spinnerText = document.querySelector("#spinner-text");

const DOM = {
	//take api results and add them to a local array, pass the index to the web component for ID
	tmResults: array => {
		let i = -1;
		//reset array and container before each search
		OBJ.concertArray.length = 0;
		spinnerContainer.style.display = "none";
		//iterate through array and each each result to the search results container
		array.forEach(item => {
			i++;
			OBJ.concertArray[i] = item;
			//pass object + index number to web component
			searchResultsContainer.innerHTML += WEB.concertSearchResults(item, i);
		});
	},
	parkResult: data => {
		let i = -1;
		OBJ.parkArray.length = 0;
		spinnerContainer.style.display = "none";
		data.forEach(item => {
			i++;
			OBJ.parkArray[i] = item;
			searchResultsContainer.innerHTML += WEB.parkSearchResults(item, i);
		});
	},
	ebResults: array => {
		let i = -1;
		OBJ.meetupArray.length = 0;
		spinnerContainer.style.display = "none";
		array.forEach(item => {
			i++;
			OBJ.meetupArray[i] = item;
			searchResultsContainer.innerHTML += WEB.meetupSearchResults(item, i);
			// console.log(i);
		});
	},
	restaurantResults: array => {
		let i = -1;
		OBJ.restaurantArray.length = 0;
		spinnerContainer.style.display = "none";
		array.forEach(item => {
			i++;
			OBJ.restaurantArray[i] = item;
			searchResultsContainer.innerHTML += WEB.restaurantSearchResults(item, i);
		});
	}
};

export default DOM;
