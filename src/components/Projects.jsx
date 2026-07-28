import { useMemo, useState } from 'react'
import { BRANDS, useProjects } from '../lib/useProjects'

// Coloca cada logo en /public/logos/{slug}.png (ej: /public/logos/aura-vibes.png).
// Si el archivo no existe, se muestra el nombre de la marca como respaldo.
function BrandLogo({ brand }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return <div className="brand-block__logo-placeholder">{brand.name}</div>
  }
  return (
    <img
      className="brand-block__logo"
      src={`/logos/${brand.slug}.png`}
      alt={`Logo de ${brand.name}`}
      onError={() => setFailed(true)}
    />
  )
}

function Frame({ item, index }) {
  const isVideo = item.media_type === 'video'
  return (
    <div className="frame">
      <span className="frame__number">F.{String(index + 1).padStart(2, '0')}</span>
      {isVideo ? (
        <>
          <video src={item.media_url} muted loop playsInline preload="metadata" />
          <div className="frame__play"><span>▶</span></div>
        </>
      ) : (
        <img src={item.media_url} alt={item.title || `Pieza para ${item.brand_name}`} loading="lazy" />
      )}
    </div>
  )
}

export default function Projects() {
  const { items, loading, error } = useProjects()
  const [activeBrand, setActiveBrand] = useState('todos')

  const visibleBrands = useMemo(
    () => (activeBrand === 'todos' ? BRANDS : BRANDS.filter((b) => b.slug === activeBrand)),
    [activeBrand]
  )

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow">Proyectos destacados</p>
          <h2 className="section-title">Marcas con las que he trabajado</h2>
        </div>

        <div className="brand-tabs" role="tablist" aria-label="Filtrar por marca">
          <button
            className={`brand-tab ${activeBrand === 'todos' ? 'is-active' : ''}`}
            onClick={() => setActiveBrand('todos')}
          >
            Todos
          </button>
          {BRANDS.map((b) => (
            <button
              key={b.slug}
              className={`brand-tab ${activeBrand === b.slug ? 'is-active' : ''}`}
              onClick={() => setActiveBrand(b.slug)}
            >
              {b.name}
            </button>
          ))}
        </div>

        {visibleBrands.map((brand) => {
          const brandItems = items.filter((i) => i.brand_slug === brand.slug)
          return (
            <div className="brand-block" key={brand.slug}>
              <div className="brand-block__head">
                <BrandLogo brand={brand} />
                <p className="brand-block__desc">{brand.description}</p>
              </div>

              {!supabaseConfigured() ? (
                <div className="empty-state">
                  Conecta Supabase para cargar fotos y videos de {brand.name}. Mientras tanto, este espacio queda listo a la espera del contenido.
                </div>
              ) : loading ? (
                <div className="empty-state">Cargando piezas de {brand.name}…</div>
              ) : error ? (
                <div className="empty-state">No se pudo cargar el contenido: {error}</div>
              ) : brandItems.length === 0 ? (
                <div className="empty-state">
                  Aún no hay piezas cargadas para {brand.name}. Súbelas desde Supabase para que aparezcan aquí.
                </div>
              ) : (
                <div className="frame-grid">
                  {brandItems.map((item, idx) => (
                    <Frame item={item} index={idx} key={item.id ?? idx} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function supabaseConfigured() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}
