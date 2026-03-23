# 📘 DESIGN DOCUMENT

## 🏷️ Project: *Ridy’s Hena Art (Premium Mehendi Landing)*

---

# 🧠 1. DESIGN INTENT (FOR AI / IDE)

### 🎯 Core Objective

Create a **high-conversion luxury landing page** for a herbal mehendi product with:

* Premium aesthetic
* Fast mobile performance
* Strong trust-building elements

### 💡 Design Principles

* Minimal but rich
* Real photography focused
* Smooth micro-interactions
* Conversion-first layout

---

# 🎨 2. DESIGN TOKENS (GLOBAL)

Use this directly in your IDE or Tailwind setup.

```json
{
  "colors": {
    "primary": "#0F3D2E",
    "secondary": "#F5F3EC",
    "accent": "#C9A96E",
    "textPrimary": "#1A1A1A",
    "textMuted": "#6B6B6B"
  },
  "fonts": {
    "heading": "Playfair Display",
    "body": "Inter"
  },
  "radius": {
    "card": "16px",
    "button": "12px"
  },
  "shadow": {
    "soft": "0 10px 30px rgba(0,0,0,0.08)"
  }
}
```

---

# 🧩 3. PAGE STRUCTURE (STRICT ORDER)

```txt
Hero
↓
Trust Bar
↓
Product Showcase
↓
Benefits
↓
Reviews
↓
Offer Section
↓
FAQ
↓
Final CTA
```

👉 DO NOT change order → this is **conversion optimized**

---

# 🏠 4. SECTION-BY-SECTION DESIGN SPEC

---

## 🟢 HERO SECTION

### Layout:

* Left: Text
* Right: Image

### Content:

* Heading:
  “Premium Herbal Mehendi — Pure & Safe”
* Subtext:
  “Trusted by 1000+ happy customers”
* CTA: **Order Now**

### Style:

* Background: soft cream
* Image: real mehendi hands
* Animation:

  * fade-in text
  * slow zoom image

---

## 🟢 TRUST BAR

### Layout:

3 columns (mobile: stacked)

### Items:

* ⭐ 1000+ Happy Customers
* 🌿 100% Natural
* 🚚 Fast Delivery

### Style:

* White background
* Small icons + bold text

---

## 🟢 PRODUCT SHOWCASE

### Layout:

* Left: image carousel
* Right:

  * Product name
  * Price (with strike)
  * Offer price
  * Variant selector
  * Buttons

### Buttons:

* Buy Now (primary)
* Add to Cart (secondary)

---

## 🟢 BENEFITS SECTION

### Layout:

Grid (4 items)

### Items:

* Chemical-free
* Long-lasting color
* Skin-safe
* Natural ingredients

### Style:

* Icons + short text
* Soft card UI

---

## 🟢 REVIEWS SECTION

### Layout:

Card slider

### Card:

* Image (mehendi hands)
* Name
* ⭐ Rating
* Comment

### Style:

* Rounded cards
* Soft shadow

---

## 🟢 OFFER SECTION

### Content:

* Discount highlight
* Urgency text

Example:
“Limited Time Offer – Order Today!”

### Style:

* Accent (gold highlight)
* Slight glow animation

---

## 🟢 FAQ SECTION

### Format:

Accordion

### Questions:

* Is it safe?
* How long color lasts?
* Delivery time?

---

## 🟢 FINAL CTA

### Content:

* Strong message:
  “Get Your Premium Mehendi Today”
* Button: Order Now

---

# 🛒 5. ORDER MODAL DESIGN

### Type:

Popup modal (centered)

### Fields:

* Name
* Phone
* Address
* Delivery type
* Quantity

### UX:

* Minimal spacing
* One-click submit
* Success message after submit

---

# 🤖 6. AI CHAT UI

### Position:

Bottom-right fixed

### Style:

* WhatsApp-like chat bubble
* Expandable panel

### Features:

* Suggested prompts
* Smooth open/close animation

---

# 🧑‍💼 7. ADMIN PANEL DESIGN

### Layout:

Sidebar + content

### Sidebar:

* Dashboard
* Orders
* Products

### Dashboard:

* Cards:

  * Total orders
  * Pending
  * Sales

### Style:

* Clean SaaS UI
* Optional dark mode

---

# 📱 8. MOBILE DESIGN RULES

### Must Have:

* Sticky “Order Now” button
* Large tap targets
* Reduced animation

### Layout Changes:

* Stack all sections
* Image above text

---

# ✨ 9. MICRO-INTERACTIONS

Enable:

* Button hover scale
* Image zoom
* Scroll reveal animation
* Smooth transitions

Disable if:

* Device is low performance

---

# ⚡ 10. PERFORMANCE RULES

* Use optimized images (Cloudinary)
* Lazy load all images
* Avoid heavy animations
* Use skeleton loaders

---

# 🎯 11. CONVERSION OPTIMIZATION RULES

Priority:

1. Trust
2. Visual appeal
3. Offer
4. CTA

### Must Include:

* Real images
* Customer proof
* Clear CTA above fold

---

# 🧪 12. IDE PROMPT (VERY IMPORTANT)

Use this inside Antigravity IDE to generate UI:

```
Create a premium luxury herbal mehendi landing page using Next.js 16 and Tailwind CSS.

Design style:
- Deep green, cream, gold color palette
- Elegant typography (Playfair Display + Inter)
- Clean, minimal but rich UI
- Real mehendi photography

Sections (in order):
Hero, Trust Bar, Product Showcase, Benefits, Reviews, Offer, FAQ, CTA

Features:
- Order popup modal
- WhatsApp-style AI chat button
- Mobile-first responsive design
- Smooth animations but optimized for performance

Goal:
High conversion, premium feel, trust-focused design.
```

