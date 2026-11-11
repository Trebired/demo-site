import { Text, useLocale } from "@trebired/frontend/react";
import { createLocalTranslator } from "@trebired/i18n";

function ErrorPage(props: { status: number }) {
  const copy = createLocalTranslator(import.meta.url, useLocale().locale);
  return <Text muted>{`${props.status} · ${copy("missing")}`}</Text>;
}

export default ErrorPage;
