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

  try {
    return await response.json()
  } catch (error) {
    throw new Error('Received an invalid response from the Jikan API', {
      cause: error,
    })
  }
}