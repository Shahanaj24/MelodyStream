import api from './api.js'

export function getSongs() {
  return api.get('/music')
}

export function getAlbums() {
  return api.get('/music/albumlist')
}

export function getAlbumById(id) {
  return api.get(`/music/album/${id}`)
}

export function uploadSong(formData) {
  return api.post('/music/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function createAlbum(payload) {
  return api.post('/music/album', payload)
}
