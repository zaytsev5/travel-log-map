import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return (
            <div
            style={{
                textAlign:'center',
                fontSize:'14px'
            }}>
                <p>Loading comments...</p>
            </div>
        );
    }
}

export default Loading;