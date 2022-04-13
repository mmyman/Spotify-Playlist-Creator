import React, { Component } from 'react';
import { Button} from'@mui/material'
var redirect_uri = "http://127.0.0.1:5500/frontend/index.html"
var client_id = "a428d61e295b4760895eba6c441c8f32";
var client_secret = "9196b954bd074c4c8e50aa7c544f3696";
const BACKEND = "http://127.0.0.1:5000/";
const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOP = "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5&offset=0"
const TRACK = "https://api.spotify.com/v1/recommendations?"
const TOKEN = "https://accounts.spotify.com/api/token";

class MyButton extends Component {
    
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
        localStorage.setItem('token',this.json().access_token);
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

function requestAuthorization(){
    window.location.href = BACKEND + "sign-in";
}

function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function refreshAccessToken(){
    let refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            let access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            let refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        //onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

export default MyButton;