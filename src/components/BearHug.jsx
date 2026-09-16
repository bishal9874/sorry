export default function BearHug() {
  return (
    <svg viewBox="0 0 160 150" fill="none">
      {/* body */}
      <circle cx="80" cy="78" r="46" fill="#c98a5e" />
      {/* ears */}
      <circle cx="46" cy="42" r="15" fill="#c98a5e" />
      <circle cx="114" cy="42" r="15" fill="#c98a5e" />
      <circle cx="46" cy="42" r="7" fill="#e6b48c" />
      <circle cx="114" cy="42" r="7" fill="#e6b48c" />
      {/* muzzle */}
      <ellipse cx="80" cy="92" rx="26" ry="20" fill="#e6b48c" />
      {/* eyes */}
      <circle cx="62" cy="72" r="4.2" fill="#3a241a" />
      <circle cx="98" cy="72" r="4.2" fill="#3a241a" />
      {/* eye shine */}
      <circle cx="63.5" cy="70.5" r="1.5" fill="#fff" opacity="0.7" />
      <circle cx="99.5" cy="70.5" r="1.5" fill="#fff" opacity="0.7" />
      {/* blush */}
      <ellipse cx="52" cy="86" rx="8" ry="5" fill="#ffb8cf" opacity="0.7" />
      <ellipse cx="108" cy="86" rx="8" ry="5" fill="#ffb8cf" opacity="0.7" />
      {/* smile */}
      <path
        d="M72 96 Q80 104 88 96"
        stroke="#3a241a"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* waving arm */}
      <g className="bear-arm">
        <ellipse cx="122" cy="86" rx="10" ry="16" fill="#c98a5e" />
      </g>
      {/* pulsing heart */}
      <g className="heart-pulse">
        <path
          d="M100 108 C96 104 89 106 89 112 C89 118 100 126 100 126 C100 126 111 118 111 112 C111 106 104 104 100 108 Z"
          fill="var(--pink-strong)"
        />
      </g>
    </svg>
  )
}
