import { useEffect, useState } from 'react'
import { fetchCurrentSeasonAnime } from '../services/jikanService.js'

export function useAnimeExplorer() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchCurrentSeasonAnime()
      .then((responseData) => {
        setData(responseData)
      })
      .catch((fetchError) => {
        setError(fetchError)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
