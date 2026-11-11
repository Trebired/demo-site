import { CmsImage, CmsLink, CmsRichText, CmsText } from "@trebired/frontend/cms";
import { Title, useLocale } from "@trebired/frontend/react";
import { createLocalTranslator } from "@trebired/i18n";
import { LatestPosts } from "./../../components/posts";

const LATEST = 3;

function HomePage() {
  const copy = createLocalTranslator(import.meta.url, useLocale().locale);
  return (
    <>
    <section className="tbf-column tbf-gap-md">
    <CmsText as="h1" field="home.title" />
    <CmsRichText field="home.lead" />
    <CmsImage field="home.photo" loading="eager" />
    <div className="tbf-inline-row tbf-hor-right">
    <CmsLink className="tbf-button" field="home.cta" />
    </div>
    </section>
    <section className="tbf-column tbf-gap-sm">
    <Title level={2}>{copy("latest")}</Title>
    <LatestPosts limit={LATEST} />
    <a href="/posts">{copy("all")}</a>
    </section>
    </>
  );
}

export default HomePage;
