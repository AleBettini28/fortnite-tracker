import { useState } from 'react'

const ACCOUNT_TYPES = [
  { value: 'epic', label: 'Epic' },
  { value: 'psn', label: 'PlayStation' },
  { value: 'xbl', label: 'Xbox' },
]

const TIME_WINDOWS = [
  { value: 'lifetime', label: 'Lifetime' },
  { value: 'season', label: 'Stagione' },
]

export default function SearchForm({ onSearch, loading }) {
  const [name, setName] = useState('')
  const [accountType, setAccountType] = useState('epic')
  const [timeWindow, setTimeWindow] = useState('lifetime')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch({
      name,
      accountType,
      timeWindow,
    })
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__intro">
        <p className="search-form__eyebrow">Player stats</p>
        <h2 className="search-form__title">Cerca un giocatore</h2>
        <p className="search-form__subtitle">
          Inserisci il nome utente Fortnite per ottenere account, battle pass e
          tutte le statistiche Battle Royale disponibili.
        </p>
      </div>

      <label className="search-form__field">
        <span>Nome utente</span>
        <input
          type="text"
          name="username"
          autoComplete="off"
          placeholder="es. Ninja"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={loading}
        />
      </label>

      <div className="search-form__filters">
        <label className="search-form__field">
          <span>Tipo account</span>
          <select
            value={accountType}
            onChange={(event) => setAccountType(event.target.value)}
            disabled={loading}
          >
            {ACCOUNT_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="search-form__field">
          <span>Finestra temporale</span>
          <select
            value={timeWindow}
            onChange={(event) => setTimeWindow(event.target.value)}
            disabled={loading}
          >
            {TIME_WINDOWS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button className="search-form__submit" type="submit" disabled={loading}>
        {loading ? 'Ricerca in corso...' : 'Ricerca dati'}
      </button>
    </form>
  )
}
