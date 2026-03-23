// Supabase Table Migration Script - Ridy's Hena Art
const SUPABASE_URL = "***REMOVED***";
const SERVICE_ROLE_KEY = "***REMOVED***";

async function checkTable(tableName) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}?limit=1`, {
    headers: {
      "apikey": SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
    }
  });
  return { status: res.status, ok: res.ok, text: await res.text() };
}

async function runSQL(statements) {
  // Supabase Management API for DDL (table creation)
  const projectRef = "yjchubtrofikkijuyubx";
  
  for (const statement of statements) {
    const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: statement })
    });
    const text = await res.text();
    console.log(`SQL Status: ${res.status} | ${text.substring(0, 150)}`);
  }
}

async function main() {
  console.log("🔍 Checking Supabase connection and table status...\n");
  
  // Check connection and existing tables
  const tables = ["orders", "products", "reviews"];
  for (const t of tables) {
    const result = await checkTable(t);
    if (result.status === 200) {
      console.log(`✅ Table '${t}' already EXISTS`);
    } else if (result.text.includes("not exist") || result.status === 404) {
      console.log(`❌ Table '${t}' DOES NOT EXIST - will create`);
    } else {
      console.log(`⚠️  Table '${t}': status=${result.status} | ${result.text.substring(0, 100)}`);
    }
  }

  console.log("\n🏗️  Attempting table creation via Supabase REST API...");

  const sqlStatements = [
    `CREATE TABLE IF NOT EXISTS public.orders (
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
    )`,
    `CREATE TABLE IF NOT EXISTS public.products (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price NUMERIC NOT NULL,
      offer_price NUMERIC,
      images TEXT[] DEFAULT '{}',
      variants JSONB DEFAULT '[]',
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now()
    )`,
    `CREATE TABLE IF NOT EXISTS public.reviews (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      rating INTEGER NOT NULL DEFAULT 5,
      comment TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    )`,
    `ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.products ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY`,
    `DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='products' AND policyname='Allow public read products') THEN
        CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
      END IF;
    END $$`,
    `DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='products' AND policyname='Allow service role all products') THEN
        CREATE POLICY "Allow service role all products" ON public.products FOR ALL USING (true);
      END IF;
    END $$`,
    `DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='orders' AND policyname='Allow public insert orders') THEN
        CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
      END IF;
    END $$`,
    `DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='orders' AND policyname='Allow service role all orders') THEN
        CREATE POLICY "Allow service role all orders" ON public.orders FOR ALL USING (true);
      END IF;
    END $$`,
    `DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='reviews' AND policyname='Allow public read reviews') THEN
        CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);
      END IF;
    END $$`,
    `DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='reviews' AND policyname='Allow public insert reviews') THEN
        CREATE POLICY "Allow public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);
      END IF;
    END $$`,
  ];

  await runSQL(sqlStatements);

  console.log("\n✅ Done! Re-checking tables...\n");
  for (const t of tables) {
    const result = await checkTable(t);
    if (result.status === 200) {
      console.log(`✅ Table '${t}': READY`);
    } else {
      console.log(`❌ Table '${t}': still NOT accessible (${result.status})`);
    }
  }
}

main().catch(console.error);
