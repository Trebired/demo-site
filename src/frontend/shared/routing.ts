import { normalizeLocaleRouting } from "@trebired/frontend";

const LANG_ROUTING = normalizeLocaleRouting({
    defaultLocale: "cs",
    locales: ["cs", "en"],
    storageKey: "demo-site-lang",
});

export { LANG_ROUTING };
