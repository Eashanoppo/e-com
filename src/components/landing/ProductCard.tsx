"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number | string;
    slug: string;
    name: string;
    price: number;
    offerPrice: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: string;
  };
  onOrder: () => void;
}

export default function ProductCard({ product, onOrder }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = Math.round(((product.price - product.offerPrice) / product.price) * 100);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-card overflow-hidden border border-secondary/20 hover:border-primary/10 hover:shadow-premium transition-all duration-500"
    >
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-background">
        <motion.img 
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span className="bg-primary text-secondary text-[8px] lg:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg">
              {product.badge}
            </span>
          )}
          <motion.span 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-accent text-white text-[8px] lg:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg self-start"
          >
            -{discount}%
          </motion.span>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault(); e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-primary hover:text-accent transition-colors shadow-sm z-10"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-accent text-accent" : ""}`} />
        </button>

        {/* Quick View Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center gap-3"
            >
              <div className="p-3 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-xl">
                <Eye className="w-5 h-5" />
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault(); e.stopPropagation();
                  onOrder();
                }}
                className="p-3 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Details */}
      <div className="p-4 lg:p-6">
        <div className="flex items-center gap-1 mb-2 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-accent" : ""}`} />
          ))}
          <span className="text-[10px] text-textMuted ml-1 font-medium">{product.rating} ({product.reviews})</span>
        </div>
        
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm lg:text-base font-bold text-primary mb-3 line-clamp-1 hover:text-accent transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg lg:text-xl font-bold text-primary">৳{product.offerPrice}</span>
            <span className="text-xs text-textMuted line-through">৳{product.price}</span>
          </div>
          
          <motion.button 
            whileHover={{ x: 3 }}
            onClick={onOrder}
            className="flex items-center gap-2 text-xs font-bold text-primary border-b-2 border-primary/10 hover:border-accent transition-all pb-1 group"
          >
            Add to Cart
            <ShoppingCart className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
