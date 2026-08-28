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
  <main>
    <h1>AniLense</h1>
    <input
      type="text"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      placeholder="Search anime"
    />
    <select
      value={statusFilter}
      onChange={(event) => setStatusFilter(event.target.value)}
    >
      <option value="all">All</option>
      <option value="Currently Airing">Currently Airing</option>
      <option value="Finished Airing">Finished Airing</option>
      <option value="Not yet aired">Not yet aired</option>
    </select>
    <select
      value={selectedSeason}
      onChange={(event) => setSelectedSeason(event.target.value)}
    >
      <option value="current">Current Season</option>
      <option value="winter">Winter</option>
      <option value="spring">Spring</option>
      <option value="summer">Summer</option>
      <option value="fall">Fall</option>
    </select>
    {selectedSeason !== 'current' && (
      <input
        type="number"
        value={selectedYear}
        onChange={(event) => setSelectedYear(Number(event.target.value))}
      />
    )}

    {loading && <p>Loading AnimeLense...</p>}
    {error && <p>{error.message}</p>}
    {!loading && !error && data && (
      <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredData.map((anime) => (
          <li
  key={anime.mal_id}
  className="flex h-full flex-col overflow-hidden rounded border-2 border-orange-500 shadow-sm"
>
  <img
    src={anime.images.jpg.image_url}
    alt={anime.title}
    className="h-64 w-full bg-black object-contain"
  />
  <div className="flex-1 space-y-2 bg-black p-4">
    <h2 className="text-lg font-medium text-white">
      {anime.title}
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
