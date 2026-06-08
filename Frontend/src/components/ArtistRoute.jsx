import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ArtistRoute({ children }) {
  const { user } = useAuth()

  if (!user || user.role !== 'artist') {
    return <Navigate to="/" replace />
  }

  return children
}
