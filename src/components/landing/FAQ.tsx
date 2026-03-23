"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { 
    q: "Is it safe for children and sensitive skin?", 
    a: "Absolutely. Our mehendi is 100% botanical, made from hand-picked henna leaves and essential oils. It contains zero PPD, ammonia, or synthetic dyes." 
  },
  { 
    q: "How long does the stain typically last?", 
    a: "On average, the stain lasts 10-14 days. The longevity depends on your skin type and aftercare." 
  },
  { 
    q: "Do you offer nationwide delivery in Bangladesh?", 
    a: "Yes! We deliver across all 64 districts. Inside Dhaka delivery takes 1-2 days, while outside Dhaka takes 3-5 days." 
  },
  { 
    q: "What is the best way to store the cones?", 
    a: "Cones should be stored in a cool, dry place away from direct sunlight. For prolonged shelf life, store them in the freezer." 
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-heading text-primary leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-textMuted mt-4">
            Everything you need to know about our artisanal henna.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className="border-b border-primary/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className={`text-base lg:text-lg font-bold transition-colors ${openIndex === i ? "text-accent" : "text-primary group-hover:text-primary/70"}`}>
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-accent" : "text-primary/50"}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pr-12">
                      <p className="text-sm lg:text-base text-textMuted leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
