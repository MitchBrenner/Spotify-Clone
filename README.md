# 🎧 Spotify Web App Clone

Live demo: [spotify-red-delta.vercel.app](https://spotify-red-delta.vercel.app)

A modern, responsive Spotify clone that connects with the real Spotify API, allowing users to browse playlists, authenticate securely, and control playback using their actual Spotify account.

**Note:** You must have the Spotify app open on your device in order to play songs — this is a limitation of Spotify's API.

---

## 🚀 Features

- Login with your Spotify account via OAuth
- Browse your personal playlists
- View and control playback
- Dynamic, responsive UI
- Hover and animation effects for rich interactivity

---

## 🎨 Frontend

This project uses **Tailwind CSS** for styling and layout.  
Custom scrollbars are hidden using the `tailwind-scrollbar-hide` plugin.

Icons are provided by **Heroicons** for a modern and clean look.

---

## 🔐 Authentication

Authentication is handled using **NextAuth.js** with Spotify as the provider.  
Middleware is used to protect sensitive routes so that only authenticated users can access core features of the app.

---

## 🎵 Spotify Integration

This app connects to the **Spotify Web API** using the `spotify-web-api-node` library.  
Helper functions in `lib/spotify.js` and configuration in `pages/api/auth/[...nextauth].js` power the API requests, manage tokens, and control playback.

You must have your Spotify app open to enable music playback through this interface — required by Spotify’s API policy.

---

## ⚛️ State Management

App state is managed using **Recoil**, a lightweight and flexible state management library.

Recoil is used to manage things like:

- The currently selected playlist
- The currently playing song
- Whether a song is playing or paused

All state atoms/selectors are organized in the `atoms` folder. The app is wrapped in `RecoilRoot` to provide global state access across pages and components.

---

## 📌 Reminder

Spotify's API requires a Spotify Premium account and an open Spotify app session to control playback. Without this, you can still browse playlists but playback controls may not function.

---
