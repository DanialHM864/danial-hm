# Danial HM Website — V3 Maintenance

This file is the quick operating guide for future updates.

## Single source files

- `data/site.json` — artist identity, official links, visual tokens and website settings.
- `data/releases.json` — release dates, cover paths, credits and platform links.
- `data/press.json` — press coverage for releases.

Keep these files factually correct first. They are the canonical editorial data store for the site.

## Adding a new release

1. Upload the high-resolution square cover to `assets/` using a simple permanent filename.
2. Add the release to `data/releases.json`.
3. Create `releases/<slug>.html` using the current release-page structure.
4. Add the release card to `music.html` and, if current, to `index.html` / `epk.html` / `media-kit.html`.
5. Add the canonical URL to `sitemap.xml` with the true modification date.
6. Add canonical, Open Graph, Twitter Card and `MusicRecording` JSON-LD metadata.
7. Validate internal links and artwork paths before deployment.

## Adding press coverage

1. Add the article to `data/press.json` first.
2. Add it to `press.html` newest-first.
3. If it belongs to a release, add it to that release page and its `subjectOf` structured data.
4. Refresh selected press on Home/EPK only when the new feature is stronger or newer than an existing selection.
5. Update `lastmod` only on pages that actually changed.

## Design rules

Primary identity: purple-led cinematic nocturnal minimalism.

- Purple is the signature.
- Black/charcoal is the visual ground.
- Blue supports cool depth.
- Yellow and orange are small accents, not dominant fills.
- Keep generous negative space.
- Avoid template-like gradients, excessive glow or crowded cards.
- Maintain readable contrast and visible keyboard focus.

## Editorial voice

Write simply, warmly and precisely. The site may carry contemplative depth, but the surface language should remain natural and easy to read. Avoid exaggerated claims, inflated spiritual language, generic marketing phrases and unnecessary technical vocabulary.

## SEO checklist

Every indexable page needs:

- One unique `<title>`.
- One accurate meta description.
- One canonical URL.
- Open Graph title, description, URL and image.
- Twitter Card metadata.
- A meaningful H1.
- Useful internal links.
- Descriptive image alt text.
- Relevant Schema.org JSON-LD without unsupported claims.

Do not index `404.html` or temporary preview pages.

## Sitemap / Search Console

Production sitemap URL:

`https://danialhm864.github.io/danial-hm/sitemap.xml`

`robots.txt` must point to exactly that URL.

In the existing URL-prefix Search Console property for `https://danialhm864.github.io/danial-hm/`, submit `sitemap.xml` as the sitemap path rather than repeatedly deleting and recreating the same entry. Before resubmitting, confirm the production URL loads as XML over HTTPS and does not redirect to an HTML error page.

## Before merging V3 to main

- Check Home, Music, About, Press, EPK, Media Kit, Contact, Support, Privacy and 404 on desktop and mobile widths.
- Check every release page.
- Confirm no broken internal links.
- Confirm the latest cover is sharp and uses the intended asset.
- Confirm consent mode and analytics still behave correctly.
- Confirm `robots.txt`, `sitemap.xml` and `site.webmanifest` load directly.
- Run a final metadata/structured-data audit.
