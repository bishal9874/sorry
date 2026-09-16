import { useEffect, useRef, useState } from 'react'
import song from '../assets/song.mp3'

const START_AT = 60 // seconds — song begins from the 1:00 mark
const GESTURE_EVENTS = ['pointerdown', 'keydown', 'touchstart']

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const removeGestureListenersRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.55

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    function seekToStart() {
      if (audio.currentTime < START_AT) {
        try {
          audio.currentTime = START_AT
        } catch {
          // metadata not ready yet — the loadedmetadata handler below retries
        }
      }
    }

    if (audio.readyState >= 1) {
      seekToStart()
    } else {
      audio.addEventListener('loadedmetadata', seekToStart, { once: true })
    }

    // Browsers block audio with sound until the page has real user
    // activation. Try to start the moment the page opens (works once the
    // visitor has engaged with this site before); if that's rejected, start
    // on the very first tap/click/key anywhere on the page — no need to
    // find and press the music button specifically.
    audio.play().catch(() => {})

    function startOnFirstGesture(event) {
      if (event.target.closest('.music-toggle')) return
      seekToStart()
      audio.play().catch(() => {})
      cleanupGestureListeners()
    }

    function cleanupGestureListeners() {
      GESTURE_EVENTS.forEach((type) =>
        window.removeEventListener(type, startOnFirstGesture),
      )
      removeGestureListenersRef.current = null
    }

    GESTURE_EVENTS.forEach((type) =>
      window.addEventListener(type, startOnFirstGesture, { once: false }),
    )
    removeGestureListenersRef.current = cleanupGestureListeners

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('loadedmetadata', seekToStart)
      cleanupGestureListeners()
    }
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    // Once the visitor has used the button directly, stop the page-wide
    // "first gesture starts music" listeners so they can't fight a manual pause.
    if (removeGestureListenersRef.current) removeGestureListenersRef.current()

    if (audio.paused) {
      if (audio.currentTime < START_AT && audio.currentTime === 0) {
        audio.currentTime = START_AT
      }
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  return (
    <>
      <audio ref={audioRef} src={song} loop preload="auto" />
      {!playing && (
        <p className="music-hint" aria-hidden="true">
          tap anywhere for our song 🎵
        </p>
      )}
      <button
        type="button"
        className={`music-toggle ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
      >
        <span className="music-ring" />
        <span className="music-note">🎵</span>
        <span className="music-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
    </>
  )
}
