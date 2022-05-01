import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

function NameEntry(props){

        return (
            <TextField 
            id="outlined-basic" 
            label="Name Your Playlist" 
            variant="outlined" 
            value= {props.val}
            onChange= {props.onChange}
            color='primary'
            style={{
                backgroundColor: "#181818"
            }}
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