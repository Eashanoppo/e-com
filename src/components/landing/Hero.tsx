"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center bg-[#FDFBF7] overflow-hidden pt-20 lg:pt-20">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        {/* Decorative subtle texture instead of missing image */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2D4030_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center h-full">
        
        {/* CONTENT: Left Side */}
        <div className="w-full lg:w-[45%] pt-10 pb-16 lg:py-12 lg:pr-12 order-2 lg:order-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
              Premium Artisanal Mehendi
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-heading text-primary leading-[1.05] mb-6 tracking-tight">
              Premium Herbal <br /> Mehendi
            </h1>
            <h2 className="text-3xl lg:text-4xl font-heading text-accent mb-8 italic">
              That Truly Stains with Love
            </h2>

            <p className="text-textMuted text-lg mb-10 max-w-lg leading-relaxed">
              100% natural, skin-safe, and trusted by 1000+ happy customers across Bangladesh.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10 w-full">
              <Link href="/products" className="btn-primary px-10 py-4 w-full sm:w-auto text-center hover:shadow-soft transition-all">
                Order Now
              </Link>
              <Link href="#products" className="btn-secondary px-10 py-4 w-full sm:w-auto text-center border border-primary/10 bg-transparent hover:border-accent hover:text-accent transition-all">
                Explore
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 items-center pt-8 border-t border-primary/10 w-full max-w-md">
              <div className="flex items-center gap-2">
                 <Heart className="w-4 h-4 text-accent fill-accent" />
                 <span className="text-xs font-bold text-primary tracking-wide">1000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-accent" />
                 <span className="text-xs font-bold text-primary tracking-wide">100% Natural</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* VISUAL: Right Side (FULL BLEED) */}
        <div className="w-full lg:absolute lg:right-0 lg:top-0 lg:w-[55%] lg:h-full order-1 lg:order-2">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full h-[50vh] lg:h-full overflow-hidden"
          >
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
              src="/hero-mehendi.jpg" 
              alt="Premium Mehendi Hand Art" 
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle Gradient Overlays for depth and blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/50 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent lg:hidden block" />
          </motion.div>
        </div>

      </div>

      {/* Floating Scroll Cue */}
      <div className="absolute bottom-8 left-[27%] -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 group cursor-pointer hidden lg:flex">
        <span className="text-[9px] uppercase font-extrabold tracking-[0.4em] text-primary group-hover:text-accent transition-colors">Begin the Journey</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
