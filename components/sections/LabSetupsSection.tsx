"use client";

import { useState } from "react";
import { LAB_SETUPS, type LabSetup } from "@/data/labSetups";
import Link from "next/link";

function groupByCategory(items: LabSetup["items"]) {
  return items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

export default function LabSetupsSection({ locale }: { locale: string }) {
  const [activeId, setActiveId] = useState(LAB_SETUPS[0].id);
  const active = LAB_SETUPS.find((l) => l.id === activeId)!;
  const grouped = groupByCategory(active.items);

  return (
    <div>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 2,
          marginBottom: 48,
          flexWrap: "wrap",
        }}
      >
        {LAB_SETUPS.map((lab) => {
          const isActive = lab.id === activeId;
          return (
            <button
              key={lab.id}
              onClick={() => setActiveId(lab.id)}
              style={{
                padding: "14px 24px",
                background: isActive ? "var(--blue)" : "var(--silver)",
                color: isActive ? "white" : "var(--ink)",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "inherit",
                textAlign: "left",
                transition: "background 0.2s, color 0.2s",
                flex: "1 1 auto",
                minWidth: 180,
              }}
            >
              <span style={{ marginRight: 8 }}>{lab.icon}</span>
              {lab.title}
            </button>
          );
        })}
      </div>

      {/* Active lab info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 48,
          alignItems: "start",
        }}
        className="lab-setup-grid"
      >
        {/* Left: description + CTA */}
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--blue)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Комплектация
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 700,
              color: "var(--ink)",
              lineHeight: 1.3,
              marginBottom: 16,
            }}
          >
            {active.title}
          </h2>
          <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.75, marginBottom: 32 }}>
            {active.description}
          </p>

          <div
            style={{
              background: "var(--silver)",
              padding: "20px 24px",
              borderLeft: "3px solid var(--blue)",
              marginBottom: 28,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>
              {active.items.length} позиций в комплектации
            </div>
            <div style={{ fontSize: 12, color: "var(--gray)" }}>
              Подбираем под бюджет и задачи клиента
            </div>
          </div>

          <Link
            href={`/${locale}/contacts`}
            className="btn-primary"
            style={{ display: "inline-block" }}
          >
            Запросить комплектацию
          </Link>
        </div>

        {/* Right: equipment table */}
        <div>
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--blue)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  paddingBottom: 8,
                  borderBottom: "1px solid var(--silver)",
                }}
              >
                {category}
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {items.map((item, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: "1px solid var(--silver)" }}
                    >
                      <td
                        style={{
                          padding: "10px 0",
                          fontSize: 13,
                          lineHeight: 1.5,
                          width: "100%",
                        }}
                      >
                        {item.catalogSlug ? (
                          <Link
                            href={`/${locale}/catalog/${item.catalogSlug}`}
                            style={{
                              color: "var(--blue)",
                              textDecoration: "none",
                              fontWeight: 500,
                              borderBottom: "1px dashed var(--blue)",
                              paddingBottom: 1,
                            }}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <span style={{ color: "var(--ink)" }}>{item.name}</span>
                        )}
                        {item.note && (
                          <span style={{ fontSize: 11, color: "var(--gray)", marginLeft: 8 }}>
                            ({item.note})
                          </span>
                        )}
                      </td>
                      <td
                        style={{
                          padding: "10px 0 10px 16px",
                          fontSize: 12,
                          fontWeight: 700,
                          color: "var(--blue)",
                          whiteSpace: "nowrap",
                          textAlign: "right",
                        }}
                      >
                        {item.qty} шт
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
