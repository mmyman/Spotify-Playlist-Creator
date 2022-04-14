import base64
from flask import Flask, redirect
import requests
from flask_cors import CORS
redirect_uri = "http://127.0.0.1:5500/frontend/index.html"

CLIENT_ID = "a428d61e295b4760895eba6c441c8f32"
CLIENT_SECRET = "9196b954bd074c4c8e50aa7c544f3696"
TOKEN = "https://accounts.spotify.com/api/token"
AUTHORIZE = "https://accounts.spotify.com/authorize"
app = Flask(__name__)
CORS(app)
# Allow requests only from your web app's domain or the development server.
# If you don't include `http://localhost:3000`, you might gets CORS Access Denied
# Error during development.
app.config["CORS_ORIGINS"] = [
    "http://127.0.0.1:5500/", "http://localhost:3000"]


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
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    base64encoded = base64.b64encode(
        f'{CLIENT_ID}:{CLIENT_SECRET}'.encode('ascii'))
    headers = {'Authorization': 'Basic {}'.format(
        base64encoded.decode('ascii'))}
    return requests.post(TOKEN, data=data, headers=headers).json()
'''
@app.route('/create-playlist')
def getToken(code):
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    base64encoded = base64.b64encode(
        f'{CLIENT_ID}:{CLIENT_SECRET}'.encode('ascii'))
    headers = {'Authorization': 'Basic {}'.format(
        base64encoded.decode('ascii'))}
    return requests.post(TOKEN, data=data, headers=headers).json()
*/
'''
if __name__ == "__main__":
    app.run(debug=True)
