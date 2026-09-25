export default function KeyStatsHighlight({ items }) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className="key-stats" aria-label="Statistiche principali">
      <p className="key-stats__eyebrow">In evidenza</p>
      <ul className="key-stats__list">
        {items.map((item) => (
          <li className="key-stats__item" key={item.label}>
            <span className="key-stats__value">{item.value}</span>
            <span className="key-stats__label">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
