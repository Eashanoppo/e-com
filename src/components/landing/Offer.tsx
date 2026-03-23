"use client";
import { motion } from "framer-motion";

export default function Offer() {
  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-primary rounded-[40px] p-12 lg:p-24 text-center overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-6xl font-heading text-white mb-6 leading-tight">
              Limited Time Offer — <br />
              <span className="text-secondary">Grab Yours Today!</span>
            </h2>

            <p className="text-white/70 text-base lg:text-lg mb-10 max-w-xl mx-auto font-body">
              Order now and get <span className="text-secondary font-bold">20% OFF</span> on your first order. 
              Standard delivery inside Dhaka is FREE for all kits.
            </p>

            <button 
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-secondary text-primary px-12 py-5 rounded-button font-bold text-lg hover:shadow-xl transition-all"
            >
              Claim Offer Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
