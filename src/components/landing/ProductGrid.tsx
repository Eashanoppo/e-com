"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
import OrderModal from "./OrderModal";

export default function ProductGrid({ products }: { products: any[] }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrder = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={{
              id: product.id,
              slug: product.slug || product.id,
              name: product.name,
              price: product.price,
              offerPrice: product.offer_price,
              rating: 5.0,
              reviews: 12,
              image: product.images?.[0] || "/product-1.jpg",
              badge: product.offer_price ? "Special Offer" : undefined
            }}
            onOrder={() => handleOrder(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <OrderModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          product={selectedProduct} 
          selectedVariant={{ name: "Standard", offerPrice: selectedProduct.offer_price || selectedProduct.price }}
        />
      )}
    </>
  );
}
