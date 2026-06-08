export default function SearchBar({ value, onChange, placeholder = 'Search songs, albums or artists' }) {
  return (
    <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 shadow-soft">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
      />
    </div>
  )
}
