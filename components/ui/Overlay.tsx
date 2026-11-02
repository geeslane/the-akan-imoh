"use client";

import { useEffect, useRef } from "react";

type OverlayProps = {
  label: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Overlay({ label, onClose, children }: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key !== "Tab") return;

      const items = Array.from(
        ref.current?.querySelectorAll<HTMLElement>(
          'button, a[href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
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
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={label} ref={ref}>
      <button className="overlay-backdrop" type="button" aria-label="Close" onClick={onClose} />
      <div className="overlay-body">{children}</div>
    </div>
  );
}
