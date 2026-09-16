const ITEMS = [
  { type: 'word', text: 'sorry' },
  { type: 'emoji', text: '🥺' },
  { type: 'word', text: 'sorry' },
  { type: 'emoji', text: '💗' },
  { type: 'word', text: 'sorry' },
  { type: 'emoji', text: '🌸' },
  { type: 'word', text: 'sorry' },
  { type: 'emoji', text: '🩵' },
  { type: 'word', text: 'sorry' },
  { type: 'emoji', text: '✨' },
  { type: 'word', text: 'sorry' },
  { type: 'emoji', text: '🍃' },
  { type: 'word', text: 'sorry' },
  { type: 'emoji', text: '💚' },
  { type: 'word', text: 'sorry' },
  { type: 'emoji', text: '🌷' },
]

export default function SorryCascade() {
  return (
    <div className="sorry-cascade">
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className={item.type === 'word' ? 'cascade-word' : 'cascade-emoji'}
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          {item.text}
        </span>
      ))}
    </div>
  )
}
