var redirect_uri = "http://127.0.0.1:5500/index.html"

var client_id = "a428d61e295b4760895eba6c441c8f32";
var client_secret = "9196b954bd074c4c8e50aa7c544f3696";

const AUTHORIZE = "https://accounts.spotify.com/authorize"
function onPageLoad(){

}

function requestAuthorization(){
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url;
}