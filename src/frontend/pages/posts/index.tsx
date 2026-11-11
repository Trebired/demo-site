import { Title, useLocale } from "@trebired/frontend/react";
import { createLocalTranslator } from "@trebired/i18n";
import { PostCards } from "./../../components/posts";

function PostsPage() {
  const copy = createLocalTranslator(import.meta.url, useLocale().locale);
  return (
    <section className="tbf-column tbf-gap-md">
    <Title level={1}>{copy("title")}</Title>
    <PostCards />
    </section>
  );
}

export default PostsPage;
