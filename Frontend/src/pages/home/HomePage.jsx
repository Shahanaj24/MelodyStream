import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as musicService from '../../services/music.service.js'
import Spinner from '../../components/ui/Spinner.jsx'

export default function HomePage() {
  const [songs, setSongs] = useState([])
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
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

    loadData()
  }, [])

  return (
    <div className="space-y-8 pb-32 lg:pb-24">
      <section className="card-surface grid gap-6 rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Your sound</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Discover the soundtrack to your day.</h1>
            <p className="max-w-2xl text-sm text-slate-400 sm:text-base">
              Stream new songs, explore albums, and manage your artist releases with a modern, mobile-first experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/browse" className="btn-brand">
                Browse songs
              </Link>
              <Link to="/albums" className="inline-flex items-center justify-center rounded-full border border-slate-700/80 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600">
                Explore albums
              </Link>
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-800/90 bg-gradient-to-br from-slate-900/75 to-slate-950/90 p-6 shadow-soft">
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-900/90 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Recently streamed</p>
                <p className="mt-3 text-lg font-semibold text-white">Create an album mood or listen to curated playlists.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Songs</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{songs.length}</p>
                </div>
                <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Albums</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{albums.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Trending now</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Featured songs</h2>
          <p className="mt-3 text-sm text-slate-400">Play the newest releases or keep listening to songs you love.</p>

          {loading ? (
            <div className="mt-8 space-y-4">
              <div className="h-20 rounded-3xl bg-slate-800/90" />
              <div className="h-20 rounded-3xl bg-slate-800/90" />
            </div>
          ) : (
            <div className="mt-8 grid gap-4">
              {songs.slice(0, 3).map((song) => (
                <div key={song._id} className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-800/80 bg-slate-950/90 p-4 transition hover:border-emerald-400/40">
                  <div>
                    <p className="font-semibold text-white">{song.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{song.artist?.username || song.artist || 'Unknown Artist'}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-300">Play</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Quick access</p>
          <div className="mt-6 grid gap-4">
            <Link to="/browse" className="rounded-3xl border border-slate-800/80 bg-slate-950/80 px-5 py-5 text-sm text-slate-200 transition hover:border-emerald-400/40">
              Discover songs and build your queue.
            </Link>
            <Link to="/albums" className="rounded-3xl border border-slate-800/80 bg-slate-950/80 px-5 py-5 text-sm text-slate-200 transition hover:border-emerald-400/40">
              Explore all available albums.
            </Link>
            <Link to="/library" className="rounded-3xl border border-slate-800/80 bg-slate-950/80 px-5 py-5 text-sm text-slate-200 transition hover:border-emerald-400/40">
              Open your music library.
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
