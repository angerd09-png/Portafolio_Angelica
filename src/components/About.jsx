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
    <section id="sobre-mi" className="section section--tight">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow">Sobre mí</p>
          <h2 className="section-title">Angelica Ruiz</h2>
        </div>
        <div className="about">
          <div className="about__photo">
            <img src="/profile.jpg" alt="Foto de Angelica Ruiz" />
          </div>
          <div>
            <p className="about__bio">
              Diseño, contenido y estrategia en un mismo perfil. Tengo experiencia
              creando y editando videos para Reels y contenido visual para redes
              sociales, combinando creatividad y marketing para construir marcas
              con impacto. Estudiante próxima a graduarme en Mercadeo y Negocios
              Internacionales, con experiencia en áreas comerciales y de marketing
              siempre orientadas al diseño y la comunicación visual.
            </p>
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
