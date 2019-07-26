const appKey = "XXXXXXXXXXXX";

let units = "imperial";

let searchInput = document.getElementById("search-input");
let searchSubmit = document.getElementById("search-submit");


let city = document.getElementById("location");
let description = document.getElementById("desc")
let temperature = document.getElementById("temp");

searchSubmit.addEventListener("click", urlBuilder);
searchInput.addEventListener("keyup", inputLogger);

function changeCelc(){
    units = "metric";
    urlBuilder();
}

function changeFaren(){
    units = "imperial";
    urlBuilder();
}

function inputLogger(event) {
    if (event.key === "Enter") {
        urlBuilder();
    }
}


function urlBuilder() {
    if (!(searchInput.value === "")) {
        if(/[a-zA-Z]/.test(searchInput.value)){
            let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&units=" + units + "&appid=" + appKey; // by city
            xmlRequest(searchLink, mainFunction);           
        }
        if(/[0-9]/.test(searchInput.value)){
            let searchLink = "https://api.openweathermap.org/data/2.5/weather?zip=" + searchInput.value + "&units=" + units + "&appid=" + appKey;
            xmlRequest(searchLink, mainFunction);  
        }
    }
}

function mainFunction(response) {
    WeatherWear.style.display = "none";
    let data = JSON.parse(response);
    city.innerHTML = data.name;
    description.innerHTML = data.weather[0].description;
    if(units == "metric"){
        temperature.innerHTML = parseInt(data.main.temp) + "° C";
    }
    else{
        temperature.innerHTML = parseInt(data.main.temp) + "° F";
    }    
    // Background Selector
    let val = parseInt(data.weather[0].id);
    if((val >= 200 && val <= 232)) {
        document.body.className = 'storm';
    }
    else if((val>=300 && val<=321) || (val>=500 && val<=501)) {
        document.body.className = 'drizzle';
    }
    else if((val>=502 && val<=531)) {
        document.body.className = 'heavy-rain';
    }
    else if((val>=600 && val<=621) && val!=602 && val!=622) {
        document.body.className = 'light-snow';
    }
    else if(val == 602 || val == 622) {
        document.body.className = 'heavy-snow';
    }
    else if((val>=701 && val<=781)) {
        document.body.className = 'fog';
    }
    else if(val == 800) {
        document.body.className = 'clear';
    }
    else if(val == 801) {
        document.body.className = 'few-clouds';
    }
    else if(val == 802) {
        document.body.className = 'scattered-clouds';
    }
    else if(val == 803) {
        document.body.className = 'broken-clouds';
    }
    else if(val == 804) {
        document.body.className = 'overcast';
    }

    //Clothing Recommendation

    let weatherMain = data.weather[0].main;
    let intTemp = parseInt(data.main.temp);
    
        if(weatherMain == "Clear" || weatherMain == "Clouds"){
            if ((units == "imperial" && intTemp>80) || (units == "metric" && intTemp > 26)) {
                document.getElementById("figure").src = "figure/hot.png";
            }
            else if((units == "imperial" && intTemp>60) || (units == "metric" && intTemp > 16)){
                document.getElementById("figure").src = "figure/warm.png";
            }
        }
        if(weatherMain == "Thunderstorm" || weatherMain == "Drizzle" || weatherMain == "Rain"){
            document.getElementById("figure").src = "figure/rain.png";
        }
        if(weatherMain != "Thunderstorm" && weatherMain != "Drizzle" && weatherMain != "Rain"){
            if((units == "imperial" && intTemp < 30) || (units == "metric" && intTemp < -1)){
                document.getElementById("figure").src = "figure/freezing.png";
            }
            else if((units == "imperial" && intTemp < 40) || (units == "metric" && intTemp < 4)){
                document.getElementById("figure").src = "figure/cold.png";
            }
            else if ((units == "imperial" && intTemp <= 60) || (units == "metric" && intTemp <= 16)) {
                document.getElementById("figure").src = "figure/chilly.png";
            } 
        }
}

function xmlRequest(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            callback(xmlhttp.responseText);
    }
    xmlhttp.open("GET", url, true); 
    xmlhttp.send();
}
