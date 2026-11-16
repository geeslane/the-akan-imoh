"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { nav } from "@/lib/site";

export function Header({ showStories = true }: { showStories?: boolean }) {
  const items = useMemo(() => nav.filter((item) => showStories || item.id !== "stories"), [showStories]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const viewport = window.visualViewport;
    if (!header || !viewport) return;

    const pin = () => {
      header.style.top = `${viewport.offsetTop}px`;
    };

    pin();
    viewport.addEventListener("resize", pin);
    viewport.addEventListener("scroll", pin);
    return () => {
      viewport.removeEventListener("resize", pin);
      viewport.removeEventListener("scroll", pin);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mark = () => {
      const line = window.scrollY + 96;
      let current = "";
      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= line) current = item.id;
      }
      setActive(current);
    };

    mark();
    window.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("resize", mark);
    window.addEventListener("hashchange", mark);
    return () => {
      window.removeEventListener("scroll", mark);
      window.removeEventListener("resize", mark);
      window.removeEventListener("hashchange", mark);
    };
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
    <header ref={headerRef} className={`header${scrolled ? " is-scrolled" : ""}`}>
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
            <a
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
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
