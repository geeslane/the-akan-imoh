"use client";

import { useEffect, useState } from "react";
import { Overlay } from "@/components/ui/Overlay";
import type { GalleryItem } from "@/lib/types";

const themes = [
  { index: "01", title: "Leadership" },
  { index: "02", title: "Management" },
  { index: "03", title: "Communication" },
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
    const onKey = (event: KeyboardEvent) => {
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
    <section className="gallery" id="archive">
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
        <div className="plates" aria-label="Archive themes">
          {themes.map((theme) => (
            <article key={theme.index}>
              <span>{theme.index}</span>
              <h3>{theme.title}</h3>
            </article>
          ))}
        </div>
      ) : (
        <div className="gallery-grid">
          {items.map((item, itemIndex) => (
            <GalleryTile key={item.id} item={item} onOpen={() => setIndex(itemIndex)} />
          ))}
        </div>
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

function GalleryTile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const [broken, setBroken] = useState(false);

  return (
    <button className="gallery-tile" type="button" onClick={onOpen}>
      {broken ? (
        <span className="gallery-fallback">{item.title}</span>
      ) : (
        <img src={item.imageUrl} alt="" onError={() => setBroken(true)} />
      )}
      <span className="gallery-caption">
        {item.category && <span>{item.category}</span>}
        <strong>{item.title}</strong>
      </span>
    </button>
  );
}
