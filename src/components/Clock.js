import React, { useEffect, useState } from 'react';

const Clock  = () =>{
    const [time, setTime] =  useState('')
    const listDate = ['Noday','Monday','Tuesday','Wednesday','Thursday','Fridaty','Saturday','Sunday']
    useEffect(()=>{
        setInterval(() => {
            const today = new Date()
            setTime(`${listDate[today.getDay()]}, ${today.getHours()} : ${today.getMinutes() >= 10 ? today.getMinutes() : '0'+today.getMinutes()} `)
        }, 1000);
    },[])
        return (
            <div
            style={{
                position: 'absolute',
                padding: '5px 10px',
                // height:'25px',
                lineHeight: '25px',
                borderRadius: '3px',
                backgroundColor: 'white',
                color: 'black',
                bottom: '2%',
                right: '2%',
                textDecoration:'none',
               

              }}>
                {time}
            </div>
        )
    
}

export default Clock;