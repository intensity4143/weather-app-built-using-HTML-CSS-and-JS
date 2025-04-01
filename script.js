const input = document.getElementById('input-city')
const button = document.getElementById('search-button')
const region = document.getElementById('region')
const icon = document.getElementById('icon')
const situation = document.getElementById('text')
const day = document.getElementById('day')
const temperature = document.getElementById('temp')
const wind_speed = document.getElementById("wind-speed")
const humidity= document.getElementById("humidity")
const cloud= document.getElementById("cloud")
const wind_Dir= document.getElementById("windDir")
const pressure= document.getElementById("pressure")
const precipitation= document.getElementById("preci")
const myLocationBtn = document.getElementById('myLocation')
let latitude,longitude

let tempLeft = document.getElementById('temp-slide')
let windLeft = document.getElementById('wind-slide')
let pressureLeft = document.getElementById('pressure-slide')
let preciLeft = document.getElementById('preci-slide')


// fetching data using city name
async function getData(cityName) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=81c0f7320f3249c7886132735252302&q=${cityName}&aqi=yes`)
    return await response.json()
}
// ----------------- Calculating local Date, Day, Month Name-----------------------------------
// day calculator function
function callDay(inputDate){
    const date  = new Date(inputDate)

    const week = ["Sunday", "Monday" ,"Tuesday","Wednesday","Thursday","Friday","Saturday"]

    const day = date.getDay()
    return week[day]
}
// month calculator function
function callMonth(inputDate){
    const date  = new Date(inputDate)

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = months[date.getMonth()];
    // console.log(monthName); // Example: "April"
    return monthName
}

//------------------------------ updating data in UI ---------------------------------
function setData(data) {    
    latitude = data.location.lat
    longitude = data.location.lon

    // setting data to localStorage
    localStorage.setItem("lat",latitude)
    localStorage.setItem("long",longitude)

    // console.log("set data", latitude, longitude)

    // updating region
    region.innerText = `${data.location.name},${data.location.region} - ${data.location.country}`                                        

    // updating icon dynamically
    icon.src = data.current.condition.icon   

    // updating day, Month, Date 
    const localDay = callDay(data.location.localtime.slice(0,10))        
    const localMonth = callMonth(data.location.localtime.slice(0,10))  
    const localDate = data.location.localtime.slice(9,10)
    day.innerText = `${localDay} ${localDate} ${localMonth} `                
    
    // updtaing temp based on selected units
    let tempPos = getComputedStyle(tempLeft).left
    temperature.innerHTML = (tempPos == "0px")?`${data.current.temp_c}&deg;C`: `${data.current.temp_f}&deg;F`     
    
    // updating situation
    situation.innerText = data.current.condition.text      

    // updating windspeed based on selected units
    let windPos = getComputedStyle(windLeft).left
    wind_speed.innerText =(windPos == "0px")? `${data.current.wind_mph} mph`:`${data.current.wind_kph} kph`     

    // updating humidity
    humidity.innerText = `${data.current.humidity}%`  
    
    // updating cloudpercentage
    cloud.innerText = `${data.current.cloud}%`        

    // updating wind direction
    wind_Dir.innerText = data.current.wind_dir
    
    // updating pressure based on selected units
    let pressurePos = getComputedStyle(pressureLeft).left
    pressure.innerText = (pressurePos == "0px")? `${data.current.pressure_mb} hPa`:`${data.current.pressure_in} inHg`
    
    // updating precipitation based on selected units
    let precipPos = getComputedStyle(preciLeft).left
    precipitation.innerText = (precipPos == "0px")? `${data.current.precip_mm} mm`:`${data.current.precip_in} in`

}

// ------------------------------ search button trigger -----------------------------------
button.addEventListener('click',async(e)=>{
    const cityName = input.value
    const data = await getData(cityName)
    setData(data)
})


//------------------------ fetching data using latitude and longitude(current location)----------
async function getCurrData(lat,long) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=81c0f7320f3249c7886132735252302&q=${lat},${long}&aqi=yes`)
    
    // if response if like 404 or any other error
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    return await response.json()
   } catch (error) {
    console.log("error while fetching data")
   }
}

//-------------------------- Current Location weather ------------------------

async function location_access(position){
    // calculating users current Location
    latitude = position.coords.latitude
    longitude = position.coords.longitude

    // setting data to localStorage
    localStorage.setItem("lat",latitude)
    localStorage.setItem("long",longitude)

    const data = await getCurrData(latitude,longitude)
    setData(data)
}

function failed_access(){
    console.log("unable to access current location")
}
// gets the current location of the user
function getLocation(){
    navigator.geolocation.getCurrentPosition(location_access,failed_access)
}
getLocation()


// ------------------------------ map icon trigger -----------------------------------
document.getElementById("map-icon").addEventListener("click", async () => {
    initMap()
    // changing display setting
    document.getElementById('home-container').style.display = "none"
    document.getElementById('map-container').style.display = "block"
    document.getElementById('setting-c').style.display = "none"
    console.log("chaged display")
    
});


// ------------------------------ home icon trigger -----------------------------------
document.getElementById('home-icon').addEventListener("click",()=>{
    document.getElementById('home-container').style.display = "block"
    document.getElementById('map-container').style.display = "none"
    document.getElementById('setting-c').style.display = "none"
    
})


// ------------------------------ myLocation icon trigger -----------------------------------
document.getElementById("myLocation").addEventListener('click',getLocation)
