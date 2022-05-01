import React, { Component } from 'react';
import { Button} from'@mui/material'
var redirect_uri = "http://127.0.0.1:5500"
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
                onClick={this.props.onClick}
                color='secondary'
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


export default SignInButton;


