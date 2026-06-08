import { useToast } from '../../context/ToastContext.jsx'
import { FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'

const typeStyles = {
  success: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  error: 'border-rose-400/30 bg-rose-500/10 text-rose-200',
  info: 'border-sky-400/30 bg-sky-500/10 text-sky-200',
}

export function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3 px-2">
      {toasts.map((toast) => (
        <div key={toast.id} className={`card-surface border-l-4 ${typeStyles[toast.type]}`}>
          <div className="flex items-start gap-3">
            <div className="mt-1 text-lg">
              {toast.type === 'success' ? <FiCheckCircle /> : toast.type === 'error' ? <FiXCircle /> : <FiInfo />}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{toast.title}</p>
              <p className="mt-1 text-sm text-slate-300">{toast.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
