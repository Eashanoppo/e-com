import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const results: Record<string, any> = {};

    // 1. Create profiles table
    const { error: e1 } = await supabaseAdmin.rpc("exec_sql", {
      sql: `CREATE TABLE IF NOT EXISTS public.profiles (
        user_email TEXT PRIMARY KEY,
        phone TEXT,
        default_address TEXT,
        updated_at TIMESTAMPTZ DEFAULT now()
      )`
    });
    results.profiles = e1 ? `Error: ${e1.message}` : "OK";

    // 2. Create wishlist table
    const { error: e2 } = await supabaseAdmin.rpc("exec_sql", {
      sql: `CREATE TABLE IF NOT EXISTS public.wishlist (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_email TEXT NOT NULL,
        product_id UUID NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        UNIQUE(user_email, product_id)
      )`
    });
    results.wishlist = e2 ? `Error: ${e2.message}` : "OK";

    // 3. Enable RLS
    await supabaseAdmin.rpc("exec_sql", { sql: `ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;` });
    await supabaseAdmin.rpc("exec_sql", { sql: `ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;` });

    // 4. Create Policies for profiles
    await supabaseAdmin.rpc("exec_sql", { 
      sql: `CREATE POLICY IF NOT EXISTS "user_select_own_profile" ON public.profiles FOR SELECT USING (user_email = auth.jwt() ->> 'email' OR (auth.jwt() ->> 'email' = 'ridyhena@gmail.com'));`
    });
    await supabaseAdmin.rpc("exec_sql", { 
      sql: `CREATE POLICY IF NOT EXISTS "user_update_own_profile" ON public.profiles FOR ALL USING (user_email = auth.jwt() ->> 'email');`
    });

    // 5. Create Policies for wishlist
    await supabaseAdmin.rpc("exec_sql", { 
      sql: `CREATE POLICY IF NOT EXISTS "user_select_own_wishlist" ON public.wishlist FOR SELECT USING (user_email = auth.jwt() ->> 'email');`
    });
    await supabaseAdmin.rpc("exec_sql", { 
      sql: `CREATE POLICY IF NOT EXISTS "user_all_own_wishlist" ON public.wishlist FOR ALL USING (user_email = auth.jwt() ->> 'email');`
    });

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
