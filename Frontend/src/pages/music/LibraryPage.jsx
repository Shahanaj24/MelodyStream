import { useEffect, useMemo, useState } from 'react'
import { FiPlay } from 'react-icons/fi'
import * as musicService from '../../services/music.service.js'
import SearchBar from '../../components/ui/SearchBar.jsx'
import { usePlayer } from '../../context/PlayerContext.jsx'
import Spinner from '../../components/ui/Spinner.jsx'

export default function LibraryPage() {
  const [songs, setSongs] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const { playTrack } = usePlayer()

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const response = await musicService.getSongs()
        setSongs(response.data.music || [])
      } catch {
      } finally {
        setLoading(false)
      }
    }
    loadSongs()
  }, [])

  const searchResults = useMemo(() => {
    const query = search.toLowerCase().trim()
    if (!query) return songs
    return songs.filter((song) => song.title.toLowerCase().includes(query) || String(song.artist?.username || song.artist || '').toLowerCase().includes(query))
  }, [search, songs])

  return (
    <div className="space-y-8 pb-32 lg:pb-24">
      <section className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Library</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Your personal music collection</h1>
            <p className="mt-3 text-sm text-slate-400">Browse songs, queue favorites, and control playback from a single responsive view.</p>
          </div>
          <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your library" />
        </div>
      </section>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="h-44 rounded-[32px] bg-slate-900/80 shadow-soft" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {searchResults.length === 0 ? (
            <div className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-center text-slate-400">No songs found in your library.</div>
          ) : (
            searchResults.map((song) => (
              <div key={song._id} className="group rounded-[32px] border border-slate-800/90 bg-slate-950/90 p-6 transition hover:border-emerald-400/40">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{song.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{song.artist?.username || song.artist || 'Unknown Artist'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => playTrack(song)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400 text-slate-950 transition hover:bg-emerald-300"
                  >
                    <FiPlay className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-5 text-sm text-slate-500">A curated library of your available songs.</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
