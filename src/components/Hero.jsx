const SKILLS = [
  'Nociones de Adobe',
  'Canva (nivel avanzado)',
  'Edición de video en CapCut',
  'Diseño para publicidad digital',
  'Gestión comercial',
  'Gestión de proyectos',
  'Manejo de IA',
]

// Coloca tu foto en /public/profile.jpg
export default function Hero() {
  return (
    <header id="hero" className="hero">
      <div className="hero__grid container">
        <div className="hero__content">
          <p className="hero__eyebrow">Fotografía &amp; video</p>
          <h1 className="hero__name">Angelica Ruiz</h1>

          <p className="hero__bio">
            Diseño, contenido y estrategia en un mismo perfil. Tengo experiencia
            creando y editando videos para Reels y contenido visual para redes
            sociales, combinando creatividad y marketing para construir marcas
            con impacto. Estudiante próxima a graduarme en Mercadeo y Negocios
            Internacionales, con experiencia en áreas comerciales y de marketing
            siempre orientadas al diseño y la comunicación visual.
          </p>

          <div className="hero__actions">
            <a href="#proyectos" className="btn btn--solid">Ver proyectos</a>
            <a href="#contacto" className="btn btn--ghost">Contacto</a>
          </div>

          <p className="hero__skills-label">Habilidades</p>
          <ul className="skills skills--on-dark">
            {SKILLS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="hero__photo">
          <img src="/profile.jpg" alt="Foto de Angelica Ruiz" />
        </div>
      </div>

      <a href="#proyectos" className="hero__scroll" aria-label="Ir a proyectos">↓</a>
    </header>
  )
}
