"use client";
import { 
  LogOut, 
  PlusCircle, 
  Box, 
  Heart, 
  Star, 
  User, 
  Bell, 
  Settings, 
  LayoutDashboard,
  Gem,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "My Orders", icon: Box },
  { id: "wishlist", label: "Wishlist (0)", icon: Heart },
  { id: "favorites", label: "Favorites (0)", icon: Star },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(5);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-primary">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12 lg:py-20">
        <h1 className="text-3xl font-heading mb-10">User Dashboard</h1>

        {/* Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-8 lg:p-12 shadow-soft border border-primary/5 mb-10 overflow-hidden relative"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden shadow-lg">
                <img 
                  src="https://ui-avatars.com/api/?name=Sayma+Rahman&background=0F3D2E&color=fff" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-1">Sayma Rahman</h2>
                <div className="flex items-center gap-2">
                  <span className="text-textMuted text-sm">rahmansayma2025@gmail.com</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-50 transition-all font-bold text-sm">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
              <button 
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center gap-2 px-8 py-3 bg-[#FB750F] text-white rounded-2xl hover:shadow-lg transition-all font-bold text-sm"
              >
                <PlusCircle className="w-4 h-4" />
                Add Review
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- REVIEW MODAL --- */}
        <AnimatePresence>
          {isReviewModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-primary/40 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-[40px] p-10 lg:p-16 w-full max-w-xl shadow-2xl relative"
              >
                <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-8 right-8 text-primary/20 hover:text-primary transition-colors">
                  <PlusCircle className="w-8 h-8 rotate-45" />
                </button>

                <h3 className="text-3xl font-heading mb-4">Share Your Experience</h3>
                <p className="text-textMuted text-sm mb-10 uppercase font-bold tracking-widest italic opacity-60">Help our botanical community grow with your thoughts.</p>
                
                <form className="space-y-8">
                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-primary/40 mb-4 block">Product Quality</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} type="button" onClick={() => setRating(s)}>
                          <Star className={`w-8 h-8 ${s <= rating ? "text-[#FB750F] fill-current" : "text-primary/10"}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-primary/40 mb-4 block">Detailed Review</label>
                    <textarea 
                      rows={4} 
                      className="w-full bg-secondary/10 rounded-[24px] p-6 text-sm font-bold focus:outline-none focus:ring-2 ring-[#FB750F]/20 border-none placeholder:opacity-30"
                      placeholder="Tell us about the stain, the scent, and your overall experience..."
                    />
                  </div>

                  <button className="w-full bg-[#FB750F] text-white py-5 rounded-[24px] font-bold text-lg hover:shadow-xl transition-all shadow-[#FB750F]/20">
                    Publish My Review
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Navigation Sidebar-style Tabs */}
          <div className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-[#FB750F] text-white shadow-lg" 
                    : "text-textMuted hover:bg-white hover:text-primary border border-transparent hover:border-primary/5"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-10">
            {/* Upgrade Banner */}
            <div className="bg-[#5C3D2E] rounded-[40px] p-10 text-white relative overflow-hidden group">
               <div className="relative z-10 max-w-md">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <Star className="w-6 h-6 text-[#FB750F] fill-current" />
                 </div>
                 <h3 className="text-3xl font-heading mb-4">Upgrade to Premium</h3>
                 <p className="text-white/70 text-sm mb-8 leading-relaxed">
                   Get exclusive discounts and early access to new mehendi collections. 
                   Be a part of our artisanal elite.
                 </p>
                 <button className="flex items-center gap-3 bg-[#FB750F] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all">
                    View Membership Plans
                    <ArrowRight className="w-4 h-4" />
                 </button>
               </div>
               
               <div className="absolute top-1/2 -right-10 -translate-y-1/2 opacity-10">
                  <Star className="w-64 h-64 rotate-12" />
               </div>
            </div>

            {/* Empty State / Dashboard Activity */}
            <div className="bg-white rounded-[40px] p-12 text-center border border-primary/5 shadow-soft min-h-[400px] flex flex-col items-center justify-center">
               <Box className="w-20 h-20 text-primary/5 mb-8" />
               <h3 className="text-2xl font-bold text-primary mb-3">No Orders Yet</h3>
               <p className="text-textMuted max-w-sm mb-10">When you start your artisanal journey with us, your orders and tracking will appear here.</p>
               <button className="bg-primary text-white px-10 py-4 rounded-2xl font-bold">Start Shopping</button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
