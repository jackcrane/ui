import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const demoSrc = path.resolve(__dirname, "src");
const uiKitRoot = path.resolve(__dirname, "../../packages/ui-kit");
const uiKitSrc = path.resolve(uiKitRoot, "src/index.ts");
const workspaceRoot = searchForWorkspaceRoot(process.cwd());

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Keep demo on live source instead of pre-bundling the package entry.
    exclude: ["@jackcrane/ui"],
  },
  resolve: {
    alias: {
      "@demo": demoSrc,
      "@jackcrane/ui": uiKitSrc,
    },
  },
  server: {
    fs: {
      allow: [workspaceRoot, uiKitRoot],
    },
  },
});
