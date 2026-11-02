"use client";

import { useState } from "react";

type PortraitProps = {
  variant: "hero" | "about";
  src?: string;
};

export function Portrait({ variant, src }: PortraitProps) {
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState(!src);

  return (
    <div className={`portrait portrait-${variant}`}>
      <div className="portrait-plate" aria-hidden="true">
        {variant === "about" && <span>Akan Imoh</span>}
      </div>
      {!missing && src && (
        <img
          src={src}
          alt={variant === "about" ? "Portrait of Akan Imoh" : ""}
          className={ready ? "is-ready" : undefined}
          onLoad={() => setReady(true)}
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}
