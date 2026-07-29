import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

// Las tres marcas están fijas en el contenido (no cambian),
// pero cada una carga su propio set de piezas desde Supabase.
export const BRANDS = [
  {
    slug: 'aura-vibes',
    name: 'Aura Vibes',
    description: 'Elaboración de contenido post eventos.',
  },
  {
    slug: 'celeste',
    name: 'Celeste',
    description: 'Creación, filmación y edición de contenido para historias, reels, banners de eventos, entre otros.',
  },
  {
    slug: 'nuestro-sueno',
    name: 'Nuestro Sueño',
    description: 'Creación, filmación y edición de contenido para historias, reels, banners de eventos, entre otros.',
  },
]

export function useProjects() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function load() {
      if (!supabase) {
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })

      if (!active) return
      if (error) {
        setError(error.message)
      } else {
        setItems(data || [])
      }
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [])

  return { items, loading, error }
}
