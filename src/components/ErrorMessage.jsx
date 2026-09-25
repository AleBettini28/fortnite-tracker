export default function ErrorMessage({ message }) {
  if (!message) {
    return null
  }

  return (
    <div className="status-banner status-banner--error" role="alert">
      <strong>Errore</strong>
      <p>{message}</p>
    </div>
  )
}
