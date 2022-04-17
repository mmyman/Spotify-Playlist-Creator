import React, { useState } from 'react';
import MySlider from './mySlider';
import { Button } from '@mui/material';
function CreatePlaylistButton(){
    const [danceVal,setDance]=useState(100)
    const [speechVal,setSpeech]=useState(100)
    const [instVal,setInst]=useState(100)
    const [happyVal,setHappy]=useState(100)
    const [energyVal,setEnergy]=useState(100)
    const updateDance=(e,data) =>{
        setDance(data)
    }
    const updateSpeech=(e,data) =>{
        setSpeech(data)
    }
    const updateInst=(e,data) =>{
        setInst(data)
    }
    const updateHappy=(e,data) =>{
        setHappy(data)
    }
    const updateEnergy=(e,data) =>{
        setEnergy(data)
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
                    let url = 'http://localhost:5000/create-playlist?&maxDance='+danceVal+'&maxSpeech='+speechVal+'&maxInst='+instVal+'&maxHappy='+happyVal+'&maxEnergy='+energyVal+'&auth='+localStorage.getItem('token')
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.send()
                 }}
                color='secondary'
                variant='contained'>
                Calculate Playlist
                </Button>
            </div>
            
        );
}

export default CreatePlaylistButton;