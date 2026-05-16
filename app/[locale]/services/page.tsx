import { SITE_URL } from "@/lib/siteUrl";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactSection from "@/components/sections/ContactSection";
import { Truck, Wrench, GraduationCap, ShieldCheck, MessageCircle, Package, Clock, MapPin } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: `${SITE_URL}/${locale}/services` },
  };
}

const SERVICE_KEYS = [
  { icon: Truck, key: "item1" },
  { icon: Wrench, key: "item2" },
  { icon: GraduationCap, key: "item3" },
  { icon: Package, key: "item4" },
  { icon: MessageCircle, key: "item5" },
  { icon: ShieldCheck, key: "item6" },
];

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const guarantees = [
    { icon: Clock, label: t("services.guarantee1_label"), sub: t("services.guarantee1_sub") },
    { icon: MapPin, label: t("services.guarantee2_label"), sub: t("services.guarantee2_sub") },
    { icon: ShieldCheck, label: t("services.guarantee3_label"), sub: t("services.guarantee3_sub") },
    { icon: GraduationCap, label: t("services.guarantee4_label"), sub: t("services.guarantee4_sub") },
  ];

  return (
    <>
      <Breadcrumb items={[{ label: t("services.title") }]} />

      {/* Hero */}
      <section style={{ background: "var(--blue)", color: "white", paddingTop: "80px", paddingBottom: "64px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("services.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>
            {t("services.title")}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 580 }}>
            {t("services.subtitle")}
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
            <Link href={`/${locale}/contacts`} className="btn-primary">
              {t("services.cta_primary")}
            </Link>
            <Link href={`/${locale}/osnashchenie-kdl`} className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
              {t("services.cta_secondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 2 }}>
            {SERVICE_KEYS.map(({ icon: Icon, key }, i) => (
              <div key={key} style={{ background: i % 2 === 0 ? "var(--silver)" : "white", padding: "40px 36px", borderTop: "3px solid var(--blue)" }}>
                <div style={{ width: 48, height: 48, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon size={22} color="white" />
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>
                  {t(`services.${key}_title` as any)}
                </h2>
                <p style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.7, marginBottom: 20 }}>
                  {t(`services.${key}_text` as any)}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[1, 2, 3, 4].map((n) => (
                    <li key={n} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <div style={{ width: 4, height: 4, background: "var(--blue)", borderRadius: "50%", flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontSize: 12, color: "var(--gray)" }}>
                        {t(`services.${key}_step${n}` as any)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees strip */}
      <section style={{ background: "var(--blue)", paddingTop: "60px", paddingBottom: "60px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 32 }}>
            {guarantees.map(({ icon: Icon, label, sub }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Icon size={28} color="rgba(255,255,255,0.8)" />
                <div style={{ fontSize: 14, fontWeight: 700, color: "white", lineHeight: 1.3 }}>{label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection locale={locale} />
    </>
  );
}
