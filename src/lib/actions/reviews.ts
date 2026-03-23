"use server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getReviews() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project-id")) {
    console.warn("⚠️ Supabase URL is using a placeholder. Please update .env.local with your real project URL.");
    return { success: false, reviews: [] };
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching reviews:", error.message, error.details);
      return { success: false, reviews: [], error: "Failed to fetch reviews" };
    }
    return { success: true, reviews: data };
  } catch (error: any) {
    console.error("Failed to fetch reviews:", error.message || error);
    return { success: false, reviews: [], error: "Failed to fetch reviews" };
  }
}

export async function addReview(reviewData: {
  user_id: string;
  name: string;
  rating: number;
  comment: string;
  product_id?: string;
}) {
  try {
    const { error } = await supabase.from("reviews").insert([reviewData]);

    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to add review:", error);
    return { success: false, error: "Failed to submit review" };
  }
}
