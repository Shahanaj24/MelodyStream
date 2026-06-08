import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import Spinner from '../../components/ui/Spinner.jsx'

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(form)
      navigate(from, { replace: true })
    } catch (err) {
      const message = err?.response?.data?.message || 'Unable to log in. Check credentials.'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-8 shadow-soft backdrop-blur-xl sm:p-10">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Welcome back</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Sign in to MelodyStream</h1>
          <p className="mx-auto max-w-xl text-sm text-slate-400">
            Enter your credentials to continue exploring music, albums, and artist tools.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              <span>Username or email</span>
              <input
                required
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Type your username or email"
                className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/70"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-200">
              <span>Password</span>
              <input
                required
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/70"
              />
            </label>
          </div>

          {error && <p className="rounded-3xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-brand w-full"
          >
            {loading ? <Spinner /> : 'Continue to MelodyStream'}
          </button>
        </form>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-center text-sm text-slate-400">
          New to MelodyStream?{' '}
          <Link to="/register" className="font-semibold text-emerald-300 transition hover:text-emerald-400">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}
