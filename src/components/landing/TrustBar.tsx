"use client";
import { Star, Leaf, Truck } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  {
    icon: Star,
    label: "50k+ Happy Customers",
    desc: "Join our growing beauty community",
  },
  {
    icon: Leaf,
    label: "100% Natural & Organic",
    desc: "Safe for every skin type",
  },
  {
    icon: Truck,
    label: "Fast & Reliable Delivery",
    desc: "Across Bangladesh in 1-5 days",
  },
];

export default function TrustBar() {
  return (
    <div className="bg-white py-12 border-b border-primary/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-6 group"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-primary uppercase tracking-widest leading-tight mb-1">
                  {item.label}
                </h3>
                <p className="text-[10px] text-textMuted font-bold uppercase tracking-wider opacity-60">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
