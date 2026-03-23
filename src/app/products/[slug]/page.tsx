import { getProductBySlug, getProductById } from "@/lib/actions/products";
import { notFound } from "next/navigation";

import ProductDetailContent from "@/components/landing/ProductDetailContent";
import Footer from "@/components/landing/Footer";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params;
    
    // Try by slug first
    let product = await getProductBySlug(resolvedParams.slug);
    
    // Fallback to ID if not found (for old links or direct ID access)
    // Only query ID if the param is actually a valid UUID to prevent Postgres errors
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedParams.slug);
    if (!product && isUUID) {
      product = await getProductById(resolvedParams.slug);
    }

    if (!product) notFound();

    return (
      <main className="bg-[#FDFBF7] min-h-screen pt-28">
        <div className="container mx-auto px-6 pb-20">
          <ProductDetailContent product={product} />
        </div>
        <Footer />
      </main>
    );
  } catch (error) {
    notFound();
  }
}
