<div align="center">

# Demo Site

**A static site whose texts, links and posts are edited in Operlorn through the content management in `@trebired/frontend`, in Czech and English.**

[![License](https://img.shields.io/badge/license-MIT-black)](LICENSE)
[![Runtime](https://img.shields.io/badge/runtime-Bun-black)](#install)
[![Output](https://img.shields.io/badge/output-static%20site-black)](#runtime)

</div>

---

## Contents

- [Install](#install)
- [Quick Start](#quick-start)
- [Concepts](#concepts)
- [Configuration](#configuration)
- [Runtime](#runtime)
- [What It Does Not Do](#what-it-does-not-do)

## Install

Bun 1 or later.

```sh
bun i
```

## Quick Start

```sh
bun run dev
```

The dev server builds the site and serves `dist/` on port 3000. Set `PORT` to use another port.

```sh
bun run build
```

`dist/` is a static directory. Serve it with any static host.

## Concepts

### Content Model

`src/frontend/content/schema.ts` declares every editable field and the `posts` collection with their limits. Pages render values only through the content components, so every editable value carries its marker and nothing else on the page can be edited.

### Published Content

`content/content.json` holds the published values for both languages, and `content/media/` holds published images. The build reads them, renders one page per route and post, writes the content model to `/.well-known/tbf-cms/schema.json` for the editor, and copies the images to `/content/media/`. Publishing in Operlorn commits these files, and the next build shows the change.

### Editing

Opened inside the Operlorn editor, the site outlines what can be edited, edits plain text in place and shows unpublished drafts without a rebuild. Outside the editor it is an ordinary static site.

## Configuration

`CMS_EDITOR_ORIGINS` is a comma-separated list of the editor addresses allowed to open the site in edit mode, read at build time. Without it, edit mode stays off.

## Runtime

The site has no backend. `src/bin/frontend/build.ts` produces the client bundle, the route shells, the content model and the media; nothing runs at request time.

## What It Does Not Do

This site does not:

- write content itself; the editor publishes by committing `content/content.json`;
- give unpublished posts their own page before they are published and built.
