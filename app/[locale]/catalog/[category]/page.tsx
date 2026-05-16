import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getCategoryBySlug, getProducts, getAllCategorySlugs } from "@/lib/supabase/queries";
import { SITE_URL } from "@/lib/siteUrl";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductCard from "@/components/catalog/ProductCard";
import CategoryCard from "@/components/catalog/CategoryCard";
import CategoryTree from "@/components/catalog/CategoryTree";
import CATEGORIES from "@/data/categoryTree";

// Re-fetch from Supabase on every request so product/category changes are instant
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const locales = routing.locales;
  // Always include hardcoded category slugs (both parents and subcategories)
  const hardcodedSlugs = CATEGORIES.map((c) => c.slug);
  try {
    const dbSlugs = await getAllCategorySlugs();
    const allSlugs = Array.from(new Set([...hardcodedSlugs, ...dbSlugs]));
    return locales.flatMap((locale) => allSlugs.map((category) => ({ locale, category })));
  } catch {
    return locales.flatMap((locale) => hardcodedSlugs.map((category) => ({ locale, category })));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  setRequestLocale(locale);
  try {
    const cat = await getCategoryBySlug(category, locale);
    const localCat = CATEGORIES.find((c) => c.slug === category);
    const name = cat?.name ?? localCat?.name ?? category;
    return {
      title: name,
      description: `Купить ${name} в Казахстане. LabTech — официальный дистрибьютор.`,
      alternates: { canonical: `${SITE_URL}/${locale}/catalog/${category}` },
    };
  } catch {
    return { title: `Каталог | LabTech` };
  }
}


export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  // Find subcategories from local tree (fast, no DB call)
  const localCat = CATEGORIES.find((c) => c.slug === category);
  const localSubcats = localCat
    ? CATEGORIES.filter((c) => c.parent_id === localCat.id)
    : [];

  let categoryData: any = null;
  let products: any[] = [];

  try {
    categoryData = await getCategoryBySlug(category, locale);
    if (categoryData) {
      const fetched = await getProducts(categoryData.id, locale);
      products = fetched; // keep empty array if no direct products
    }
  } catch {}

  const catName = categoryData?.name ?? localCat?.name ?? category;

  return (
    <>
      <Breadcrumb
        items={[
          { label: t("breadcrumb.catalog"), href: `/${locale}/catalog` },
          { label: catName },
        ]}
      />
      <div style={{ maxWidth: 1400, margin: "0 auto", paddingTop: "60px", paddingBottom: "60px" }} className="px-5 md:px-14">
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 40, alignItems: "start" }} className="catalog-layout">
          {/* Sidebar */}
          <aside>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gray)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
              {t("catalog.all_categories")}
            </div>
            <CategoryTree categories={CATEGORIES as any} activeSlug={category} />
          </aside>

          {/* Main */}
          <div>
            <h1 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 700, color: "var(--ink)", marginBottom: 32 }}>
              {catName}
            </h1>

            {/* If parent category with subcategories and no direct products → show subcategory tiles */}
            {localSubcats.length > 0 && products.length === 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2 }}>
                {localSubcats.map((sub) => (
                  <CategoryCard key={sub.id} category={sub as any} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} categorySlug={category} />
                ))}
              </div>
            ) : (
              <div style={{ padding: "60px 0", textAlign: "center", color: "var(--gray)" }}>
                <p style={{ fontSize: 16 }}>{t("catalog.no_products")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
