-- 🌿 Ridy's Hena Art - Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Products Table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    offer_price DECIMAL(10, 2),
    variants JSONB DEFAULT '[]'::jsonb,
    images TEXT[] DEFAULT '{}'::text[],
    is_active BOOLEAN DEFAULT true,
    slug TEXT UNIQUE,
    tagline TEXT,
    ingredients TEXT,
    shipping_policy TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Orders Table (COD Optimized)
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT UNIQUE NOT NULL, -- Format: RHA-XXXXX
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    delivery_type TEXT NOT NULL CHECK (delivery_type IN ('Inside Dhaka', 'Outside Dhaka')),
    quantity INTEGER DEFAULT 1,
    variant TEXT,
    total_price DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'Verified' CHECK (status IN ('Verified', 'Packed', 'Shifted', 'Delivered')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Reviews Table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Cart Table (Optional for logged-in users)
CREATE TABLE public.cart (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    variant TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security)

-- Products: Everyone can read active products, only admins can write
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Active Products" ON public.products FOR SELECT USING (is_active = true);

-- Orders: Everyone can create (guest checkout), users can read their own, admins can read all
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Create Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users View Own Orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);

-- Reviews: Everyone can read, logged-in users can create
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users Create Reviews" ON public.reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- FUNCTIONS & TRIGGERS
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
