import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-center">
      <div className="max-w-xl rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-10 shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80">Page not found</p>
        <h1 className="mt-6 text-4xl font-semibold text-white">404 / Page unavailable</h1>
        <p className="mt-4 text-sm leading-7 text-slate-400">
          We could not find the page you were looking for. Return to the dashboard and continue exploring music.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}
