import { CmsProvider } from "@trebired/frontend/cms";
import { useLocale } from "@trebired/frontend/react";
import type { ReactNode } from "react";
import { content } from "./../content/schema";
import { LANG_ROUTING } from "./routing";
import { editorOrigins, siteDocument } from "./site_content";

function SiteCms(props: { children: ReactNode }) {
  return (
    <CmsProvider
    document={siteDocument}
    editorOrigins={editorOrigins}
    enabled
    fallbackLocale={LANG_ROUTING.defaultLocale}
    locale={useLocale().locale || LANG_ROUTING.defaultLocale}
    schema={content}
    >
    {props.children}
    </CmsProvider>
  );
}

export { SiteCms };
