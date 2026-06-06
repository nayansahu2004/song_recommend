# 🎵 Song Recommend: Chat, Feel, and Groove! 🎶

Welcome to **Song Recommend** – an AI-powered chatbot that feels your vibe and curates the perfect playlist for your mood!  
Unleash the magic of conversation, emotion detection, and music recommendations, all in one seamless experience.

---

## 🚀 Features

- **Emotion Detection:** Understands your feelings using advanced NLP models.
- **Conversational AI:** Chat with a bot powered by CakeChat for emotionally intelligent responses.
- **Personalized Music:** Recommends songs from Last.fm tailored to your mood.
- **Modern Frontend:** Built with React + Vite for a snappy UI.

---

## 🧩 Project Structure

```
Song_Recommend/
├── chatbot/      # Flask backend: emotion, chat, music APIs
│   ├── app.py
│   ├── emotion.py
│   ├── cakechat_client.py
│   ├── lastfm.py
│   ├── config.py
│   └── requirements.txt
├── cakechat/     # CakeChat emotional dialog engine
│   ├── README.md
│   ├── requirements.txt
│   └── ...
├── frontend/     # React frontend
│   ├── package.json
│   ├── vite.config.js
│   └── ...
└── README.md     # You are here!
```

---

## 🛠️ How It Works

1. **User chats** with the bot via the frontend.
2. **Emotion detection** (transformers) analyzes the user's message.
3. **CakeChat** generates a context-aware, emotionally aligned reply.
4. **Last.fm API** fetches songs matching the detected mood.
5. **Frontend** displays the reply and song recommendations.

---

## 🏗️ Installation

### Backend

```bash
cd chatbot
pip install -r requirements.txt
```

### CakeChat

See `cakechat/README.md` for setup (Python 3.5.2, TensorFlow 1.12.2, Keras 2.2.4).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

- `/tone` – Detects emotion from text
- `/response` – Gets a CakeChat reply for a context
- `/songs` – Recommends songs for an emotion
- `/chat` – All-in-one: chat, emotion, and music

---

## 🤖 Tech Stack

- **Python** (Flask, transformers, requests)
- **CakeChat** (Keras, TensorFlow)
- **React + Vite** (Frontend)
- **Last.fm API** (Music data)

---

## 🎉 Why You'll Love It

- Chatbot with a soul: It listens, understands, and responds with empathy.
- Music for every mood: From joy to sadness, get the perfect tracks.
- Open source and ready for your next hackathon or project!

---

## 📝 License

MIT for this repo. CakeChat is under its own license (see `cakechat/README.md`).

---

## 💡 Credits

- CakeChat: [CakeChat GitHub](https://github.com/lukalabs/cakechat)
- Last.fm API
- HuggingFace Transformers

---

Feel free to copy, star ⭐, and contribute!  
Let the music and conversation flow!
