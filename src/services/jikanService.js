const CURRENT_SEASON_URL = 'https://api.jikan.moe/v4/seasons/now'

export async function fetchCurrentSeasonAnime() {
  let response

  try {
    response = await fetch(CURRENT_SEASON_URL)
  } catch (error) {
    throw new Error('Failed to fetch current season anime from the Jikan API', {
      cause: error,
    })
  }

  if (!response.ok) {
    throw new Error(
      `Jikan API request failed with status ${response.status} ${response.statusText}`,
    )
  }

  let parsed

  try {
    parsed = await response.json()
  } catch (error) {
    throw new Error('Received an invalid response from the Jikan API', {
      cause: error,
    })
  }

  const uniqueAnime = Array.from(
    new Map(parsed.data.map((anime) => [anime.mal_id, anime])).values(),
  )

  return { ...parsed, data: uniqueAnime }
}

export async function fetchSeasonAnime(year, season) {
  let response

  try {
    response = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}`)
  } catch (error) {
    throw new Error('Failed to fetch seasonal anime from the Jikan API', {
      cause: error,
    })
  }

  if (!response.ok) {
    throw new Error(
      `Jikan API request failed with status ${response.status} ${response.statusText}`,
    )
  }

  let parsed

  try {
    parsed = await response.json()
  } catch (error) {
    throw new Error('Received an invalid response from the Jikan API', {
      cause: error,
    })
  }

  const uniqueAnime = Array.from(
    new Map(parsed.data.map((anime) => [anime.mal_id, anime])).values(),
  )

  return { ...parsed, data: uniqueAnime }
}