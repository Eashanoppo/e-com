"use server";
import { supabaseAdmin } from "@/lib/supabase";

export async function createOrder(orderData: any) {
  try {
    const orderId = `RHA-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Consolidate variant into product name if present to match DB schema safely
    const finalProductName = orderData.variant_name 
      ? `${orderData.product_name} - ${orderData.variant_name}`
      : orderData.product_name;

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert([
        { 
          order_id: orderId,
          customer_name: orderData.customer_name,
          phone: orderData.phone,
          address: orderData.address,
          delivery_type: orderData.delivery_type,
          quantity: orderData.quantity,
          product_name: finalProductName,
          total_price: orderData.total_price,
          user_email: orderData.user_email,
          status: 'Verified'
        }
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }
    return { success: true, orderId };
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return { success: false, error: "Failed to place order. Please try again." };
  }
}

export async function getOrderStatus(orderId: string, phone: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('status, created_at')
      .eq('order_id', orderId)
      .eq('phone', phone)
      .single();

    if (error) throw error;
    return { success: true, status: data.status };
  } catch (error) {
    return { success: false, error: "Order not found" };
  }
}
