---
title: Client Structure Guide
description: Overview of the frontend application structure, folders, components, and development tips
---

# KYUSDA Website v2 - Client Structure

## Overview

The `client/` folder contains the frontend application for the KYUSDA website. It is built with **Vite**, **React**, **TypeScript**, and **Tailwind CSS**.

## Key Files

- `package.json` - frontend dependencies, scripts, and project metadata.
- `tsconfig.json` - TypeScript configuration for the React app.
- `vite.config.ts` - Vite build and dev server configuration.
- `tailwind.config.ts` - Tailwind CSS configuration.
- `postcss.config.js` - PostCSS setup.
- `StaticWeb.config.json` / `staticwebapp.config.json` - Azure Static Web App configuration.
- `vercel.json` - deployment settings for Vercel (if used).
- `Dockerfile` - containerization instructions for frontend builds.

## Important Folders

- `public/` - static assets served directly by the app, such as `manifest.json` and `robots.txt`.
- `src/` - application source code.
  - `App.tsx` - root application component.
  - `main.tsx` - application entry point.
  - `routes/` - route definitions and page navigation.
  - `components/` - reusable React components.
  - `LandingPage/` - homepage and landing page sections.
  - `Dashboard/` - authenticated dashboard experience.
  - `services/` - API service wrappers and backend integrations.
  - `hooks/` - custom React hooks.
  - `context/` - React context providers for app state.
  - `utils/` - shared utilities and helper functions.
  - `assets/` - local image and media assets.

## How to Navigate

- Start with `src/App.tsx` and `src/main.tsx` to understand app initialization.
- Use `src/routes/` to find how pages are wired and which components render specific views.
- Place reusable UI components inside `src/components/`.
- Update API consumption logic in `src/services/` when backend endpoints change.
- Use `src/hooks/` and `src/context/` for shared application state and behavior.

## Developer Tips

- Keep component state localized unless it must be shared globally.
- Use Tailwind utility classes in component markup, with custom styles only when needed.
- For new pages, add route entries in `src/routes/` and corresponding page components.
- Review `package.json` scripts for dev (`npm run dev`), build (`npm run build`), and preview workflows.

## Running the project locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Access the app at `http://localhost:5173` (or the port specified in the console).

## Building for production

1. Build the frontend for production:

   ```bash
   npm run build
   ```

2. The production-ready files will be in the `dist/` folder, ready for deployment to Vercel or another hosting platform.
