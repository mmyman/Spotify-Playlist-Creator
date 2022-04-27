import React, { Component } from 'react';
import { Slider } from '@mui/material';
import './sliderName.css'
import './sliderDiv.css'
class MySlider extends Component {
    render() { 
        return (
            <div className= 'slider' >
                <h1 className="sliderName" style={{margin: 10}}>{this.props.name}</h1>
                <Slider
                    sx = {{mx: 20, width:75/100}}
                    value={this.props.val}
                    onChange={this.props.onChange}
                    valueLabelDisplay='auto'                
                />
            </div>
            );
    }
}

//padding:20 ,marginLeft:200, marginRight:200, marginTop:20, marginBottom:20
export default MySlider;