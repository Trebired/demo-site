import { itemSlugs, serializeCmsDocument, type CmsDocument } from "@trebired/frontend/cms";
import { readCmsDocument } from "@trebired/frontend/server";
import { CMS_CONTENT_DIR, editorOrigins } from "./../../../.trebired/frontend/cms";
import { content } from "./../../frontend/content/schema";

const DEFAULT_LOCALE = "cs";

function routePaths(document: CmsDocument): string[] {
  const slugs = [...itemSlugs(content, document, "posts", DEFAULT_LOCALE, DEFAULT_LOCALE).values()];
  return ["/", "/about", "/posts", ...slugs.map((slug) => `/posts/${slug}`)];
}

async function readSiteContent(rootDir: string) {
  const document = await readCmsDocument(`${rootDir}/${CMS_CONTENT_DIR}`);
  const define = {
    SITE_CMS_EDITORS: JSON.stringify(JSON.stringify(editorOrigins())),
    SITE_CONTENT: JSON.stringify(serializeCmsDocument(document)),
  };
  return { define, paths: routePaths(document) };
}

export { readSiteContent };
