from flask import Flask
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


app = Flask(__name__)

@app.route('/')
def home():
    spotipy.util.prompt_for_user_token(username,
                           scope,
                           client_id='your-spotify-client-id',
                           client_secret='your-spotify-client-secret',
                           redirect_uri='your-app-redirect-url')
