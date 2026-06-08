import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as musicService from '../../services/music.service.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import Spinner from '../../components/ui/Spinner.jsx'

export default function CreateAlbumPage() {
  const { user } = useAuth()
  const [songs, setSongs] = useState([])
  const [selectedSongs, setSelectedSongs] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const navigate = useNavigate()

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

  const artistSongs = useMemo(
    () => songs.filter((song) => song.artist === user?.id || song.artist === user?._id),
    [songs, user],
  )

  const handleToggleSong = (id) => {
    setSelectedSongs((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title || selectedSongs.length === 0) {
      toast.error('Please select a title and at least one song for the album.')
      return
    }

    setLoading(true)
    try {
      await musicService.createAlbum({ title, Music: selectedSongs })
      toast.success('Album created successfully')
      navigate('/artist/content')
    } catch (err) {
      const message = err?.response?.data?.message || 'Unable to create album.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pb-32 lg:pb-24">
      <div className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Create album</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Bundle your songs into a new release.</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-400">Build an album by selecting previously uploaded tracks from your song collection.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <label className="space-y-2 text-sm text-slate-200">
            <span>Album title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter album title"
              className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/70"
            />
          </label>

          <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-6">
            <p className="text-sm text-slate-200">Select songs to include</p>
            {loading ? (
              <div className="mt-4"><Spinner /></div>
            ) : artistSongs.length === 0 ? (
              <p className="mt-4 text-sm text-slate-400">No uploaded songs found. Upload songs first before creating an album.</p>
            ) : (
              <div className="mt-4 grid gap-3">
                {artistSongs.map((song) => (
                  <button
                    key={song._id}
                    type="button"
                    onClick={() => handleToggleSong(song._id)}
                    className={`flex w-full items-center justify-between rounded-3xl border px-4 py-4 text-left transition ${
                      selectedSongs.includes(song._id)
                        ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200'
                        : 'border-slate-800/90 bg-slate-950/80 text-slate-200 hover:border-emerald-400/40'
                    }`}
                  >
                    <span>{song.title}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{selectedSongs.includes(song._id) ? 'Selected' : 'Tap'}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} className="btn-brand w-full">
            {loading ? <Spinner /> : 'Create album'}
          </button>
        </form>
      </div>
    </div>
  )
}
