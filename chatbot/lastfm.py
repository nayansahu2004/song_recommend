import requests
from config import LASTFM_API_KEY

BASE_URL = "http://ws.audioscrobbler.com/2.0/"

def get_songs(tag):

    params = {
        "method": "tag.gettoptracks",
        "tag": tag,
        "api_key": LASTFM_API_KEY,
        "format": "json",
        "limit": 2
    }

    response = requests.get(
        BASE_URL,
        params=params
    )

    tracks = response.json()["tracks"]["track"]

    return [
        {
            "name": t["name"],
            "artist": t["artist"]["name"]
        }
        for t in tracks
    ]


def get_similar(song, artist):

    params = {
        "method": "track.getsimilar",
        "track": song,
        "artist": artist,
        "api_key": LASTFM_API_KEY,
        "format": "json",
        "limit": 2
    }

    response = requests.get(
        BASE_URL,
        params=params
    )

    return response.json()




