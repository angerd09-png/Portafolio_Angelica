export default function SprocketStrip() {
  return (
    <div className="sprocket-strip" aria-hidden="true">
      {Array.from({ length: 40 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  )
}
