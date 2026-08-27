import { useEffect, useState } from 'react'
import { fetchCurrentSeasonAnime } from '../services/jikanService.js'

export function useAnimeExplorer() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

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

  const animeList = data?.data ?? []
  const filteredData = searchTerm
    ? animeList.filter((anime) =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : animeList

  return { data, loading, error, searchTerm, setSearchTerm, filteredData }
}
