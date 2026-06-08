import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { FiCompass, FiGrid, FiHeadphones, FiLayers, FiUpload, FiHeart } from 'react-icons/fi'

const navLinks = [
  { label: 'Home', path: '/', icon: FiGrid },
  { label: 'Browse', path: '/browse', icon: FiCompass },
  { label: 'Albums', path: '/albums', icon: FiLayers },
  { label: 'Library', path: '/library', icon: FiHeadphones },
]

const artistLinks = [
  { label: 'Dashboard', path: '/artist', icon: FiGrid },
  { label: 'Upload Song', path: '/artist/upload', icon: FiUpload },
  { label: 'Create Album', path: '/artist/albums', icon: FiLayers },
  { label: 'My Content', path: '/artist/content', icon: FiHeart },
]

export default function Sidebar() {
  const { user } = useAuth()

  return (
    <aside className="hidden w-72 shrink-0 flex-col gap-4 lg:flex">
      <div className="card-surface space-y-4">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Navigation</p>
        <div className="space-y-2">
          {navLinks.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-300 hover:bg-slate-800/70'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            )
          })}
        </div>
      </div>

      {user?.role === 'artist' && (
        <div className="card-surface space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Artist tools</p>
          <div className="space-y-2">
            {artistLinks.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-300 hover:bg-slate-800/70'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              )
            })}
          </div>
        </div>
      )}
    </aside>
  )
}
