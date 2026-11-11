import { defineConfig } from "@trebired/i18n/config";

export default defineConfig({
    forVersion: "0.7.4",
    defaultLanguage: "cs",
    fallbackLanguage: "en",
    supportedLanguages: ["cs", "en"],
    check: {
      rootDir: "src/frontend",
      strict: true,
    },
});
