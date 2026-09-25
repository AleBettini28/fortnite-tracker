import { useState } from 'react'
import { fetchPlayerStats } from '../api/fortniteApi'

export function usePlayerStats() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastQuery, setLastQuery] = useState(null)

  async function search(query) {
    setLoading(true)
    setError(null)
    setLastQuery(query)

    try {
      const result = await fetchPlayerStats(query)
      setData(result)
    } catch (err) {
      setData(null)
      setError(err instanceof Error ? err.message : 'Errore sconosciuto.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setData(null)
    setError(null)
    setLastQuery(null)
  }

  return {
    data,
    loading,
    error,
    lastQuery,
    search,
    reset,
  }
}
