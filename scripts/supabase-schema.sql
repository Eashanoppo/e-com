-- =====================================================
-- Ridy's Hena Art — Supabase Database Schema
-- Paste this ENTIRE script into the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/yjchubtrofikkijuyubx/sql/new
-- =====================================================

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
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
);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  offer_price NUMERIC,
  images TEXT[] DEFAULT '{}',
  variants JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read, service role can write
CREATE POLICY "public_read_products" ON public.products FOR SELECT USING (true);
CREATE POLICY "service_all_products" ON public.products FOR ALL USING (true);

-- Orders: anyone can insert (to place an order), service role can read/update all
CREATE POLICY "public_insert_orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "service_all_orders" ON public.orders FOR ALL USING (true);

-- Reviews: anyone can read/insert, service role has full access
CREATE POLICY "public_read_reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "public_insert_reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "service_all_reviews" ON public.reviews FOR ALL USING (true);
