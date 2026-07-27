import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        sceneit: resolve(__dirname, "projects/sceneit.html"),
        ladyshelf: resolve(__dirname, "projects/ladyshelf.html"),
      },
    },
  },
});
