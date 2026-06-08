export function formatRole(role) {
  return role === 'artist' ? 'Artist' : 'Listener'
}

export function getAvatarLetters(name) {
  if (!name) return 'MS'
  const parts = name.trim().split(' ')
  return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() : parts[0].slice(0, 2).toUpperCase()
}
