const weatherAPI = {
    baseUrl: '/weather'
}

const searchInputEl = document.getElementById('input-box')

searchInputEl.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        getWeatherReport(searchInputEl.value)

    }
})
async function getWeatherReport(city){
    try {

        const response = await fetch(`${weatherAPI.baseUrl}?city=${encodeURIComponent(city)}`)
        const data = await response.json()

        if(data.error){
            throw new Error(data.error)
        }

        showWeatherReport(data)
        console.log(data)
    } catch (error) {

        console.log('error fetching: ', error)
        document.getElementById('weather-info').innerHTML= `<p>Error Fetching data</p>`
        
    }

}


function showWeatherReport(weather){
    let city_code = weather.city_code
    if(city_code === '400'){
        alert("Enter any city ")
        reset()
    }else if(city_code === '404'){
        alert("Entered city didn't matched")
        reset()
    }else{

        let todayDate = new Date()
        let parent = document.getElementById('parent')
        let weather_body = document.getElementById('weather-info')
      weather_body.innerHTML = 
   ` <div class="weather-container">
        <div class="location-details">
            <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
            <div class="date" id="date">${dateManage(todayDate)}</div>
        </div>
        <div class="weather-status">
            <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C</div>
            <div class="weather" id="weather">${weather.weather[0].main}<i class="${getIconClass(weather.weather[0].main)}"></i></div>
            <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C(min) / ${Math.ceil(weather.main.temp_max)}&deg;C(max)</div>
            <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
        </div>
        <hr/>
        <div class="day-details">
            <div class="basic">Feels Like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}</div>
        </div>

    </div>`;
    parent.append(weather_body)
    reset()
    }


}

function getTime(todayDate){
    let hour = addZero(todayDate.getHours())
    let minutes = addZero(todayDate.getMinutes())
    return `${hour}:${minutes}`

}


function dateManage(dateArg){
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear()
    let month = months[dateArg.getMonth()]
    let date = dateArg.getDate()
    let day = days[dateArg.getDay()]

    return `${date} ${month} (${day}), ${year}`
}

function getIconClass(weatherMain){
    switch(weatherMain){
        case 'Rain': return 'fas fa-cloud-showers-heavy';
        case 'Clouds': return 'fas fa-cloud';
        case 'Clear': return 'fas fa-cloud-sun';
        case 'Snow': return 'fas fa-snowman';
        case 'Sunny': return 'fas fa-sun';
        case 'Mist': return 'fas fa-smog';
        case 'Thunderstrom':  case 'Drizzle' :return 'fas fa-thunderstrom'
        default : return 'fas fa-cloud-sun'
    }
}

function addZero(i){
    if(i < 10){
        return "0" + i
    }
}

function reset(){
    document.getElementById('input-box').value =""
}