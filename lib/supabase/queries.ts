import { createClient as createServerClient } from "@supabase/supabase-js";
import type { Category, Product, SeoMeta } from "@/types";

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return createServerClient(url, key);
}

export async function getCategories(locale = "ru"): Promise<Category[]> {
  const supabase = getClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (!categories) return [];

  const ids = categories.map((c) => c.id);
  const { data: translations } = await supabase
    .from("translations")
    .select("entity_id, field, value")
    .eq("entity_type", "category")
    .eq("locale", locale)
    .in("entity_id", ids);

  const transMap: Record<string, Record<string, string>> = {};
  translations?.forEach(({ entity_id, field, value }) => {
    if (!transMap[entity_id]) transMap[entity_id] = {};
    transMap[entity_id][field] = value;
  });

  return categories.map((c) => ({
    ...c,
    name: transMap[c.id]?.name ?? c.slug,
    description: transMap[c.id]?.description ?? "",
  }));
}

export async function getCategoryBySlug(slug: string, locale = "ru"): Promise<Category | null> {
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
    .eq("entity_id", category.id)
    .eq("locale", locale);

  const trans: Record<string, string> = {};
  translations?.forEach(({ field, value }) => { trans[field] = value; });

  return { ...category, name: trans.name ?? category.slug, description: trans.description ?? "" };
}

export async function getProducts(categoryId?: string, locale = "ru"): Promise<Product[]> {
  const supabase = getClient();
  let query = supabase.from("products").select("*").eq("is_active", true);
  if (categoryId) query = query.eq("category_id", categoryId);

  const { data: products } = await query.order("created_at", { ascending: false });
  if (!products) return [];

  const ids = products.map((p) => p.id);
  const { data: translations } = await supabase
    .from("translations")
    .select("entity_id, field, value")
    .eq("entity_type", "product")
    .eq("locale", locale)
    .in("entity_id", ids);

  const transMap: Record<string, Record<string, string>> = {};
  translations?.forEach(({ entity_id, field, value }) => {
    if (!transMap[entity_id]) transMap[entity_id] = {};
    transMap[entity_id][field] = value;
  });

  return products.map((p) => ({
    ...p,
    name: transMap[p.id]?.name ?? p.slug,
    description: transMap[p.id]?.description ?? "",
  }));
}

export async function getProductBySlug(slug: string, locale = "ru"): Promise<Product | null> {
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
    .eq("entity_id", product.id)
    .eq("locale", locale);

  const trans: Record<string, string> = {};
  translations?.forEach(({ field, value }) => { trans[field] = value; });

  return { ...product, name: trans.name ?? product.slug, description: trans.description ?? "" };
}

export async function getFeaturedProducts(locale = "ru", limit = 6): Promise<Product[]> {
  const supabase = getClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(limit);

  if (!products) return [];

  const ids = products.map((p) => p.id);
  const { data: translations } = await supabase
    .from("translations")
    .select("entity_id, field, value")
    .eq("entity_type", "product")
    .eq("locale", locale)
    .in("entity_id", ids);

  const transMap: Record<string, Record<string, string>> = {};
  translations?.forEach(({ entity_id, field, value }) => {
    if (!transMap[entity_id]) transMap[entity_id] = {};
    transMap[entity_id][field] = value;
  });

  return products.map((p) => ({
    ...p,
    name: transMap[p.id]?.name ?? p.slug,
    description: transMap[p.id]?.description ?? "",
  }));
}

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
  return data ?? null;
}

export async function searchProducts(query: string, locale = "ru"): Promise<Product[]> {
  const supabase = getClient();
  const { data: translations } = await supabase
    .from("translations")
    .select("entity_id, field, value")
    .eq("entity_type", "product")
    .eq("locale", locale)
    .eq("field", "name")
    .ilike("value", `%${query}%`);

  if (!translations?.length) return [];

  const ids = translations.map((t) => t.entity_id);
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .in("id", ids);

  if (!products) return [];

  const transMap: Record<string, string> = {};
  translations.forEach(({ entity_id, value }) => { transMap[entity_id] = value; });

  return products.map((p) => ({ ...p, name: transMap[p.id] ?? p.slug }));
}

export async function getAllProductSlugs(): Promise<string[]> {
  const supabase = getClient();
  const { data } = await supabase.from("products").select("slug").eq("is_active", true);
  return data?.map((p) => p.slug) ?? [];
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const supabase = getClient();
  const { data } = await supabase.from("categories").select("slug").eq("is_active", true);
  return data?.map((c) => c.slug) ?? [];
}
