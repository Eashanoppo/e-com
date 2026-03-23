# 📘 FINAL PRODUCT REQUIREMENT DOCUMENT (PRD)

## 🧭 Product Overview

A **premium herbal mehendi eCommerce landing system** focused on:

* High-conversion landing page
* COD-based order flow (no friction)
* Lightweight but scalable architecture
* Admin-controlled operations

---

# 🛍️ Core Features

## 1. Product System

* Initially **1 product**, but schema supports multiple
* Each product includes:

  * Name
  * Description
  * Base price
  * Offer price (optional)
  * Variants (size/type)
  * Up to **3 images** (stored in Cloudinary)
  * Active/inactive toggle

---

## 2. Order System (COD Optimized)

### 🔹 Order Fields

* Name
* Phone number
* Address
* Delivery type (Inside Dhaka / Outside Dhaka)
* Quantity
* Variant (if applicable)
* Order ID (auto-generated)
* Status (4 stages)

### 🔹 Status Flow (STRICT)

1. Verified
2. Packed
3. Shifted to Delivery Partner
4. Delivered

❗ Admin **CANNOT go backward** (good for integrity)

---

## 3. Order Tracking

### 🔹 Without Login

* Input:

  * Phone number
  * Order ID

### 🔹 With Login

* Dedicated dashboard:

  * Order history
  * Live tracking

---

## 👤 User System

### 🔐 Authentication

* Google OAuth only (via Supabase)

### 👥 Logged-in Users Can:

* View order history
* Track orders
* Add reviews
* Use cart + checkout

### 🚫 Guest Users:

* Can only use **Buy Now → Order Form**

---

## 🛒 Cart Logic

* Guest: No cart (direct order)
* Logged-in:

  * Add to cart
  * Checkout page

👉 Smart hybrid approach (good decision)

---

## ⭐ Review System

* Rating: ⭐ 1–5
* No admin approval
* No image upload

⚠️ Recommendation (important):
Add **basic spam protection** (rate limit or login required — already done ✔️)

---

## 🧑‍💼 Admin Panel

### 🔹 Dashboard

* Total sales
* Total orders
* Pending orders

### 🔹 Product Management

* Add/update/delete product
* Manage:

  * Price
  * Offer
  * Variants
  * Images (Cloudinary)

### 🔹 Order Management

* List view:

  * Newest first
* Click → Full details
* Update status (forward-only)

---

## 🤖 AI Assistant (Gemini)

### Features:

* Understand:

  * Bangla
  * Banglish
  * English
* Answer:

  * Product questions
  * General queries
* Recommend products

### Input Sources:

* Your provided FAQ + product data

---

# 🧱 TECH ARCHITECTURE

## 🔧 Stack

* Frontend: Next.js 16 (App Router)
* Backend: API routes (server actions where possible)
* Database/Auth: **Supabase**
* Image storage: Cloudinary
* Hosting: **Vercel**

---

## 🗄️ Database Schema (Supabase)

### 🔹 Users

```
id (uuid)
name
email
created_at
```

### 🔹 Products

```
id
name
description
price
offer_price
variants (json)
images (array)
is_active
created_at
```

### 🔹 Orders

```
id
order_id (string, unique)
user_id (nullable)
name
phone
address
delivery_type
quantity
variant
total_price
status
created_at
```

### 🔹 Reviews

```
id
user_id
product_id
rating
comment
created_at
```

### 🔹 Cart

```
id
user_id
product_id
quantity
variant
```

---

# 🎨 UI / UX STRUCTURE

## 🏠 Home (CRITICAL PAGE)

* Hero section (luxury feel)
* Product showcase
* Benefits of herbal mehendi
* Reviews
* CTA: Buy Now
* AI assistant floating button

---

## 📦 Product Page

* Images (carousel)
* Variant selector
* Price + offer
* Add to cart / Buy now

---

## 📄 Order Page

* Clean minimal form
* Auto price calculation
* Success message:

  > “Your order has successfully placed…”

---

## 🔍 Track Order Page

* Input: phone + order ID
* Output: current status

---

## 🧑 User Dashboard

* Orders list
* Tracking UI
* Cart

---

## 🧑‍💼 Admin Panel

* Dashboard
* Orders
* Products

---

# 🚀 SCALABILITY PLAN

### Your traffic:

* Normal: 100/day
* Peak: 10,000/day

### ✅ Can Vercel handle it?

Yes—but ONLY if you:

* Use **SSR + caching**
* Optimize DB queries
* Avoid unnecessary API calls

---

# ⚡ PERFORMANCE STRATEGY

* ISR (Incremental Static Regeneration) for product pages
* Edge functions for fast response
* Image optimization via Cloudinary
* Lazy loading everywhere

---

# 🔐 SECURITY

* Admin route protection (role-based)
* Supabase RLS (Row Level Security)
* Rate limit:

  * Order API
  * Review API

---

# 📊 ANALYTICS

* Google Analytics integration
* Track:

  * Conversion rate
  * Drop-off points

---

# 🔥 SEO STRATEGY (REAL TALK)

Ranking #1 = NOT just code.

### Must do:

* Keyword:

  * “herbal mehendi Bangladesh”
  * “best mehendi in Dhaka”
* Fast loading (<2s)
* Mobile-first design
* Schema markup (Product, Review)

### ⚠️ Reality:

You won’t rank #1 instantly.
But you **can dominate long-tail keywords fast**.

---

# ⚠️ CRITICAL IMPROVEMENTS (My Suggestions)

### 1. Add Order Timestamp History

Even if not shown to user—store internally.

### 2. Add Fraud/Spam Protection

* Same number → max orders per hour

### 3. Add WhatsApp Button (HIGH CONVERSION)

Even if optional later.

---

# 🧩 FINAL ARCHITECTURE FLOW

```
User → Landing Page → Buy Now → Order API → Supabase
                                   ↓
                              Admin Panel
                                   ↓
                            Status Update
                                   ↓
                    User Tracking (Live Status)
```

---

