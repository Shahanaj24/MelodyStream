import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiPlay } from 'react-icons/fi'
import * as musicService from '../../services/music.service.js'
import { usePlayer } from '../../context/PlayerContext.jsx'
import Spinner from '../../components/ui/Spinner.jsx'

export default function AlbumDetailsPage() {
  const { id } = useParams()
  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const { playTrack } = usePlayer()

  useEffect(() => {
    const loadAlbum = async () => {
      try {
        const response = await musicService.getAlbumById(id)
        setAlbum(response.data.album)
      } catch {
      } finally {
        setLoading(false)
      }
    }
    loadAlbum()
  }, [id])

  return (
    <div className="space-y-8 pb-32 lg:pb-24">
      {loading ? (
        <div className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
          <Spinner />
        </div>
      ) : !album ? (
        <div className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
          <p className="text-slate-300">Album not found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <section className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
            <div className="grid gap-6 lg:grid-cols-[0.65fr_0.35fr] lg:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Album</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">{album.title}</h1>
                <p className="mt-4 max-w-2xl text-sm text-slate-400">Explore the songs included in this album and play them instantly from the detail page.</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span className="rounded-full bg-slate-800/70 px-3 py-2">{album.Music?.length || 0} tracks</span>
                  <span className="rounded-full bg-slate-800/70 px-3 py-2">By {album.artist?.username || 'Unknown Artist'}</span>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-6 text-sm text-slate-300">
                <p className="font-semibold text-white">Quick actions</p>
                <p className="mt-3">Play the album or browse songs in full detail.</p>
                <Link to="/browse" className="mt-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition hover:bg-emerald-500/15">
                  Browse all songs
                </Link>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Tracks</h2>
                <p className="text-sm text-slate-400">Play each song in the album.</p>
              </div>
            </div>
            <div className="grid gap-4">
              {album.Music?.length > 0 ? (
                album.Music.map((song) => (
                  <div key={song._id} className="group flex items-center justify-between gap-4 rounded-[28px] border border-slate-800/90 bg-slate-950/90 p-5 transition hover:border-emerald-400/40">
                    <div>
                      <p className="text-lg font-semibold text-white">{song.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{album.artist?.username || 'Unknown Artist'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => playTrack(song)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400 text-slate-950 transition hover:bg-emerald-300"
                      >
                        <FiPlay className="h-5 w-5" />
                      </button>
                      <Link
                        to={`/song/${song._id}`}
                        state={{ song }}
                        className="text-sm font-medium text-emerald-300 transition hover:text-emerald-400"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-400">No tracks are available for this album.</div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
