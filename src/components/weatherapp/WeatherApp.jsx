import './weatherapp.css'
import { useState , useRef, useEffect } from "react"

// import random from '../../Img_icons/w1.png'
import Windicon from  '../../Img_icons/wind.png'
import Humiicon from  '../../Img_icons/w3.png'
import Rainicon from  '../../Img_icons/w5.png'

// Weather Temperture Vise Images

import Snow from  '../../assets/extremlysnow.png'
import Foogy from  '../../assets/foogychilly.png'
import CPresent from  '../../assets/cloudypresent.png'
import CWarn from'../../assets/cloudywarn.png'
import Sun from'../../assets/sun.png'

const weatherImg = [Snow, Foogy, CPresent, CWarn, Sun]
// console.log(weatherImg);



function WeatherApp (){
  
 let inputRef = useRef(null)
 const [userValue, setUserValue]   = useState(undefined)           // This State User ki value ka liye
 
 const [weatherVal , setWeatherVal] = useState('')                // This State weather Info Display


   useEffect(() => {

    if(userValue){       // VAlue Hona Compulsary ha

    let apiKey = "a87fdeb939d54a658a1132056251602"
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${userValue}&days=7&aqi=no&alerts=no`)
    .then(responce => responce.json())
    .then((data) => {

     let cityName =    data.location.name;
     let temperature = Math.round(data.current.temp_c);
     let wCondition =  data.current.condition.text;
     let imgIndex ;
     let wind =        Math.round(data.current.wind_kph)
     let humidity =    Math.round(data.current.humidity)
     let rain =        Math.round(data.forecast.forecastday[0].day.daily_chance_of_rain)
    
//  temperatue ko dekh ka  img index ka imgArray ka koi aik number store kr rha

 if(temperature > -20 && temperature <= 10){            // Cold Pic
   imgIndex = 1
 }
 else if(temperature > 10 && temperature <= 15){      // Foggiy Chillly Pic
   imgIndex = 2 
 }
 else if(temperature > 15 && temperature <= 25){        // Cloudy Pleasent Pic
   imgIndex = 3
 }
 else if(temperature > 25 && temperature <= 35){         // Party cloudy Warm Pic
   imgIndex = 4
 }
 else if(temperature > 35){                              // Sunny Hot Pic
   imgIndex = 5
 }
console.log(cityName);

//    STATE OBJECT CHANGED 

setWeatherVal(
   {                         /// <-------   STATE KO CHANGE KR RHA AIS OBJECT KI PROPERTY VALUE SAME HA     ------->
       cityName    : cityName,
       temperature : temperature,
       wCondition  : wCondition,
       imgIndex    :  imgIndex,
       wind        : wind,
       humidity    : humidity,
       rain        : rain
   })
  
 
 console.log(weatherVal.cityName);
  

})
    .catch(error => console.error(`Error ${error}`));

}},[userValue])

    return(
     <div className='Weather-main'>
      <div className='input-div'>
          <input type="text" id='input' ref={inputRef} />
          <i className="fas fa-search" onClick={() => {setUserValue(inputRef.current.value)}}></i>
      </div>
     {weatherVal.cityName && (
      <>
            <div className="allinfo-about-input-value">
                <h2>{weatherVal.cityName}</h2>
                <h1>{weatherVal.temperature}゜</h1>
                <p>{weatherVal.wCondition}</p>
                <img src={weatherImg[weatherVal.imgIndex - 1]} alt="weathericon" />
            </div>
            <div className="weatherinfo-allofthes">

               <div className="spped-box" id='wind-box'>
                <img src={Windicon} alt="windspeedIcon" />
                <h2>{weatherVal.wind}M/s</h2>
                <p>Wind</p>
               </div>
               <div className="spped-box" id='Humidity-box'>
                <img src={Humiicon} alt="windspeedIcon" />
                <h2>{weatherVal.humidity}%</h2>
                <p>Humidity</p>
               </div>
               <div className="spped-box" id='Rain-box'>
                <img src={Rainicon} alt="windspeedIcon" />
                <h2>{weatherVal.rain}%</h2>
                <p>Rain</p>
               </div>
            </div>
       </>     
     )}

     </div>
    )

}
export default WeatherApp