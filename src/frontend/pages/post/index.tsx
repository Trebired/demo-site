import { CmsRichText, CmsText, useCmsCollection } from "@trebired/frontend/cms";
import { Text, useLocale, usePageRoute } from "@trebired/frontend/react";
import { createLocalTranslator } from "@trebired/i18n";
import { POSTS, postSlugs } from "./../../shared/site_content";

function PostPage() {
  const copy = createLocalTranslator(import.meta.url, useLocale().locale);
  const slug = usePageRoute().split("/").pop() ?? "";
  const slugs = postSlugs();
  const post = useCmsCollection(POSTS).find((item) => slugs.get(item.id) === slug);
  if (!post) return <Text muted>{copy("missing")}</Text>;
  return (
    <article className="tbf-column tbf-gap-md">
    <CmsText as="h1" field={post.field("title")} />
    <CmsText as="p" className="tbf-text-muted" field={post.field("date")} />
    <CmsRichText field={post.field("body")} />
    <a href="/posts">{copy("back")}</a>
    </article>
  );
}

export default PostPage;
