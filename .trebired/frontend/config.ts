import { defineConfig } from "@trebired/frontend/config";

import { CMS_CONTENT_DIR, editorOrigins } from "./cms";

export default defineConfig({
    forVersion: "30.2.0",
    presets: {
      use: ["@trebired/configs/frontend/preset_01"],
    },
    cms: {
      contentDir: CMS_CONTENT_DIR,
      editorOrigins: editorOrigins(),
      enabled: true,
    },
});
