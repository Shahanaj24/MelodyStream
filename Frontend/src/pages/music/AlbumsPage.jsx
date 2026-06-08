import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as musicService from '../../services/music.service.js'
import SearchBar from '../../components/ui/SearchBar.jsx'
import Spinner from '../../components/ui/Spinner.jsx'

export default function AlbumsPage() {
  const [albums, setAlbums] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const response = await musicService.getAlbums()
        setAlbums(response.data.albums || [])
      } catch {
      } finally {
        setLoading(false)
      }
    }
    loadAlbums()
  }, [])

  const filteredAlbums = albums.filter((album) => {
    const query = search.toLowerCase().trim()
    return (
      album.title.toLowerCase().includes(query) || String(album.artist?.username || album.artist || '').toLowerCase().includes(query)
    )
  })

  return (
    <div className="space-y-8 pb-32 lg:pb-24">
      <header className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Albums</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Explore curated album collections.</h1>
          </div>
          <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search albums or artists" />
        </div>
      </header>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-48 rounded-[32px] bg-slate-900/80 shadow-soft" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAlbums.length === 0 && (
            <div className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-center text-slate-400">No albums match that search.</div>
          )}
          {filteredAlbums.map((album) => (
            <Link
              key={album._id}
              to={`/album/${album._id}`}
              className="group rounded-[32px] border border-slate-800/90 bg-slate-950/90 p-6 transition hover:border-emerald-400/40"
            >
              <div className="mb-4 h-44 rounded-3xl bg-slate-800/80" />
              <div>
                <p className="text-xl font-semibold text-white">{album.title}</p>
                <p className="mt-2 text-sm text-slate-400">By {album.artist?.username || album.artist || 'Unknown Artist'}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
