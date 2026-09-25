const API_BASE = '/fortnite-api'

function getApiKey() {
  return import.meta.env.VITE_FORTNITE_API_KEY?.trim() || ''
}

function mapErrorMessage(status, fallback) {
  if (status === 400) {
    return 'Richiesta non valida. Controlla nome utente e filtri.'
  }
  if (status === 401 || status === 403) {
    return 'Accesso negato. Verifica la API key in .env oppure le stats del giocatore sono private.'
  }
  if (status === 404) {
    return 'Giocatore non trovato. Controlla il nome utente e il tipo di account.'
  }
  return fallback || `Errore API (${status}).`
}

/**
 * Fetch BR player stats from fortnite-api.com
 * Docs: https://dash.fortnite-api.com/endpoints/stats
 */
export async function fetchPlayerStats({
  name,
  accountType = 'epic',
  timeWindow = 'lifetime',
  image = 'all',
}) {
  const apiKey = getApiKey()
  if (!apiKey) {
    throw new Error(
      'API key mancante. Imposta VITE_FORTNITE_API_KEY nel file .env (https://dash.fortnite-api.com/).',
    )
  }

  const trimmedName = name.trim()
  if (!trimmedName) {
    throw new Error('Inserisci un nome utente Fortnite.')
  }

  const params = new URLSearchParams({
    name: trimmedName,
    accountType,
    timeWindow,
    image,
  })

  const response = await fetch(`${API_BASE}/v2/stats/br/v2?${params}`, {
    headers: {
      Authorization: apiKey,
    },
  })

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const apiMessage = payload?.error || payload?.message
    throw new Error(mapErrorMessage(response.status, apiMessage))
  }

  return payload?.data ?? payload
}
