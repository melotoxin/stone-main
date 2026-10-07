import { useEffect } from "react";
import { useI18n } from "@/i18n";
import "@/styles/story-motion.css";

const STORY_TARGETS = [
  "h1",
  "h2",
  "figure figcaption",
  "article h3",
  "img:not([alt=''])",
  "section > p",
  "section > div > p",
  "[data-story-reveal]",
].join(",");

const STORY_EXCLUSIONS = [
  "[data-story-managed]",
  "[data-story-ignore]",
  "[aria-hidden='true']",
  ".reveal",
  ".luxury-hero",
].join(",");

/** Progressive enhancement: every element stays readable before it is observed. */
export function SiteStoryMotion() {
  const { barePath, locale } = useI18n();

  useEffect(() => {
    const content = document.getElementById("content") || document.querySelector("main");
    if (!content || typeof IntersectionObserver === "undefined") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = new Set<HTMLElement>();
    const ownedAttributes = new Map<HTMLElement, { kind: string | null; step: string | null }>();
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;
    let frame = 0;

    const release = (element: HTMLElement) => {
      observer?.unobserve(element);
      element.classList.remove("story-motion-enter");
      const original = ownedAttributes.get(element);
      if (original) {
        if (original.kind === null) element.removeAttribute("data-story-kind");
        else element.setAttribute("data-story-kind", original.kind);
        if (original.step === null) element.removeAttribute("data-story-step");
        else element.setAttribute("data-story-step", original.step);
      }
      targets.delete(element);
      ownedAttributes.delete(element);
    };

    const clear = () => {
      observer?.disconnect();
      mutations?.disconnect();
      observer = undefined;
      mutations = undefined;
      window.cancelAnimationFrame(frame);
      frame = 0;
      for (const element of targets) release(element);
    };

    const start = () => {
      clear();
      if (preference.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target as HTMLElement;
            // An asynchronously replaced view can opt out after registration.
            if (!element.closest(STORY_EXCLUSIONS)) {
              element.classList.add("story-motion-enter");
            }
            observer?.unobserve(element);
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
      );

      const register = () => {
        frame = 0;
        if (!observer) return;
        for (const element of targets) {
          if (!content.contains(element)) release(element);
        }
        for (const element of content.querySelectorAll<HTMLElement>(STORY_TARGETS)) {
          if (targets.has(element) || element.closest(STORY_EXCLUSIONS)) continue;
          // Avoid layering motion onto a caption already inside an animated target.
          if (element.parentElement?.closest("figcaption")) continue;
          ownedAttributes.set(element, {
            kind: element.getAttribute("data-story-kind"),
            step: element.getAttribute("data-story-step"),
          });
          let kind = "copy";
          if (element.tagName === "IMG") {
            const parent = element.parentElement;
            const clipped = parent && ["hidden", "clip"].includes(window.getComputedStyle(parent).overflowX);
            kind = clipped ? "image-contained" : "image";
          }
          element.setAttribute("data-story-kind", kind);
          element.setAttribute("data-story-step", String(targets.size % 3));
          targets.add(element);
          observer.observe(element);
        }
      };

      register();
      if (typeof MutationObserver !== "undefined") {
        mutations = new MutationObserver(() => {
          // Filters and route content can replace cards; coalesce those insertions.
          if (!frame) frame = window.requestAnimationFrame(register);
        });
        mutations.observe(content, { childList: true, subtree: true });
      }
    };

    start();
    preference.addEventListener("change", start);
    return () => {
      preference.removeEventListener("change", start);
      clear();
    };
  }, [barePath, locale]);

  return null;
}
