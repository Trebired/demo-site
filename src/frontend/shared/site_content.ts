import { emptyCmsDocument, itemSlugs, normalizeCmsDocument, type CmsDocument } from "@trebired/frontend/cms";
import { content } from "./../content/schema";
import { LANG_ROUTING } from "./routing";

declare const SITE_CONTENT: string;
declare const SITE_CMS_EDITORS: string;

const POSTS = "posts";

function parse(): CmsDocument {
  try {
    return normalizeCmsDocument(JSON.parse(SITE_CONTENT));
  } catch {
    return emptyCmsDocument();
  }
}

const siteDocument = parse();
const editorOrigins: string[] = JSON.parse(SITE_CMS_EDITORS);

function postSlugs(document: CmsDocument = siteDocument): Map<string, string> {
  return itemSlugs(content, document, POSTS, LANG_ROUTING.defaultLocale, LANG_ROUTING.defaultLocale);
}

export { editorOrigins, POSTS, postSlugs, siteDocument };
