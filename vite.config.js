import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/movietime/",
  plugins: [react(), "babel-plugin-styled-components"],
});
