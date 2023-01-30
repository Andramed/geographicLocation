'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const displayError = function(message) {
	countriesContainer.insertAdjacentText('beforeend', message);
	// countriesContainer.style.opacity = 1;
}


const DataObject = {
	getDataIP: async function() {
								const response = await fetch(`https://api.ipify.org?format=json`);
								const data = await response.json();
								return data.ip;
  								},
	getDataCoordinates: async function () {
								const ip = await this.getDataIP();
								const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=031c1b2008eb43918936205b75dba5fd&ip=${ip}`);
								const data = await response.json();
								const coordonates = data;
								return [Number(coordonates.latitude), Number(coordonates.longitude)];
  								},
	getCountry: async function() {
								const [lat, lng] = await this.getDataCoordinates();
								const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=c5a30863cce1480eb5ba5e5baa2847d6&language=en&pretty=1`);
								const data = await response.json();
								const country = data.results[0].components.country.toLowerCase();
								return country;
								},
	getDataCountry: async function() {
								const country = await this.getCountry();
								const response = await fetch(`https://countryapi.io/api/name/${country}?apikey=YWNryiH5R5wyPGTMnSMztXMk5CBV3njlgSqjjqq6`);
								const data = await response.json();
								const dataCountry = Object.values(data);
								return dataCountry;
							},
	
							
};

const countryInformation = {
	dataCountry: async function () {
		const dataCountry = await DataObject.getDataCountry()
		const data = Object.values(dataCountry);
		
		return data;
	  },
	
	language: async function() {
		const countryData = await this.dataCountry()
		const language = Object.values(countryData[0].languages)[0]
		return language;
	},
	flag: async function () {
		const dataFlag = await this.dataCountry();
		const flag = Object.values(dataFlag[0].flag);
		return flag[1];
	},
	countryName: async function(){
		const dataCountryName = await this.dataCountry();
		const countryName = dataCountryName[0].official_name;
		return countryName;
	},
	population: async function () {
		const dataPopulation = await this.dataCountry();
		const population = dataPopulation[0].population;
		return population;
	},
	region: async function(){
		const dataRegion = await this.dataCountry();
		const region = dataRegion[0].region;
		return region;
	},
	currencies: async function(){
		const dataCurrencies = await this.dataCountry();
		const currencies = Object.values(dataCurrencies[0].currencies)[0];
		return currencies;
	},
	capital: async function() {
		const dataCapital = await this.dataCountry();
		const capital = dataCapital[0].capital;
		return capital;
	},
}

async function getCountryInfo(className= ' ') {
	const language = await countryInformation.language();
	const flag = await countryInformation.flag();
	const countryName = await countryInformation.countryName();
	const population = await countryInformation.population();
	const region = await countryInformation.region();
	const currencies = await countryInformation.currencies();
	const {name: currencie, symbol: symb} = currencies;
	const capital = await countryInformation.capital();
	const html = `
	<article class="country ${className}">
		<img class="country__img" src= '${flag}' />
		<div class="country__data">
		<h3 class="country__name">${countryName}</h3>
		<h4 class="country__region">${region}</h4>
		<p class="country__row"><span>👨‍👩‍👧‍👦</span>${population}</p>
		<p class="country__row"><span>🗣️</span>${language}</p>
		<p class="country__row"><span>💰</span> ${currencie} ${symb} </p>
		<p class="country__row"><span>💰</span> ${capital} </p>
		</div>
	</article>`
countriesContainer.insertAdjacentHTML('beforeend', html);
countriesContainer.style.opacity = 1;
}


async function getData(dataOf) {
  const data = await DataObject[`get${dataOf}`]();  
  return data;
}

async function getCountryA() {
  const ip = await getData('DataIP');
  const coordinates = await getData('DataCoordinates');
  const [lat, lng] = coordinates;
  const country = await getData('Country');
  const dataCountry = await getData('DataCountry');

  console.log(`Aici avem ip-ul tau ${ip} lat: ${lat} lng: ${lng} te afli in: ${country} `);
}
btn.addEventListener('click', getCountryInfo)




// async function getCountryInfo(country) {
// 	const response = await fetch(`https://countryapi.io/api/name/${country}?apikey=QgEFuRV7bh9txd9AKCOENQQsoCrzcEHbSRCJbBTD`);
// 	const data = await response.json();
// 	console.log(data);
// }
// getCountryInfo('moldova');
