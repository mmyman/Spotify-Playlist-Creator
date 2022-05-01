import React, { useState, useEffect } from 'react';
import CreatePlaylistButton from './createPlaylistButton';
import SignInButton from './signInButton';
function PageManager(){
    const [renderPageState,setPageState]=useState(0)

    const handleSignIn=() =>{
        localStorage.setItem('signIn', 'clicked');
        window.location.href ="http://127.0.0.1:5000/sign-in";

    }

    let page;
    console.log(localStorage.getItem('signIn') );
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('signIn') == 'clicked' ){
        setPageState(1);
        localStorage.setItem('signIn', 'notClicked');

    }

    if (renderPageState === 0){
        page = <SignInButton onClick = {handleSignIn}></SignInButton>
    } else if(renderPageState === 1){
        page = <CreatePlaylistButton></CreatePlaylistButton>
    }

        return (
            <div>
                {page}
            </div>

            
        );
}

export default PageManager;