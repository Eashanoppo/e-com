"use client";
import { Shield, Clock, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "100% Chemical-Free",
    desc: "No PPD, ammonia, or synthetic dyes. Pure botanical goodness.",
  },
  {
    icon: Clock,
    title: "Long Lasting Color",
    desc: "Rich, deep stains that stay beautiful for 10-14 days.",
  },
  {
    icon: Heart,
    title: "Skin-Safe Formula",
    desc: "Tested specifically on skin. Safe for children & adults.",
  },
  {
    icon: Sparkles,
    title: "Natural Ingredients",
    desc: "Handcrafted from pure mehendi leaves and essential oils.",
  },
];

export default function WhyChoose() {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-4xl lg:text-5xl font-heading text-primary mb-6">
            Why Choose Our Mehendi?
          </h2>
          <p className="text-textMuted text-sm lg:text-base font-medium">
            We prioritize skin's health and the beauty of tradition. 
            Each Mehendi cone is crafted for the absolute best performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-secondary p-10 relative overflow-hidden text-center group transition-all duration-500 rounded-none border-x border-t border-primary/5 border-b-[3px] border-b-transparent hover:border-b-accent"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] text-primary group-hover:text-accent group-hover:scale-110 transition-all duration-500">
                <feature.icon className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                {feature.title}
              </h3>
              <p className="text-sm text-textMuted font-medium leading-relaxed">
                {feature.desc}
              </p>
              
              {/* Bottom Border Grow Animation */}
              <div className="absolute bottom-[-3px] left-0 w-0 h-[3px] bg-accent group-hover:w-full transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
