import { useState } from 'react'
import profilePhoto from '../assets/profile.jpeg'

const PHOTO_EMOJIS = ['💗', '✨', '🌸', '🥺', '💕', '🩵']

export default function HerPhoto() {
  const [imgError, setImgError] = useState(false)

  return (
    <section className="her-photo-section">
      <div className="photo-frame-wrapper">
        {/* Spinning gradient ring */}
        <div className="photo-ring">
          <div className="photo-ring-inner" />
        </div>

        {/* Photo circle */}
        <div className="photo-circle">
          {!imgError ? (
            <img
              src={profilePhoto}
              alt="Us together 💗"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="photo-placeholder">💗</div>
          )}
        </div>

        {/* Floating emojis around the frame */}
        {PHOTO_EMOJIS.map((emoji, i) => (
          <span
            key={i}
            className={`photo-emoji-float photo-emoji-${i + 1}`}
          >
            {emoji}
          </span>
        ))}
      </div>
      <p className="photo-caption">please forgive me, Rai 🥺🙏</p>
    </section>
  )
}
