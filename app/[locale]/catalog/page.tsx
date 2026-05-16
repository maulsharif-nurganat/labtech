import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getCategories } from "@/lib/supabase/queries";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CategoryCard from "@/components/catalog/CategoryCard";
import CategoryTree from "@/components/catalog/CategoryTree";
import CATEGORIES from "@/data/categoryTree";

export const dynamic = "force-dynamic";

// Top-level categories only — for the cards grid
const TOP_LEVEL = CATEGORIES.filter((c) => c.parent_id === null);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "catalog" });
  return {
    title: t("title"),
    description: "Полный каталог лабораторного и медицинского оборудования — LabTech Казахстан",
    alternates: {
      canonical: `https://labtech.kz/${locale}/catalog`,
      languages: { ru: "/ru/catalog", kk: "/kz/catalog", en: "/en/catalog" },
    },
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  // Try Supabase first; fall back to hardcoded tree for the cards grid
  let gridCategories: any[] = TOP_LEVEL;
  try {
    const fetched = await getCategories(locale);
    if (fetched.length > 0) gridCategories = fetched.filter((c: any) => !c.parent_id);
  } catch {}

  return (
    <>
      <Breadcrumb items={[{ label: t("breadcrumb.catalog") }]} />
      <div style={{ maxWidth: 1400, margin: "0 auto", paddingTop: "60px", paddingBottom: "60px" }} className="px-5 md:px-14">
        <h1 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>
          {t("catalog.title")}
        </h1>
        <p style={{ fontSize: 15, color: "var(--gray)", marginBottom: 48 }}>
          {t("categories.subtitle")}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 40 }} className="catalog-layout">
          {/* Sidebar — always uses full hardcoded tree */}
          <aside>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gray)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
              {t("catalog.all_categories")}
            </div>
            <CategoryTree categories={CATEGORIES as any} />
          </aside>

          {/* Cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
            {gridCategories.map((cat: any) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
