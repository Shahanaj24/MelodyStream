import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as musicService from '../../services/music.service.js'
import { useToast } from '../../context/ToastContext.jsx'
import Spinner from '../../components/ui/Spinner.jsx'

export default function UploadSongPage() {
  const [title, setTitle] = useState('')
  const [musicFile, setMusicFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setMusicFile(null)
      return
    }
    setMusicFile(file)
  }

  const handleCoverChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setCoverPreview(null)
      return
    }
    setCoverPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title || !musicFile) {
      toast.error('Please provide both title and a music file.')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('music', musicFile)
      await musicService.uploadSong(formData)
      toast.success('Song uploaded successfully')
      navigate('/artist/content')
    } catch (err) {
      const message = err?.response?.data?.message || 'Upload failed. Please try again.'
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
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Upload song</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Share your latest track with listeners.</h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-400">Upload an audio file and preview a cover image locally before submission.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <label className="space-y-2 text-sm text-slate-200">
            <span>Song title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter song title"
              className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/70"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            <span>Audio file</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-emerald-500/10 file:px-4 file:py-2 file:text-sm file:text-emerald-300"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            <span>Cover preview (optional)</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-sky-500/10 file:px-4 file:py-2 file:text-sm file:text-sky-300"
            />
          </label>

          {coverPreview && (
            <div className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-4">
              <p className="text-sm text-slate-400">Preview:</p>
              <img src={coverPreview} alt="Cover preview" className="mt-3 w-full rounded-3xl object-cover" />
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-brand w-full">
            {loading ? <Spinner /> : 'Upload song'}
          </button>
          <p className="text-sm text-slate-400">Note: cover image preview is local only; audio uploads use the existing backend upload endpoint.</p>
        </form>
      </div>
    </div>
  )
}
