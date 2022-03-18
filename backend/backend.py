import base64
from flask import Flask, redirect
import requests

redirect_uri = "http://127.0.0.1:5500/frontend/index.html"

CLIENT_ID = "a428d61e295b4760895eba6c441c8f32"
CLIENT_SECRET = "9196b954bd074c4c8e50aa7c544f3696"
TOKEN = "https://accounts.spotify.com/api/token"
AUTHORIZE = "https://accounts.spotify.com/authorize"
app = Flask(__name__)

@app.route('/sign-in')
def signIn():
    url = AUTHORIZE
    url += "?client_id=" + CLIENT_ID
    url += "&response_type=code"
    url += "&redirect_uri=" + redirect_uri
    url += "&show_dialog=true"
    url += "&scope=user-read-recently-played playlist-read-private"
    return redirect(url)

@app.route('/get-token/<code>')
def getToken(code):
    data = {
        "grant_type":"authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
        }
    '''body = 
    body += "&code=" + code; 
    body += "&redirect_uri=" + redirect_uri
    body += "&client_id=" + CLIENT_ID
    body += "&client_secret=" + CLIENT_SECRET
'''
    base64encoded = base64.b64encode(f'{CLIENT_ID}:{CLIENT_SECRET}'.encode('ascii'))
    headers = {'Authorization': 'Basic {}'.format(base64encoded.decode('ascii'))}
    return requests.post(TOKEN, data = data, headers=headers).json()
'''function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);'''
if __name__ == "__main__":
    app.run(debug=True)
