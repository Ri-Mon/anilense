import { useAnimeExplorer } from './hooks/useAnimeExplorer.js'

function App() {
  const { data, loading, error, searchTerm, setSearchTerm, filteredData } =
    useAnimeExplorer()

  if (loading) {
    return <p>Loading anime...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <main>
      <h1>AniLense</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search anime"
      />
      {data && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredData.map((anime) => (
            <li key={anime.mal_id} style={{ marginBottom: '1rem' }}>
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                width="150"
              />
              <h2>{anime.title}</h2>
              <p>Status: {anime.status}</p>
              <p>Episodes: {anime.episodes ?? 'Unknown'}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
