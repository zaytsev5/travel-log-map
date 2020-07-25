import React, { useState, useEffect } from 'react';
import {
    useParams
  } from "react-router-dom";

const LogView = (props) =>{
    console.log(props.userName ? props.userName : 'not authorized');
    const { id } = useParams();
    console.log(id);
    const [log, setLog] = useState([])
    const getLog = ()=>{
        fetch(`http://localhost:3000/log/${id}`)
        .then((log)=>{
            if (log.status === 200) return log.json();
        throw new Error("failed to authenticate user");
        })
        .then(log =>{
            console.log(log);
            setLog(log)
        })
    }
    useEffect(()=>{
        getLog()
    },[])
    
    return (
        <div>
           {log.map(e =>(
               <p style={{
                position: 'absolute',
                padding: '10px 10px',
                 height:'25px',
                lineHeight: '50px',
                backgroundColor: 'white',
                color: 'black',
                bottom: '3%',
                left: '40%',
                textDecoration:'none',
                color:'#4267b2'

              }}>
                 {e.comments}
               </p>
            ))
        }
        
            
        </div>
    )
}

export default LogView;