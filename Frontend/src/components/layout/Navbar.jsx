import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { FiLogOut, FiMusic, FiUser } from 'react-icons/fi'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-4 py-4 sm:px-6 xl:px-8">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-white transition hover:text-emerald-400">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400/20 to-sky-500/20 text-emerald-300 shadow-soft">
            <FiMusic className="h-5 w-5" />
          </span>
          MelodyStream
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 rounded-full border border-slate-800/80 bg-white/5 px-4 py-2 text-sm text-slate-200 sm:flex">
            <FiUser className="h-4 w-4" />
            <span className="font-medium">{user?.username}</span>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">{user?.role}</span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            <FiLogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
