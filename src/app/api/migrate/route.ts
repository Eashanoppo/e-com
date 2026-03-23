import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const results: Record<string, any> = {};

    // Create orders table
    const { error: e1 } = await supabaseAdmin.rpc("exec_sql", {
      sql: `CREATE TABLE IF NOT EXISTS public.orders (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        order_id TEXT UNIQUE NOT NULL,
        customer_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        delivery_type TEXT NOT NULL DEFAULT 'Inside Dhaka',
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        total_price NUMERIC NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'Verified',
        user_email TEXT,
        created_at TIMESTAMPTZ DEFAULT now()
      )`
    });
    results.orders = e1 ? `Error: ${e1.message}` : "OK";

    // Create products table  
    const { error: e2 } = await supabaseAdmin.rpc("exec_sql", {
      sql: `CREATE TABLE IF NOT EXISTS public.products (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price NUMERIC NOT NULL,
        offer_price NUMERIC,
        images TEXT[] DEFAULT '{}',
        variants JSONB DEFAULT '[]',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now()
      )`
    });
    results.products = e2 ? `Error: ${e2.message}` : "OK";

    // Create reviews table
    const { error: e3 } = await supabaseAdmin.rpc("exec_sql", {
      sql: `CREATE TABLE IF NOT EXISTS public.reviews (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        rating INTEGER NOT NULL DEFAULT 5,
        comment TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      )`
    });
    results.reviews = e3 ? `Error: ${e3.message}` : "OK";

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
