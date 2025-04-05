# VueMap-Explorer

Interactive 3D map platform
**Designed for professional, production-level use** – from small personal trips to large-scale route management, with an **intuitive design** and **Mobile-First** approach.

> **An advanced Vue 3 + Mapbox application for exploring, annotating, and sharing geospatial data**  
> Complete with 3D routes, Swiper-based UIs, iOS optimizations, PWA offline capabilities, and a Node/Express backend with Swagger.

[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883.svg?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-^4.x-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Mapbox GL](https://img.shields.io/badge/Mapbox%20GL-Latest-blue.svg)](https://www.mapbox.com/)
[![PWA Support](https://img.shields.io/badge/PWA-Supported-brightgreen.svg?logo=pwa&logoColor=white)](#pwa-installation-instructions)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

## Table of Contents

- [Demo Links](#demo-links)
- [Open API Swagger Documentation](#swagger-api-documentation)
- [Features](#features)
- [Installation](#installation)
  - [Project Setup](#project-setup)
  - [Compile and Hot-Reload for Development](#compile-and-hot-reload-for-development)
  - [Compile and Minify for Production](#compile-and-minify-for-production)
  - [Run Unit Tests](#run-unit-tests)
  - [Lint with ESLint](#lint-with-eslint)
- [PWA Installation Instructions](#pwa-installation-instructions)
- [Tech Stack & Highlights](#tech-stack--highlights)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact & Feedback](#contact--feedback)

---

## Demo Links

- **Live Frontend (Vercel)**:  
  [https://vue-map-explorer.vercel.app](https://vue-map-explorer.vercel.app) 🗺

---

## Open API Swagger Documentation

This project integrated with a **Node/Express** backend providing **Open API** includes **Swagger** UI documentation.

- **Open API (Swagger) on Render:**
  [https://backend-vue-map-explorer.onrender.com/api-docs](https://backend-vue-map-explorer.onrender.com/api-docs) ✔

- **Production Server (Render):**
  [https://backend-vue-map-explorer.onrender.com](https://backend-vue-map-explorer.onrender.com) 🌍

All endpoints are described in `swagger.json`, covering
**User, Points, Routes,** and more. You can test requests directly in the
browser using the “Try it out” button, but note that you must provide a valid
**Bearer token** for protected routes.

**Important**: If you’re dealing with very large data (e.g. tens of thousands of
coordinates), Swagger UI may lag while rendering the JSON response. In such
cases, Postman or cURL might be more responsive for heavy payloads.

---

## Features

- **3D Routes & Custom Markers**:  
  Powered by [Mapbox GL](https://www.mapbox.com/). Easily add, edit, or remove markers and see 3D transitions for routes.

- **Mobile First and Adaptive UI**:
  Tailored for phones and tablets – the app also runs great on desktops/laptops for advanced tasks.
  Designed based on real-world user experiences on mobile/tablet devices.

- **Responsive & iOS-Optimized**:  
  Special care for iPhone/iPad (safe-area insets, orientation fix, etc.). PWA with black-translucent status bar.

- **Pinia State Management**:  
  Coordinates user sessions, active route data, and iOS detection (`isIOS`) for dynamic UI.

- **Swiper Cards**:  
  Swipe through points of interest in a sliding gallery. Overcame iOS quirks for clickable side slides.

- **Secure Auth (JWT)**:  
  Connects to a Node/Express backend using Bearer tokens. Protected routes for user-based markers.

- **Offline-Ready**:  
  Deployed as a PWA. Install on mobile devices and continue exploring even without network.

---

## Installation

## Project Setup

```sh
    npm install
```

### Compile and Hot-Reload for Development

```sh
    npm run dev
```

### Compile and Minify for Production

```sh
    npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
    npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
    npm run lint
```

### PWA Installation Instructions:

### Android

1. Open the app in your browser (Chrome etc.) on your Android phone.
2. You will see a banner prompting to **Add to Home Screen**. Follow the instructions to install.
3. Launch from your home screen as if it’s a native app.

### iPhone/iPad (Safari)

1. Open the app in **Safari**.
2. Tap the **Share** button (the icon with an arrow pointing out of a box).
3. Scroll down and select **Add to Home Screen**.
4. Confirm by tapping **Add** in the top-right corner.

After installation, the app will appear on your home screen like a native app!

---

## Tech Stack & Highlights

- **Vue 3 + Vite**
  Lightning-fast development, modern ES builds.

- **Pinia**
  Simple yet powerful state management.

- **Mapbox GL**
  Real-time 2D/3D maps, custom markers & route layers.

- **Swiper.js**
  For slick marker/route card slideshows with iOS fixes.

- **Tailwind CSS**
  Utility-first styling, responsive breakpoints.

- **Node/Express backend (separate repo)**
  JWT auth, user route sharing, image upload, etc.

- **Deployed** to Vercel (frontend) + Render (backend)

---

## iOS & iPad Adaptations

- `viewport-fit=cover`, handling safe-area insets.

- Orientation & scale fixes to prevent auto-zoom.

- PWA `apple-mobile-web-app-capable=YES` with `black-translucent` status bar.

---

## Roadmap

- **Enhanced Route Editing:** Multi-waypoints, partial updates, color-coded lines.

- **Sharing & Collaboration:** Invites, rating system, real-time comment threads.

- **Offline Caching:** Full offline usage for markers & routes.

- **TypeScript:** Migrate backend to TS for end-to-end typed dev.

- **CI/CD:** Automated tests & deploy on merges.

---

## License

[MIT License].
Feel free to use or modify. If you make improvements, consider a pull request.

---

## Contact & Feedback

- **Author:** [@maxexc](https://github.com/maxexc)

- **Contributions:** PRs/issues are welcome here.

- **Questions?** Feel free to open a discussion or contact me directly.

---

**Enjoy exploring your geospatial data with VueMap-Explorer!**
Feel free to star this repo if you find it helpful.
