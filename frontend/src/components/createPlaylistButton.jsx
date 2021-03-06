import React, {useState } from 'react';
import MySlider from './mySlider';
import { Button } from '@mui/material';
import './sliderDiv.css'
import NameEntry from './nameEntry';
function CreatePlaylistButton(){
    const [danceVal,setDance]=useState(100)
    const [speechVal,setSpeech]=useState(100)
    const [instVal,setInst]=useState(100)
    const [happyVal,setHappy]=useState(100)
    const [energyVal,setEnergy]=useState(100)
    const [updatePage,makeUpdate]=useState(0)
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

    const [textInput, setTextInput] = useState('');

    const handleTextInputChange = (event) => {
        setTextInput(event.target.value);
    };


        return (
            <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat"></link>
            {updatePage === 0 ? 
            <div className='center'>
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
            <div className='buttons'>
                <NameEntry
                onChange = {handleTextInputChange}
                val = {textInput}
                />
            </div>
            
            <div className = 'buttons'>
            <button onClick={() => {
                    let url = 'https://spotify-playlist-gener.herokuapp.com/create-playlist?&maxDance='+danceVal+'&maxSpeech='+speechVal+'&maxInst='+instVal+'&maxHappy='+happyVal+'&maxEnergy='
                        +energyVal+'&auth='+localStorage.getItem('token')+'&name='+textInput;
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.send();
                    makeUpdate(1);
                }}
                className='calcButton'
            >
                Calculate Playlist
            </button>
            </div>
            
    </div> :
        <p className = 'sliderName'>Playlist Created</p>

            }
        </>
        );
}

export default CreatePlaylistButton;