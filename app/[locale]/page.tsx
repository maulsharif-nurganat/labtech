import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import { getCategories, getFeaturedProducts } from "@/lib/supabase/queries";
import CategoryCard from "@/components/catalog/CategoryCard";
import ProductCard from "@/components/catalog/ProductCard";
import ContactSection from "@/components/sections/ContactSection";
import KazakhstanMap from "@/components/sections/KazakhstanMap";
import { CheckCircle, Truck, GraduationCap, Wrench, ArrowRight } from "lucide-react";
import HeroSearch from "@/components/sections/HeroSearch";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
  { id: "9", slug: "pcr-diagnostika", name: "ПЦР-диагностика", parent_id: null, image_url: null, sort_order: 9, is_active: true, created_at: "" },
  { id: "10", slug: "koagulyatsiya", name: "Коагулология", parent_id: null, image_url: null, sort_order: 10, is_active: true, created_at: "" },
  { id: "11", slug: "immunologiya", name: "Иммунология и серология", parent_id: null, image_url: null, sort_order: 11, is_active: true, created_at: "" },
  { id: "12", slug: "gematologiya", name: "Гематология", parent_id: null, image_url: null, sort_order: 12, is_active: true, created_at: "" },
  { id: "13", slug: "biohimiya", name: "Биохимия", parent_id: null, image_url: null, sort_order: 13, is_active: true, created_at: "" },
  { id: "14", slug: "mikrobiologiya", name: "Микробиология", parent_id: null, image_url: null, sort_order: 14, is_active: true, created_at: "" },
  { id: "15", slug: "raskhodnye-materialy", name: "Расходные материалы", parent_id: null, image_url: null, sort_order: 15, is_active: true, created_at: "" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  let categories = MOCK_CATEGORIES;
  let featuredProducts: any[] = [];

  try {
    const fetched = await getCategories(locale);
    if (fetched.length > 0) categories = fetched.slice(0, 8) as any;
    featuredProducts = await getFeaturedProducts(locale, 6);
  } catch {}

  const whyItems = [
    { icon: CheckCircle, title: t("why_us.item1_title"), text: t("why_us.item1_text") },
    { icon: Wrench, title: t("why_us.item2_title"), text: t("why_us.item2_text") },
    { icon: GraduationCap, title: t("why_us.item3_title"), text: t("why_us.item3_text") },
    { icon: Truck, title: t("why_us.item4_title"), text: t("why_us.item4_text") },
  ];

  const stats = [
    { value: t("hero.stat1_value"), label: t("hero.stat1_label") },
    { value: t("hero.stat2_value"), label: t("hero.stat2_label") },
    { value: t("hero.stat3_value"), label: t("hero.stat3_label") },
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", background: "var(--blue)", backgroundImage: "url('/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center right", color: "white", paddingTop: "100px", paddingBottom: "80px" }} className="px-5 md:px-14">
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,28,60,0.72)" }} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>
            {t("hero.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 700, marginBottom: 24, letterSpacing: "-0.01em" }}>
            {t("hero.title")}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 560, marginBottom: 32 }}>
            {t("hero.subtitle")}
          </p>

          {/* Search */}
          <HeroSearch />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href={`/${locale}/catalog`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "white",
                color: "var(--blue)",
                fontWeight: 700,
                fontSize: 13,
                padding: "14px 28px",
                textDecoration: "none",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "background 0.15s",
              }}
            >
              {t("hero.cta_primary")}
              <ArrowRight size={16} />
            </Link>
            <Link href={`/${locale}/contacts`} className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.35)", color: "white" }}>
              {t("hero.cta_secondary")}
            </Link>
            <a
              href="https://l.kaspi.kz/shop/E4RNuNw1Tgeoons"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0 20px",
                height: 44,
                background: "#FF0000",
                color: "white",
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                <path d="M7 4h14v2H7zM3 4h2v2H3zM3 11h2v2H3zM7 11h14v2H7zM3 18h2v2H3zM7 18h14v2H7z"/>
              </svg>
              {t("hero.cta_kaspi")}
            </a>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: 48, marginTop: 64, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.15)", flexWrap: "wrap" }}>
            {stats.map((s) => (
              <div key={s.value}>
                <div style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: 36, fontWeight: 700, color: "white" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px", background: "var(--silver)" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
                {t("categories.title")}
              </div>
              <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)" }}>
                {t("categories.subtitle")}
              </h2>
            </div>
            <Link href={`/${locale}/catalog`} className="btn-outline">
              {t("categories.view_all")}
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2 }}>
            {categories.map((cat: any) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
            {t("why_us.title")}
          </div>
          <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)", marginBottom: 48 }}>
            {t("why_us.title")}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 }}>
            {whyItems.map((item) => (
              <div key={item.title} style={{ background: "var(--silver)", padding: "32px 28px", borderLeft: "3px solid var(--blue)" }}>
                <item.icon size={28} style={{ color: "var(--blue)", marginBottom: 16 }} />
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kazakhstan delivery map */}
      <KazakhstanMap />

      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <section style={{ paddingTop: "80px", paddingBottom: "80px", background: "var(--silver)" }} className="px-5 md:px-14">
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)", marginBottom: 40 }}>
              {t("product.bestseller")}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
              {featuredProducts.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact section */}
      <ContactSection locale={locale} />
    </>
  );
}
