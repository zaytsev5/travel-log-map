import React , {useState}from 'react'
import ReactDOM from 'react-dom'
import Mapbox from './App'
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

// mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

// class Application extends React.Component {
//   mapRef = React.createRef();

//   constructor(props) {
//     super(props);
//     this.state = {
//       lng: 109,
//       lat: 10,
//       zoom: 12
//     };
//     this.getPosition = this.getPosition.bind(this)
//   }
  // getPosition(){
  //   var getPosition = function (options) {
  //     return new Promise(function (resolve, reject) {
  //      // navigator.geolocation.getCurrentPosition(resolve, reject, options);
  //      resolve()
  //     });
  //   }
    
  //   getPosition()
  //     .then((position) => {
  //      // 10.7781128,106.6532558
  //       this.setState({
  //         lng: 10.7781128.toFixed(4),
  //         lat: 106.6532558.toFixed(4),
  //         zoom: 12
  //       });
  //       console.log("dfdff")
        
  //     })
  //     .catch((err) => {
  //       console.error(err.message);
  //     });
  // }
//   componentWillMount(){
//     console.log("inside");
//    this.getPosition()
//     //console.log(pos);
//     // this.setState({
//     //   lng: pos.long.toFixed(4),
//     //   lat: pos.lat.toFixed(4),
//     //   zoom: 5
//     // });
//   }
//   componentDidMount() {
//     console.log("later");
//     const { lng, lat, zoom } = this.state;
   
    

//     const map = new mapboxgl.Map({
//       container: this.mapRef.current,
//       style: 'mapbox://styles/mapbox/streets-v9',
//       center: [lng, lat],
//       zoom
//     });

//     map.on('move', () => {
//       const { lng, lat } = map.getCenter();

//       this.setState({
//         lng: lng.toFixed(4),
//         lat: lat.toFixed(4),
//         zoom: map.getZoom().toFixed(2)
//       });
//     });
    
//     map.on('click', function(e) {
//       console.log('A click event has occurred at ' + e.lngLat.toString());
//     });
    
    
     
//   }

//   render() {
//     const { lng, lat, zoom } = this.state;
//     console.log("beign");

//     return (
//       <div>
//         <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
//           <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
//         </div>
//         <div ref={this.mapRef} className="absolute top right left bottom" 
//         style={{
//           height:'400px',
//           cursor:'pointer'
//         }} />
       
//       </div>
//     );
//   }
// }

// ReactDOM.render(<Application />, document.getElementById('root'));
