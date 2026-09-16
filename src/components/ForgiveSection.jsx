import { useRef, useState } from 'react'
import BearHug from './BearHug'
import Confetti, { makeConfettiBurst } from './Confetti'

const DODGE_MESSAGES = [
  'noo come back!! 🥺',
  'please please please 💗',
  'okayy one more chance... 🌸',
  '...fine, you got me 😭💗',
]
const MAX_DODGES = 4

export default function ForgiveSection() {
  const wrapRef = useRef(null)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [dodges, setDodges] = useState(0)
  const [hint, setHint] = useState('')
  const [forgiven, setForgiven] = useState(false)
  const [confetti, setConfetti] = useState([])

  function dodge() {
    if (dodges >= MAX_DODGES) return
    const wrap = wrapRef.current
    if (!wrap) return
    const maxX = wrap.clientWidth - 140
    const x = Math.random() * maxX - maxX / 2
    const y = Math.random() * 40 - 20
    setNoPos({ x, y })
    setHint(DODGE_MESSAGES[dodges])
    setDodges((d) => d + 1)
  }

  function handleNoEnter(e) {
    if (e.pointerType === 'mouse') dodge()
  }

  function handleNoClick() {
    if (dodges < MAX_DODGES) {
      dodge()
      return
    }
    setHint('take all the time you need, Ritama 💗')
  }

  function handleYes() {
    setForgiven(true)
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (!reduced) setConfetti(makeConfettiBurst(30))
  }

  function removeConfettiPiece(id) {
    setConfetti((pieces) => pieces.filter((p) => p.id !== id))
  }

  return (
    <section className="ask">
      {/* Their photo together */}
      <div className="ask-photo">
        <img src="/her.jpg" alt="Please forgive me 🥺" />
      </div>

      <h2>
        {forgiven ? 'thank you 💗✨' : 'Do you forgive me, Ritama? 🥺'}
      </h2>

      {!forgiven && (
        <>
          <div className="ask-buttons" ref={wrapRef}>
            <button className="btn-yes" onClick={handleYes}>
              Yes, I forgive you 💗
            </button>
            <button
              className="btn-no"
              style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
              onPointerEnter={handleNoEnter}
              onClick={handleNoClick}
            >
              Give me a minute
            </button>
          </div>
          <p className="hint">{hint || '\u00A0'}</p>
        </>
      )}

      {forgiven && (
        <div className="thanks">
          <BearHug />
          <p className="thanks-text">
            Thank you, Ritama...
            <br />
            I love you — always & forever 💗✨
          </p>
        </div>
      )}

      <Confetti pieces={confetti} onPieceDone={removeConfettiPiece} />
    </section>
  )
}
