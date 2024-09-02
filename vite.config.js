import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/games/", // Update with your repository name
  build: { chunkSizeWarningLimit: 3600 },
});
