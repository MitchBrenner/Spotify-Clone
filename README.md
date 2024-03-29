# Spotify Clone

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Frontend

### Styling

Tailwind CSS

To hide scrollbar I used [tailwind-scrollbar-hide](https://www.npmjs.com/package/tailwind-scrollbar-hide), must add to tailwind pluggins
```bash
npm install tailwind-scrollbar-hide
```

The icons are from [https://heroicons.com/](https://heroicons.com/)


```bash
npm install @heroicons/react
```

[Lodash for utility functions](https://lodash.com/)

## Auth

Used [`next-auth`](https://next-auth.js.org/getting-started/example) for authentication

Used middleware to protect routes

## Spotify

Using spotify API

Utilizing [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) for helper functions

```bash
npm install spotify-web-api-node
```

`page/api/auth/[...nextauth].js` and `lib/spotify.js` are the main files for authentication and spotify API calls


## State Management

Using [recoil](https://recoiljs.org/) for state management

```bash
npm install recoil
```

- `recoil` is used to manage states such as playlist
- must wrap the app with `RecoilRoot` in `pages/_app.js`
- all the states are in the `atoms` folder

