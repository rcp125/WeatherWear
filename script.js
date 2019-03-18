const appKey = "f855d9e0767361072b8bc158517ccef0";

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
}

function changeFaren(){
    units = "imperial";
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

var appendOnce = true;

function mainFunction(response) {
    WeatherWear.style.display = "none";
    let data = JSON.parse(response);
    city.innerHTML = data.name;
    description.innerHTML = data.weather[0].description;
    if(units == "metric"){
        temperature.innerHTML = parseInt(data.main.temp) + "° C";
        urlBuilder();
    }
    else{
        temperature.innerHTML = parseInt(data.main.temp) + "° F";
        urlBuilder();
    }    
    // Background Selector
    let val = parseInt(data.weather[0].id);
    if((val >= 200 && val <= 232)) {
        document.body.className = 'storm-rain';
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
    
    if(appendOnce){
        if(weatherMain == "Clear"){
            var node = document.createElement("LI");
            var textnode = document.createTextNode("The sky is clear.");
            node.appendChild(textnode);
            document.getElementById("what-to-wear").appendChild(node);
        }
        if(weatherMain == "Clouds"){
            var node = document.createElement("LI");
            var textnode = document.createTextNode("It's cloudy. You might want to wear a light jacket.");
            node.appendChild(textnode);
            document.getElementById("what-to-wear").appendChild(node);
        }
        if(weatherMain == "Thunderstorm"){
            var node = document.createElement("LI");
            var textnode = document.createTextNode("Watch out for lightning. Stay away from metal.");
            node.appendChild(textnode);
            document.getElementById("what-to-wear").appendChild(node);
        }
        if(weatherMain == "Drizzle" || weatherMain == "Rain"){
            var node = document.createElement("LI");
            var textnode = document.createTextNode("It's raining. Grab an umbrella and a raincoat.");
            node.appendChild(textnode);
            document.getElementById("what-to-wear").appendChild(node);
        }
        if(weatherMain == "Snow"){
            var node = document.createElement("LI");
            var textnode = document.createTextNode("It's snowing. Grab a heavy winter jacket and stay warm.");
            node.appendChild(textnode);
            document.getElementById("what-to-wear").appendChild(node);
        }
        if(units == "imperial" && intTemp < 40){
            var node = document.createElement("LI");
            var textnode = document.createTextNode("Brrr. It's cold. Better grab a winter coat.");
            node.appendChild(textnode);
            document.getElementById("what-to-wear").appendChild(node);
        }
        if(units == "imperial" && (intTemp >= 40 && intTemp < 65)){
            var node = document.createElement("LI");
            var textnode = document.createTextNode("The temperature outside is moderate but you might want a light jacket.");
            node.appendChild(textnode);
            document.getElementById("what-to-wear").appendChild(node);
        }
        if(units == "imperial" && (intTemp >= 65 && intTemp < 80)){
            var node = document.createElement("LI");
            var textnode = document.createTextNode("It's warm outside, woohoo. Just a long sleeves shirt or a t-shirt will suffice");
            node.appendChild(textnode);
            document.getElementById("what-to-wear").appendChild(node);
        }
        if(units == "imperial" && intTemp >= 80){
            var node = document.createElement("LI");
            var textnode = document.createTextNode("It's hot outside. Grab some sunscreen and wear a t-shirt.");
            node.appendChild(textnode);
            document.getElementById("what-to-wear").appendChild(node);
        }

        appendOnce = false;
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