import { useEffect, useMemo, useState } from 'react'
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

// Miniatura dentro de la grilla. Fotos y videos abren el visor grande al
// hacer clic; los enlaces externos (Drive, Instagram, etc.) siguen abriendo
// en pestaña nueva, ya que no viven dentro del sitio.
function Frame({ item, index, onOpen }) {
  const isVideo = item.media_type === 'video'
  const isLink = item.media_type === 'link'

  if (isLink) {
    return (
      <a
        className="frame frame--link"
        href={item.media_url}
        target="_blank"
        rel="noreferrer"
      >
        <span className="frame__number">F.{String(index + 1).padStart(2, '0')}</span>
        <div className="frame__link-content">
          <span className="frame__play"><span>▶</span></span>
          <span className="frame__link-label">{item.title || 'Ver video'}</span>
        </div>
      </a>
    )
  }

  return (
    <div
      className={`frame ${isVideo ? 'frame--video' : ''}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen() }}
      aria-label={isVideo ? 'Ver video en grande' : 'Ver foto en grande'}
    >
      <span className="frame__number">F.{String(index + 1).padStart(2, '0')}</span>
      {isVideo ? (
        <video
          src={item.media_url}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            // Adelanta una fracción de segundo para pintar un fotograma
            // real como vista previa, sin reproducir el video.
            try {
              e.currentTarget.currentTime = 0.1
            } catch {
              // Algunos navegadores no permiten seek inmediato; se ignora.
            }
          }}
        />
      ) : (
        <img src={item.media_url} alt={item.title || `Pieza para ${item.brand_name}`} loading="lazy" />
      )}
      {isVideo && (
        <div className="frame__play"><span>▶</span></div>
      )}
    </div>
  )
}

// Visor en grande. Recibe la lista de piezas visibles (fotos/videos, sin los
// enlaces externos) y el índice actual, y permite navegar con flechas,
// teclado o gestos de cierre.
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index]

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  if (!item) return null
  const isVideo = item.media_type === 'video'

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Cerrar">✕</button>

      {items.length > 1 && (
        <>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Siguiente"
          >
            ›
          </button>
        </>
      )}

      <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video src={item.media_url} controls autoPlay playsInline />
        ) : (
          <img src={item.media_url} alt={item.title || 'Pieza ampliada'} />
        )}
      </div>

      <div className="lightbox__counter">
        {index + 1} / {items.length}
      </div>
    </div>
  )
}

export default function Projects() {
  const { items, loading, error } = useProjects()
  const [activeBrand, setActiveBrand] = useState('todos')
  const [lightbox, setLightbox] = useState(null) // { brandSlug, index }

  const visibleBrands = useMemo(
    () => (activeBrand === 'todos' ? BRANDS : BRANDS.filter((b) => b.slug === activeBrand)),
    [activeBrand]
  )

  const lightboxItems = lightbox
    ? items.filter((i) => i.brand_slug === lightbox.brandSlug && i.media_type !== 'link')
    : []

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
                  {brandItems.map((item, idx) => {
                    if (item.media_type === 'link') {
                      return <Frame item={item} index={idx} key={item.id ?? idx} />
                    }
                    return (
                      <Frame
                        item={item}
                        index={idx}
                        key={item.id ?? idx}
                        onOpen={() => {
                          const galleryItems = brandItems.filter((i) => i.media_type !== 'link')
                          const galleryIndex = galleryItems.findIndex((i) => (i.id ?? i) === (item.id ?? item))
                          setLightbox({ brandSlug: brand.slug, index: Math.max(galleryIndex, 0) })
                        }}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {lightbox && lightboxItems.length > 0 && (
        <Lightbox
          items={lightboxItems}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((s) => ({ ...s, index: (s.index - 1 + lightboxItems.length) % lightboxItems.length }))}
          onNext={() => setLightbox((s) => ({ ...s, index: (s.index + 1) % lightboxItems.length }))}
        />
      )}
    </section>
  )
}

function supabaseConfigured() {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}
