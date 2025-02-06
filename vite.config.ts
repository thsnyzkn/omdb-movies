import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${join(
          __dirname,
          "./src/styles/_mixins.scss"
        )}" as *;
        
        @use "${join(__dirname, "./src/styles/_variables.scss")}" as *;`,
      },
    },
  },
});
