import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import * as musicService from '../../services/music.service.js'
import { useAuth } from '../../context/AuthContext.jsx'
import Spinner from '../../components/ui/Spinner.jsx'

export default function ArtistDashboardPage() {
  const { user } = useAuth()
  const [songs, setSongs] = useState([])
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArtistData = async () => {
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
    loadArtistData()
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
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Artist dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Welcome back, {user?.username}</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-400">Use the artist tools to upload songs, build albums, and see your current music library.</p>
          </div>
          <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Quick actions</p>
            <div className="mt-4 space-y-3">
              <Link className="block rounded-3xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-emerald-400/40" to="/artist/upload">
                Upload a song
              </Link>
              <Link className="block rounded-3xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-emerald-400/40" to="/artist/albums">
                Create a new album
              </Link>
              <Link className="block rounded-3xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-200 transition hover:border-emerald-400/40" to="/artist/content">
                View uploaded content
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { label: 'Your songs', value: uploadedSongs.length },
          { label: 'Your albums', value: uploadedAlbums.length },
          { label: 'Artist role', value: 'Enabled' },
        ].map((item) => (
          <div key={item.label} className="rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Recent uploads</p>
        <div className="mt-6 space-y-4">
          {loading ? (
            <Spinner />
          ) : uploadedSongs.length === 0 ? (
            <p className="text-slate-400">You have not uploaded any songs yet. Start by uploading a track.</p>
          ) : (
            uploadedSongs.slice(0, 4).map((song) => (
              <div key={song._id} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-800/90 bg-slate-950/90 p-4">
                <div>
                  <p className="font-semibold text-white">{song.title}</p>
                  <p className="text-sm text-slate-400">{song.artist?.username || 'You'}</p>
                </div>
                <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">Song</span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
