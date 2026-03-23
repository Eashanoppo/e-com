"use server";
import { supabaseAdmin } from "@/lib/supabase";

export async function getAdminStats() {
  try {
    // Total Orders
    const { count: totalOrders } = await supabaseAdmin
      .from("orders")
      .select("*", { count: "exact", head: true });

    // Pending Orders (Verified status in this flow)
    const { count: pendingOrders } = await supabaseAdmin
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "Verified");

    // Total Sales
    const { data: salesData } = await supabaseAdmin
      .from("orders")
      .select("total_price")
      .eq("status", "Delivered");

    const totalSales = salesData?.reduce((acc, curr) => acc + (curr.total_price || 0), 0) || 0;

    // Total Customers (Unique phone numbers)
    const { data: customersData } = await supabaseAdmin
      .from("orders")
      .select("phone");
    
    const uniqueCustomers = new Set(customersData?.map(c => c.phone)).size;

    // Top Performing Products
    const { data: productsData } = await supabaseAdmin
      .from("orders")
      .select("product_name");
    
    const productFrequency: Record<string, number> = {};
    productsData?.forEach(p => {
      productFrequency[p.product_name] = (productFrequency[p.product_name] || 0) + 1;
    });

    const topProducts = Object.entries(productFrequency)
      .map(([name, count]) => ({ name, orders: count }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);

    // Recent Activity
    const { data: recentOrders } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    return {
      success: true,
      stats: {
        totalOrders: totalOrders || 0,
        pendingOrders: pendingOrders || 0,
        totalSales,
        totalCustomers: uniqueCustomers,
        topProducts,
        recentOrders: recentOrders || []
      }
    };
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return { success: false, error: "Failed to fetch stats" };
  }
}

export async function getAllOrders() {
  try {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { success: true, orders: data };
  } catch (error) {
    return { success: false, error: "Failed to fetch orders" };
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("order_id", orderId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update order status" };
  }
}
