import React, { useState } from 'react';

import { Slider} from '@mui/material'
function MySlider(props) {
    const [val,setVal]=useState([0,100])
    const updateRange=(e,data) =>{
        setVal(data)
    }
        return (
            <div className={props.name} style={{width:300, margin:30}}>
                <h1>{props.name}</h1>
                <Slider
                value={val}
                onChange={updateRange}
                valueLabelDisplay='auto'
                />
            </div>
            
        );
    
}
 
export default MySlider;