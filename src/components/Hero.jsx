// Coloca tu reel o imagen de fondo en /public/hero-reel.mp4 o
// /public/hero-image.jpg. Si ninguno existe, se usa un fondo con
// degradado como respaldo (no rompe el diseño).
const HERO_VIDEO = '/hero-reel.mp4'
const HERO_IMAGE = '/hero-image.jpg'

export default function Hero() {
  return (
    <header id="hero" className="hero">
      <video
        className="hero__media"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_IMAGE}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="hero__media hero__media--fallback" style={{ zIndex: -1 }} />
      <div className="hero__scrim" />
      <div className="hero__content">
        <p className="hero__eyebrow">Fotografía &amp; video</p>
        <h1 className="hero__name">Angelica Ruiz</h1>
        <div className="hero__actions">
          <a href="#proyectos" className="btn btn--solid">Ver proyectos</a>
          <a href="#sobre-mi" className="btn btn--ghost">Sobre mí</a>
        </div>
      </div>
      <a href="#proyectos" className="hero__scroll" aria-label="Ir a proyectos">↓</a>
    </header>
  )
}
