"use strict";

(function () {
  const grid = document.querySelector('[data-catalog="release-grid"]');
  if (!grid) return;

  const escapeHTML = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const formatDate = (iso) => {
    if (!iso) return "";
    const date = new Date(`${iso}T00:00:00Z`);
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    }).format(date).toUpperCase();
  };

  fetch("data/releases.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
      return response.json();
    })
    .then((catalog) => {
      const releases = Array.isArray(catalog.releases) ? catalog.releases : [];
      const archive = releases.filter((release) => release.slug !== "a-prayer-beneath-the-ruins");
      if (!archive.length) return;

      grid.innerHTML = archive.map((release) => {
        const meta = [formatDate(release.releaseDate), release.type].filter(Boolean).join(" · ");
        return `<a class="card" href="releases/${encodeURIComponent(release.slug)}.html">
          <small>${escapeHTML(meta)}</small>
          <h3>${escapeHTML(release.title)}</h3>
          <p>${escapeHTML(release.description)}</p>
          <span class="card-link">Open release →</span>
        </a>`;
      }).join("");
    })
    .catch((error) => {
      console.warn("Danial HM catalog fallback is active.", error);
    });
})();
