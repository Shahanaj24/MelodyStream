import { usePlayer } from '../../context/PlayerContext.jsx'
import { FiPause, FiPlay, FiVolume2 } from 'react-icons/fi'

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds) || seconds === Infinity) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60)
  return `${minutes}:${remainder.toString().padStart(2, '0')}`
}

export default function PlayerBar() {
  const { track, isPlaying, progress, currentTime, duration, volume, togglePlayback, setTrackProgress, setTrackVolume } = usePlayer()

  if (!track) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800/90 bg-slate-950/95 backdrop-blur-xl px-4 py-3 shadow-[0_-2px_40px_rgba(0,0,0,0.45)] sm:px-6">
      <div className="mx-auto flex max-w-[1480px] items-center gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex flex-col gap-1 text-sm leading-none text-slate-200 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-white">{track.title}</p>
              <p className="text-slate-400">{track.artist?.username || track.artist || 'Unknown Artist'}</p>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <FiVolume2 className="h-4 w-4" />
              <input
                type="range"
                value={volume}
                min="0"
                max="1"
                step="0.01"
                onChange={(event) => setTrackVolume(Number(event.target.value))}
                className="h-1 w-24 cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlayback}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400 text-slate-950 transition hover:bg-emerald-300"
              >
                {isPlaying ? <FiPause className="h-5 w-5" /> : <FiPlay className="h-5 w-5" />}
              </button>
              <div className="flex-1">
                <input
                  type="range"
                  value={progress}
                  min="0"
                  max="1"
                  step="0.001"
                  onChange={(event) => setTrackProgress(Number(event.target.value))}
                  className="h-1 w-full cursor-pointer accent-emerald-400"
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
