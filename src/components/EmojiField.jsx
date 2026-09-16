import { useEffect, useState } from 'react'

const EMOJIS = ['🥺', '💗', '🌸', '🍃', '🩵', '✨', '💚', '🌷']

function makeBits(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: EMOJIS[i % EMOJIS.length],
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1.1 + Math.random() * 1.3,
    duration: 5 + Math.random() * 5,
    delay: Math.random() * -8,
  }))
}

export default function EmojiField() {
  const [bits, setBits] = useState([])

  useEffect(() => {
    const isSmall = window.matchMedia('(max-width: 640px)').matches
    setBits(makeBits(isSmall ? 10 : 16))
  }, [])

  return (
    <div className="emoji-field" aria-hidden="true">
      {bits.map((b) => (
        <span
          key={b.id}
          className="emoji-bit"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            fontSize: `${b.size}rem`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          {b.emoji}
        </span>
      ))}
    </div>
  )
}
