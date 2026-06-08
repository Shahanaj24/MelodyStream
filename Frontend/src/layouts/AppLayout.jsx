import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import Sidebar from '../components/layout/Sidebar.jsx'
import PlayerBar from '../components/layout/PlayerBar.jsx'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-[1480px] gap-6 px-4 py-4 sm:px-6 xl:px-8">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <PlayerBar />
    </div>
  )
}
