import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const demoSrc = path.resolve(process.cwd(), "src");

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@demo": demoSrc,
    },
  },
});
