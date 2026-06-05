from transformers import pipeline

emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base"
)

def detect_emotion(text):

    result = emotion_classifier(text)

    emotion = result[0]["label"]

    mapping = {
        "joy": "joy",
        "sadness": "sadness",
        "anger": "anger",
        "fear": "sadness",
        "surprise": "joy",
        "disgust": "anger",
        "neutral": "neutral"
    }

    return mapping.get(emotion, "neutral")