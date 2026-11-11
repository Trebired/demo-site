import { defineConfig } from "@trebired/bundler/config";

export default defineConfig({
    forVersion: "5.19.1",
    build: {
      clientOutDir: "dist",
      publicPath: "/",
    },
    frontend: {
      frontendDir: "src/frontend",
    },
});
