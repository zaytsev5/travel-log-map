import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup} from 'react-map-gl';
import { showAuthWindow } from './actions/userActions'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import ImageView from './components/ImageView';
import AddBox from './components/AddBox'
import User from './components/User'
import Processing from './components/Processing'
import Direction from './components/Direction'
import Clock from './components/Clock'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {userLogin, userLogout} from './actions/userActions';






const Mapbox = (props) => {
  
  let { id } = useParams()
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [isShown , setShow] = useState(id ? parseInt(id) : 0)
  const [isAdd, setAdd] = useState(false)
  const [point, setPoint] = useState(false)
  const [pos, setPos] = useState({})
  const [user, setUser] = useState(false)
  const [load, setLoad] = useState(false)
  const [logged, setLogged] = useState({})
  const [hint, setHint] = useState(false)


  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 10.7781128,
    longitude: 106.65325,
    zoom: 12
  });

  const getLocation = ()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      alert("Geolocation is not supported by this browser.")
    }
  }
  
  const showPosition = (position) => {
    setViewport({
      width: '100vw',
      height: '100vh',
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      zoom:12
    })
  }

  const getUser = () => {
    console.log("in getUser()");
    fetch("http://localhost:3000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
      console.log("in then1");

        getEntries()
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        setLogged(responseJson.user)
        setUser(true)
      
      })
      .catch(error => {
        setLogged(false)

      });
      
  }
  
  const getEntries = async () => {
    const response = await fetch('http://localhost:3000/api/logs')
    const result = await response.json()
    // setLogEntries(result)
    console.log(result);
    setLogEntries(result);
    setLoad(true)
    //setUser(result)
    
  };
  

  
 


  useEffect( () => {
    if (window.location.hash === "#_=_"){
      window.history.replaceState 
          ? window.history.replaceState(null, null, window.location.href.split("#")[0])
          : window.location.hash = "";
    }
   
    // getUser()
    props.userLogin()
    getEntries()
    setUser(true)
    // console.log(props.user_info);
  }, []);

  const onClick = (e) => {
    const newVewport = {
      ...viewport,
      latitude: e.lngLat[1],
      longitude: e.lngLat[0]
    };
    setPos({ lng: e.lngLat[0], lat: e.lngLat[1] })
    console.log(isAdd);
    if (isAdd) setPoint(true)
  
    setViewport(newVewport);
  };
  
  const onDblClick = e => {

    console.log('A click event has occurred at ' + e.lngLat[0]);

  };

  const PlusIcon = ({handleClick,value}) =>{
   
    const divStyle  = {
      position:'absolute',
      margin:'15px 15px',
      zIndex:'500',
     
    }
    const divStyle1  = {
      position:'absolute',
      margin:'10px 15px',
      zIndex:'500',
      animation:'App-logo-spin 0s',
      animationFillMode: 'forwards',
      

    }
    return (
      <div style={value ? divStyle1 : divStyle} onClick={()=>handleClick(!value)}> 
        <svg
                  className="marker white"
                  style={{
                    height: `${3 * 12}px`,
                    width: `${3 * 12}px`,
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path style={{fill:'white'}} d="m272 184c-4.417969 0-8-3.582031-8-8v-176h-80v176c0 4.417969-3.582031 8-8 8h-176v80h176c4.417969 0 8 3.582031 8 8v176h80v-176c0-4.417969 3.582031-8 8-8h176v-80zm0 0"/>
                    </g>
                  </g>
                </svg>
      </div>
    )
  }
  const Point = ({pos}) =>{
  
    return (
      <div 
        style={{
          position: 'absolute',
          padding: '2px 7px',
          height: '15px',
          lineHeight: '15px',
          borderRadius: '3px',
          backgroundColor: 'white',
          color: 'black',
          top: '2%',
          left: '5%',

        }}>
      
       {pos.lng.toFixed(6)} - {pos.lat.toFixed(6)}
      </div>
    )
  }
 
  return (  
    <ReactMapGL
  
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
  
      mapboxApiAccessToken={'pk.eyJ1IjoiemF5dHNldjUiLCJhIjoiY2tjaWk4cnc2MGtiMDJxazJwMGllOThlNyJ9.HciILC1tn3zdsXCuvzdRog'}
      onViewportChange={setViewport}
      doubleClickZoom={false}
      onDblClick={onClick}
      scrollZoom={isShown ? false : true}
      onClick={(e) => onDblClick(e)}
      {...viewport}
    >
      
      <>
        <PlusIcon handleClick={(val) => setAdd(val)} value={isAdd} />
        {
          isAdd && <AddBox reload={()=>getEntries()} logged={Object.keys(props.user_info).length > 0 ? true : false} name={props.user_info.displayName}/>
        }

      </>
      <>
        {
          point && <Point pos={pos} />
        }
      </>

      {
        !load && <Processing />
      }
      {
        logEntries.map(entry => (
          <React.Fragment key={entry.id}>
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
            >
              <div
       
                onClick={() => setShowPopup(entry.id)}
                style={{
                  
                  cursor:'pointer'
                }}
              >
                <svg
                  className="marker white"
                  style={{
                    height: `${3 * viewport.zoom}px`,
                    width: `${3 * viewport.zoom}px`,
                    cursor: 'pointer'
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                    <path style={{fill:'white'}} d="M184.08,0c-74.992,0-136,61.008-136,136c0,24.688,11.072,51.24,11.536,52.36c3.576,8.488,10.632,21.672,15.72,29.4
                        l93.248,141.288c3.816,5.792,9.464,9.112,15.496,9.112s11.68-3.32,15.496-9.104l93.256-141.296
                        c5.096-7.728,12.144-20.912,15.72-29.4c0.464-1.112,11.528-27.664,11.528-52.36C320.08,61.008,259.072,0,184.08,0z
                        M293.8,182.152c-3.192,7.608-9.76,19.872-14.328,26.8l-93.256,141.296c-1.84,2.792-2.424,2.792-4.264,0L88.696,208.952
                        c-4.568-6.928-11.136-19.2-14.328-26.808C74.232,181.816,64.08,157.376,64.08,136c0-66.168,53.832-120,120-120
                        c66.168,0,120,53.832,120,120C304.08,157.408,293.904,181.912,293.8,182.152z"/>
                    <path style={{fill:'white'}} d="M184.08,64.008c-39.704,0-72,32.304-72,72c0,39.696,32.296,72,72,72c39.704,0,72-32.304,72-72
                        C256.08,96.312,223.784,64.008,184.08,64.008z M184.08,192.008c-30.872,0-56-25.12-56-56s25.128-56,56-56s56,25.12,56,56
                        S214.952,192.008,184.08,192.008z"/>
                    </g>
                  </g>
                </svg>
              </div>
            </Marker>
            {
              showPopup == entry.id ? (
                <Popup
                  className="mu-popup"
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className="asdsa-apopup" style={{ width: '210px', fontSize: '12px', zIndex: '99', position: 'relative', zIndex: '300' }}>
                    <h2>{entry.title}</h2>
                    <p><strong style={{fontSize:'15px'}}>{entry.comments}</strong></p>
                    <p><strong>Author</strong> - {entry.author}</p>
                    <p><strong>Visited on:</strong> {new Date(entry.visitDate).toLocaleDateString()}</p>
                    {
                      entry.image &&
                      <Router>
                        <Link to={`/log/${entry.id}`}>

                          <p onClick={() => setShow(entry.id)}><img
                            src={entry.image}
                            alt={entry.title}
                            width='210px' height='100px'
                            title="Zoom in"
                          />
                          </p>
                        </Link>
                      </Router>
                    }
                    {entry.image && 
                      <Router>
                        <Link to={`${entry.id}`}>
                        </Link>
                      </Router>
                      
                    }
                  </div>
                </Popup>
              ) : null
            }
            {
              isShown == entry.id ? (
              <ImageView 
                src={entry.image} 
                id={entry.id} 
                uid={props.user_info.id || ''} 
                name={props.user_info.displayName || ''}
                log={entry} 
                offShow={(val) => setShow(val)}
                url={Object.keys(props.user_info).length > 0 ? props.user_info.photos[0].value : ''} />
              ) :  null
            }
            { Object.keys(props.user_info).length > 0 ? <User url={props.user_info.photos[0].value} userName={props.user_info.displayName}/> : 
              <div className="login">
                < div
                  href='http://localhost:3000/auth/facebook'
                  style={{
                    position: 'absolute',
                    padding: '5px 10px',
                    lineHeight: '25px',
                    borderRadius: '3px',
                    backgroundColor: 'white',
                    color: 'black',
                    bottom: '5%',
                    left: '5%',
                    textDecoration:'none',
                    color:'#4267b2'

                  }}
                  onClick ={() =>{ showAuthWindow({
                    path: "http://localhost:3000/auth/facebook",
                    callback: function(){
        
                       window.location.reload()
                    }
                })}}

                >Login with facebook</div>
              </div>
            }
            <div onClick={()=>setHint(true)} >
                <p 
                  href='http://localhost:3000/auth/facebook'
                  style={{
                    position: 'absolute',
                    padding: '1px 10px',
            
                    lineHeight: '25px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    color: 'black',
                    bottom: '3%',
                    left: '1%',
                    textDecoration:'none',
                    color:'#4267b2'
                  }}
                >
                  ?
                </p>
              </div>
              {hint && <Direction off={(val)=>setHint(val)}/>}
              <Clock />
          </React.Fragment>
        ))
      }
     
    </ReactMapGL>
    
  );
}

Mapbox.propTypes = {
  userLogin: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  user_info: PropTypes.object,
  // newPost: PropTypes.object
};

const mapStateToProps = state => ({
  user_info: state.data.user,
  message: state.data.message
});
export default connect(mapStateToProps, {userLogin, userLogout})(Mapbox);