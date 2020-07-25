import React, { Component , useState, useEffect} from 'react';

const User = ({userName,url}) =>{
    // const handleClick = ()=>{
    //     fetch('http://localhost:3000/logout')
    //     .then(res => res.json())
    //     .then(res => window.location = window.location)
        
    // }
    const [hover, setHover] = useState(false)
    const handleHover = () =>{
        setHover(!hover)
    }
    return (
        <div
           
         >
            < a className="user-image"
                href='http://localhost:3000/logout'
                style={{
                    position: 'absolute',
                    padding: '5px 10px',
                    height:'35px',
                    lineHeight: '35px',
                    borderRadius: '3px',
                    backgroundColor: 'white',
                    color: 'black',
                    bottom: '5%',
                    left: '5%',
                    textDecoration: 'none',
                    display:'grid',
                    justifyContent: "center", 
                    alignItems: 'center'


                }}
                title="Log out"
                
            ><img src={url} 
                    onMouseOver={() => handleHover()}
                    onMouseOut={()=>handleHover()}
                    style={{
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%'
            }} />
            {/* <span 
                style={{
                    color:'#4267b2',
                    height:'25px',
                    marginLeft:'10px',
                    marginBottom:'50px'
                }}
            >{userName}</span> */}
            </a>
        </div>
    )
}

export default User;