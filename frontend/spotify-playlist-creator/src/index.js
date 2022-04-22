import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MySlider from './components/mySlider';
import SignInButton from './components/signInButton';
import CreatePlaylistButton from './components/createPlaylistButton';
import { createTheme } from '@mui/material/styles';
import { ThemeContext, ThemeProvider } from '@emotion/react';
import PageManager from './components/pageManager';
const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.classList.add(window.onload="onLoad()")
document.body.style.backgroundColor = "black"
const theme = createTheme({
  palette: {
    primary: {
      main: '#1ED760',
    },
    secondary: {
      main: '#FFFFFF'
    }
  }
});

root.render(
  <React.StrictMode> 
    <ThemeProvider theme={theme}>
      <PageManager/>
    </ThemeProvider>
  </React.StrictMode>
);
/*

<MySlider name='Danceability'/>
    <MySlider name='Speechiness'/>
    <MySlider name='Instrumentalness'/>
    <MySlider name='Happiness'/>
    <MySlider name='Energy'/>
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
