import { useAnimeExplorer } from './hooks/useAnimeExplorer.js'

function App() {
  const {
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
  } = useAnimeExplorer()

  return (
  <main className="mx-auto max-w-6xl px-4 py-6">
    <h1 className="font-mono">AniLense</h1>
    <div className="sticky top-0 z-10 -mx-4 mb-6 flex flex-wrap gap-3 border-b border-gray-700 bg-transparent px-4 py-4 backdrop-blur">
  <input
    id="anime-search"
    type="text"
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    placeholder="Search Anime"
    className="flex-1 min-w-[200px] rounded border border-gray-300 bg-gray px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:border-orange-500 focus:outline-none"
  />
  <label htmlFor="anime-search" className="sr-only">Search anime</label>
  <select
    id="anime-status"
    value={statusFilter}
    onChange={(event) => setStatusFilter(event.target.value)}
    className="rounded border border-gray-300 bg-black/70 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
  >
    <option value="all">All</option>
    <option value="Currently Airing">Currently Airing</option>
    <option value="Finished Airing">Finished Airing</option>
    <option value="Not yet aired">Not yet aired</option>
  </select>
  <label htmlFor="anime-status" className="sr-only">Filter by status</label>
  <select
    id="anime-season"
    value={selectedSeason}
    onChange={(event) => setSelectedSeason(event.target.value)}
    className="rounded border border-gray-300 bg-black/70 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
  >
    <option value="current">Current Season</option>
    <option value="winter">Winter</option>
    <option value="spring">Spring</option>
    <option value="summer">Summer</option>
    <option value="fall">Fall</option>
  </select>
  <label htmlFor="anime-season" className="sr-only">Filter by season</label>
  {selectedSeason !== 'current' && (
    <>
      <label htmlFor="anime-year" className="sr-only">Filter by year</label>
    <input
      id="anime-year"
      type="number"
      value={selectedYear}
      onChange={(event) => setSelectedYear(Number(event.target.value))}
      className="rounded border border-gray-300 bg-black px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none"
    />
    </>
  )}
</div>
    {loading && <p>Loading AnimeLense...</p>}
    {error && <p>{error.message}</p>}
    {!loading && !error && data && (
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredData.map((anime) => (
          <li
  key={anime.mal_id}
  className="flex h-full flex-col overflow-hidden rounded border-2 border-orange-500 shadow-sm"
>
  <img
    src={anime.images.jpg.image_url}
    alt={anime.title}
    loading="lazy"
    className="h-64 w-full bg-black object-contain"
  />
  <div className="flex-1 space-y-2 bg-black p-4">
    <h2 className="text-lg font-medium text-white">
      {anime.title_english}
    </h2>
    <p className="text-sm text-gray-200">Status: {anime.status}</p>
    <p className="text-sm text-gray-200">
      Episodes: {anime.episodes ?? 'Unknown'}
    </p>
  </div>
</li>
        ))}
      </ul>
    )}
  </main>
)
}

export default App
