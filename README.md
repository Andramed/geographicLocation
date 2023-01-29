# geographicLocation
This is a JavaScript project that fetches information about a country based on the user's geographic location and displays the data on the web page. 
This is a JavaScript project that fetches information about a country based on the user's geographic location and displays the data on the web page. The project consists of several functions:

"displayError": a function that displays an error message on the web page if there is an issue with fetching the data.

"getCountry": a function that displays information about a country. It receives data from an API and formats the information in an HTML format to be displayed on the web page.

"displayCountryByGPS": a function that fetches information about a country based on the user's latitude and longitude. It makes use of the Opencage API to convert the geographic location into a country name, and then uses the REST Countries API to fetch data about the country.

The main event listener that is attached to the button on the web page. When the button is clicked, the function "displayCountryByGPS" is called and the data about the country is displayed on the web page.

Overall, this project demonstrates the use of APIs and fetching data from them using JavaScript.

For better functionality, download locally (the issue is in the free API used which has some limited features).
