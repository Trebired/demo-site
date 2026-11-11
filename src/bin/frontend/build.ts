#!/usr/bin/env bun

import { logger } from "./../shared/logger";
import { buildSite } from "./site_build";

const { build, shell } = await buildSite(false);

logger.success("site.build", `client_files=${build.client?.outputs.length ?? 0} route_shells=${shell.files.length}`);
