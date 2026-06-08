import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlay } from 'react-icons/fi'
import * as musicService from '../../services/music.service.js'
import { usePlayer } from '../../context/PlayerContext.jsx'
import SearchBar from '../../components/ui/SearchBar.jsx'
import Spinner from '../../components/ui/Spinner.jsx'

export default function BrowsePage() {
  const [songs, setSongs] = useState([])
  const [albums, setAlbums] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const { playTrack, track } = usePlayer()

  useEffect(() => {
    const load = async () => {
      try {
        const [songsResponse, albumsResponse] = await Promise.all([
          musicService.getSongs(),
          musicService.getAlbums(),
        ])
        setSongs(songsResponse.data.music || [])
        setAlbums(albumsResponse.data.albums || [])
      } catch {
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredSongs = useMemo(() => {
    const query = search.toLowerCase().trim()
    if (!query) return songs
    return songs.filter((item) => item.title.toLowerCase().includes(query) || String(item.artist?.username || item.artist || '').toLowerCase().includes(query))
  }, [search, songs])

  const filteredAlbums = useMemo(() => {
    const query = search.toLowerCase().trim()
    if (!query) return albums
    return albums.filter((album) => album.title.toLowerCase().includes(query) || String(album.artist?.username || album.artist || '').toLowerCase().includes(query))
  }, [search, albums])

  return (
    <div className="space-y-8 pb-32 lg:pb-24">
      <header className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Browse</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Search and play your favorite songs.</h1>
          </div>
          <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
      </header>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-40 rounded-[32px] bg-slate-900/80 shadow-soft" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[0.8fr_0.4fr]">
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Songs</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Play now</h2>
              </div>
              <Link to="/library" className="rounded-full border border-slate-800/80 px-4 py-2 text-sm text-slate-300 transition hover:border-emerald-400/40">
                Open library
              </Link>
            </div>
            <div className="grid gap-4">
              {filteredSongs.length === 0 ? (
                <div className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-center text-slate-400">No songs matched your search.</div>
              ) : (
                filteredSongs.map((song) => (
                  <div key={song._id} className="group flex flex-col rounded-[28px] border border-slate-800/90 bg-slate-950/90 p-5 transition hover:border-emerald-400/40">
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
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-400">
                      <span className="inline-flex rounded-full bg-slate-800/70 px-3 py-1">Available now</span>
                      <Link
                        to={`/song/${song._id}`}
                        state={{ song }}
                        className="text-emerald-300 transition hover:text-emerald-400"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Albums</p>
              <div className="mt-5 grid gap-4">
                {filteredAlbums.length === 0 ? (
                  <p className="text-sm text-slate-400">No albums found. Try a broader search.</p>
                ) : (
                  filteredAlbums.slice(0, 4).map((album) => (
                    <Link
                      key={album._id}
                      to={`/album/${album._id}`}
                      className="block rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4 transition hover:border-emerald-400/40"
                    >
                      <p className="font-semibold text-white">{album.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{album.artist?.username || album.artist || 'Unknown Artist'}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
