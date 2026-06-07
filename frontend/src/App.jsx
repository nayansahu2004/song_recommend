import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const MusicIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
  </svg>
);

const HeadphonesIcon = ({ size = 24, className = "", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);

const DiscIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/>
    <path d="M12 2a10 10 0 0 0-7.74 16.39"/>
    <path d="M12 2a10 10 0 0 1 7.74 16.39"/>
  </svg>
);

const SendIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const TrashIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
);

const PlayIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const PauseIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
  </svg>
);

const YoutubeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const SpotifyIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 13.5a6 6 0 0 1 8 0"/>
    <path d="M7 10.5a9 9 0 0 1 10 0"/>
    <path d="M9 16.5a3 3 0 0 1 6 0"/>
  </svg>
);

const SparklesIcon = ({ size = 24, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const SmileIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 13s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

const FrownIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

const FlameIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const MehIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="8" y1="15" x2="16" y2="15"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

// ─── LOADER COMPONENT ─────────────────────────────────────────────────────────
function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-pulse">
        <div className="loader-sparkle">
          <SparklesIcon size={12} />
        </div>
      </div>
      <div className="loader-text-wrapper">
        <span>Tuning your vibe</span>
        <div className="loader-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  );
}

// ─── EMOTION HELPER ───────────────────────────────────────────────────────────
function getEmotionDetails(emo) {
  switch (emo) {
    case "joy":     return { label: "Joyful",      icon: <SmileIcon size={18} />, emoji: "😊" };
    case "sadness": return { label: "Melancholic",  icon: <FrownIcon size={18} />, emoji: "😢" };
    case "anger":   return { label: "Fiery",        icon: <FlameIcon size={18} />, emoji: "🔥" };
    default:        return { label: "Calm",         icon: <MehIcon   size={18} />, emoji: "😐" };
  }
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "bot",
      text: "Hello! I am Harmonix, your emotion-driven music companion. How are you feeling today? Talk to me about your mood, and I will recommend tracks matching your vibe.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [songs, setSongs]         = useState([]);
  const [emotion, setEmotion]     = useState("neutral");
  const [loading, setLoading]     = useState(false);
  const [playingSong, setPlayingSong] = useState(null);
  const [toast, setToast]         = useState("");

  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  // Toast
  const triggerToast = (msg) => {
    setToast(msg);
    const timer = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(timer);
  };

  // Reset
  const handleClearChat = () => {
    setChatHistory([
      {
        sender: "bot",
        text: "Hello! I am Harmonix, your emotion-driven music companion. How are you feeling today? Talk to me about your mood, and I will recommend tracks matching your vibe.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setSongs([]);
    setEmotion("neutral");
    setPlayingSong(null);
    triggerToast("Conversation reset successfully!");
  };

  // Send — preserves exact backend contract from original
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || message;
    if (!text.trim() || loading) return;

    const userMsg = {
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setLoading(true);
    setPlayingSong(null);
    if (!textToSend) setMessage("");

    try {
      // Build context — same slice(-3) logic as original
      const apiContext = chatHistory.map((msg) =>
        msg.sender === "bot" ? `Bot: ${msg.text}` : msg.text
      );
      const contextToSend = [...apiContext, text].slice(-3);

      // Axios POST — identical to original payload & headers
      const res = await axios.post(
        "https://germproof-amiss-glimpse.ngrok-free.dev/chat",
        { context: contextToSend },
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );

      const detectedEmotion  = res.data.emotion  || "neutral";
      const botReply         = res.data.response || "Here are some tunes matching your vibes.";
      const recommendedSongs = res.data.songs    || [];

      setEmotion(detectedEmotion);
      setSongs(recommendedSongs);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);

      if (recommendedSongs.length > 0) {
        setPlayingSong(0);
        triggerToast("Now playing recommended track 🎵");
      }
    } catch (err) {
      console.error("Connection error to Flask backend:", err);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! I encountered an issue connecting to my music database. Please ensure the backend server is running.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const starterPrompts = [
    { label: "Feeling Great", text: "I'm having an amazing day and feeling super happy!",      emoji: "😊" },
    { label: "A bit down",    text: "Feeling a bit sad and lonely today, looking for comfort.", emoji: "😢" },
    { label: "Stressed out",  text: "I'm feeling stressed, overwhelmed, and frustrated.",       emoji: "🔥" },
    { label: "Just relaxed",  text: "Feeling peaceful, quiet, and relaxed.",                   emoji: "🧘" },
  ];

  const emotionDetails = getEmotionDetails(emotion);

  return (
    <div className={`app-container mood-${emotion}`}>

      {/* Background ambient glows */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      {/* ── HEADER ── */}
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
            className="clear-btn"
            onClick={handleClearChat}
            title="Reset conversation"
            aria-label="Reset Chat"
          >
            <TrashIcon size={14} />
            <span>Reset Vibe</span>
          </button>

          <div className="vibe-status">
            <div className="status-dot" />
            <span className="status-label">Vibe:</span>
            <span className="status-value">
              {emotionDetails.emoji} {emotionDetails.label}
            </span>
          </div>
        </div>
      </header>

      {/* ── MAIN GRID ── */}
      <main className="app-grid">

        {/* ── LEFT: Chat Panel ── */}
        <section className="chat-panel" aria-label="Conversation Thread">
          <div className="chat-messages">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`message-wrapper ${msg.sender}`}>
                <div className="avatar-wrapper">
                  {msg.sender === "bot" ? (
                    <HeadphonesIcon size={18} />
                  ) : (
                    <span style={{ fontSize: "0.75rem", fontWeight: "700" }}>ME</span>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                  </div>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {loading && <Loader />}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            {/* Quick mood starters */}
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

            {/* Message input */}
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

        {/* ── RIGHT: Sidebar ── */}
        <section className="sidebar-panel" aria-label="Music Recommendations">

          {/* Turntable visualizer */}
          <div className="vibe-visualizer">
            <div className={`vinyl-turntable ${playingSong !== null && !loading ? "playing" : ""}`}>
              <div className={`vinyl-disc ${playingSong !== null && !loading ? "spinning" : ""}`}>
                <div className="vinyl-label">
                  <DiscIcon size={24} />
                </div>
              </div>
              <div className="vinyl-arm">
                <div className="vinyl-arm-body" />
                <div className="vinyl-arm-head" />
              </div>
            </div>

            <div className="mood-badge">
              {emotionDetails.icon}
              <span>{emotionDetails.label} Vibe</span>
            </div>

            {/* Now playing bar */}
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
                <div className="eq-bars-wrapper">
                  <span className="np-eq-bar" />
                  <span className="np-eq-bar" />
                  <span className="np-eq-bar" />
                  <span className="np-eq-bar" />
                </div>
              </div>
            )}
          </div>

          {/* Song recommendations */}
          <div className="recommendations-section">
            <h2 className="section-title">
              <MusicIcon size={18} className="section-icon" />
              <span>Recommended Tracks</span>
            </h2>

            <div className="songs-list">
              {loading ? (
                <>
                  {[0, 1, 2].map((n) => (
                    <div key={n} className="song-card-skeleton" style={{ animationDelay: `${n * 0.12}s` }}>
                      <div className="song-art-skeleton" />
                      <div className="song-details-skeleton">
                        <div className="song-title-skeleton" />
                        <div className="song-artist-skeleton" />
                      </div>
                    </div>
                  ))}
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
                          <span className="eq-bar" />
                          <span className="eq-bar" />
                          <span className="eq-bar" />
                        </div>
                      )}
                    </div>
                    <div className="song-details">
                      <h3 className="song-title">{song.name}</h3>
                      <p className="song-artist">{song.artist}</p>
                    </div>

                    <div className="song-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="song-play-btn"
                        onClick={() => setPlayingSong(playingSong === index ? null : index)}
                        title={playingSong === index ? "Pause" : "Play"}
                        aria-label={playingSong === index ? "Pause track" : "Play track"}
                      >
                        {playingSong === index ? <PauseIcon size={10} /> : <PlayIcon size={10} />}
                      </button>

                      <a
                        href={`https://open.spotify.com/search/${encodeURIComponent(song.name + " " + song.artist)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-link spotify"
                        title="Search on Spotify"
                        aria-label={`Search ${song.name} on Spotify`}
                      >
                        <SpotifyIcon size={14} />
                      </a>

                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.name + " " + song.artist)}`}
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

      {/* Toast notification */}
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