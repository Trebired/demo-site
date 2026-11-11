import { CmsRichText } from "@trebired/frontend/cms";
import { Title, useLocale } from "@trebired/frontend/react";
import { createLocalTranslator } from "@trebired/i18n";

function AboutPage() {
  const copy = createLocalTranslator(import.meta.url, useLocale().locale);
  return (
    <section className="tbf-column tbf-gap-md">
    <Title level={1}>{copy("title")}</Title>
    <CmsRichText field="about.body" />
    </section>
  );
}

export default AboutPage;
