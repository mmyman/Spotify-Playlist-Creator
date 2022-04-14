import React, { Component } from 'react';
import { Slider } from '@mui/material';

class MySlider extends Component {
    render() { 
        return (
            <div className={this.props.name} style={{width:300, margin:30}}>
            <h1>{this.props.name}</h1>
            <Slider
                value={this.props.val}
                onChange={this.props.onChange}
                valueLabelDisplay='auto'
            />
            </div>
            );
    }
}
 
export default MySlider;