"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Plus, Minus } from "lucide-react";
import type { Category } from "@/types";

interface CategoryTreeProps {
  categories: Category[];
  activeSlug?: string;
}

function buildTree(cats: Category[]): Category[] {
  const map: Record<string, Category & { children: Category[] }> = {};
  const roots: (Category & { children: Category[] })[] = [];
  cats.forEach((c) => { map[c.id] = { ...c, children: [] }; });
  cats.forEach((c) => {
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].children.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });
  return roots;
}

function TreeNode({
  node,
  activeSlug,
  depth = 0,
}: {
  node: Category & { children?: Category[] };
  activeSlug?: string;
  depth?: number;
}) {
  const locale = useLocale();
  const hasChildren = node.children && node.children.length > 0;
  const isActive = node.slug === activeSlug;
  const [open, setOpen] = useState(
    isActive || node.children?.some((c) => c.slug === activeSlug) || false
  );

  return (
    <div style={{ borderBottom: "1px solid #e8e8e8" }}>
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <Link
          href={`/${locale}/catalog/${node.slug}`}
          style={{
            flex: 1,
            display: "block",
            padding: depth === 0 ? "11px 16px" : "9px 16px",
            paddingLeft: depth === 0 ? 16 : 32,
            fontSize: depth === 0 ? 14 : 13,
            fontWeight: isActive ? 700 : depth === 0 ? 500 : 400,
            color: isActive ? "var(--blue)" : depth === 0 ? "var(--ink)" : "#555",
            textDecoration: "none",
            background: isActive ? "rgba(0,82,204,0.05)" : "transparent",
            lineHeight: 1.35,
          }}
        >
          {node.name ?? node.slug}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Свернуть" : "Развернуть"}
            style={{
              background: "none",
              border: "none",
              borderLeft: "1px solid #e8e8e8",
              cursor: "pointer",
              color: "var(--gray)",
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {open ? <Minus size={12} /> : <Plus size={12} />}
          </button>
        )}
      </div>
      {hasChildren && open && (
        <div style={{ background: "#fafafa" }}>
          {(node.children as (Category & { children?: Category[] })[]).map((child) => (
            <TreeNode key={child.id} node={child} activeSlug={activeSlug} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryTree({ categories, activeSlug }: CategoryTreeProps) {
  const tree = buildTree(categories) as (Category & { children?: Category[] })[];

  return (
    <div style={{ border: "1px solid #e8e8e8", background: "white" }}>
      {tree.map((node) => (
        <TreeNode key={node.id} node={node} activeSlug={activeSlug} />
      ))}
    </div>
  );
}
