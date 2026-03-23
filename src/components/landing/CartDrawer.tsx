"use client";
import React from "react";
import { useCart } from "@/components/providers/CartContext";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[1001]" 
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[1002] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-secondary flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-heading text-primary">Your Atelier Cart</h2>
                <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mt-1">{totalItems} Boutique Items</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-primary/20" />
                  </div>
                  <p className="text-textMuted font-medium mb-8">Your cart is as empty as a blank canvas.</p>
                  <Link href="/#products" onClick={onClose} className="btn-primary px-10 py-3 rounded-full text-xs">Discover Art</Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-24 bg-secondary rounded-2xl overflow-hidden relative shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 mb-1">
                        <h3 className="text-sm font-bold text-primary truncate uppercase tracking-tight">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-textMuted mb-4">Quantity: {item.quantity}</p>
                      <p className="text-base font-extrabold text-primary">৳{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-secondary bg-secondary/5">
                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-xs font-bold text-textMuted uppercase tracking-widest">Subtotal Estimate</span>
                  <span className="text-2xl font-extrabold text-primary">৳{totalPrice}</span>
                </div>
                <Link 
                  href="/checkout" 
                  onClick={onClose}
                  className="w-full btn-primary py-4 flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button 
                  onClick={onClose}
                  className="w-full mt-4 text-[10px] font-bold text-textMuted uppercase tracking-widest hover:text-primary transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
