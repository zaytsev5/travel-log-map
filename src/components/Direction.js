import React, { Component } from 'react';


class Direction extends Component {
    render() {
        return (
            <div
                onClick ={()=>this.props.off(false)}
                style={{
                position:'relative',
                textAlign:'center',
                zIndex:'2000',
                width:'100%',
                height:'100%',
                backgroundColor: 'rgb(0,0,0)', /* Fallback color */
                backgroundColor: 'rgba(0,0,0,0.7)', /* Black w/ opacity */
               
            }}>
               <div
                style={{
                    position:'absolute',
                    zIndex:'2000',
                    margin:'20% 50%',
                    transform:'translate(-50%,-30%)',
                    width:'30%',
                    height:'30%',
                    backgroundColor: 'white', /* Fallback color */
                    borderRadius:'4px',
                    display:'grid',
                    justifyItems:'center',
                    alignContent:'center',
                    padding:'10px',
                    boxShadow:'10px 5px 20px 5px gray'
             
                }}>
                    <p>How to use this app</p>
                    <p>Click mouse to JUMP to this location</p>
                    <p>Double click mouse to SHOW LOCATION (enabled when adding)</p>
                    <p>Scroll to ZOOM in/out </p>

               </div>
            </div>
        );
    }
}

export default Direction;