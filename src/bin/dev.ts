#!/usr/bin/env bun

import { createBunStaticAssetHandler } from "@trebired/bundler/frontend-app";
import { resolvePrimaryPort } from "@trebired/startup";
import { loadConfig as loadStartupConfig } from "@trebired/startup/config";
import { buildSite } from "./frontend/site_build";
import { logger } from "./shared/logger";

const { config: startup } = await loadStartupConfig(process.cwd());
const port = resolvePrimaryPort(startup) || 3000;
const { config } = await buildSite(true);

Bun.serve({
    fetch: createBunStaticAssetHandler({
        clientOutDir: String(config.clientOutDir || "dist"),
        mode: "development",
        publicDir: typeof config.publicDir === "string" ? config.publicDir : undefined,
        rootDir: String(config.rootDir || process.cwd()),
        spaFallback: "404.html",
    }),
    port,
});
logger.success("site.dev", `http://localhost:${port}`);
