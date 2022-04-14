import React, { useState } from 'react';
import MySlider from './mySlider';
import { Button } from '@mui/material';
function CreatePlaylistButton(){
    const [danceVal,setDance]=useState([0,100])
    const [speechVal,setSpeech]=useState([0,100])
    const [instVal,setInst]=useState([0,100])
    const [happyVal,setHappy]=useState([0,100])
    const [energyVal,setEnergy]=useState([0,100])
    const updateDance=(e,data) =>{
        setDance(data)
        console.log(danceVal)
    }
    const updateSpeech=(e,data) =>{
        setSpeech(data)
        console.log(speechVal)
    }
    const updateInst=(e,data) =>{
        setInst(data)
        console.log(instVal)
    }
    const updateHappy=(e,data) =>{
        setHappy(data)
        console.log(happyVal)
    }
    const updateEnergy=(e,data) =>{
        setEnergy(data)
        console.log(energyVal)
    }

        return (
            <div style={{width:300, margin:30}}>
                <MySlider name='Danceability'
                onChange={updateDance}
                val = {danceVal}
                />
                <MySlider name='Speechiness'
                onChange={updateSpeech}
                val = {speechVal}
                />
                <MySlider name='Instrumentalness'
                onChange={updateInst}
                val = {instVal}
                />
                <MySlider name='Happiness'
                onChange={updateHappy}
                val = {happyVal}
                />
                <MySlider name='Energy'
                onChange={updateEnergy}
                val = {energyVal}
                />
                <Button
                 onClick={() => {
                    
                 }}
                color='secondary'
                variant='contained'>
                Calculate Playlist
                </Button>
            </div>
            
        );
}

export default CreatePlaylistButton;