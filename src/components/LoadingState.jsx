export default function LoadingState({ visible }) {
  if (!visible) {
    return null
  }

  return (
    <div className="status-banner status-banner--loading" role="status">
      <span className="status-banner__spinner" aria-hidden="true" />
      <p>Recupero dei dati in corso...</p>
    </div>
  )
}
