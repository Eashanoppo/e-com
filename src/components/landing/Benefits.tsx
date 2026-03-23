"use client";
import { Leaf, Clock, ShieldCheck, Sprout } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Leaf,
    title: "100% Chemical-Free",
    desc: "We don't use PPD or ammonia in our dyes.",
  },
  {
    icon: Clock,
    title: "Long Lasting Color",
    desc: "Our stain lasts for up to 10-14 days.",
  },
  {
    icon: ShieldCheck,
    title: "Skin-Safe Formula",
    desc: "Gentle on skin and perfect for sensitive users.",
  },
  {
    icon: Sprout,
    title: "Natural Ingredients",
    desc: "Only hand-picked henna and essential oils.",
  },
];

export default function Benefits() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-heading text-primary leading-tight mb-6">
            Why Choose Our Mehendi?
          </h2>
          <p className="text-textMuted text-sm lg:text-base leading-relaxed">
            At Ridy's Hena Art, we care about the quality and authenticity of our art form. 
            Here are some of the reasons why you should choose us:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, i) => (
            <motion.div 
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-primary/5 p-8 rounded-[32px] hover:shadow-premium transition-all text-center group"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {benefit.title}
              </h3>
              <p className="text-textMuted text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
