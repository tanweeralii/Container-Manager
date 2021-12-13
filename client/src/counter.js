import React from 'react'
import {Button} from '@material-ui/core'

export default class Counter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count:0,
        }
    }
    Increase = () => {
        this.setState({count: this.state.count+1});
    }
    Decrease = () => {
        this.setState({count: this.state.count-1});
    }
    render(){
        return(
            <>
            <Button variant="outlined" color="primary" onClick={this.Increase}>Increase</Button>
            <Button variant="outlined" color="secondary" onClick={this.Decrease}>Decrease</Button>
            <h1>{this.state.count}</h1>
            </>
        )
    }
};