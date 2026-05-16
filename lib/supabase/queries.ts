import { createClient as createServerClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import type { Category, Product, SeoMeta } from "@/types";

// ── Singleton client (one instance per server process) ─────────────────────
let _client: ReturnType<typeof createServerClient> | null = null;
function getClient() {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  _client = createServerClient(url, key);
  return _client;
}

// ── Cache TTL: 60 seconds ──────────────────────────────────────────────────
const TTL = 60;

// ── Shared translation helpers ─────────────────────────────────────────────
type TransRow = { entity_id: string; field: string; value: string };
function buildTransMap(rows: TransRow[] | null): Record<string, Record<string, string>> {
  const map: Record<string, Record<string, string>> = {};
  rows?.forEach(({ entity_id, field, value }) => {
    if (!map[entity_id]) map[entity_id] = {};
    map[entity_id][field] = value;
  });
  return map;
}

// ── Categories ─────────────────────────────────────────────────────────────
async function _getCategories(locale: string): Promise<Category[]> {
  const supabase = getClient();

  const [catRes, transRes] = await Promise.all([
    supabase.from("categories").select("*").eq("is_active", true).order("sort_order"),
    supabase
      .from("translations")
      .select("entity_id, field, value")
      .eq("entity_type", "category")
      .eq("locale", locale),
  ]);

  const categories = (catRes.data ?? []) as any[];
  const transMap = buildTransMap((transRes.data ?? []) as TransRow[]);

  return categories.map((c: any) => ({
    ...c,
    name: transMap[c.id]?.name ?? c.slug,
    description: transMap[c.id]?.description ?? "",
  }));
}

export const getCategories = unstable_cache(
  _getCategories,
  ["categories"],
  { revalidate: TTL, tags: ["categories"] }
);

// ── Category by slug ────────────────────────────────────────────────────────
async function _getCategoryBySlug(slug: string, locale: string): Promise<Category | null> {
  const supabase = getClient();
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!category) return null;

  const { data: translations } = await supabase
    .from("translations")
    .select("field, value")
    .eq("entity_type", "category")
    .eq("entity_id", (category as any).id)
    .eq("locale", locale);

  const trans: Record<string, string> = {};
  (translations as any[] ?? []).forEach(({ field, value }: any) => { trans[field] = value; });

  return { ...(category as any), name: trans.name ?? (category as any).slug, description: trans.description ?? "" };
}

export const getCategoryBySlug = unstable_cache(
  _getCategoryBySlug,
  ["category-by-slug"],
  { revalidate: TTL, tags: ["categories"] }
);

// ── Products ────────────────────────────────────────────────────────────────
async function _getProducts(categoryId: string | undefined, locale: string): Promise<Product[]> {
  const supabase = getClient();
  let query = supabase.from("products").select("*").eq("is_active", true) as any;
  if (categoryId) query = query.eq("category_id", categoryId);

  const { data: products } = await query.order("created_at", { ascending: false });
  if (!products || (products as any[]).length === 0) return [];

  const ids = (products as any[]).map((p: any) => p.id);
  const { data: translations } = await supabase
    .from("translations")
    .select("entity_id, field, value")
    .eq("entity_type", "product")
    .eq("locale", locale)
    .in("entity_id", ids);

  const transMap = buildTransMap((translations ?? []) as TransRow[]);

  return (products as any[]).map((p: any) => ({
    ...p,
    name: transMap[p.id]?.name ?? p.slug,
    description: transMap[p.id]?.description ?? "",
  }));
}

export const getProducts = unstable_cache(
  _getProducts,
  ["products"],
  { revalidate: TTL, tags: ["products"] }
);

// ── Product by slug ─────────────────────────────────────────────────────────
async function _getProductBySlug(slug: string, locale: string): Promise<Product | null> {
  const supabase = getClient();
  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!product) return null;

  const { data: translations } = await supabase
    .from("translations")
    .select("field, value")
    .eq("entity_type", "product")
    .eq("entity_id", (product as any).id)
    .eq("locale", locale);

  const trans: Record<string, string> = {};
  (translations as any[] ?? []).forEach(({ field, value }: any) => { trans[field] = value; });

  return { ...(product as any), name: trans.name ?? (product as any).slug, description: trans.description ?? "" };
}

export const getProductBySlug = unstable_cache(
  _getProductBySlug,
  ["product-by-slug"],
  { revalidate: TTL, tags: ["products"] }
);

// ── Featured products ───────────────────────────────────────────────────────
async function _getFeaturedProducts(locale: string, limit: number): Promise<Product[]> {
  const supabase = getClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(limit);

  if (!products || (products as any[]).length === 0) return [];

  const ids = (products as any[]).map((p: any) => p.id);
  const { data: translations } = await supabase
    .from("translations")
    .select("entity_id, field, value")
    .eq("entity_type", "product")
    .eq("locale", locale)
    .in("entity_id", ids);

  const transMap = buildTransMap((translations ?? []) as TransRow[]);

  return (products as any[]).map((p: any) => ({
    ...p,
    name: transMap[p.id]?.name ?? p.slug,
    description: transMap[p.id]?.description ?? "",
  }));
}

export const getFeaturedProducts = unstable_cache(
  _getFeaturedProducts,
  ["featured-products"],
  { revalidate: TTL, tags: ["products"] }
);

// ── SEO Meta ────────────────────────────────────────────────────────────────
export async function getSeoMeta(
  entityType: string,
  entityId: string,
  locale = "ru"
): Promise<SeoMeta | null> {
  const supabase = getClient();
  const { data } = await supabase
    .from("seo_meta")
    .select("*")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .eq("locale", locale)
    .single();
  return (data as any) ?? null;
}

// ── Search ──────────────────────────────────────────────────────────────────
export async function searchProducts(query: string, locale = "ru"): Promise<Product[]> {
  const supabase = getClient();
  const { data: translations } = await supabase
    .from("translations")
    .select("entity_id, field, value")
    .eq("entity_type", "product")
    .eq("locale", locale)
    .eq("field", "name")
    .ilike("value", `%${query}%`);

  if (!(translations as any[])?.length) return [];

  const ids = (translations as any[]).map((t: any) => t.entity_id);
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .in("id", ids);

  if (!products) return [];

  const transMap: Record<string, string> = {};
  (translations as any[]).forEach(({ entity_id, value }: any) => { transMap[entity_id] = value; });

  return (products as any[]).map((p: any) => ({ ...p, name: transMap[p.id] ?? p.slug }));
}

// ── Slug helpers ────────────────────────────────────────────────────────────
export async function getAllProductSlugs(): Promise<string[]> {
  const supabase = getClient();
  const { data } = await supabase.from("products").select("slug").eq("is_active", true);
  return (data as any[])?.map((p: any) => p.slug) ?? [];
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const supabase = getClient();
  const { data } = await supabase.from("categories").select("slug").eq("is_active", true);
  return (data as any[])?.map((c: any) => c.slug) ?? [];
}
