import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import "./App.css";
import {
  SendIcon,
  MusicIcon,
  DiscIcon,
  SmileIcon,
  FrownIcon,
  FlameIcon,
  MehIcon,
  HeadphonesIcon,
  YoutubeIcon,
  SpotifyIcon,
  ExternalLinkIcon,
  CopyIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
  SparklesIcon
} from "./components/Icons";

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "bot",
      text: "Hello! I am Harmonix, your emotion-driven music companion. How are you feeling today? Talk to me about your mood, and I will recommend tracks matching your vibe.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [songs, setSongs] = useState([]);
  const [emotion, setEmotion] = useState("neutral");
  const [loading, setLoading] = useState(false);

  // UX Enhancement States
  const [playingSong, setPlayingSong] = useState(null);
  const [toast, setToast] = useState("");

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  // UX Feedback Toast Trigger
  const triggerToast = (msg) => {
    setToast(msg);
    const timer = setTimeout(() => {
      setToast("");
    }, 2500);
    return () => clearTimeout(timer);
  };

  // UX Reset Chat Action
  const handleClearChat = () => {
    setChatHistory([
      {
        sender: "bot",
        text: "Hello! I am Harmonix, your emotion-driven music companion. How are you feeling today? Talk to me about your mood, and I will recommend tracks matching your vibe.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
    setSongs([]);
    setEmotion("neutral");
    setPlayingSong(null);
    triggerToast("Conversation reset successfully!");
  };

  // UX Copy to Clipboard helper
  const handleCopyToClipboard = (text, type = "text") => {
    navigator.clipboard.writeText(text).then(() => {
      triggerToast(`Copied ${type} to clipboard!`);
    }).catch(() => {
      triggerToast("Failed to copy.");
    });
  };

  // Map emotions to icons and visual labels
  const getEmotionDetails = (emo) => {
    switch (emo) {
      case "joy":
        return { label: "Joyful", icon: <SmileIcon size={18} />, emoji: "😊" };
      case "sadness":
        return { label: "Melancholic", icon: <FrownIcon size={18} />, emoji: "😢" };
      case "anger":
        return { label: "Fiery", icon: <FlameIcon size={18} />, emoji: "🔥" };
      default:
        return { label: "Calm", icon: <MehIcon size={18} />, emoji: "😐" };
    }
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || message;
    if (!text.trim() || loading) return;

    // 1. Add User Message to UI State
    const userMsg = {
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setLoading(true);
    setPlayingSong(null); // Pause current playing track while loading new ones
    if (!textToSend) setMessage(""); // Clear input only if sent from input field

    try {
      // 2. Build backend context array mapping
      const apiContext = chatHistory.map((msg) =>
        msg.sender === "bot" ? `Bot: ${msg.text}` : msg.text
      );

      const contextToSend = [...apiContext, text].slice(-3);

      // 3. Request analysis from Flask endpoint
      const res = await axios.post("http://localhost:5000/chat", {
        context: contextToSend
      });

      const detectedEmotion = res.data.emotion || "neutral";
      const botReply = res.data.response || "Here are some tunes matching your vibes.";
      const recommendedSongs = res.data.songs || [];

      // 4. Update state with results
      setEmotion(detectedEmotion);
      setSongs(recommendedSongs);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);

      // UX autoplay first recommended song
      if (recommendedSongs.length > 0) {
        setPlayingSong(0);
        triggerToast("Now playing recommended track 🎵");
      }
    } catch (err) {
      console.error("Connection error to Flask backend: ", err);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! I encountered an issue connecting to my music database. Please ensure the backend server is running.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const starterPrompts = [
    { label: "Feeling Great", text: "I'm having an amazing day and feeling super happy!", emoji: "😊" },
    { label: "A bit down", text: "Feeling a bit sad and lonely today, looking for comfort.", emoji: "😢" },
    { label: "Stressed out", text: "I'm feeling stressed, overwhelmed, and frustrated.", emoji: "🔥" },
    { label: "Just relaxed", text: "Feeling peaceful, quiet, and relaxed.", emoji: "🧘" }
  ];

  const emotionDetails = getEmotionDetails(emotion);

  return (
    <div className={`app-container mood-${emotion}`}>
      {/* Background Glowing Blobs */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      {/* Main App Header */}
      <header className="app-header">
        <div className="logo-section">
          <MusicIcon size={28} className="logo-icon" />
          <div className="logo-text">
            <h1>Harmonix</h1>
            <span>Emotion-Driven Music Bot</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={handleClearChat}
            className="clear-btn"
            title="Reset conversation"
            aria-label="Reset Chat"
          >
            <TrashIcon size={14} />
            <span>Reset Vibe</span>
          </button>

          <div className="vibe-status" id="vibe-badge">
            <div className="status-dot"></div>
            <span className="status-label">Vibe:</span>
            <span className="status-value">
              {emotionDetails.emoji} {emotionDetails.label}
            </span>
          </div>
        </div>
      </header>

      {/* App Content Grid */}
      <main className="app-grid">
        {/* Left column: Chat Panel */}
        <section className="chat-panel" aria-label="Conversation Thread">
          <div className="chat-messages">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`message-wrapper ${msg.sender}`}>
                <div className="avatar-wrapper">
                  {msg.sender === "bot" ? (
                    <HeadphonesIcon size={18} />
                  ) : (
                    <span style={{ fontSize: "0.85rem", fontWeight: "700" }}>ME</span>
                  )}
                </div>
                <div className="message-content" style={{ position: "relative" }}>
                  <div className="message-bubble">
                    <p>{msg.text}</p>

                    {/* Copy action on hover */}
                    <div className="message-actions">
                      <button
                        onClick={() => handleCopyToClipboard(msg.text, "message")}
                        className="msg-action-btn"
                        title="Copy message to clipboard"
                        aria-label="Copy message text"
                      >
                        <CopyIcon size={12} />
                      </button>
                    </div>
                  </div>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {loading && <Loader />}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            {/* Quick Mood Starter Chips */}
            <div className="mood-starters" aria-label="Quick Mood Selectors">
              {starterPrompts.map((starter, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(starter.text)}
                  className="starter-chip"
                  disabled={loading}
                >
                  <span>{starter.emoji}</span>
                  <span>{starter.label}</span>
                </button>
              ))}
            </div>

            {/* Input Row */}
            <div className="input-wrapper">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share how you're feeling to get song recommendations..."
                className="message-input"
                disabled={loading}
                aria-label="Type your message"
                autoFocus
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!message.trim() || loading}
                className="send-btn"
                aria-label="Send message"
              >
                <SendIcon size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Right column: Music sidebar */}
        <section className="sidebar-panel" aria-label="Music Recommendations">
          {/* Turntable widget */}
          <div className="vibe-visualizer">
            <div className="vinyl-turntable">
              <div className={`vinyl-disc ${playingSong !== null && !loading ? "spinning" : ""}`}>
                <div className="vinyl-label">
                  <DiscIcon size={24} className="vinyl-center-icon" />
                </div>
              </div>
              <div className="vinyl-arm">
                <div className="vinyl-arm-body"></div>
                <div className="vinyl-arm-head"></div>
              </div>
            </div>

            <div className="mood-badge">
              {emotionDetails.icon}
              <span>{emotionDetails.label} Vibe</span>
            </div>

            {/* Realtime Music Player Display */}
            {playingSong !== null && songs[playingSong] && (
              <div className="playing-info-box">
                <div className="playing-info-icon-wrapper">
                  <HeadphonesIcon size={18} />
                </div>
                <div className="playing-info-text">
                  <div className="playing-label-indicator">Active Vibe Play</div>
                  <div className="playing-info-title">{songs[playingSong].name}</div>
                  <div className="playing-info-artist">{songs[playingSong].artist}</div>
                </div>
                <div className="equalizer" style={{ position: "relative", bottom: "auto", right: "auto", display: "flex" }}>
                  <span className="eq-bar" style={{ backgroundColor: "var(--mood-color)" }}></span>
                  <span className="eq-bar" style={{ backgroundColor: "var(--mood-color)", animationDelay: "0.2s" }}></span>
                  <span className="eq-bar" style={{ backgroundColor: "var(--mood-color)", animationDelay: "0.4s" }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Recommended Songs Container */}
          <div className="recommendations-section">
            <h2 className="section-title">
              <MusicIcon size={18} className="section-icon" />
              <span>Recommended Tracks</span>
            </h2>

            <div className="songs-list">
              {loading ? (
                /* UX Skeleton Loader state */
                <>
                  <div className="song-card-skeleton">
                    <div className="song-art-skeleton"></div>
                    <div className="song-details-skeleton">
                      <div className="song-title-skeleton"></div>
                      <div className="song-artist-skeleton"></div>
                    </div>
                  </div>
                  <div className="song-card-skeleton" style={{ animationDelay: "0.15s" }}>
                    <div className="song-art-skeleton"></div>
                    <div className="song-details-skeleton">
                      <div className="song-title-skeleton"></div>
                      <div className="song-artist-skeleton"></div>
                    </div>
                  </div>
                </>
              ) : songs.length > 0 ? (
                songs.map((song, index) => (
                  <div
                    key={index}
                    onClick={() => setPlayingSong(playingSong === index ? null : index)}
                    className={`song-card ${playingSong === index ? "playing" : ""}`}
                    style={{ animationDelay: `${index * 0.1}s`, cursor: "pointer" }}
                  >
                    <div className="song-art">
                      <HeadphonesIcon size={20} />
                      {playingSong === index && (
                        <div className="equalizer">
                          <span className="eq-bar"></span>
                          <span className="eq-bar"></span>
                          <span className="eq-bar"></span>
                        </div>
                      )}
                    </div>
                    <div className="song-details">
                      <h3 className="song-title">{song.name}</h3>
                      <p className="song-artist">{song.artist}</p>
                    </div>

                    <div className="song-actions" onClick={(e) => e.stopPropagation()}>
                      {/* Play/Pause control button */}
                      <button
                        className="song-play-btn"
                        onClick={() => setPlayingSong(playingSong === index ? null : index)}
                        title={playingSong === index ? "Pause" : "Play preview"}
                        aria-label={playingSong === index ? "Pause track" : "Play track"}
                      >
                        {playingSong === index ? <PauseIcon size={10} /> : <PlayIcon size={10} />}
                      </button>

                      {/* Music platform external links */}
                      <a
                        href={`https://open.spotify.com/search/${encodeURIComponent(
                          song.name + " " + song.artist
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-link spotify"
                        title="Search on Spotify"
                        aria-label={`Search ${song.name} on Spotify`}
                      >
                        <SpotifyIcon size={14} />
                      </a>
                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                          song.name + " " + song.artist
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-link youtube"
                        title="Search on YouTube"
                        aria-label={`Search ${song.name} on YouTube`}
                      >
                        <YoutubeIcon size={14} />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-songs-prompt">
                  <HeadphonesIcon size={32} style={{ opacity: 0.3 }} />
                  <span className="no-songs-title">No Vibe Loaded</span>
                  <p className="no-songs-text">
                    Send a message sharing your thoughts or tap a quick vibe starter to fetch matching music!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Floating Toast Notification Box */}
      {toast && (
        <div className="toast-notification">
          <SparklesIcon size={16} style={{ color: "var(--mood-color)", transition: "color 0.6s ease" }} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default App;