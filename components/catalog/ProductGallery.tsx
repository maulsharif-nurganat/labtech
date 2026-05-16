"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div style={{ background: "var(--silver)", display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Main image */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, borderBottom: "1px solid var(--border)", position: "relative", minHeight: 300 }}>
        {images?.[active] ? (
          <Image
            src={images[active]}
            alt={name}
            fill
            style={{ objectFit: "contain", padding: "32px" }}
          />
        ) : null}
        {/* Watermark */}
        <img
          src="/labtech-watermark.png"
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            width: 120,
            opacity: 0.3,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 2,
          }}
        />
        {!images?.[active] && (
          <>
            <svg width="72" height="72" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.15, color: "var(--gray)" }}>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
            <span style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray)" }}>Фото товара</span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images && images.length > 1 && (
        <div style={{ display: "flex", height: 100, borderTop: "1px solid var(--border)" }}>
          {images.slice(0, 5).map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                flex: 1,
                borderRight: i < images.length - 1 ? "1px solid var(--border)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: active === i ? "white" : "transparent",
                boxShadow: active === i ? "inset 0 -2px 0 var(--blue)" : "none",
                position: "relative",
                transition: "background 0.15s",
              }}
            >
              <Image src={img} alt={`${name} ${i + 1}`} fill style={{ objectFit: "contain", padding: "8px" }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
