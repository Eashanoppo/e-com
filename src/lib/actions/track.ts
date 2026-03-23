"use server";
import { supabase } from "@/lib/supabase";

export async function trackOrder(orderId: string, phone: string) {
  try {
    const { data: order, error } = await supabase
      .from("orders")
      .select("order_id, status, created_at, customer_name, total_price, product_name, quantity")
      .eq("order_id", orderId)
      .eq("phone", phone)
      .single();

    if (error) {
      console.error("Supabase tracking error:", error.message);
      return { success: false, error: "Order not found. Please check your tracking ID and phone number." };
    }

    return { success: true, order };
  } catch (error: any) {
    console.error("Failed to track order:", error.message || error);
    return { success: false, error: "Something went wrong while tracking your order." };
  }
}
