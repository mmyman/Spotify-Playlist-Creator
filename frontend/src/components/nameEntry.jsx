import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './nameEntryStyle.css';
function NameEntry(props){

        return (
            <TextField 
            className = 'inputRounded'
            id="outlined-basic" 
            label="Name Your Playlist" 
            variant="outlined" 
            value= {props.val}
            onChange= {props.onChange}
            color='primary'
            autoComplete='off'
            InputProps={{
                style: {
                    color: "white"
                }
            }}
            InputLabelProps={{
                style: { color: "white" },
              }}
            />

        );
}

export default NameEntry;