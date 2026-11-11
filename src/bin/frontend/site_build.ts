import { applyProjectConfigsToFrontendBundlerOptions, buildFrontendApp, buildStaticShell } from "@trebired/bundler/frontend-app";
import { createLocaleShellRoutes, ERROR_STATUSES, errorRoutePath, errorShellFileName, frontendBoot } from "@trebired/frontend";
import { copyCmsMedia, writeCmsManifest } from "@trebired/frontend/server";
import { CMS_CONTENT_DIR } from "./../../../.trebired/frontend/cms";
import { content } from "./../../frontend/content/schema";
import { LANG_ROUTING } from "./../../frontend/shared/routing";
import { readSiteContent } from "./options";
import { renderRouteBodies } from "./ssr";

const STRATEGY = "none";
const TITLES: Record<string, string> = { cs: "Demo web", en: "Demo Site" };

async function buildSite(development: boolean, rootDir = process.cwd()) {
  const site = await readSiteContent(rootDir);
  const define = site.define;
  const config = await applyProjectConfigsToFrontendBundlerOptions({ define, mode: development ? "development" : "production", rootDir, ssr: false });
  const paths = [...site.paths, ...ERROR_STATUSES.map(errorRoutePath)];
  const [build, bodies] = await Promise.all([
      buildFrontendApp({ ...config, target: "client" }),
      renderRouteBodies({ define, locales: [...LANG_ROUTING.locales], paths, rootDir, supportedLanguages: config.supportedI18nLanguages || [] }),
  ]);
  const routes = createLocaleShellRoutes({
      meta: (_path, locale) => ({ title: TITLES[locale] ?? TITLES.en }),
      paths,
      render: (routePath, locale) => bodies[routePath]?.[locale] || "",
      routing: LANG_ROUTING,
      strategy: STRATEGY,
  });
  const boot = frontendBoot({ locale: { routing: LANG_ROUTING, strategy: STRATEGY } });
  const shell = await buildStaticShell({ build, config, meta: { ...boot, lang: LANG_ROUTING.defaultLocale }, routes });
  const outDir = String(config.clientOutDir);
  for (const file of shell.files) await Bun.write(file.outFile, file.html);
  for (const status of ERROR_STATUSES) {
    const file = shell.files.find((entry) => entry.path === errorRoutePath(status));
    if (file) await Bun.write(`${outDir}/${errorShellFileName(status)}`, file.html);
  }
  await writeCmsManifest(outDir, content, [...LANG_ROUTING.locales]);
  await copyCmsMedia(`${rootDir}/${CMS_CONTENT_DIR}`, outDir, CMS_CONTENT_DIR);
  return { build, config, shell };
}

export { buildSite };
