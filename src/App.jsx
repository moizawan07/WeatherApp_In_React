import { BrowserRouter, Routes , Route } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import WeatherApp from './components/weatherapp/WeatherApp'


function App() {

  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='weather' element={<WeatherApp/>}/>
       </Routes> 
    </BrowserRouter>
  )
}

export default App
