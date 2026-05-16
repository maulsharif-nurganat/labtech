import { SITE_URL } from "@/lib/siteUrl";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactSection from "@/components/sections/ContactSection";
import { PARTNERS } from "@/data/partners";
import PartnerGrid from "@/components/sections/PartnerGrid";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "partners" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: `${SITE_URL}/${locale}/partners` },
  };
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <Breadcrumb items={[{ label: t("partners.title") }]} />

      {/* Hero */}
      <section style={{ background: "var(--blue)", color: "white", paddingTop: "80px", paddingBottom: "64px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("partners.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 640, marginBottom: 20, letterSpacing: "-0.01em" }}>
            {t("partners.title")}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 560 }}>
            {t("partners.subtitle")}
          </p>

          <div style={{ display: "flex", gap: 48, marginTop: 48, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.12)", flexWrap: "wrap" }}>
            {[
              { value: `${PARTNERS.length}+`, label: t("partners.stat1_label") },
              { value: "15+",                  label: t("partners.stat2_label") },
              { value: "8",                    label: t("partners.stat3_label") },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: 36, fontWeight: 700, color: "white" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners grid */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            {t("partners.tag")}
          </div>
          <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)", marginBottom: 48 }}>
            {t("partners.grid_title")}
          </h2>
          <PartnerGrid />
        </div>
      </section>

      {/* Become a partner CTA */}
      <section style={{ background: "var(--silver)", paddingTop: "64px", paddingBottom: "64px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              {t("partners.cta_tag")}
            </div>
            <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
              {t("partners.cta_title")}
            </h2>
            <p style={{ fontSize: 14, color: "var(--gray)", maxWidth: 480, lineHeight: 1.7 }}>
              {t("partners.cta_text")}
            </p>
          </div>
          <a href="mailto:info@labtech.kz" className="btn-primary" style={{ flexShrink: 0 }}>
            {t("partners.cta_btn")}
          </a>
        </div>
      </section>

      <ContactSection locale={locale} />
    </>
  );
}
