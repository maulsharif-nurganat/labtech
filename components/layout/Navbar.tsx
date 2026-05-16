"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Phone, FlaskConical } from "lucide-react";

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function switchLocale(loc: string) {
    const segments = pathname.split("/");
    segments[1] = loc;
    router.push(segments.join("/") || "/");
  }

  const navLinks = [
    { href: `/${locale}/catalog`, label: t("nav.catalog") },
    { href: `/${locale}/osnashchenie-kdl`, label: t("nav.lab_setups") },
    { href: `/${locale}/partners`, label: t("nav.partners") },
    { href: `/${locale}/about`, label: t("nav.about") },
    { href: `/${locale}/services`, label: t("nav.services") },
    { href: `/${locale}/contacts`, label: t("nav.contacts") },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "white",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 56px",
          height: 72,
          maxWidth: 1400,
          margin: "0 auto",
        }}
        className="px-5 md:px-14"
      >
        {/* Logo */}
        <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
          <div style={{ width: 40, height: 40, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FlaskConical size={20} color="white" />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
              LabTech
            </div>
            <div style={{ fontSize: 10, color: "var(--gray)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 1 }}>
              {t("footer.tagline")}
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 32 }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: pathname.startsWith(link.href) ? "var(--blue)" : "var(--ink)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 0.15s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Phone */}
          <a
            href={`tel:${t("nav.phone").replace(/\s/g, "")}`}
            className="hidden md:flex"
            style={{ alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "var(--ink)", textDecoration: "none" }}
          >
            <Phone size={14} />
            {t("nav.phone")}
          </a>

          {/* Locale switcher */}
          <div className="hidden md:flex" style={{ gap: 4 }}>
            {["ru", "kz", "en"].map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                style={{
                  background: locale === loc ? "var(--blue)" : "none",
                  color: locale === loc ? "white" : "var(--gray)",
                  border: "1.5px solid",
                  borderColor: locale === loc ? "var(--blue)" : "var(--border)",
                  padding: "4px 8px",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  fontFamily: "inherit",
                }}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Burger */}
          <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink)" }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "white", borderTop: "1px solid var(--border)", padding: "20px 20px 32px" }} className="md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ display: "block", padding: "12px 0", fontSize: 15, fontWeight: 600, color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            {["ru", "kz", "en"].map((loc) => (
              <button
                key={loc}
                onClick={() => { switchLocale(loc); setOpen(false); }}
                style={{
                  background: locale === loc ? "var(--blue)" : "none",
                  color: locale === loc ? "white" : "var(--gray)",
                  border: "1.5px solid",
                  borderColor: locale === loc ? "var(--blue)" : "var(--border)",
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            href={`tel:${t("nav.phone").replace(/\s/g, "")}`}
            style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, fontSize: 15, fontWeight: 700, color: "var(--blue)", textDecoration: "none" }}
          >
            <Phone size={16} />
            {t("nav.phone")}
          </a>
        </div>
      )}
    </nav>
  );
}
