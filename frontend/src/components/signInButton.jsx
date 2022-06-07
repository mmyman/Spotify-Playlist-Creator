import React, {useEffect } from 'react';
import { Button} from'@mui/material'
import './sliderDiv.css'
var redirect_uri = "https://mmyman.github.io/Spotify-Playlist-Creator/"
const BACKEND = "https://spotify-playlist-gener.herokuapp.com/";
const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";

function SignInButton(props){
    
    useEffect(() => {
        if (window.location.search.length > 0){
            handleRedirect();
            
        }
    },[]);

    function handleRedirect(){
        props.pageState(1);
        let code = getCode();
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", BACKEND + "get-token/" + code, true);
        xhttp.onload = function() {
            localStorage.setItem('token',JSON.parse(xhttp.responseText).access_token);
            localStorage.setItem('signIn', 'clicked');
            console.log(localStorage.getItem('token'));

          }
        xhttp.send();
        window.history.pushState("", "", redirect_uri); // remove param from url
    }
    function getCode(){
        let code = null;
        const queryString = window.location.search;
        if ( queryString.length > 0 ){
            const urlParams = new URLSearchParams(queryString);
            code = urlParams.get('code');
        }
        return code;
    } 

        return (
            <div className='logoContainer'>
                <div className='logoNameDiv'>
                    <h1 className='logoNameText'>C</h1>
                    <h1 className='logoNameText'>h</h1>
                    <h1 className='logoNameText'>i</h1>
                    <h1 className='logoNameText'>l</h1>
                    <h1 className='logoNameText'>l</h1>
                    <h1 className='logoNameText'>i</h1>
                    <h1 className='logoNameText'>f</h1>
                    <h1 className='logoNameText'>y</h1>
                </div>
                <button
                onClick={props.onClick}
                className = 'calcButton'
                >
                Sign In
                </button>
            </div>
            
        );
        
}




export default SignInButton;


