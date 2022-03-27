function searchForCity() {
   var nameOfCity = titleCase($("#cityName")[0].value.trim());

   var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + nameOfCity + "&units=imperial&appid=e4a82bdd4dbf9419e8bbfeb9328d65d1";

   fetch(apiURL).then(function (response) {
       if (response.ok) {
           response.json().then(function (data) {

               $("#city-name")[0].textContent = nameOfCity + " (" + moment().format('M/D/YYYY') + ")";

               $("#city-list").append('<button type="button" class="list-group-item list-group-item-light list-group-item-action city-name">' + nameOfCity);

               const lat = data.coord.lat;
               const lon = data.coord.lon;

               var latLonPair = lat.toString() + " " + lon.toString();

               localStorage.setItem(nameOfCity, latLonPair);

               apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=e4a82bdd4dbf9419e8bbfeb9328d65d1";

               fetch(apiURL).then(function (newResponse) {
                   if (newResponse.ok) {
                       newResponse.json().then(function (newData) {
                           getCurrentWeather(newData);
                       })
                   }
               })
           })
       } else {
           alert("Cannot Find The city!");
       }
   })
   
};





