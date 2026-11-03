"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { Overlay } from "@/components/ui/Overlay";
import { Photo } from "@/components/ui/Photo";
import { images } from "@/lib/images";
import type { GalleryItem } from "@/lib/types";

const themes = [
  { index: "01", title: "Leadership", image: images.gallery.leadership },
  { index: "02", title: "Management", image: images.gallery.management },
  { index: "03", title: "Communication", image: images.gallery.communication },
];

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const active = index === null ? null : items[index];

  const shift = (direction: number) => {
    if (index === null || items.length === 0) return;
    setIndex((index + direction + items.length) % items.length);
  };

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setIndex((current) => (current === null ? current : (current + 1) % items.length));
      }
      if (event.key === "ArrowLeft") {
        setIndex((current) => (current === null ? current : (current - 1 + items.length) % items.length));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length]);

  return (
    <section className="gallery" id="archive" data-reveal>
      <div className="section-head">
        <div>
          <p className="eyebrow eyebrow-left">
            <span />
            Archive
          </p>
          <h2>Gallery</h2>
        </div>
      </div>

      {items.length === 0 ? (
        <Carousel label="Archive themes">
          <div className="plates">
            {themes.map((theme) => (
              <article className="plate" key={theme.index}>
                <Photo
                  src={theme.image.src(900)}
                  alt={theme.image.alt}
                  sizes="(max-width: 767px) 78vw, 33vw"
                  ratio="3 / 4"
                  label={theme.title}
                />
                <div className="plate-label">
                  <span>{theme.index}</span>
                  <h3>{theme.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </Carousel>
      ) : (
        <Carousel label="Gallery">
          <div className="gallery-grid">
            {items.map((item, itemIndex) => (
              <GalleryTile key={item.id} item={item} onOpen={() => setIndex(itemIndex)} />
            ))}
          </div>
        </Carousel>
      )}

      {active && index !== null && (
        <Overlay label={active.title} onClose={() => setIndex(null)}>
          <div className="lightbox">
            <button className="overlay-close" type="button" data-autofocus onClick={() => setIndex(null)}>
              Close
            </button>
            <img src={active.imageUrl} alt={active.caption || active.title} />
            <div className="lightbox-meta">
              <div>
                {active.category && <p className="card-kicker">{active.category}</p>}
                <h3>{active.title}</h3>
                {active.caption && <p>{active.caption}</p>}
              </div>
              {items.length > 1 && (
                <div className="lightbox-nav">
                  <button type="button" onClick={() => shift(-1)}>
                    Previous
                  </button>
                  <button type="button" onClick={() => shift(1)}>
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </Overlay>
      )}
    </section>
  );
}

function Carousel({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: number) => {
    const node = ref.current?.querySelector<HTMLElement>(".plates, .gallery-grid");
    if (!node) return;
    const card = node.querySelector<HTMLElement>("article, .gallery-tile");
    const amount = (card?.getBoundingClientRect().width ?? node.clientWidth) + 12;
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const onKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  };

  return (
    <div className="carousel">
      <div className="carousel-controls">
        <button type="button" onClick={() => scrollByCard(-1)}>
          Previous
        </button>
        <button type="button" onClick={() => scrollByCard(1)}>
          Next
        </button>
      </div>
      <div ref={ref} tabIndex={0} aria-label={label} onKeyDown={onKey}>
        {children}
      </div>
    </div>
  );
}

function GalleryTile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const [broken, setBroken] = useState(false);

  return (
    <button className="gallery-tile" type="button" onClick={onOpen}>
      {broken ? (
        <span className="gallery-fallback">{item.title}</span>
      ) : (
        <img src={item.imageUrl} alt="" loading="lazy" decoding="async" onError={() => setBroken(true)} />
      )}
      <span className="gallery-caption">
        {item.category && <span>{item.category}</span>}
        <strong>{item.title}</strong>
      </span>
    </button>
  );
}
