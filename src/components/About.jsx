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
export default function About() {
  return (
    <section id="sobre-mi" className="section">
      <div className="container">
        <div className="about">
          <div className="about__photo">
            <img src="/profile.jpg" alt="Foto de Angelica Ruiz" />
          </div>
          <div className="about__content">
            <p className="section-eyebrow">Sobre mí</p>
            <h2 className="about__name">Angelica Ruiz</h2>
            <p className="about__role">Fotografía &amp; video</p>

            <p className="about__bio">
              Diseño, contenido y estrategia en un mismo perfil. Tengo experiencia
              creando y editando videos para Reels y contenido visual para redes
              sociales, combinando creatividad y marketing para construir marcas
              con impacto. Estudiante próxima a graduarme en Mercadeo y Negocios
              Internacionales, con experiencia en áreas comerciales y de marketing
              siempre orientadas al diseño y la comunicación visual.
            </p>

            <p className="about__skills-label">Habilidades</p>
            <ul className="skills">
              {SKILLS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
