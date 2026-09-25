import Header from './components/Header'
import SearchForm from './components/SearchForm'
import StatsResults from './components/StatsResults'
import ErrorMessage from './components/ErrorMessage'
import LoadingState from './components/LoadingState'
import { usePlayerStats } from './hooks/usePlayerStats'

export default function App() {
  const { data, loading, error, search } = usePlayerStats()

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <div className="app-main__center">
          <SearchForm onSearch={search} loading={loading} />
          <LoadingState visible={loading} />
          <ErrorMessage message={error} />
          <StatsResults data={data} />
        </div>
      </main>
    </div>
  )
}
