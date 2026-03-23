"use client";
import { useState } from "react";
import { Search, Package, CheckCircle, Gift, Truck, Home, Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { trackOrder } from "@/lib/actions/track";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError("");
    setOrder(null);

    const res = await trackOrder(orderId, phone);
    if (res.success) {
      setOrder(res.order);
    } else {
      setError(res.error || "Order not found");
    }
    setIsSearching(false);
  };

  const statusSteps = ["Order Placed", "Verified", "Packed", "Shifted", "Delivered"];
  const currentStepIndex = statusSteps.indexOf(order?.status || "Order Placed");

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <main className="py-24 lg:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatePresence mode="wait">
            {!order ? (
              <motion.div 
                key="search"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-xl mx-auto bg-white rounded-3xl p-10 lg:p-16 shadow-premium border border-primary/5 text-center"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-8 text-primary">
                  <Package className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-heading text-primary mb-12">Track Your Order</h1>
                
                <form onSubmit={handleTrack} className="space-y-6 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-primary/40 uppercase tracking-widest ml-1">Order ID</label>
                    <input 
                      required
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="RHA-XXXXX" 
                      className="w-full bg-secondary/10 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl py-4 px-6 focus:outline-none transition-all text-sm font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-primary/40 uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX" 
                      className="w-full bg-secondary/10 border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl py-4 px-6 focus:outline-none transition-all text-sm font-bold"
                    />
                  </div>

                  {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}

                  <button 
                    disabled={isSearching}
                    className="w-full btn-primary bg-[#FB750F] hover:bg-primary border-none py-5 text-sm flex items-center justify-center gap-3 mt-8 shadow-lg transition-all"
                  >
                    {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5" /> Track Order</>}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[40px] shadow-premium border border-primary/5 overflow-hidden"
              >
                <div className="bg-primary p-8 lg:p-12 text-white flex justify-between items-center">
                   <div>
                     <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-40 mb-1">Live Tracking Status</p>
                     <h2 className="text-3xl font-heading">RHA-{order.id.toString().slice(-6).toUpperCase()}</h2>
                   </div>
                   <button onClick={() => setOrder(null)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all">
                     <ArrowLeft className="w-4 h-4" /> New Search
                   </button>
                </div>

                <div className="p-10 lg:p-16">
                   {/* Progress Line */}
                   <div className="relative flex justify-between mb-20 px-4">
                      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-secondary/20 -translate-y-1/2 z-0" />
                      <div 
                        className="absolute top-1/2 left-0 h-[2px] bg-[#FB750F] -translate-y-1/2 z-0 transition-all duration-1000" 
                        style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                      />
                      
                      {statusSteps.map((step, idx) => {
                        const isCompleted = idx <= currentStepIndex;
                        const isCurrent = idx === currentStepIndex;
                        return (
                          <div key={idx} className="relative z-10 flex flex-col items-center">
                            <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-3xl flex items-center justify-center border-4 border-white shadow-xl transition-all duration-500 ${isCompleted ? "bg-[#FB750F] text-white" : "bg-white text-primary/20"}`}>
                              {idx === 0 && <Package className="w-6 h-6" />}
                              {idx === 1 && <CheckCircle className="w-6 h-6" />}
                              {idx === 2 && <Gift className="w-6 h-6" />}
                              {idx === 3 && <Truck className="w-6 h-6" />}
                              {idx === 4 && <Home className="w-6 h-6" />}
                            </div>
                            <span className={`absolute top-full mt-6 text-[9px] uppercase font-extrabold tracking-[0.3em] text-center min-w-[100px] ${isCurrent ? "text-[#FB750F]" : "text-primary/30"}`}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24 pt-16 border-t border-primary/5">
                      <div className="space-y-6">
                        <h3 className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.3em]">Recipient Identity</h3>
                        <div>
                          <p className="text-2xl font-bold text-primary mb-1">{order.customer_name}</p>
                          <p className="text-sm font-bold text-secondary mb-3">{order.phone}</p>
                          <p className="text-sm text-textMuted leading-relaxed max-w-xs">{order.address}</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.3em]">Atelier Selection</h3>
                        <div className="bg-[#FDFBF7] p-8 rounded-[32px] border border-primary/5">
                           <div className="flex justify-between items-start mb-6">
                             <div>
                               <p className="text-lg font-bold text-primary leading-tight">{order.product_name}</p>
                               <span className="inline-block mt-2 bg-[#FB750F]/10 text-[#FB750F] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">{order.delivery_type}</span>
                             </div>
                             <Package className="w-5 h-5 text-primary/20" />
                           </div>
                           <div className="pt-6 border-t border-primary/5 flex justify-between items-center">
                              <span className="text-[10px] font-extrabold text-primary/30 uppercase tracking-widest">Total Valuation</span>
                              <span className="text-2xl font-extrabold text-primary">৳{order.total_price}</span>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
