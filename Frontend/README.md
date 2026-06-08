# MelodyStream Frontend

A modern React + Tailwind CSS frontend for the existing MelodyStream backend.

## Setup

1. Copy environment variables:

   ```bash
   cd Frontend
   copy .env.example .env
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Features

- Login and register flow using existing backend authentication endpoints
- Protected routes for authenticated users
- Role-based artist UI and dashboard pages
- Browse songs, explore albums, and view song details
- Song upload and album creation for artists
- Playback controls, progress bar, and volume settings
- Responsive dark theme with Tailwind CSS

## Notes

- The frontend sends requests to `/api` and uses `withCredentials: true` for cookie-based JWT authentication.
- Use `VITE_API_BASE_URL` in `.env` to configure the API base URL for production.
- Use `VITE_API_PROXY` in `.env` for local development proxying.
