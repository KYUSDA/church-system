---
title: Server Structure Guide
description: Overview of the backend API structure, controllers, models, routes, and development tips
---

# KYUSDA Website v2 - Server Structure

## Overview

The `server/` folder contains the backend API for KYUSDA. It is built with **Node.js**, **Express**, and **TypeScript**.

## Key Files

- `package.json` - backend dependencies, scripts, and project metadata.
- `tsconfig.json` - TypeScript configuration for the server.
- `Dockerfile` - containerization instructions for the API server.
- `app.ts` / `server.ts` - server entry points and app bootstrap.
- `.env` - environment variables for local development.

## Important Folders

- `@types/` - custom TypeScript type definitions.
- `Controlers/` - Express controller functions for request handling.
- `Models/` - Mongoose or data-layer models used by the API.
- `Router/` - route definitions and endpoint wiring.
- `middleware/` - Express middleware such as authentication, error handling, and request validation.
- `utils/` - shared utility modules like database connection, JWT helpers, error classes, and mail utilities.
- `mail/` - email templates used by notification and user workflows.
- `reqs/` - HTTP request examples for testing with tools like VS Code REST client.
- `assets/` - any static assets used by the server app.

## How to Navigate

- Start with `app.ts` to understand how the Express app is configured and middleware is applied.
- Use `Router/` to trace endpoint declarations and connect controller functions.
- Inspect `Controlers/` for business logic and response handling.
- Use `Models/` to understand database schema and object relationships.
- Add reusable functions to `utils/` instead of duplicating logic across controllers.

## Developer Tips

- Keep route definitions clean by moving business logic into controller files.
- Use middleware for repeated behaviors such as authentication checks and error handling.
- Document new endpoints clearly in `reqs/test.http` if additional request examples are needed.
- Keep configuration values in `.env` and avoid committing secrets.

## How to run the project locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm run dev
   ```

3. The API will be available at `http://localhost:8000` (or the port specified in `.env`).

## Building for production

1. Build the server for production:

2. ```bash
   npm run build
   ```

3. Start the production server:

    ```bash
    npm start
    ```

### Project Requirement

- `MongoDB Compass` for local database management and testing. + THE `MONGODB COMMUNITY SERVER`
- `Postman` for API testing and endpoint verification. OR `VS CODE REST CLIENT`
- `Docker` for containerization and deployment of the backend API.
- `Git` for version control and collaboration on the server codebase.
- `Node.js` and `npm` for managing dependencies and running the server locally.
- `TypeScript` for type safety and improved developer experience in the backend code.
- `Express.js` for building the RESTful API and handling HTTP requests and responses.
- `Mongoose` (or similar ORM) for modeling and interacting with the MongoDB database
- `dotenv` for managing environment variables and configuration settings in development and production environments.
- `Brevo` (formerly Sendinblue) for email services and notifications within the application.
- `Cloudinary` for media management and hosting of images and other assets used by the server.
  