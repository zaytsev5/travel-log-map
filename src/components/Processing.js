import React, { Component } from 'react';
import spinner from '../images/spinn.gif'

class Processing extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div
            style={{
                position:'absolute',
                textAlign:'center',
                paddingTop:'10%',
                zIndex:'1000',
                width:'100%',
                height:'100%',
                backgroundColor: 'rgb(0,0,0)', /* Fallback color */
                backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
            }}>
                <img src={spinner} />
            </div>
        );
    }
}

export default Processing;