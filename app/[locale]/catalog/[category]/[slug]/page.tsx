import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/siteUrl";
import { getProductBySlug, getCategoryBySlug, getProducts, getAllCategorySlugs } from "@/lib/supabase/queries";
import CATEGORIES from "@/data/categoryTree";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductGallery from "@/components/catalog/ProductGallery";
import SpecsTable from "@/components/catalog/SpecsTable";
import ProductCard from "@/components/catalog/ProductCard";
import ProductActions from "@/components/catalog/ProductActions";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const locales = routing.locales;
  try {
    const slugs = await getAllCategorySlugs();
    return locales.flatMap((locale) =>
      slugs.map((category) => ({ locale, category, slug: "placeholder" }))
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);
  let product: any = null;
  try {
    product = await getProductBySlug(slug, locale);
  } catch {}
  if (!product) return { title: "Продукт не найден | LabTech" };
  const name = product.name;
  const description = product.description ?? "";
  return {
    title: name,
    description: description.slice(0, 160),
    alternates: {
      canonical: `${SITE_URL}/${locale}/catalog/${category}/${slug}`,
      languages: {
        ru: `/ru/catalog/${category}/${slug}`,
        kk: `/kz/catalog/${category}/${slug}`,
        en: `/en/catalog/${category}/${slug}`,
      },
    },
    openGraph: {
      title: name,
      description: description.slice(0, 160),
      images: product?.images?.[0] ? [product.images[0]] : [],
    },
  };
}


export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  // Fetch product — show 404 if not found
  const product = await getProductBySlug(slug, locale).catch(() => null);
  if (!product) notFound();

  let categoryData: any = null;
  let relatedProducts: any[] = [];

  try {
    const [cat, allProducts] = await Promise.all([
      getCategoryBySlug(category, locale),
      getProducts(product.category_id, locale),
    ]);
    categoryData = cat;
    relatedProducts = allProducts.filter((p: any) => p.slug !== slug).slice(0, 3);
  } catch {}

  const localCat = CATEGORIES.find((c) => c.slug === category);
  const catName = categoryData?.name ?? localCat?.name ?? category;
  const productName = product.name ?? slug;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: product.description ?? "",
    url: `${SITE_URL}/${locale}/catalog/${category}/${slug}`,
    ...(product.images?.[0] ? { image: product.images } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: "KZT",
      price: 0,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "ТОО «LabTech»" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Breadcrumb
        items={[
          { label: t("breadcrumb.catalog"), href: `/${locale}/catalog` },
          { label: catName, href: `/${locale}/catalog/${category}` },
          { label: productName },
        ]}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "calc(100vh - 120px)" }} className="product-layout">
        {/* Gallery — sticky left column */}
        <div style={{ position: "sticky", top: 72, height: "calc(100vh - 72px)" }}>
          <ProductGallery images={product.images ?? []} name={productName} />
        </div>

        {/* Info — scrollable right column */}
        <div style={{ padding: "56px", overflowY: "auto" }} className="px-5 md:px-14">
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
            {catName}
          </div>
          <h1 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.01em" }}>
            {productName}
          </h1>
          {product.description && (
            <p style={{ fontSize: 15, color: "var(--gray)", lineHeight: 1.7, marginBottom: 40, borderBottom: "1px solid var(--border)", paddingBottom: 40 }}>
              {product.description}
            </p>
          )}

          {/* Price block */}
          <div style={{ background: "var(--silver)", padding: "24px 28px", marginBottom: 32, borderLeft: "3px solid var(--blue)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
              {t("product.price_label")}
            </div>
            <div style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: 26, fontWeight: 700, color: "var(--ink)" }}>
              {product.price ?? t("product.price_default")}
            </div>
            <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 4 }}>{t("product.price_note")}</div>
          </div>

          {/* Actions */}
          <ProductActions
            productId={product.id}
            productName={productName}
            locale={locale}
          />

          {/* Specs */}
          {product.specs?.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <SpecsTable specs={product.specs} />
            </div>
          )}

          {/* Features */}
          {product.features?.length > 0 && (
            <div style={{ marginTop: 48, paddingTop: 48, borderTop: "1px solid var(--border)" }}>
              <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 24 }}>
                {t("product.features_title")}
              </h2>
              {product.features.map((f: any, i: number) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 28, height: 28, background: "var(--blue)", color: "white", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.65 }}>
                    <strong style={{ color: "var(--ink)" }}>{f.title}.</strong> {f.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section style={{ paddingTop: "80px", paddingBottom: "80px", background: "var(--silver)", borderTop: "1px solid var(--border)" }} className="px-5 md:px-14">
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>
              {t("product.related_title")}
            </div>
            <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 40 }}>
              {t("product.related_subtitle")}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
              {relatedProducts.map((p: any) => (
                <ProductCard key={p.id} product={p} categorySlug={category} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
