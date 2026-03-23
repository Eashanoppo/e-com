"use client";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Adiba Rahman",
    text: "The stain is unlike any other! Pure and deep. I've recommended to everyone.",
    rating: 5,
  },
  {
    name: "Mehezabin Khan",
    text: "Beautiful packaging and herbal scent. Skin feels safe and soft after use.",
    rating: 5,
  },
  {
    name: "Farhana Ahmed",
    text: "The bridal set was a hit at my sister's wedding. Pure botanical magic.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-[#FBFBFB]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-4xl lg:text-5xl font-heading text-primary mb-6">
            Loved by Our Community
          </h2>
          <p className="text-textMuted text-sm font-bold uppercase tracking-widest italic opacity-60 flex items-center justify-center gap-2">
            Shared with love from our very own Ridy's Hena Art
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-primary/5 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-secondary fill-current" />
                  ))}
                </div>
                <p className="text-sm font-medium leading-relaxed italic text-primary/80 mb-8">
                  "{t.text}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary/20 rounded-full" />
                <p className="text-xs font-extrabold uppercase tracking-widest text-primary">
                  {t.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
