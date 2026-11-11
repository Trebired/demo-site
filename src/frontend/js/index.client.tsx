import { bindFrontendRuntime, configureLocaleRouting, configureSpa } from "@trebired/frontend";
import "@trebired/frontend/static-icons";
import { sitePages } from "./../shared/pages";
import { LANG_ROUTING } from "./../shared/routing";

configureLocaleRouting(LANG_ROUTING);
configureSpa({});

void sitePages.mountPages("live_content").then(() => {
    bindFrontendRuntime(document, { locale: { persistLocale: async() => ({ ok: true }) } });
});
