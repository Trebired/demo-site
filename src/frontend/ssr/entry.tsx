import { configureLocaleRouting, siteBodyHtml } from "@trebired/frontend";
import { LiveIslandMount, LocaleProvider, RenderCurrentUrlProvider } from "@trebired/frontend/react";
import { createServerIconRenderer, withIconServerRenderer } from "@trebired/frontend/server";
import { renderToString } from "react-dom/server";
import { sitePages } from "./../shared/pages";
import { LANG_ROUTING } from "./../shared/routing";

configureLocaleRouting(LANG_ROUTING);

const iconRenderer = createServerIconRenderer({}, { rootDir: process.cwd() });

export async function renderRouteBody(path: string, locale: string): Promise<string> {
  await sitePages.preparePage(path);
  const content = withIconServerRenderer(iconRenderer, () => renderToString(
      <RenderCurrentUrlProvider currentUrl={path}>
      <LocaleProvider locale={locale}>
      <LiveIslandMount rootId="live_content">
      <sitePages.PageContent path={path} />
      </LiveIslandMount>
      </LocaleProvider>
      </RenderCurrentUrlProvider>,
  ));
  return siteBodyHtml({ chrome: false, content, path });
}
