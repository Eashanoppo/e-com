"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="bg-primary py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-full bg-accent/10 -skew-x-[30deg] translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[200px] h-full bg-secondary/5 -skew-x-[30deg] -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 rounded-full mb-8"
        >
           <Sparkles className="w-4 h-4 text-accent" />
           <span className="text-secondary text-[10px] font-extrabold uppercase tracking-[0.3em]">Exclusive Seasonal Deal</span>
        </motion.div>
        
        <h2 className="text-4xl lg:text-7xl font-heading text-white mb-10 leading-tight">
          Limited Time Offer — <br />
          <span className="text-accent">Grab Yours Today!</span>
        </h2>
        
        <p className="text-white/60 text-sm font-medium mb-12 max-w-xl mx-auto uppercase tracking-widest leading-relaxed">
          Order any value pack and get a complimentary botanical after-care balm. 
          Limited stock available for current batch.
        </p>
        
        <Link href="/products" className="btn-primary bg-accent hover:bg-white hover:text-primary border-none px-12 py-5 text-sm uppercase tracking-widest">
           Claim Offer Now
        </Link>
      </div>
    </section>
  );
}
