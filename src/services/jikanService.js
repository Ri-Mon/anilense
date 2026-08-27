const BASE_URL = 'https://api.jikan.moe/v4/seasons'

async function fetchAndDeduplicate(url, failureMessage) {
  let response

  try {
    response = await fetch(url)
  } catch (error) {
    throw new Error(failureMessage, { cause: error })
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

export async function fetchCurrentSeasonAnime() {
  return fetchAndDeduplicate(
    `${BASE_URL}/now`,
    'Failed to fetch current season anime from the Jikan API',
  )
}

export async function fetchSeasonAnime(year, season) {
  return fetchAndDeduplicate(
    `${BASE_URL}/${year}/${season}`,
    'Failed to fetch seasonal anime from the Jikan API',
  )
}