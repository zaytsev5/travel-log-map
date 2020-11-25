import React, { useState, useEffect } from 'react';
import {
    useParams
  } from "react-router-dom";
import ImageView from './ImageView'

const LogView = (props) =>{
    console.log(props.status);
    console.log(props.userName ? props.userName : 'not authorized');
    const { id } = useParams();
    console.log(id);
    const [log, setLog] = useState([])
    const [loaded, setLoad]  = useState(false)
    const getLog = ()=>{
        setLoad(false)
        console.log("got this far");
        fetch(`http://localhost:3000/log/${id}`)
        .then(log=>log.json())
        .then(log =>{
            console.log(log[0]);
            setLog(log)
        })
        .then(()=>{
            console.log('after');
            setLoad(true)
        })
      //  setLoad(true)
    }
    useEffect(()=>{
        getLog()
       
    },[])
    
    return (
        
        <>
          { loaded ? <ImageView 
                src={log[0].image}
                offShow={props.offShow}
                log={log[0]}
                id={log[0].id}
                uid={props.uid}
                name={props.name}
            /> : ''
          }
        </>
        // <div>
        //    {log.map(e =>(
        //        <p style={{
        //         position: 'absolute',
        //         padding: '10px 10px',
        //          height:'25px',
        //         lineHeight: '50px',
        //         backgroundColor: 'white',
        //         color: 'black',
        //         bottom: '3%',
        //         left: '40%',
        //         textDecoration:'none',
        //         color:'#4267b2'

        //       }}>
        //          {e.comments}
        //        </p>
        //     ))
        // }
        
            
        // </div>
    )
}

export default LogView;