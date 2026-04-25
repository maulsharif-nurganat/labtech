import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getCategoryBySlug, getProducts, getAllCategorySlugs } from "@/lib/supabase/queries";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductCard from "@/components/catalog/ProductCard";
import CategoryTree from "@/components/catalog/CategoryTree";
import CATEGORIES from "@/data/categoryTree";

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
    const mockCat = MOCK_CATEGORIES.find((c) => c.slug === category);
    const name = cat?.name ?? mockCat?.name ?? category;
    return {
      title: name,
      description: `Купить ${name} в Казахстане. LabTech — официальный дистрибьютор.`,
      alternates: { canonical: `https://labtech.kz/${locale}/catalog/${category}` },
    };
  } catch {
    return { title: `Каталог | LabTech` };
  }
}

const MOCK_CATEGORIES = [
  { id: "1", slug: "kliniko-diagnosticheskaya", name: "Клинико-диагностическая лаборатория", parent_id: null, image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "2", slug: "mikroskopy", name: "Микроскопы", parent_id: null, image_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: "3", slug: "obshchelaboratornoe", name: "Общелабораторное оборудование", parent_id: null, image_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: "4", slug: "reagenty", name: "Реагенты и красители", parent_id: null, image_url: null, sort_order: 4, is_active: true, created_at: "" },
  { id: "5", slug: "veterinariya", name: "Ветеринария", parent_id: null, image_url: null, sort_order: 5, is_active: true, created_at: "" },
  { id: "6", slug: "chistye-pomeshcheniya", name: "Чистые помещения", parent_id: null, image_url: null, sort_order: 6, is_active: true, created_at: "" },
  { id: "7", slug: "laboratornaya-posuda", name: "Лабораторная посуда", parent_id: null, image_url: null, sort_order: 7, is_active: true, created_at: "" },
  { id: "8", slug: "nebulayizery", name: "Небулайзеры", parent_id: null, image_url: null, sort_order: 8, is_active: true, created_at: "" },
  { id: "9", slug: "tonomety", name: "Тонометры", parent_id: null, image_url: null, sort_order: 9, is_active: true, created_at: "" },
  { id: "10", slug: "diagnostika-diabeta", name: "Диагностика диабета", parent_id: null, image_url: null, sort_order: 10, is_active: true, created_at: "" },
  { id: "11", slug: "biokhimicheskaya-laboratoriya", name: "Биохимическая лаборатория", parent_id: null, image_url: null, sort_order: 11, is_active: true, created_at: "" },
  { id: "12", slug: "sumki-kholodilniki", name: "Сумки-холодильники", parent_id: null, image_url: null, sort_order: 12, is_active: true, created_at: "" },
];

const MOCK_PRODUCTS = [
  { id: "p1", slug: "analizator-1", name: "Гематологический анализатор BC-3000", category_id: "1", price: "По запросу", images: [], specs: [], features: [], is_featured: true, is_active: true, hits: 0, created_at: "" },
  { id: "p2", slug: "analizator-2", name: "Анализатор мочи AU-410", category_id: "1", price: "По запросу", images: [], specs: [], features: [], is_featured: false, is_active: true, hits: 0, created_at: "" },
  { id: "p3", slug: "analizator-3", name: "Коагулометр Sysmex CA-620", category_id: "1", price: "По запросу", images: [], specs: [], features: [], is_featured: false, is_active: true, hits: 0, created_at: "" },
];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  let categoryData: any = null;
  let products: any[] = MOCK_PRODUCTS;

  try {
    categoryData = await getCategoryBySlug(category, locale);
    if (categoryData) {
      const fetched = await getProducts(categoryData.id, locale);
      if (fetched.length > 0) products = fetched;
    }
  } catch {}

  const mockCat = MOCK_CATEGORIES.find((c) => c.slug === category)
    ?? CATEGORIES.find((c) => c.slug === category);
  const catName = categoryData?.name ?? mockCat?.name ?? category;

  return (
    <>
      <Breadcrumb
        items={[
          { label: t("breadcrumb.catalog"), href: `/${locale}/catalog` },
          { label: catName },
        ]}
      />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 56px" }} className="px-5 md:px-14">
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
            <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 700, color: "var(--ink)", marginBottom: 32 }}>
              {catName}
            </h1>
            {products.length === 0 ? (
              <div style={{ padding: "60px 0", textAlign: "center", color: "var(--gray)" }}>
                <p style={{ fontSize: 16 }}>{t("catalog.no_products")}</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} categorySlug={category} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
