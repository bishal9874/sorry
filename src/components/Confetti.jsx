import { useState } from 'react'

const COLORS = ['#ff6b9d', '#ffb8cf', '#4ec76a', '#4db8e8', '#ffd66b']

function HeartShape({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20">
      <path
        d="M10 4 C7 1 2 3 2 8 C2 13 10 18 10 18 C10 18 18 13 18 8 C18 3 13 1 10 4 Z"
        fill={color}
      />
    </svg>
  )
}

function StarShape({ color }) {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20">
      <path
        d="M10 1 L12.5 7.5 L19 8 L14 13 L15.5 19.5 L10 16 L4.5 19.5 L6 13 L1 8 L7.5 7.5 Z"
        fill={color}
      />
    </svg>
  )
}

function FlowerShape({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20">
      <circle cx="10" cy="5" r="4" fill={color} opacity="0.9" />
      <circle cx="15" cy="10" r="4" fill={color} opacity="0.9" />
      <circle cx="12" cy="16" r="4" fill={color} opacity="0.9" />
      <circle cx="8" cy="16" r="4" fill={color} opacity="0.9" />
      <circle cx="5" cy="10" r="4" fill={color} opacity="0.9" />
      <circle cx="10" cy="10" r="3" fill="#ffd66b" />
    </svg>
  )
}

let nextId = 0

export default function Confetti({ pieces, onPieceDone }) {
  return (
    <>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}px`,
            '--fx': `${piece.fx}px`,
            '--fr': `${piece.fr}deg`,
            animationDuration: `${piece.duration}s`,
          }}
          onAnimationEnd={() => onPieceDone(piece.id)}
        >
          {piece.shape === 'heart' && <HeartShape color={piece.color} />}
          {piece.shape === 'star' && <StarShape color={piece.color} />}
          {piece.shape === 'flower' && <FlowerShape color={piece.color} />}
        </div>
      ))}
    </>
  )
}

const SHAPES = ['heart', 'star', 'flower']

export function makeConfettiBurst(count = 30) {
  return Array.from({ length: count }, () => ({
    id: nextId++,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    left: Math.random() * window.innerWidth,
    fx: Math.random() * 200 - 100,
    fr: Math.random() * 540 - 270,
    duration: 2.2 + Math.random() * 1.8,
  }))
}
