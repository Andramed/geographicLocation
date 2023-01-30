'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const displayError = function(message) {
	countriesContainer.insertAdjacentText('beforeend', message);
	// countriesContainer.style.opacity = 1;
}
const getCountry = function (data, className = ' ') {
	let language = Object.values(data.languages);
	let officialLanguage = language[0];
	let flag = data.flags.svg;
	let nameContry = Object.values(data.name);
	let officialName = nameContry[1];
	let population = data.population;
	let region = data.region;
	let currenciesOfCountry = Object.values(data.currencies);
	const currencies = currenciesOfCountry[0];
	const {name: currenciesName} = currencies;
	const capital = Object.values(data.capital)
	
const html = `
	<article class="country ${className}">
		<img class="country__img" src= '${flag}' />
		<div class="country__data">
		<h3 class="country__name">${officialName}</h3>
		<h4 class="country__region">${region}</h4>
		<p class="country__row"><span>👨‍👩‍👧‍👦</span>${population}</p>
		<p class="country__row"><span>🗣️</span>${officialLanguage}</p>
		<p class="country__row"><span>💰</span> ${currenciesName} </p>
		<p class="country__row"><span>💰</span> ${capital} </p>
		</div>
	</article>`
countriesContainer.insertAdjacentHTML('beforeend', html);
countriesContainer.style.opacity = 1;
};

const displayCountryByGPS = function (lat, lng) {
	fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=c5a30863cce1480eb5ba5e5baa2847d6&language=en&pretty=1`)
	.then(response => response.json())
	.then(data => {
		// console.log(data.results[0].components.country.toLowerCase());
		let country = data.results[0].components.country.toLowerCase();
		console.log(country);
		  return fetch(`https://countryapi.io/api/name/${country}?apikey=a28NQ13Ce5Ncd5TS13kjzGr9qZ6o6cNO6Wuskdbf`)
			.then(response => response.json())
			.then(response => {
			let countryInfo = response[0];
			let firstNeighbor = countryInfo.borders[0];
			console.log(firstNeighbor);
			getCountry(countryInfo);
			return fetch(`https://restcountries.com/v3.1/alpha/${firstNeighbor}`)
			.then(abr => abr.json())
			.then(dataAbr =>{
				let countryNeighbor = dataAbr[0];
				console.log(countryNeighbor);
				getCountry(countryNeighbor, 'neighbour');
			})

		
	});
	});
};
btn.addEventListener('click', function () {
	
	displayCountryByGPS(52.251430705148806, 11.901989017412681);
	
})

// 
