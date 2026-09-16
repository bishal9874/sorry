import { useEffect, useRef, useState } from 'react'
import song from '../assets/song.mp3'

const START_AT = 60 // seconds — song begins from the 1:00 mark
const GESTURE_EVENTS = ['pointerdown', 'touchstart', 'touchend', 'keydown', 'click']

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const hasSeekedRef = useRef(false)
  const removeGestureListenersRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.55

    // Safe on every browser: some mobile engines throw if metadata isn't
    // loaded yet, so this never runs unguarded anywhere in this file.
    function seekToStartOnce() {
      if (hasSeekedRef.current) return
      if (audio.readyState < 1) {
        audio.addEventListener(
          'loadedmetadata',
          () => {
            try {
              audio.currentTime = START_AT
            } catch {
              // ignore — playback still starts from wherever it can
            }
            hasSeekedRef.current = true
          },
          { once: true },
        )
        return
      }
      try {
        audio.currentTime = START_AT
      } catch {
        // ignore
      }
      hasSeekedRef.current = true
    }

    function attemptPlay() {
      seekToStartOnce()
      audio.play().catch(() => {})
    }

    const onPlay = () => {
      setPlaying(true)
      // Playback is confirmed — the page-wide "tap anywhere" listeners have
      // done their job and can stop listening.
      if (removeGestureListenersRef.current) removeGestureListenersRef.current()
    }
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    // Try immediately on load (works once a browser trusts this site from a
    // prior visit). Most first-time mobile visits will reject this — that's
    // expected — so we also retry on every tap/touch/key anywhere on the
    // page (except the toggle button, which manages its own tap) until
    // playback actually starts, not just once.
    attemptPlay()

    function startOnFirstGesture(event) {
      if (event.target.closest('.music-toggle')) return
      attemptPlay()
    }

    function cleanupGestureListeners() {
      GESTURE_EVENTS.forEach((type) =>
        window.removeEventListener(type, startOnFirstGesture),
      )
      removeGestureListenersRef.current = null
    }

    GESTURE_EVENTS.forEach((type) =>
      window.addEventListener(type, startOnFirstGesture, { passive: true }),
    )
    removeGestureListenersRef.current = cleanupGestureListeners

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      cleanupGestureListeners()
    }
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (removeGestureListenersRef.current) removeGestureListenersRef.current()

    if (audio.paused) {
      if (!hasSeekedRef.current) {
        try {
          audio.currentTime = START_AT
        } catch {
          // ignore — play() below still runs regardless
        }
        hasSeekedRef.current = true
      }
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  return (
    <>
      <audio ref={audioRef} src={song} loop preload="auto" playsInline />
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
