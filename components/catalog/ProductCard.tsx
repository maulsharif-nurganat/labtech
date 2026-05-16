import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  categorySlug?: string;
}

export default function ProductCard({ product, categorySlug }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations("product");
  const href = `/${locale}/catalog/${categorySlug ?? "all"}/${product.slug}`;

  return (
    <Link
      href={href}
      style={{
        display: "block",
        background: "white",
        border: "1px solid var(--border)",
        textDecoration: "none",
        color: "inherit",
        transition: "border-color 0.2s",
      }}
      className="product-card-hover"
    >
      {/* Image */}
      <div style={{ background: "var(--silver)", height: 200, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name ?? product.slug}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
            style={{ objectFit: "contain", padding: "16px" }}
          />
        ) : (
          <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.15, color: "var(--gray)" }}>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        )}
        {/* Watermark */}
        <img
          src="/labtech-watermark.png"
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            width: 90,
            opacity: 0.35,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        {product.is_featured && (
          <div style={{ position: "absolute", top: 12, left: 12, background: "var(--blue)", color: "white", fontSize: 10, fontWeight: 700, padding: "4px 10px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {t("bestseller")}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 20px 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", lineHeight: 1.4, marginBottom: 12 }}>
          {product.name ?? product.slug}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.04em" }}>
            {product.price ?? t("price_default")}
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gray)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {t("more")}
          </span>
        </div>
      </div>
    </Link>
  );
}
