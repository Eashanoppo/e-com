"use server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getUserOrders(email: string) {
  try {
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_email", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching user orders:", error.message);
      return { success: false, error: "Failed to fetch orders." };
    }

    return { success: true, orders };
  } catch (error: any) {
    console.error("Failed to fetch user orders:", error.message || error);
    return { success: false, error: "Something went wrong." };
  }
}

export async function getWishlist(email: string) {
  try {
    const { data: wishlistItems, error } = await supabase
      .from("wishlist")
      .select("product_id")
      .eq("user_email", email);

    if (error) throw error;

    if (!wishlistItems || wishlistItems.length === 0) return { success: true, products: [] };

    const productIds = wishlistItems.map(item => item.product_id);
    const { data: products, error: pError } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (pError) throw pError;

    return { success: true, products };
  } catch (error: any) {
    console.error("Failed to fetch wishlist:", error.message);
    return { success: false, error: "Failed to fetch wishlist" };
  }
}

export async function toggleWishlist(email: string, productId: string) {
  try {
    const { data: existing, error: checkError } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_email", email)
      .eq("product_id", productId)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existing) {
      const { error: delError } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", existing.id);
      if (delError) throw delError;
    } else {
      const { error: insError } = await supabase
        .from("wishlist")
        .insert([{ user_email: email, product_id: productId }]);
      if (insError) throw insError;
    }

    revalidatePath("/dashboard");
    return { success: true, isAdded: !existing };
  } catch (error: any) {
    console.error("Failed to toggle wishlist:", error.message);
    return { success: false, error: "Failed to update wishlist" };
  }
}

export async function getUserProfile(email: string) {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_email", email)
      .maybeSingle();

    if (error) throw error;
    return { success: true, profile };
  } catch (error: any) {
    console.error("Failed to fetch profile:", error.message);
    return { success: false, error: "Failed to fetch profile" };
  }
}

export async function updateUserProfile(email: string, data: { phone?: string; default_address?: string }) {
  try {
    const { error } = await supabase
      .from("profiles")
      .upsert({ 
        user_email: email, 
        ...data, 
        updated_at: new Date().toISOString() 
      }, { onConflict: 'user_email' });

    if (error) throw error;
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update profile:", error.message);
    return { success: false, error: "Failed to update profile" };
  }
}
