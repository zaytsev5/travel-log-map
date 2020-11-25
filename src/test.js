import React, { Component } from 'react';

class test extends Component {
    constructor(){
        console.log("render")
        super();
        this.state = {
            count : 10
        }
        this.handleClick = () =>{
            this.setState({count: this.state.count + 1})
        }
    }
    render() {
        console.log("re redner")
        return (
            <div>
                <button onClick={this.handleClick} >Click me</button>
                <div>{this.state.count}</div>
            </div>
        );
    }
}

export default test;