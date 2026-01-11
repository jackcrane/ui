# Radix + CSS Modules UI Kit

This scaffold pairs [Radix UI primitives](https://www.radix-ui.com/) with CSS Modules so you can build accessible components with encapsulated styles.

## Getting started
1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
3. Explore the components in `src/components`

## Structure
- `src/App.jsx` renders the kit demo and shows how to compose several primitive-based components.
- `src/components/Button/PrimaryButton.jsx` demonstrates a themeable button with CSS modules and `clsx`.
- `src/components/Card/Card.jsx` provides a lightweight card wrapper to group controls.
- `src/components/InteractiveTabs/InteractiveTabs.jsx` uses `@radix-ui/react-tabs` with module-scoped styles.
- `src/components/Dialog/InfoDialog.jsx` shows how to layer dialogs using `@radix-ui/react-dialog`.
- `src/components/ToggleGroup/StatusToggle.jsx` showcases a segmented toggle backed by `@radix-ui/react-toggle-group`.

## Scripts
- `npm run dev`: start the Vite dev server
- `npm run build`: produce an optimized production bundle
- `npm run preview`: preview the production build locally

Feel free to fork the components or plug them into your design system; Radix handles the accessibility, and CSS modules keep the styling predictable.
