"use strict";

const GA_ID = window.DANIAL_GA_ID || "G-W52V4DZGMG";
const CONSENT_KEY = "danial_hm_analytics_consent";

// V3 runtime normalization for every page, including legacy release pages.
document.body.classList.add("v3");
const themeMeta = document.querySelector('meta[name="theme-color"]');
if (themeMeta) themeMeta.setAttribute("content", "#07070a");
document.documentElement.style.colorScheme = "dark";

const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");
const header = document.querySelector("#siteHeader");
const currentYear = document.querySelector("#currentYear");
const cookieBanner = document.querySelector("#cookieBanner");
const acceptAnalytics = document.querySelector("#acceptAnalytics");
const declineAnalytics = document.querySelector("#declineAnalytics");
const privacySettings = document.querySelector("#privacySettings");

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.classList.remove("active");
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menuButton.classList.toggle("active", open);
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const currentPath = window.location.pathname.replace(/\/$/, "");
  navigation.querySelectorAll("a").forEach((link) => {
    try {
      const linkPath = new URL(link.href, window.location.href).pathname.replace(/\/$/, "");
      const onRelease = currentPath.includes("/releases/") && linkPath.endsWith("/music.html");
      if (linkPath === currentPath || onRelease) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    } catch {}
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    if (cookieBanner && !cookieBanner.hidden) closeCookieBanner();
  }
});

window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 950) closeMenu();
});
if (currentYear) currentYear.textContent = new Date().getFullYear();

// Decorative images should never block layout; meaningful images retain authored alt text.
document.querySelectorAll("img").forEach((img) => {
  if (!img.hasAttribute("loading") && !img.closest(".hero-art")) img.loading = "lazy";
  if (!img.hasAttribute("decoding")) img.decoding = "async";
});

const revealItems = document.querySelectorAll(
  ".section-heading,.card,.release-layout,.about-layout,.press-feature,.contact-panel,.hero-content,.hero-art,.press-archive-card,.epk-panel,.copy-panel,.quote-card,.featured-review"
);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  revealItems.forEach((item) => item.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const glow = document.querySelector(".cursor-glow");
if (glow && !reduceMotion && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    glow.style.opacity = ".95";
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  }, { passive: true });
  window.addEventListener("mouseleave", () => (glow.style.opacity = "0"));
}

let analyticsLoaded = false;
function loadAnalytics() {
  if (analyticsLoaded || !GA_ID || typeof window.gtag !== "function") return;
  analyticsLoaded = true;
  window.gtag("consent", "update", {
    analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
  document.head.appendChild(script);
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
}
function openCookieBanner() {
  if (!cookieBanner) return;
  cookieBanner.hidden = false;
  document.body.classList.add("cookie-open");
  const firstControl = cookieBanner.querySelector("button,a");
  if (firstControl) firstControl.focus();
}
function closeCookieBanner() {
  if (!cookieBanner) return;
  cookieBanner.hidden = true;
  document.body.classList.remove("cookie-open");
}
function setConsent(value) {
  localStorage.setItem(CONSENT_KEY, value);
  if (value === "granted") loadAnalytics();
  else if (typeof window.gtag === "function") window.gtag("consent", "update", { analytics_storage:"denied", ad_storage:"denied", ad_user_data:"denied", ad_personalization:"denied" });
  closeCookieBanner();
}
const savedConsent = localStorage.getItem(CONSENT_KEY);
if (savedConsent === "granted") loadAnalytics();
else if (savedConsent !== "denied") window.setTimeout(openCookieBanner, 450);
if (acceptAnalytics) acceptAnalytics.addEventListener("click", () => setConsent("granted"));
if (declineAnalytics) declineAnalytics.addEventListener("click", () => setConsent("denied"));
if (privacySettings) privacySettings.addEventListener("click", openCookieBanner);

const filterButtons = document.querySelectorAll(".filter-button");
const pressCards = document.querySelectorAll(".press-archive-card");
const pressEmpty = document.querySelector("#pressEmpty");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let visible = 0;
    pressCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.year === filter || card.dataset.country === filter || card.dataset.release === filter;
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    if (pressEmpty) pressEmpty.hidden = visible !== 0;
  });
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget || "");
    if (!target) return;
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      button.textContent = "Copied";
      button.classList.add("copied");
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection.removeAllRanges(); selection.addRange(range);
      button.textContent = "Select text";
    }
    window.setTimeout(() => { button.textContent = original; button.classList.remove("copied"); }, 1800);
  });
});
