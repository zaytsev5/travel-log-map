import React , {useState}from 'react'
import ReactDOM from 'react-dom'
import Mapbox from './routers'
// import Carousel from '../src/components/Carouse'
 import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import mapboxgl from 'mapbox-gl'
// import {Marker} from 'mapbox-gl'
// import {Popup} from 'mapbox-gl'



ReactDOM.render(
  <React.StrictMode>
    <Mapbox />
  </React.StrictMode>,
  document.getElementById('root')
);
