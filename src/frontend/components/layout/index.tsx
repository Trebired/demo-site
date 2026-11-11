import { CmsText } from "@trebired/frontend/cms";
import { button, Text, useLocale } from "@trebired/frontend/react";
import { createLocalTranslator } from "@trebired/i18n";
import { Fragment, type ReactNode } from "react";
import { LANG_ROUTING } from "./../../shared/routing";

const NAV = [
  { href: "/", key: "nav.home" },
  { href: "/posts", key: "nav.posts" },
  { href: "/about", key: "nav.about" },
];

function LanguageButtons() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="tbf-inline-row tbf-gap-xs tbf-width-fit">
    {LANG_ROUTING.locales.map((code) => (
          <Fragment key={code}>
          {button({ active: code === locale, children: code.toUpperCase(), onClick: () => setLocale(code), variant: "secondary" })}
          </Fragment>
    ))}
    </div>
  );
}

function SiteLayout(props: { children: ReactNode }) {
  const copy = createLocalTranslator(import.meta.url, useLocale().locale);
  return (
    <div className="tbf-inline-row tbf-hor-center tbf-padding-md">
    <div className="tbf-column tbf-gap-lg tbf-width-xl4">
    <div className="tbf-inline-row tbf-gap-sm tbf-wrap tbf-between tbf-ver-center">
    <a className="tbf-text-xl" href="/">{copy("site")}</a>
    <nav className="tbf-inline-row tbf-gap-sm tbf-wrap tbf-width-fit">
    {NAV.map((item) => <a href={item.href} key={item.href}>{copy(item.key)}</a>)}
    </nav>
    <LanguageButtons />
    </div>
    <main className="tbf-column tbf-gap-lg">{props.children}</main>
    <footer className="tbf-inline-row tbf-gap-sm tbf-wrap">
    <Text muted size="sm"><CmsText field="footer.note" /></Text>
    </footer>
    </div>
    </div>
  );
}

export { SiteLayout };
