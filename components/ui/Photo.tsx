"use client";

import Image from "next/image";
import { useState } from "react";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  ratio?: string;
  priority?: boolean;
  className?: string;
  label?: string;
  fillFrame?: boolean;
};

export function Photo({
  src,
  alt,
  sizes,
  ratio = "16 / 9",
  priority = false,
  className,
  label,
  fillFrame = false,
}: PhotoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`photo${fillFrame ? " photo-fill" : ""}${className ? ` ${className}` : ""}`}
      style={fillFrame ? undefined : { aspectRatio: ratio }}
    >
      {failed ? (
        <span className="photo-fallback">{label || alt}</span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          className="photo-img"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
