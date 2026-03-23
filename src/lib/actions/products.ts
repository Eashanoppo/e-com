"use server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")     // Replace spaces with -
    .replace(/[^\w-]+/g, "")   // Remove all non-word chars
    .replace(/--+/g, "-");     // Replace multiple - with single -
};

export async function getProducts() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project-id")) {
    console.warn("⚠️ Supabase URL is using a placeholder. Please update .env.local with your real project URL.");
    return [];
  }
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching products:", error.message);
      return [];
    }
    return data || [];
  } catch (err: any) {
    console.error("Failed to get products:", err.message || err);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error fetching product by ID:", error.message);
      return null;
    }
    return data;
  } catch (err: any) {
    console.error("Failed to get product by ID:", err.message || err);
    return null;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Supabase error fetching product by slug:", error.message);
      return null;
    }
    return data;
  } catch (err: any) {
    console.error("Failed to get product by slug:", err.message || err);
    return null;
  }
}

export async function createProduct(formData: any) {
  const slug = slugify(formData.name);
  const { error } = await supabaseAdmin.from("products").insert([{ ...formData, slug }]);

  if (error) {
    if (error.message.includes("slug") || error.message.includes("tagline") || error.message.includes("ingredients") || error.message.includes("shipping_policy")) {
      throw new Error("Database Migration Needed. Please run this in SQL Editor: `ALTER TABLE public.products ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE; ALTER TABLE public.products ADD COLUMN IF NOT EXISTS tagline TEXT; ALTER TABLE public.products ADD COLUMN IF NOT EXISTS ingredients TEXT; ALTER TABLE public.products ADD COLUMN IF NOT EXISTS shipping_policy TEXT;`");
    }
    throw new Error(error.message);
  }
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function updateProduct(id: string, formData: any) {
  const slug = slugify(formData.name);
  const { error } = await supabaseAdmin
    .from("products")
    .update({ ...formData, slug })
    .eq("id", id);

  if (error) {
    if (error.message.includes("slug") || error.message.includes("tagline") || error.message.includes("ingredients") || error.message.includes("shipping_policy")) {
      throw new Error("Database Migration Needed. Please run this in SQL Editor: `ALTER TABLE public.products ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE; ALTER TABLE public.products ADD COLUMN IF NOT EXISTS tagline TEXT; ALTER TABLE public.products ADD COLUMN IF NOT EXISTS ingredients TEXT; ALTER TABLE public.products ADD COLUMN IF NOT EXISTS shipping_policy TEXT;`");
    }
    throw new Error(error.message);
  }
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function toggleProductStatus(id: string, currentStatus: boolean) {
  const { error } = await supabaseAdmin
    .from("products")
    .update({ is_active: !currentStatus })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}
