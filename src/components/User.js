import React, { Component, useState, useEffect } from 'react';
import 'antd/dist/antd.css'
import { Popover } from 'antd';

const User = ({ userName, url }) => {
    const [hover, setHover] = useState(false)
    const handleHover = () => {
        setHover(!hover)
    }
    const hoverContent = (
        <div>
            <a style={{
                textDecoration: 'none',
                color:'black'
            }}
                href='http://localhost:3000/logout'>Log out</a>
            <p>Settings</p>
        </div>
    )
    return (
        <div>
        <Popover content={hoverContent} title="Setting account">
            <div className="user-image"
                style={{
                    position: 'absolute',
                    padding: '5px 10px',
                    height: '35px',
                    lineHeight: '35px',
                    borderRadius: '3px',
                    backgroundColor: 'white',
                    color: 'black',
                    bottom: '5%',
                    left: '5%',
                    display: 'grid',
                    justifyContent: "center",
                    alignItems: 'center'


                }}
                title="Log out"

            ><img src={url}
                onMouseOver={() => handleHover()}
                onMouseOut={() => handleHover()}
                style={{
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%'
                }} />
            </div>
        </Popover>
        </div>
    )
}

export default User;