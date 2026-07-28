import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

// Las tres marcas están fijas en el contenido (no cambian),
// pero cada una carga su propio set de piezas desde Supabase.
export const BRANDS = [
  {
    slug: 'aura-vibes',
    name: 'Aura Vibes',
    description: 'Descripción breve de lo realizado para Aura Vibes.',
  },
  {
    slug: 'celeste',
    name: 'Celeste',
    description: 'Descripción breve de lo realizado para Celeste.',
  },
  {
    slug: 'nuestro-sueno',
    name: 'Nuestro Sueño',
    description: 'Descripción breve de lo realizado para Nuestro Sueño.',
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
