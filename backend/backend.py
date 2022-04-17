import base64
from re import X
import re
from flask import Flask, redirect, request
import requests
from flask_cors import CORS, cross_origin
redirect_uri = "http://127.0.0.1:5500/frontend/index.html"

CLIENT_ID = "a428d61e295b4760895eba6c441c8f32"
CLIENT_SECRET = "9196b954bd074c4c8e50aa7c544f3696"
TOKEN = "https://accounts.spotify.com/api/token"
AUTHORIZE = "https://accounts.spotify.com/authorize"
RECOMEND = "https://api.spotify.com/v1/recommendations"
TOP_TRACKS = 'https://api.spotify.com/v1/me/top/tracks'
ME = 'https://api.spotify.com/v1/me'
CREATE_PLAYLIST = 'https://api.spotify.com/v1/users/'
ADD_SONGS = 'https://api.spotify.com/v1/playlists/'
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
    url += "&scope=user-read-recently-played playlist-modify-public"
    return redirect(url)


@app.route('/get-token/<code>')
def getToken(code):
    '''data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }'''
    data = {
        "grant_type": "refresh_token",
        "refresh_token": 'AQDOcSuXQ4UW78PrJ4Fb8kFTHonEmZ5PemYqnivRWudrghOheqP_1PwxwAIYhI48wihUpZx-nZksj7F9i5Zrak39hQvFtWjQgdT-QEk7Zd054UzZU__peIpr6wrgYnUo-Fk'

    }
    base64encoded = base64.b64encode(
        f'{CLIENT_ID}:{CLIENT_SECRET}'.encode('ascii'))
    headers = {'Authorization': 'Basic {}'.format(
        base64encoded.decode('ascii'))}
    x = requests.post(TOKEN, data=data, headers=headers).json()
    print(x)
    return x


@app.route('/create-playlist')
def getRec():

    data = {
        "limit": '50',
        "max_danceability": request.args.get('maxDance'),
        "max_speechiness": request.args.get('maxSpeech'),
        "max_intrumentalness": request.args.get('maxInst'),
        "max_happiness": request.args.get('maxHappy'),
        "max_energy": request.args.get('maxEnergy'),
        "seed_artists": getSeedArtist()

    }

    headers = {'Authorization': 'Bearer '+request.args.get(
        'auth'), 'Accept': 'application/json'}
    response_data = requests.get(
        RECOMEND, params=data, headers=headers).json()['tracks']
    tracks = []
    for x in range(len(response_data)):
        tracks.append(response_data[x]['uri'])

    return makePlaylist(tracks)


def makePlaylist(tracks):

    headers = {'Authorization': 'Bearer '+request.args.get(
        'auth'), 'Accept': 'application/json'}

    id = str(requests.get(ME, headers=headers).json()['id'])
    print(id)
    url = CREATE_PLAYLIST + id + '/playlists'
    createData = {
        "name": 'Vibify'
    }
    plist_id = str(requests.post(url, json=createData,
                   headers=headers).json()['id'])

    addSongsData = {
        "uris": tracks
    }
    return requests.post(ADD_SONGS + plist_id + '/tracks', json=addSongsData, headers=headers).json()


def getSeedArtist():
    data = {
        "limit": '5',
        "time_range": 'short_term'
    }
    headers = {'Authorization': 'Bearer ' +
               request.args.get('auth'), 'Accept': 'application/json'}

    results = requests.get(TOP_TRACKS, params=data, headers=headers).json()
    print(request.args.get('auth'))
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
