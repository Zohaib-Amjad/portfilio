export default function HoverLetters({ text, className = '' }) {
  return (
    <span className={className}>
      {Array.from(text).map((char, index) =>
        char === ' ' ? (
          <span key={`space-${index}`} className="hover-letter-space">
            {' '}
          </span>
        ) : (
          <span key={`${char}-${index}`} className="hover-letter">
            {char}
          </span>
        ),
      )}
    </span>
  )
}
