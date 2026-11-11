import { createSitePages } from "@trebired/frontend/react";
import ErrorPage from "./../pages/error/index";
import { SiteLayout } from "./../components/layout/index";
import { SiteCms } from "./cms";

const POST_ROUTE = /^\/posts\/[^/]+$/u;

const sitePages = createSitePages({
    error: ErrorPage,
    pages: (route) => {
      if (route === "/") return async() => (await import("./../pages/home/index")).default;
      if (route === "/about") return async() => (await import("./../pages/about/index")).default;
      if (route === "/posts") return async() => (await import("./../pages/posts/index")).default;
      if (POST_ROUTE.test(route)) return async() => (await import("./../pages/post/index")).default;
      return undefined;
    },
    wrap: (page) => (
      <SiteCms>
      <SiteLayout>{page}</SiteLayout>
      </SiteCms>
    ),
});

export { sitePages };
