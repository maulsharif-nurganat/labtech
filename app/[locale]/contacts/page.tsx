import { SITE_URL } from "@/lib/siteUrl";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import LeadForm from "@/components/forms/LeadForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contacts" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: `${SITE_URL}/${locale}/contacts` },
  };
}

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const departments = [
    { label: t("contacts.dept1_label"), phones: ["+7 701 879 69 02", "+7 701 879 69 03"], note: t("contacts.dept1_note") },
    { label: t("contacts.dept2_label"), phones: ["+7 701 084 07 12", "+7 701 879 69 06"], note: t("contacts.dept2_note") },
    { label: t("contacts.dept3_label"), phones: ["+7 701 309 24 27"], note: t("contacts.dept3_note") },
    { label: t("contacts.dept4_label"), phones: ["+7 701 053 33 09"], note: t("contacts.dept4_note") },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalOrganization"],
    name: "ТОО «LabTech»",
    url: "${SITE_URL}",
    telephone: "+77273277477",
    email: "info@labtech.kz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "мкр. Аксай-4, 117а, цокольный этаж",
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    }],
    areaServed: { "@type": "Country", name: "Kazakhstan" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Breadcrumb items={[{ label: t("contacts.title") }]} />

      {/* Hero */}
      <section style={{ background: "var(--blue)", color: "white", paddingTop: "64px", paddingBottom: "64px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("contacts.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 12, letterSpacing: "-0.01em" }}>
            {t("contacts.title")}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", maxWidth: 500 }}>{t("contacts.subtitle")}</p>
        </div>
      </section>

      {/* Main info cards */}
      <section style={{ paddingTop: "60px", paddingBottom: "60px", background: "var(--silver)" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2, marginBottom: 2 }}>
            {[
              {
                icon: MapPin,
                label: t("contacts.address_title"),
                content: (
                  <a
                    href="https://go.2gis.com/Dfwoj"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1.5, textDecoration: "none", display: "block" }}
                  >
                    {t("contacts.address")}
                  </a>
                ),
              },
              {
                icon: Phone,
                label: t("contacts.phone_title"),
                content: (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <a href="tel:+77273277477" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>+7 (727) 327-74-77</a>
                    <a href="tel:+77272208142" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>+7 (727) 220-81-42</a>
                  </div>
                ),
              },
              {
                icon: Mail,
                label: t("contacts.email_title"),
                content: (
                  <a href="mailto:info@labtech.kz" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>info@labtech.kz</a>
                ),
              },
              {
                icon: Clock,
                label: t("contacts.hours_title"),
                content: (
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1.6 }}>
                    {t("contacts.hours_weekdays")}<br />
                    <span style={{ fontSize: 12, fontWeight: 400, color: "var(--gray)" }}>{t("contacts.hours_weekend")}</span>
                  </p>
                ),
              },
            ].map(({ icon: Icon, label, content }, i) => (
              <div key={i} style={{ background: "white", padding: "32px 28px", borderTop: "3px solid var(--blue)" }}>
                <Icon size={24} style={{ color: "var(--blue)", marginBottom: 16 }} />
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                  {label}
                </div>
                {content}
              </div>
            ))}
          </div>

          {/* WhatsApp banner */}
          <div style={{ background: "#25D366", padding: "20px 28px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <MessageCircle size={24} color="white" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{t("contacts.whatsapp_title")}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>{t("contacts.whatsapp_sub")} · +7 701 879 69 04</div>
            </div>
            <a
              href="https://wa.me/77018796904"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "white", color: "#25D366", fontWeight: 700, fontSize: 13, padding: "10px 20px", textDecoration: "none", flexShrink: 0 }}
            >
              {t("contacts.whatsapp_btn")}
            </a>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section style={{ paddingTop: "64px", paddingBottom: "64px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            {t("contacts.departments_tag")}
          </div>
          <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: "var(--ink)", marginBottom: 40 }}>
            {t("contacts.departments_title")}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
            {departments.map((dep) => (
              <div key={dep.label} style={{ background: "var(--silver)", padding: "28px 24px", borderLeft: "3px solid var(--blue)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>{dep.label}</div>
                <div style={{ fontSize: 11, color: "var(--blue)", fontWeight: 600, marginBottom: 12 }}>{dep.note}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {dep.phones.map((ph) => (
                    <a key={ph} href={`tel:${ph.replace(/\s/g, "")}`} style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600, textDecoration: "none" }}>
                      {ph}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section style={{ padding: "0 56px 0" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ position: "relative" }}>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=76.782%2C43.254%2C76.822%2C43.282&layer=mapnik&marker=43.268%2C76.802"
              width="100%"
              height="420"
              style={{ border: 0, display: "block", filter: "contrast(0.95) brightness(0.98)" }}
              loading="lazy"
              title="LabTech на карте"
            />
            {/* Address overlay */}
            <div style={{
              position: "absolute",
              top: 20,
              left: 20,
              background: "white",
              padding: "16px 20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              borderLeft: "3px solid var(--blue)",
              maxWidth: 280,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                ТОО «LabTech»
              </div>
              <div style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.55, marginBottom: 12 }}>
                {t("contacts.address")}
              </div>
              <a
                href="https://go.2gis.com/Dfwoj"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, fontWeight: 700, color: "var(--blue)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                Открыть в 2GIS →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section style={{ paddingTop: "64px", paddingBottom: "64px", background: "var(--silver)" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
            {t("lead_form.title")}
          </h2>
          <p style={{ fontSize: 14, color: "var(--gray)", marginBottom: 32 }}>{t("lead_form.subtitle")}</p>
          <div style={{ background: "white", padding: "40px" }}>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
