import React, { Component } from 'react';
import { Button} from'@mui/material'
var redirect_uri = "http://127.0.0.1:5500/frontend/index.html"
var client_id = "a428d61e295b4760895eba6c441c8f32";
var client_secret = "9196b954bd074c4c8e50aa7c544f3696";
const BACKEND = "http://127.0.0.1:5000/";
const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";

class SignInButton extends Component {
    
    componentDidMount() {
        if (window.location.search.length > 0){
            handleRedirect();
            
        }
    }

    render() { 
        return (
            <div style={{width:300, margin:30}}>
                <Button
                 onClick={() => {
                    window.location.href =" http://127.0.0.1:5000/sign-in";
                 }}
                color='success'
                variant='contained'>
                Sign In
                </Button>
            </div>
            
        );
    }
}

function handleRedirect(){
    let code = getCode();
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", BACKEND + "get-token/" + code, true);
    xhttp.onload = function() {
        localStorage.setItem('token',JSON.parse(xhttp.responseText).access_token);
        console.log(localStorage.getItem('token'))
      }
    xhttp.send()
    window.history.pushState("", "", redirect_uri); // remove param from url
}
function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}


export default SignInButton;


