import React, { Component } from 'react';
import Test from './test.js'

class App extends Component {
    constructor(){
        super()
        this.state = {
            isShown : true
        }
        
    }
    handleShow = () => {
        this.setState({isShown: !this.state.isShown})
    }
    render() {
        return (
            <div>
                {
                    this.state.isShown 
                    ? <div>IS SHOWN</div>
                    : ""
                }
                <button onClick={this.handleShow} >click me to show</button>
                <Test /> 
            </div>
        );
    }
}

export default App;