const ORBIT = [
  { emoji: '🥺', className: 'orbit-1' },
  { emoji: '💗', className: 'orbit-2' },
  { emoji: '🌸', className: 'orbit-3' },
  { emoji: '🩵', className: 'orbit-4' },
  { emoji: '🍃', className: 'orbit-5' },
  { emoji: '✨', className: 'orbit-6' },
]

export default function SorryHero() {
  return (
    <section className="hero">
      <p className="eyebrow">for you, Ritama 💌</p>
      <div className="sorry-stage">
        {ORBIT.map((o) => (
          <span key={o.className} className={`orbit-emoji ${o.className}`}>
            {o.emoji}
          </span>
        ))}
        <h1 className="sorry-word">Sorry</h1>
      </div>
      <p className="hero-sub">sorry... sorry... sorry 🥺💗</p>
    </section>
  )
}
