import { useEffect, useState } from 'react'
import {
  fetchCurrentSeasonAnime,
  fetchSeasonAnime,
} from '../services/jikanService.js'

export function useAnimeExplorer() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedSeason, setSelectedSeason] = useState('current')

  useEffect(() => {
    setLoading(true)
    setError(null)

    const fetchAnime =
      selectedSeason === 'current'
        ? fetchCurrentSeasonAnime()
        : fetchSeasonAnime(selectedYear, selectedSeason)

    fetchAnime
      .then((responseData) => {
        setData(responseData)
      })
      .catch((fetchError) => {
        setError(fetchError)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [selectedYear, selectedSeason])

  const animeList = data?.data ?? []
  const filteredData = animeList.filter((anime) => {
  const term = searchTerm.toLowerCase()
  const matchesSearch =
    !searchTerm ||
    anime.title.toLowerCase().includes(term) ||
    anime.title_english?.toLowerCase().includes(term)
  const matchesStatus =
    statusFilter === 'all' || anime.status === statusFilter

  return matchesSearch && matchesStatus
})

  return {
    data,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedYear,
    setSelectedYear,
    selectedSeason,
    setSelectedSeason,
    filteredData,
  }
}
