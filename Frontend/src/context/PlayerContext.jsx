import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio())
  const [track, setTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.72)

  useEffect(() => {
    const audio = audioRef.current
    audio.volume = volume

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration || 0)
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const handleEnd = () => {
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnd)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnd)
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!track) {
      audio.pause()
      audio.src = ''
      setIsPlaying(false)
      return
    }

    audio.src = track.uri
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false)
      })
  }, [track])

  const playTrack = (music) => {
    setTrack(music)
  }

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!track) {
      return
    }
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false)
        })
    }
  }

  const setTrackProgress = (value) => {
    const audio = audioRef.current
    if (audio.duration) {
      audio.currentTime = value * audio.duration
      setProgress(value)
    }
  }

  const setTrackVolume = (value) => {
    setVolume(value)
    audioRef.current.volume = value
  }

  const value = useMemo(
    () => ({
      track,
      isPlaying,
      progress,
      currentTime,
      duration,
      volume,
      playTrack,
      togglePlayback,
      setTrackProgress,
      setTrackVolume,
    }),
    [track, isPlaying, progress, currentTime, duration, volume],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider')
  }
  return context
}
