export function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '-'
  }
  return new Intl.NumberFormat('it-IT').format(value)
}

export function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '-'
  }
  return `${new Intl.NumberFormat('it-IT', {
    maximumFractionDigits: 2,
  }).format(value)}%`
}

export function formatDecimal(value, digits = 2) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '-'
  }
  return new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(value)
}

export function formatDate(isoString) {
  if (!isoString) {
    return '-'
  }
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }
  return new Intl.DateTimeFormat('it-IT', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function formatMinutes(minutes) {
  if (minutes === null || minutes === undefined || Number.isNaN(minutes)) {
    return '-'
  }
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours <= 0) {
    return `${formatNumber(rest)} min`
  }
  return `${formatNumber(hours)} h ${formatNumber(rest)} min`
}

/**
 * Priority metrics shown first in cards and in the highlight strip.
 */
export function buildHighlightStats(stats) {
  if (!stats) {
    return []
  }

  return [
    { label: 'Vittorie', value: formatNumber(stats.wins) },
    { label: 'Partite', value: formatNumber(stats.matches) },
    { label: 'Kill', value: formatNumber(stats.kills) },
    { label: 'K/D', value: formatDecimal(stats.kd) },
    { label: 'Tempo di gioco', value: formatMinutes(stats.minutesPlayed) },
  ]
}

/**
 * Build a flat list of label/value rows from a mode stats object.
 * Key metrics come first.
 */
export function buildModeStatRows(stats) {
  if (!stats) {
    return []
  }

  const rows = [
    { label: 'Vittorie', value: formatNumber(stats.wins) },
    { label: 'Partite', value: formatNumber(stats.matches) },
    { label: 'Kill', value: formatNumber(stats.kills) },
    { label: 'K/D', value: formatDecimal(stats.kd) },
    { label: 'Tempo di gioco', value: formatMinutes(stats.minutesPlayed) },
    { label: 'Win rate', value: formatPercent(stats.winRate) },
    { label: 'Morti', value: formatNumber(stats.deaths) },
    { label: 'Kill / partita', value: formatDecimal(stats.killsPerMatch) },
    { label: 'Kill / min', value: formatDecimal(stats.killsPerMin) },
    { label: 'Score', value: formatNumber(stats.score) },
    { label: 'Score / partita', value: formatDecimal(stats.scorePerMatch) },
    { label: 'Score / min', value: formatDecimal(stats.scorePerMin) },
    { label: 'Giocatori superati', value: formatNumber(stats.playersOutlived) },
  ]

  if (stats.top10 !== undefined) {
    rows.push({ label: 'Top 10', value: formatNumber(stats.top10) })
  }
  if (stats.top25 !== undefined) {
    rows.push({ label: 'Top 25', value: formatNumber(stats.top25) })
  }
  if (stats.top5 !== undefined) {
    rows.push({ label: 'Top 5', value: formatNumber(stats.top5) })
  }
  if (stats.top12 !== undefined) {
    rows.push({ label: 'Top 12', value: formatNumber(stats.top12) })
  }
  if (stats.top3 !== undefined) {
    rows.push({ label: 'Top 3', value: formatNumber(stats.top3) })
  }
  if (stats.top6 !== undefined) {
    rows.push({ label: 'Top 6', value: formatNumber(stats.top6) })
  }

  rows.push({
    label: 'Ultimo aggiornamento',
    value: formatDate(stats.lastModified),
  })

  return rows
}
