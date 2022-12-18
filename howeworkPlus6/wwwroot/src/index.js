function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let dayIndex = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[dayIndex];

    return `${day} ${hours}:${minutes}`;
}

var lblDate = document.querySelector("#date");
let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
lblDate.innerHTML = formatDate(new Date());

////////////////////////////////////////////////

let cityInput = document.querySelector("#city-input");

cityInput.addEventListener("change", function (event) {
    document.querySelector("#city").innerHTML = event.target.value;
});

let current = document.querySelector("#current-location-button");
current.addEventListener("click", function (event) {
    navigator.geolocation.getCurrentPosition(function (response) {
        let lat = response.coords.latitude;
        let lon = response.coords.longitude;

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        axios.get(url).then(function (response) {
            //console.log(response.data);
            let temp = Math.round(response.data.main.temp);
            let description = response.data.weather[0].description;
            document.querySelector("#city").innerHTML = response.data.name;
            document.querySelector("#description").innerHTML = `${description}`;
            document.querySelector("#temperature").innerHTML = `${temp} °C`;
            document.querySelector(
                "#humidity"
            ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
            document.querySelector("#wind").innerHTML = `  Wind:${Math.round(
                response.data.wind.speed
            )}km/h`;
        });
    });
});

let form = document.querySelector("#search-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector("#city").innerHTML = cityInput.value;

    showTemp(cityInput.value);
});

function showTemp(city) {
    axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        )
        .then(function (response) {
            // handle success

            let temp = Math.round(response.data.main.temp);
            let description = response.data.weather[0].description;
            console.log(temp);

            document.querySelector("#description").innerHTML = `${description}`;
            document.querySelector("#temperature").innerHTML = `${temp} °C`;
            document.querySelector(
                "#humidity"
            ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
            document.querySelector("#wind").innerHTML = `  Wind:${Math.round(
                response.data.wind.speed
            )}km/h`;
        });
}

////////////////////////////////////////////////
