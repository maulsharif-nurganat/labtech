"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSearch} style={{ display: "flex", maxWidth: 520, width: "100%", marginBottom: 32 }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("nav.search_placeholder")}
        style={{
          flex: 1,
          padding: "14px 20px",
          fontSize: 14,
          border: "none",
          outline: "none",
          background: "rgba(255,255,255,0.12)",
          color: "white",
          fontFamily: "inherit",
          backdropFilter: "blur(4px)",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "14px 20px",
          background: "var(--accent, #0052CC)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Search size={18} color="white" />
      </button>
    </form>
  );
}
