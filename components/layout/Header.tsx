"use client";

import { useEffect, useMemo, useState } from "react";
import { nav } from "@/lib/site";

export function Header({ showStories = true }: { showStories?: boolean }) {
  const items = useMemo(() => nav.filter((item) => showStories || item.id !== "stories"), [showStories]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;

    const menu = document.getElementById("mobile-menu");
    const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
    const items = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>("a[href], button") ?? []);

    items()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = items();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
      <a className="logo" href="#top">
        Akan <em>Imoh</em>
      </a>

      <nav className="nav-links" aria-label="Primary">
        {items.map((item) => (
          <a key={item.id} href={item.href} aria-current={active === item.id ? "true" : undefined}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#enquire">
        Request a Feature
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div className="menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          {items.map((item) => (
            <a key={item.id} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#enquire" onClick={() => setOpen(false)}>
            Request a Feature
          </a>
        </div>
      )}
    </header>
  );
}
