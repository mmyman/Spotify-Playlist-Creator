import React, { useState, useEffect } from 'react';
import { Button} from'@mui/material'
var redirect_uri = "http://127.0.0.1:5500"
const BACKEND = "http://127.0.0.1:5000/";
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
            <div style={{width:300, margin:30}}>
                <Button
                onClick={props.onClick}
                color='secondary'
                variant='contained'>
                Sign In
                </Button>
            </div>
            
        );
        
}




export default SignInButton;


