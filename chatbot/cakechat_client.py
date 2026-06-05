import requests

CAKECHAT_URL = (
    "http://localhost:8080/"
    "cakechat_api/v1/actions/get_response"
)

def get_response(context, emotion):

    payload = {
        "context": context,
        "emotion": emotion
    }

    response = requests.post(
        CAKECHAT_URL,
        json=payload
    )

    return response.json()["response"]