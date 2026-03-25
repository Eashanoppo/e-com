"use client";
import { Sprout } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[40px] lg:rounded-[48px] p-8 lg:p-24 text-center shadow-lg relative overflow-hidden group border border-primary/5"
        >
          <div className="absolute inset-0 bg-primary/5 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-1000" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-7xl font-heading text-primary leading-tight mb-6 lg:mb-8">
              Ready to Stain <br />
              <span className="font-decorative italic text-secondary">Your Story?</span>
            </h2>
            <p className="text-text-muted text-base lg:text-lg mb-8 lg:mb-10 text-balance">
              Join 1000+ happy customers and experience the finest herbal mehendi in Bangladesh. 
              No chemicals, just pure art.
            </p>
            <button className="btn-primary w-full sm:w-auto mx-auto px-8 lg:px-12 py-4 lg:py-5 text-lg lg:text-xl">
              Get Your Premium Mehendi Today
            </button>
          </div>

          <div className="absolute bottom-10 right-10 opacity-5 rotate-12">
            <Sprout className="w-64 h-64 text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
