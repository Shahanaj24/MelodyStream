import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import ArtistRoute from '../components/ArtistRoute.jsx'
import LoginPage from '../pages/auth/LoginPage.jsx'
import RegisterPage from '../pages/auth/RegisterPage.jsx'
import HomePage from '../pages/home/HomePage.jsx'
import BrowsePage from '../pages/music/BrowsePage.jsx'
import AlbumsPage from '../pages/music/AlbumsPage.jsx'
import AlbumDetailsPage from '../pages/music/AlbumDetailsPage.jsx'
import SongDetailsPage from '../pages/music/SongDetailsPage.jsx'
import LibraryPage from '../pages/music/LibraryPage.jsx'
import ArtistDashboardPage from '../pages/artist/ArtistDashboardPage.jsx'
import UploadSongPage from '../pages/artist/UploadSongPage.jsx'
import CreateAlbumPage from '../pages/artist/CreateAlbumPage.jsx'
import MyContentPage from '../pages/artist/MyContentPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ProtectedRoute />}> 
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="albums" element={<AlbumsPage />} />
          <Route path="album/:id" element={<AlbumDetailsPage />} />
          <Route path="song/:id" element={<SongDetailsPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="artist" element={<ArtistRoute><ArtistDashboardPage /></ArtistRoute>} />
          <Route path="artist/upload" element={<ArtistRoute><UploadSongPage /></ArtistRoute>} />
          <Route path="artist/albums" element={<ArtistRoute><CreateAlbumPage /></ArtistRoute>} />
          <Route path="artist/content" element={<ArtistRoute><MyContentPage /></ArtistRoute>} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
