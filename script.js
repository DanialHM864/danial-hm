
"use strict";

const GA_ID = window.DANIAL_GA_ID || "G-W52V4DZGMG";
const CONSENT_KEY = "danial_hm_analytics_consent";

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
}

window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 20);
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 950) closeMenu();
});
if (currentYear) currentYear.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(
  ".section-heading,.card,.release-layout,.about-layout,.press-feature,.contact-panel,.hero-content,.hero-art"
);
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

const glow = document.querySelector(".cursor-glow");
if (glow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    glow.style.opacity = ".95";
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  });
  window.addEventListener("mouseleave", () => (glow.style.opacity = "0"));
}

let analyticsLoaded = false;

function loadAnalytics() {
  if (analyticsLoaded || !GA_ID) return;
  analyticsLoaded = true;

  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
}

function openCookieBanner() {
  if (!cookieBanner) return;
  cookieBanner.hidden = false;
  document.body.classList.add("cookie-open");
}

function closeCookieBanner() {
  if (!cookieBanner) return;
  cookieBanner.hidden = true;
  document.body.classList.remove("cookie-open");
}

function setConsent(value) {
  localStorage.setItem(CONSENT_KEY, value);
  if (value === "granted") {
    loadAnalytics();
    closeCookieBanner();
  } else {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    closeCookieBanner();
    if (analyticsLoaded) window.location.reload();
  }
}

const savedConsent = localStorage.getItem(CONSENT_KEY);
if (savedConsent === "granted") {
  loadAnalytics();
} else if (savedConsent !== "denied") {
  window.setTimeout(openCookieBanner, 450);
}

if (acceptAnalytics) acceptAnalytics.addEventListener("click", () => setConsent("granted"));
if (declineAnalytics) declineAnalytics.addEventListener("click", () => setConsent("denied"));
if (privacySettings) privacySettings.addEventListener("click", openCookieBanner);
