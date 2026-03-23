"use client";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewsGrid({ reviews }: { reviews: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {reviews.map((testi: any, i: number) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.7 }}
          className="bg-white p-8 lg:p-10 rounded-[28px] border border-primary/5 shadow-sm flex flex-col items-center text-center hover:border-accent/20 hover:shadow-md transition-all duration-300"
        >
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(Number(testi.rating) || 5)].map((_, j) => (
              <Star key={j} className="w-4 h-4 text-accent fill-accent" />
            ))}
          </div>

          {/* Comment */}
          <p className="text-textMuted italic text-sm leading-relaxed mb-8 flex-1">
            "{testi.comment || testi.text}"
          </p>

          {/* Reviewer */}
          <div className="flex items-center gap-3 mt-auto">
            <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center font-bold text-primary text-sm border border-primary/5">
              {testi.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="text-left">
              <span className="font-bold text-primary text-sm block">{testi.name}</span>
              <span className="text-[10px] text-textMuted font-medium uppercase tracking-wider">Verified Buyer</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
