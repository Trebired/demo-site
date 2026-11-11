import { defineConfig } from "@trebired/startup/config";

export default defineConfig({
    forVersion: "0.8.2",
    lifecycle: {
      shutdownTimeoutMs: 5000,
    },
    requirements: {
      ports: [
        {
          checkAvailable: true,
          defaultValue: 3000,
          env: "PORT",
          host: "127.0.0.1",
        },
      ],
    },
});
