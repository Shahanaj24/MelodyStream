import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FiPlay } from 'react-icons/fi'
import * as musicService from '../../services/music.service.js'
import { usePlayer } from '../../context/PlayerContext.jsx'
import Spinner from '../../components/ui/Spinner.jsx'

export default function SongDetailsPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { playTrack } = usePlayer()
  const [song, setSong] = useState(location.state?.song || null)
  const [loading, setLoading] = useState(!song)

  useEffect(() => {
    const loadSong = async () => {
      if (song) return
      try {
        const response = await musicService.getSongs()
        const track = response.data.music?.find((item) => item._id === id)
        if (track) {
          setSong(track)
        } else {
          navigate('/browse', { replace: true })
        }
      } catch {
        navigate('/browse', { replace: true })
      } finally {
        setLoading(false)
      }
    }
    loadSong()
  }, [id, navigate, song])

  if (loading) {
    return (
      <div className="min-h-screen pb-32 lg:pb-24">
        <div className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
          <Spinner />
        </div>
      </div>
    )
  }

  if (!song) {
    return null
  }

  return (
    <div className="pb-32 lg:pb-24">
      <section className="card-surface rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Song details</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">{song.title}</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-400">Listen to the song and view album metadata, then add it to your queue.</p>
            <div className="mt-6 space-y-2 text-sm text-slate-400">
              <p>Artist: <span className="text-slate-200">{song.artist?.username || song.artist || 'Unknown Artist'}</span></p>
              <p>Source: <span className="text-slate-200">Remote audio stream</span></p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => playTrack(song)}
            className="btn-brand inline-flex items-center gap-2"
          >
            <FiPlay className="h-5 w-5" />
            Play song
          </button>
        </div>
      </section>
    </div>
  )
}
