const HUGS = [
  { emoji: '🤗', label: 'a tight hug' },
  { emoji: '😘', label: 'a kiss' },
  { emoji: '💋', label: 'another kiss' },
  { emoji: '🫂', label: 'the biggest hug' },
  { emoji: '😚', label: 'forehead kiss' },
  { emoji: '💗', label: 'all my love' },
  { emoji: '🥺', label: 'puppy eyes' },
  { emoji: '🫶', label: 'heart hands' },
  { emoji: '💕', label: 'double hearts' },
]

export default function HugKissSection() {
  return (
    <section className="hug-kiss-section">
      <h2 className="hug-title">
        Sending you a million hugs & kisses 🤗💋
      </h2>
      <p className="hug-subtitle">
        তোমাকে অনেক অনেক জড়িয়ে ধরতে চাই 🥺
      </p>
      <div className="hug-grid">
        {HUGS.map((h, i) => (
          <div
            key={i}
            className="hug-bubble"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="hug-emoji">{h.emoji}</span>
            <span className="hug-label">{h.label}</span>
          </div>
        ))}
      </div>
      <div className="hug-message">
        <p>
          I wish I could hug you right now and never let go, Ritama 🥺
          <br />
        </p>
      </div>
    </section>
  )
}
