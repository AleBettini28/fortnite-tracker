export default function StatsImage({ src, playerName }) {
  if (!src) {
    return null
  }

  return (
    <figure className="stats-image">
      <img
        className="stats-image__media"
        src={src}
        alt={`Statistiche Fortnite di ${playerName || 'giocatore'}`}
        loading="lazy"
      />
      <figcaption className="stats-image__caption">
        Immagine stats generata da Fortnite-API
      </figcaption>
    </figure>
  )
}
