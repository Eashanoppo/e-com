"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import OrderModal from "./OrderModal";
import { useCart } from "@/components/providers/CartContext";

export default function PremiumCollection() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.offerPrice || product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <section id="products" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 opacity-30" />
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-extrabold uppercase tracking-[0.3em] text-accent mb-4"
          >
            Curated Artisanal Goods
          </motion.p>
          <h2 className="heading-xl bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/70">
            The Atelier Collection
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {products.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative bg-white rounded-[40px] p-4 lg:p-6 shadow-soft border border-primary/5 hover:shadow-premium transition-all duration-700 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-8 bg-[#F5F5F3]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                />
                
                {/* Unique Glass Overlay */}
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <button 
                     onClick={() => handleBuyNow(product)}
                     className="bg-white text-primary px-8 py-3 rounded-full font-bold text-sm shadow-xl hover:bg-accent hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
                   >
                     Quick View Atelier
                   </button>
                </div>

                <div className="absolute top-6 left-6 glass px-4 py-1.5 rounded-full">
                  <span className="text-primary text-[10px] font-extrabold uppercase tracking-widest">
                    {product.discount}
                  </span>
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-heading text-primary group-hover:text-accent transition-colors duration-300">{product.name}</h3>
                    <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mt-1">Limited Edition Hand-Poured</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-extrabold text-primary">৳{product.offerPrice}</span>
                    <span className="text-xs text-textMuted line-through opacity-50">৳{product.price}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => handleBuyNow(product)}
                    className="flex-[1.5] btn-primary h-12 text-xs"
                  >
                    Atelier Buy Now
                  </button>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 border-2 border-primary/10 text-primary h-12 rounded-[20px] font-bold text-xs hover:border-accent hover:text-accent transition-all"
                  >
                    Add Bag
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <OrderModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          product={selectedProduct} 
          selectedVariant={selectedProduct.variant} 
        />
      )}
    </section>
  );
}

const products = [
  {
    id: 1,
    name: "Single Cone (25g)",
    price: 150,
    offerPrice: 120,
    image: "/henna_single_cone.png",
    discount: "20% OFF",
    variant: { name: "Standard", offerPrice: 120 }
  },
  {
    id: 2,
    name: "Value Pack (3 cones)",
    price: 400,
    offerPrice: 350,
    image: "/henna_value_pack.png",
    discount: "13% OFF",
    variant: { name: "3-Pack", offerPrice: 350 }
  },
  {
    id: 3,
    name: "Bridal Set (10 cones)",
    price: 1200,
    offerPrice: 999,
    image: "/henna_bridal_set.png",
    discount: "17% OFF",
    variant: { name: "Bridal Case", offerPrice: 999 }
  }
];
