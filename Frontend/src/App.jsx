import AppRoutes from './routes/AppRoutes.jsx'
import { ToastContainer } from './components/ui/Toast.jsx'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <AppRoutes />
      <ToastContainer />
    </div>
  )
}

export default App
