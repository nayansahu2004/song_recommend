from flask import Flask, request, jsonify
from flask_cors import CORS

from emotion import detect_emotion
from cakechat_client import get_response
from lastfm import get_songs

print("APP STARTED")

app = Flask(__name__)
CORS(
    app,
    resources={   
        r"/*": {
            "origins": [
                "https://songrecommend.vercel.app"
            ]
        }
    }
    )

# Emotion → Music Tag Mapping
EMOTION_TO_TAG = {
    "joy": "happy",
    "sadness": "sad",
    "anger": "rock",
    "fear": "calm",
    "neutral": "pop"
}


@app.route("/tone", methods=["POST"])
def tone():

    text = request.json["message"]

    emotion = detect_emotion(text)

    return jsonify({
        "emotion": emotion
    })


@app.route("/response", methods=["POST"])
def response():

    context = request.json["context"]

    emotion = detect_emotion(
        context[-1]
    )

    reply = get_response(
        context,
        emotion
    )

    return jsonify({
        "emotion": emotion,
        "response": reply
    })


@app.route("/songs", methods=["POST"])
def songs():

    emotion = request.json["emotion"]

    music_tag = EMOTION_TO_TAG.get(
        emotion,
        "pop"
    )

    songs = get_songs(
        music_tag
    )

    return jsonify(songs)


@app.route("/chat", methods=["POST"])
def chat():

    context = request.json["context"]

    # Detect emotion from latest user message
    emotion = detect_emotion(
        context[-1]
    )

    # Get CakeChat response
    reply = get_response(
        context,
        emotion
    )

    # Convert emotion to music tag
    music_tag = EMOTION_TO_TAG.get(
        emotion,
        "pop"
    )

    # Get song recommendations
    songs = get_songs(
        music_tag
    )

    return jsonify({
        "emotion": emotion,
        "music_tag": music_tag,
        "response": reply,
        "songs": songs
    })


@app.route("/")
def home():
    return jsonify({
        "status": "running",
        "service": "Song Recommendation Chatbot"
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )