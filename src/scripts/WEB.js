// web Component station

const WEB = {
	concertSearchResults: (item, i) => {
		return `
        <section >
			<button id="${i}" name="concertArray" class="button dropbtn">
				<span class="arrow-down"></span>${item.name}
				<div id="myDropdown" class="dropdown-content">
					<p>blah blah blah</p>
					<p>blah blah blah</p>
					<p>blah blah blah</p>
				</div>
				
		</section>
        `;
	},

	parkSearchResults: (item, i) => {
		let parkAddress = JSON.parse(item.mapped_location.human_address);
		let parkData = `
        <section>
			<button id="${i}" name="parkArray" class="button dropbtn">
				<span class="arrow-down dropbtn"></span>${item.park_name} 
				<div id="myDropdown" class="dropdown-content">
					<p>${parkAddress.address}, ${parkAddress.city} ${parkAddress.state}</p>
				</div>
			</button>
        </section>`;
		return parkData;
	},

	meetupSearchResults: (item, i) => {
		return `
		<section >
			<button id="${i}" name="meetupArray" class="button dropbtn"><span class="arrow-down"></span>${item.name.text}
				<div id="myDropdown" class="dropdown-content">
					<p>blah blah blah</p>
					<p>blah blah blah</p>
					<p>blah blah blah</p>
				</div>
			</button>
		</section>
		`;
	},
	restaurantSearchResults: (item, i) => {
		return `
        <section>
			<button  id="${i}" name="restaurantArray" class="button dropbtn">
				<span class="arrow-down"></span>${item.restaurant.name}
				<div id="myDropdown" class="dropdown-content">
					<p>blah blah blah</p>
					<p>blah blah blah</p>
					<p>blah blah blah</p>
				</div>
			</button>
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

export default WEB;
