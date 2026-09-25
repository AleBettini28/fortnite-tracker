export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__mark" aria-hidden="true" />
        <div>
          <p className="app-header__eyebrow">Tracker</p>
          <h1 className="app-header__title">Fortnite Tracker</h1>
        </div>
      </div>
      <a
        className="app-header__link"
        href="https://dash.fortnite-api.com/"
        target="_blank"
        rel="noreferrer"
      >
        Powered by Fortnite-API
      </a>
    </header>
  )
}
