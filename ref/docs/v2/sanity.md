---
title: Sanity CMS Structure Guide
description: Overview of the Sanity backend structure, schemas, configuration, and content management
---

# KYUSDA Website v2 - Sanity Structure

## Overview

The `backend_sanity/` folder contains the Sanity CMS backend for the KYUSDA website. It manages content schema, CMS configuration, and deployment for the headless content platform.

## Key Files

- `package.json` - Sanity dependencies, scripts, and project metadata.
- `sanity.config.ts` - Sanity Studio configuration.
- `sanity.cli.ts` - CLI configuration for Sanity commands.
- `tsconfig.json` - TypeScript configuration for the Sanity project.
- `Dockerfile` - containerization instructions for the Sanity backend.
- `.gitignore` / `.dockerignore` - files excluded from version control and Docker builds.

## Important Folders

- `.sanity/` - Sanity-generated project internals, keep this folder under version control but avoid manual edits unless necessary.
- `schemaTypes/` - custom document and object schema definitions used by Sanity.
  - `abouts.ts`, `announcements.ts`, `blogs.ts`, `calendar.ts`, `contact.ts`, `departments.ts`, `events.ts`, `families.ts`, `gallery.ts`, `resources.ts`, `skills.ts`, `testimonials.ts`.
  - `sections/` - reusable section schemas for modular page content.
- `static/` - images and static assets referenced by the Sanity Studio or content.

## How to Navigate

- Start with `sanity.config.ts` to understand the Studio setup and plugin configuration.
- Use `schemaTypes/index.ts` to see how all schema modules are combined into the CMS schema.
- Edit or add document types in `schemaTypes/` when adding new content models.
- Use `sections/` to build reusable content blocks for pages.

## Developer Tips

- When adding a new content type, define a schema file and register it in `schemaTypes/index.ts`.
- Keep schema field definitions consistent and include descriptive titles for editor usability.
- Use Sanity Studio scripts in `package.json` for local development and content deployment.
- Avoid modifying generated files inside `.sanity/` unless you know the impact.

## How to run the project locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Sanity Studio:

   ```bash
   npm run dev
   ```

3. Access the CMS at `http://localhost:3333` and log in with your Sanity account to manage content.
4. Use the Sanity CLI for deployment and content management tasks as needed.

## Building for production

1. Build the Sanity Studio for production:

   ```bash
   npm run build
   ```

## Deploying to sanity hosting

1. Deploy the Sanity Studio to Sanity's hosting platform:

   ```bash
   npm run deploy
   ```

2. Follow the prompts to select the project and dataset for deployment.

### Project Requirements

- Ensure you have a `Sanity account` and project set up for deployment.
- Configure `environment variables` in `.env` for production deployment if needed.
- Review Sanity's documentation for any specific hosting requirements or optimizations.
- `Sanity CLI` should be installed globally to use the deployment commands.
