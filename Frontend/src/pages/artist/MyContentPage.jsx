import { useEffect, useMemo, useState } from 'react'
import * as musicService from '../../services/music.service.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Spinner from '../../components/ui/Spinner.jsx'

export default function MyContentPage() {
  const { user } = useAuth()
  const [songs, setSongs] = useState([])
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
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
    loadContent()
  }, [])

  const uploadedSongs = useMemo(
    () => songs.filter((song) => song.artist === user?.id || song.artist === user?._id),
    [songs, user],
  )

  const uploadedAlbums = useMemo(
    () => albums.filter((album) => album.artist?._id === user?.id || album.artist?._id === user?._id),
    [albums, user],
  )

  return (
    <div className="space-y-8 pb-32 lg:pb-24">
      <section className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">My content</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Manage your uploaded music.</h1>
            <p className="mt-4 text-sm text-slate-400">Review published songs and albums. Edit or delete actions are shown when backend support becomes available.</p>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
          <Spinner />
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-white">Songs</h2>
            <div className="mt-6 space-y-4">
              {uploadedSongs.length === 0 ? (
                <p className="text-slate-400">No songs uploaded yet.</p>
              ) : (
                uploadedSongs.map((song) => (
                  <div key={song._id} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-800/90 bg-slate-950/90 p-4">
                    <div>
                      <p className="font-semibold text-white">{song.title}</p>
                      <p className="text-sm text-slate-400">Uploaded by you</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="rounded-2xl border border-slate-700 px-3 py-2 text-xs text-slate-300" disabled>
                        Edit
                      </button>
                      <button type="button" className="rounded-2xl border border-slate-700 px-3 py-2 text-xs text-slate-300" disabled>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-white">Albums</h2>
            <div className="mt-6 space-y-4">
              {uploadedAlbums.length === 0 ? (
                <p className="text-slate-400">No albums created yet.</p>
              ) : (
                uploadedAlbums.map((album) => (
                  <div key={album._id} className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{album.title}</p>
                        <p className="text-sm text-slate-400">{album.Music?.length || 0} tracks</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="rounded-2xl border border-slate-700 px-3 py-2 text-xs text-slate-300" disabled>
                          Edit
                        </button>
                        <button type="button" className="rounded-2xl border border-slate-700 px-3 py-2 text-xs text-slate-300" disabled>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
