import StatsCard from './StatsCard'
import StatsImage from './StatsImage'
import KeyStatsHighlight from './KeyStatsHighlight'
import {
  buildHighlightStats,
  buildModeStatRows,
  formatNumber,
  formatPercent,
} from '../utils/format'

const MODE_CARDS = [
  { key: 'overall', title: 'Overall', subtitle: 'Tutte le modalita (all inputs)' },
  { key: 'solo', title: 'Solo', subtitle: 'Modalita Solo' },
  { key: 'duo', title: 'Duo', subtitle: 'Modalita Duo' },
  { key: 'squad', title: 'Squad', subtitle: 'Modalita Squad' },
  { key: 'ltm', title: 'LTM', subtitle: 'Limited Time Modes' },
]

const INPUT_LABELS = {
  keyboardMouse: 'Keyboard & Mouse',
  gamepad: 'Gamepad',
  touch: 'Touch',
}

function buildAccountRows(account) {
  if (!account) {
    return []
  }
  return [
    { label: 'Nome', value: account.name || '-' },
    { label: 'Account ID', value: account.id || '-' },
  ]
}

function buildBattlePassRows(battlePass) {
  if (!battlePass) {
    return []
  }
  return [
    { label: 'Livello', value: formatNumber(battlePass.level) },
    { label: 'Progresso', value: formatPercent(battlePass.progress) },
  ]
}

function collectCards(data) {
  const cards = []
  const statsAll = data?.stats?.all

  MODE_CARDS.forEach((mode) => {
    const modeStats = statsAll?.[mode.key] ?? null
    cards.push({
      id: `all-${mode.key}`,
      title: mode.title,
      subtitle: mode.subtitle,
      rows: buildModeStatRows(modeStats),
      emptyMessage: 'Nessuna statistica per questa modalita.',
    })
  })

  cards.push({
    id: 'account',
    title: 'Account',
    subtitle: 'Dati profilo Epic',
    rows: buildAccountRows(data?.account),
  })

  cards.push({
    id: 'battle-pass',
    title: 'Battle Pass',
    subtitle: 'Progresso stagione corrente',
    rows: buildBattlePassRows(data?.battlePass),
  })

  const inputKeys = Object.keys(INPUT_LABELS)
  inputKeys.forEach((inputKey) => {
    const inputStats = data?.stats?.[inputKey]
    const overall = inputStats?.overall ?? null
    cards.push({
      id: `input-${inputKey}`,
      title: INPUT_LABELS[inputKey],
      subtitle: 'Overall per input',
      rows: buildModeStatRows(overall),
      emptyMessage: 'Nessuna statistica per questo input.',
    })
  })

  return cards
}

export default function StatsResults({ data }) {
  if (!data) {
    return null
  }

  const cards = collectCards(data)
  const playerName = data?.account?.name || 'Giocatore'
  const highlights = buildHighlightStats(data?.stats?.all?.overall)

  return (
    <section className="stats-results" aria-live="polite">
      <header className="stats-results__header">
        <p className="stats-results__eyebrow">Risultati</p>
        <h2 className="stats-results__title">{playerName}</h2>
        <p className="stats-results__subtitle">
          Tutti i dati recuperati dall endpoint BR Stats.
        </p>
      </header>

      <KeyStatsHighlight items={highlights} />
      <StatsImage src={data.image} playerName={playerName} />

      <div className="stats-results__grid">
        {cards.map((card) => (
          <StatsCard
            key={card.id}
            title={card.title}
            subtitle={card.subtitle}
            rows={card.rows}
            emptyMessage={card.emptyMessage}
          />
        ))}
      </div>
    </section>
  )
}
