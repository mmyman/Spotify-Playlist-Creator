import base64
from re import X
from flask import Flask, redirect, request
import requests
from flask_cors import CORS
redirect_uri = "http://127.0.0.1:5500/frontend/index.html"

CLIENT_ID = "a428d61e295b4760895eba6c441c8f32"
CLIENT_SECRET = "9196b954bd074c4c8e50aa7c544f3696"
TOKEN = "https://accounts.spotify.com/api/token"
AUTHORIZE = "https://accounts.spotify.com/authorize"
RECOMEND = "https://api.spotify.com/v1/recommendations"
TOP_TRACKS = 'https://api.spotify.com/v1/me/top/tracks'
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
    return requests.post(TOKEN, params=data, headers=headers).json()


@app.route('/create-playlist')
def getRec():

    data = {
        "limit": '50',
        "min_danceability": request.args.get('minDance'),
        "max_danceability": request.args.get('maxDance'),
        "min_speechiness": request.args.get('minSpeech'),
        "max_speechiness": request.args.get('maxSpeech'),
        "min_instrumentalness": request.args.get('minInst'),
        "max_intrumentalness": request.args.get('maxInst'),
        "min_happiness": request.args.get('minHappy'),
        "max_happiness": request.args.get('maxHappy'),
        "min_energy": request.args.get('minEnergy'),
        "max_energy": request.args.get('maxEnergy'),
        "seed_artists": getSeedArtist(request.args.get('auth'))

    }

    headers = {'Authorization': 'Bearer '+request.args.get(
        'auth'), 'Accept': 'application/json'}

    return requests.get(RECOMEND, params=data, headers=headers).json()


def getSeedArtist(auth):
    data = {
        "limit": '5',
        "time_range": 'short_term'
    }
    headers = {'Authorization': 'Bearer '+auth, 'Accept': 'application/json'}

    results = requests.get(TOP_TRACKS, params=data, headers=headers).json()
    artists = ''
    for x in range(5):
        artists += str(results['items'][x]['artists'][0]['id'])
        artists += ','
    # makes csv of artists of top 5 recent songs
    print(artists)
    return artists


# http://localhost:5000/create-playlist?maxDance=.3&maxSpeech=.6&maxInst=.2&maxHappy=.6&maxEnergy=.3&auth=BQDjeMgI2NsjeKMO77kUw5m5_VZJLGHMwCJtJ5RAUN3qmhPoSqnEpLOnIWxGbTcp78Mzp17IM7HAJldIsgXuK10j91Sh1-GUAUnddjUFsshfg8NYIA7oYO4x_8fIDX0BhPvhOOgSlX19Hderv4hoKzolRAgz
if __name__ == "__main__":
    app.run(debug=True)
