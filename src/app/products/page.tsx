import { getProducts } from "@/lib/actions/products";

import ProductGrid from "@/components/landing/ProductGrid";
import Footer from "@/components/landing/Footer";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-heading text-primary leading-tight mb-6">
            The Botanical <br />
            <span className="text-accent italic font-dancing">Atelier Collection</span>
          </h1>
          <p className="text-textMuted text-sm font-medium uppercase tracking-[0.2em]">
            Pure Henna Artistry • Hand-Crafted in Dhaka
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-primary/5">
            <p className="text-textMuted font-medium">New batch is currently being hand-poured. Check back soon!</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
      <Footer />
    </main>
  );
}
