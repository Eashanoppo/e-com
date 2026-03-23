"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import OrderModal from "./OrderModal";

const variants = [
  { name: "Single Cone (25g)", price: 150, offerPrice: 120 },
  { name: "Value Pack (3 cones)", price: 400, offerPrice: 350 },
  { name: "Family Pack (6 cones)", price: 750, offerPrice: 650 },
];

export default function ProductShowcase() {
  const [selectedVariant, setSelectedVariant] = useState(variants[1]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const product = { name: "Ridy’s Herbal Mehendi Kit" };

  return (
    <section id="product" className="section-padding bg-[#FFFDF7] relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Images: Asymmetrical Creative Layout */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-[500px]">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="relative z-10 aspect-[4/5] rounded-[60px] overflow-hidden shadow-premium border-8 border-white"
              >
                <img src="/product-1.jpg" alt="Atelier Mehendi 1" className="w-full h-full object-cover" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-16 -right-12 z-20 w-2/3 aspect-square rounded-[40px] overflow-hidden shadow-premium border-8 border-white hidden md:block"
              >
                <img src="/product-2.jpg" alt="Atelier Mehendi 2" className="w-full h-full object-cover" />
              </motion.div>

              {/* Decorative Glow */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px] -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.4em] text-accent mb-6">Signature Selection</p>
              <h2 className="text-5xl lg:text-7xl font-heading text-primary leading-[0.9] mb-10 tracking-tighter">
                The Heritage <br />
                <span className="font-dancing text-secondary italic">Herbal Kit</span>
              </h2>
              
              <div className="flex items-center gap-6 mb-12">
                <span className="text-5xl font-extrabold text-primary">৳{selectedVariant.offerPrice}</span>
                <div className="flex flex-col">
                  <span className="text-lg text-textMuted line-through opacity-40 italic">৳{selectedVariant.price}</span>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">Limited Studio Discount</span>
                </div>
              </div>

              <div className="mb-12">
                <label className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary/40 mb-6 block">Configure Your Box</label>
                <div className="flex flex-wrap gap-4">
                  {variants.map((v) => (
                    <button
                      key={v.name}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-8 py-3 rounded-[20px] text-xs font-bold transition-all duration-500 border-2 ${
                        selectedVariant.name === v.name
                          ? "border-primary bg-primary text-white shadow-premium"
                          : "border-primary/5 hover:border-primary/20 text-primary/60 bg-white"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-primary/5">
                <button 
                  onClick={() => setIsOrderModalOpen(true)}
                  className="flex-1 btn-primary text-base"
                >
                  Secure Checkout (COD)
                </button>
                <button className="flex-1 border-2 border-primary/10 text-primary rounded-[20px] font-bold text-base hover:bg-primary hover:text-white transition-all">
                  AddToBag
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        product={product}
        selectedVariant={selectedVariant}
      />
    </section>
  );
}
