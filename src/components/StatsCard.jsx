export default function StatsCard({ title, subtitle, rows, emptyMessage }) {
  const hasRows = Array.isArray(rows) && rows.length > 0

  return (
    <article className="stats-card">
      <header className="stats-card__header">
        <h3 className="stats-card__title">{title}</h3>
        {subtitle ? <p className="stats-card__subtitle">{subtitle}</p> : null}
      </header>

      {!hasRows ? (
        <p className="stats-card__empty">{emptyMessage || 'Nessun dato disponibile.'}</p>
      ) : (
        <dl className="stats-card__list">
          {rows.map((row) => (
            <div className="stats-card__row" key={`${title}-${row.label}`}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  )
}
