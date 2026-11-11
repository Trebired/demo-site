import { bundle } from "@trebired/bundler";
import path from "node:path";

const SSR_OUT_DIR = ".ssr";

async function buildSsrBundle(define: Record<string, string>, supportedLanguages: readonly string[], rootDir: string) {
  await bundle({
      define,
      discover: {
        dir: "./src/frontend",
        rules: [
          { key: "ssr-entry", include: ["ssr/entry.tsx"], strategy: "entry" },
          { key: "ignore-client", include: ["**/*.client.ts", "**/*.client.tsx", "js/**"], strategy: "ignore" },
          { key: "shared", include: ["**/*.ts", "**/*.tsx"], exclude: ["ssr/entry.tsx"], strategy: "bundle" },
          { key: "ignore-rest", include: ["**/*"], strategy: "ignore" },
        ],
      },
      environment: "node",
      external: ["react", "react-dom", "react-dom/server"],
      format: "esm",
      i18n: { supportedLanguages: [...supportedLanguages] },
      outDir: `./${SSR_OUT_DIR}`,
      rootDir,
  });
}

type SsrEntry = { renderRouteBody: (routePath: string, locale: string) => Promise<string> };

async function renderRouteBodies(
  render: { define: Record<string, string>; locales: string[]; paths: string[]; rootDir: string; supportedLanguages: readonly string[] },
): Promise<Record<string, Record<string, string>>> {
  await buildSsrBundle(render.define, render.supportedLanguages, render.rootDir);
  const entryPath = path.resolve(render.rootDir, `${SSR_OUT_DIR}/src/frontend/ssr/entry.js`);
  const entry = (await import(`${entryPath}?t=${Date.now()}`)) as SsrEntry;
  const bodies: Record<string, Record<string, string>> = {};
  for (const route of render.paths) {
    const rendered = await Promise.all(render.locales.map(async(locale) => [locale, await entry.renderRouteBody(route, locale)]));
    bodies[route] = Object.fromEntries(rendered);
  }
  return bodies;
}

export { renderRouteBodies };
