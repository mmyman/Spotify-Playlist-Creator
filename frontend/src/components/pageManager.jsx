import React, { useState, useEffect } from 'react';
import CreatePlaylistButton from './createPlaylistButton';
import SignInButton from './signInButton';
import './sliderDiv.css'
function PageManager(){
    const [renderPageState,setPageState]=useState(0)

    const handleSignIn=() =>{
        localStorage.setItem('signIn', 'clicked');
        window.location.href ="https://spotify-playlist-gener.herokuapp.com/sign-in";

    }



    let page;
    console.log(localStorage.getItem('signIn') );
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('signIn') == 'clicked' ){
        localStorage.setItem('signIn', 'notClicked');
    }

    if (renderPageState === 0){
        page = <div className='logoContainer'>
                <SignInButton onClick = {handleSignIn} pageState = {setPageState}></SignInButton>
            </div>
        
        
    } else if(renderPageState === 1){
        page = <div>
                <CreatePlaylistButton></CreatePlaylistButton>
            </div>

    }

        return (
                page
        );
}

export default PageManager;