"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, ShieldCheck, Clock, Heart, ChevronRight, MessageSquareText, Plus, Minus, ChevronDown } from "lucide-react";
import OrderModal from "./OrderModal";
import { useCart } from "@/components/providers/CartContext";

export default function ProductDetailContent({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");
  const { addToCart } = useCart();

  const images = (product?.images && product.images.length > 0) ? product.images : ["/product-1.jpg"];
  const discount = (product?.price && product?.offer_price) 
    ? Math.round(((product.price - product.offer_price) / product.price) * 100) 
    : 0;
  const currentPrice = product?.offer_price || product?.price;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: images[0],
      quantity: quantity
    });
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const accordions = [
    {
      id: "description",
      title: "Product Description",
      content: product.description || "Experience the pure essence of tradition with our premium herbal mehendi. Hand-crafted using botanical ingredients for a deep, lasting stain and therapeutic benefits. Perfect for bridal artistry or casual wear."
    },
    {
      id: "ingredients",
      title: "Ingredients & Purity",
      content: product.ingredients || "Made with 100% natural Rajasthani henna powder, essential oils (Eucalyptus & Lavender), lemon juice, and sugar. Strictly NO chemicals, NO PPD, and naturally safe for sensitive skin."
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      content: product.shipping_policy || "Inside Dhaka: Delivery within 24-48 hours. Outside Dhaka: 3-5 business days. Due to the perishable nature of fresh organic henna, returns are only accepted if the packaging is damaged upon arrival."
    }
  ];

  return (
    <div className="flex flex-col gap-16 lg:gap-24">
      {/* Top Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Visual Gallery Section */}
        <div className="flex flex-col md:flex-row-reverse gap-4 lg:gap-6 sticky top-24">
          <div className="flex-1 relative aspect-[4/5] rounded-[40px] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-primary/5">
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            {discount > 0 && (
              <div className="absolute top-6 left-6 glass px-5 py-2.5 rounded-full shadow-xl border border-white/20">
                  <span className="text-xs font-extrabold text-primary uppercase tracking-widest">-{discount}% Atelier</span>
              </div>
            )}
          </div>
          
          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-24 pb-4 md:pb-0 scrollbar-hide shrink-0">
              {images.map((img: string, i: number) => (
                <button 
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 md:w-full aspect-square rounded-[20px] overflow-hidden border-2 transition-all shrink-0 ${selectedImage === i ? "border-accent scale-100 shadow-md" : "border-transparent opacity-50 hover:opacity-100 hover:scale-[1.02]"}`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info & Buying Section */}
        <div className="pt-2 lg:pt-8 flex flex-col h-full">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-textMuted mb-8">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <ChevronRight className="w-3 h-3" />
            <a href="/products" className="hover:text-primary transition-colors">Products</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary/40 truncate max-w-[150px]">{product.name}</span>
          </nav>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading text-primary leading-[1.1] mb-6">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
             <div className="flex gap-1 text-accent">
               {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
             </div>
             <span className="text-[10px] font-extrabold text-textMuted uppercase tracking-widest pt-0.5">24+ Verified Reviews</span>
          </div>

          <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tighter">৳{currentPrice}</span>
              {product.offer_price && (
                <span className="text-xl text-textMuted line-through opacity-40 mb-1">৳{product.price}</span>
              )}
          </div>

          <p className="text-textMuted text-base lg:text-lg leading-relaxed mb-10 font-medium">
            {product.tagline || "Discover the rich, dark stain of our signature organic blend. Small-batch artisan quality guarantees an exquisite experience for every application."}
          </p>

          {/* Quantity & CTA */}
          <div className="space-y-6 mb-12 bg-white p-6 rounded-[32px] border border-primary/5 shadow-sm">
             <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex items-center justify-between bg-[#FDFBF7] border border-secondary rounded-full px-4 w-full sm:w-auto h-16 shrink-0">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-textMuted hover:text-primary transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center font-bold text-lg text-primary">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-textMuted hover:text-primary transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 w-full h-16 btn-primary rounded-full shadow-[0_20px_40px_rgba(201,169,110,0.2)] hover:shadow-[0_20px_40px_rgba(201,169,110,0.3)] transition-all flex items-center justify-center gap-3 text-sm"
                >
                  <ShoppingCart className="w-5 h-5" /> Buy Now (COD)
                </button>
             </div>
             
             <button 
                onClick={handleAddToCart}
                className="w-full h-14 border-2 border-primary/10 text-primary rounded-full font-bold text-xs uppercase tracking-widest hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
              >
                Add to Cart
              </button>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4 mb-12">
             <div className="flex items-center gap-3 p-4 rounded-[20px] bg-[#FDFBF7] border border-secondary/50">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">100% Organic</span>
             </div>
             <div className="flex items-center gap-3 p-4 rounded-[20px] bg-[#FDFBF7] border border-secondary/50">
                <Clock className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Long Stain</span>
             </div>
          </div>

          {/* Accordions */}
          <div className="space-y-4 border-t border-primary/10 pt-8 mt-auto">
            {accordions.map((acc) => (
              <div key={acc.id} className="border-b border-primary/10 pb-4">
                <button 
                  onClick={() => toggleAccordion(acc.id)}
                  className="w-full flex items-center justify-between py-2 text-left group"
                >
                  <span className="text-sm font-bold text-primary uppercase tracking-widest group-hover:text-accent transition-colors">{acc.title}</span>
                  <ChevronDown className={`w-5 h-5 text-textMuted transition-transform duration-300 ${activeAccordion === acc.id ? "rotate-180 text-accent" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeAccordion === acc.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 pb-2 text-sm text-textMuted leading-relaxed font-body">
                        {acc.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
        selectedVariant={{ name: "Standard", offerPrice: currentPrice }}
        initialQuantity={quantity}
      />
    </div>
  );
}
