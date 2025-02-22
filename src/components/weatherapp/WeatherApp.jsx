  import { useState , useRef, useEffect } from "react"
import './weatherapp.css'

// import random from '../../Img_icons/w1.png'
import Windicon from  '../../assets/Img_icons/wind.png'
import Humiicon from  '../../assets/Img_icons/w3.png'
import Rainicon from  '../../assets/Img_icons/w5.png'

// Weather Temperture Vise Images

import Snow from    '../../assets/extremlysnow.png'
import Foogy from   '../../assets/foogychilly.png'
import CPresent from  '../../assets/cloudypresent.png'
import CWarn from   '../../assets/cloudywarn.png'
import Sun from    '../../assets/sun.png'

const weatherImg = [Snow, Foogy, CPresent, CWarn, Sun]

import fetchApi from "../../services/fetchUtil"
import { data } from "react-router-dom"


function WeatherApp (){

  const [userValue, setUserValue]   = useState(null)                       // This State User ki value ka liye
  let inputRef = useRef(null)                                              // This Ref is Input se Value lane ka liye
  const [weatherVal , setWeatherVal] = useState(null)                        // This State weather Info Display
  const [errMsg , setErrMsg] = useState(false)                             // This State ERROR  Handle krne ka liye
  console.log(userValue);
                               

  //  SEARCH WEATHER FUNCTION USERVALUE KI STATE CHANGE KR RHA BUS

function searchWeather(){
     setUserValue(inputRef.current.value)
}

 //  <-------------   CALL FETCH API FUNCTION THAT RETURN A API RESPONCE   OBJECT || ERROR ------------>

useEffect(() => {

  if(userValue){          // AGR USER NE VALUE DII TO HE FETCH API CALL HO 
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=a87fdeb939d54a658a1132056251602&q=${userValue}&days=7&aqi=no&alerts=no`;
    let funcReturn = fetchApi(apiUrl)     // Call the Api Function
      .then(data => {  
     //   ye data ka andr buht sari chezze ha ais ma se kuch chheze nikl kr setWeather ki state ko changed kr rha
   
    let nWeatherInfo = {                        
      cN    : data.location.name,
      t : Math.round(data.current.temp_c),
      wC  : data.current.condition.text,
      imgIndex: undefined,
      wd        : Math.round(data.current.wind_kph),
      hdty    : Math.round(data.current.humidity),
      r        : Math.round(data.forecast.forecastday[0].day.daily_chance_of_rain)
  }
   
//  temperatue ko dekh ka  img index ka imgArray ka koi aik number store kr rha

if(nWeatherInfo.t > -20 && nWeatherInfo.t <= 10){            // Cold Pic
  nWeatherInfo.imgIndex = 1
}
else if(nWeatherInfo.t > 10 && nWeatherInfo.t <= 15){      // Foggiy Chillly Pic
  nWeatherInfo.imgIndex = 2
}
else if(nWeatherInfo.t > 15 && nWeatherInfo.t <= 25){        // Cloudy Pleasent Pic
  nWeatherInfo.imgIndex = 3
}
else if(nWeatherInfo.t > 25 && nWeatherInfo.t <= 35){         // Party cloudy Warm Pic
  nWeatherInfo.imgIndex = 4
}
else if(nWeatherInfo.t > 35){                              // Sunny Hot Pic
  nWeatherInfo.imgIndex = 5
}

setWeatherVal(nWeatherInfo)       //    WEATHER STATE CHANGED 
setErrMsg(false)                  //    ERROR STATE CHANGED 

})   
.catch((error) => {
  // console.error(error);
    setErrMsg(true)              // ERROR STATE CHANGED     ====> TRUE MSG SHOW HOJAI 
    setWeatherVal(undefined)     // WEATHER STATE CHANGED   ====>  UNDEFINED TAKA KUCH NA DEKHE WEATHER KI INFO KA REALTED

})
}

}, [userValue])       // DEPENDENCY ARRAY MA JO USERVALUE STATE MA INPUT KI VALUE STORED HA


    return(
     <div className='Weather-main'>

       {/* <--------------- INPUT DIV HERE -----------> */}

      <div className='input-div'>
          <input
           type="text"
           id='input'
           ref={inputRef}
           onKeyUp={(event) => event.key === 'Enter' ? searchWeather() : ''}
          />
          <i className="fas fa-search" onClick={searchWeather}></i>
      </div>

      {/* <------ ERROR MSG SHOW HERE AGR TRUE HOA TO SHOW HOGA OTHERWISE NO --------> */}                          

      {errMsg ? <p className='ErrMSG'>Invalid Name Not Found Try Again...</p>  : ''} 

      { /* <------ WEATHER INFO SHOW HERE AGR WEATHER HA TO SHOW HOGA OTHERWISE NO --------> */}                          

      {weatherVal &&(         
      <>
            <div className="allinfo-about-input-value">
                <h2>{weatherVal.cN}</h2>
                <h1>{weatherVal.t}゜</h1>
                <p>{weatherVal.wC}</p>
                <img src={weatherImg[weatherVal.imgIndex - 1]} alt="weathericon" />
            </div>
            <div className="weatherinfo-allofthes">

               <div className="spped-box" id='wind-box'>
                <img src={Windicon} alt="windspeedIcon" />
                <h2>{weatherVal.wd}M/s</h2>
                <p>Wind</p>
               </div>
               <div className="spped-box" id='Humidity-box'>
                <img src={Humiicon} alt="windspeedIcon" />
                <h2>{weatherVal.hdty}%</h2>
                <p>Humidity</p>
               </div>
               <div className="spped-box" id='Rain-box'>
                <img src={Rainicon} alt="windspeedIcon" />
                <h2>{weatherVal.r}%</h2>
                <p>Rain</p>
               </div>
            </div>
       </>     
      )}

     {/* <------------- END HERE   -----------> */}
     </div>
    )

}
export default WeatherApp