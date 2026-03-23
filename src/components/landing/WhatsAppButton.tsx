"use client";
import { MessageSquareText } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const phoneNumber = "8801XXXXXXXXX"; // Replace with real number in .env later
  const message = encodeURIComponent("Hello Ridy's Hena Art, I would like to know more about your premium mehendi kits.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-[999] w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-shadow duration-500 group"
    >
      <MessageSquareText className="w-8 h-8" />
      
      {/* Tooltip */}
      <div className="absolute left-full ml-4 px-4 py-2 bg-white text-primary text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-primary/5">
        Chat with us
      </div>
    </motion.a>
  );
}
