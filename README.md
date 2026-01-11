# JC/UI Kit

A workspace that splits the reusable React components into a publishable UI kit and a dedicated demo shell that exercises the kit blocks.

## Structure
- `packages/ui-kit` – the React component library configured for tree-shaken Vite builds, TypeScript declarations, and automatic dependency inference so it can publish clean artifacts to npm.
- `apps/ui-demo` – a lightweight Vite + React playground that consumes `@jcui/ui-kit` via the workspace link and renders the shared Blocks demos.

## Getting started
1. `npm install`
2. `npm run dev:demo` – hot-reloads the demo at `http://localhost:5173`
3. `npm run build:kit` – produces `packages/ui-kit/dist` for publishing (`exports`, `module`, `main`, and `types`)
4. `npm run build:demo` – bundles the demo app for deployment
5. `npm run lint` – runs the shared ESLint config across both packages

## Publishing the UI kit
1. `npm run build:kit`
2. `cd packages/ui-kit`
3. `npm publish` (or whatever registry/publish script you use)

The kit already embeds TypeScript declaration files (`dist/index.d.ts`), sets `sideEffects: false`, and only ships the files under `dist` so tree-shaking and IDE autocompletion stay sharp for consumers.
