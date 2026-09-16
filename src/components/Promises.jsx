const PROMISES = [
  { emoji: '👂', text: "I'll listen first, and talk second." },
  { emoji: '🗣️', text: "I'll say it before it turns into a fight." },
  { emoji: '💑', text: 'I\'ll choose "us" over being right.' },
  { emoji: '🤍', text: "I'll never make you feel small again." },
  { emoji: '🤗', text: "I'll hug you tighter when things get hard." },
  { emoji: '🌙', text: "I'll never let you sleep upset — কথা বলো, please." },
]

export default function Promises() {
  return (
    <section className="promises-section">
      <h2 className="promises-title">My Promises to You 💕</h2>
      <p className="promises-subtitle">আমার প্রতিশ্রুতি তোমার জন্য ✨</p>
      <div className="promises-grid">
        {PROMISES.map((p, i) => (
          <div
            key={i}
            className="promise-tag"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span className="promise-emoji">{p.emoji}</span>
            <span className="promise-text">{p.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
