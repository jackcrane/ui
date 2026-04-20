import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const demoSrc = path.resolve(__dirname, "src");
const appNodeModules = path.resolve(__dirname, "node_modules");
const reactRoot = path.resolve(appNodeModules, "react");
const reactDomRoot = path.resolve(appNodeModules, "react-dom");
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
    dedupe: ["react", "react-dom"],
    alias: {
      "@demo": demoSrc,
      "@jackcrane/ui": uiKitSrc,
      react: reactRoot,
      "react-dom": reactDomRoot,
    },
  },
  server: {
    fs: {
      allow: [workspaceRoot, uiKitRoot],
    },
  },
});
