"use client";
import { useState, useEffect } from "react";
import { User, Package, Heart, Star, Settings, LogOut, PlusCircle, X, Send, Truck, CheckCircle2, MapPin, Phone, Loader2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { addReview } from "@/lib/actions/reviews";
import { getUserOrders, getWishlist, getUserProfile, updateUserProfile, toggleWishlist } from "@/lib/actions/users";
import Link from "next/link";
import { useRouter } from "next/navigation";

const statusFlow = ["Pending", "Verified", "Packed", "Shifted", "Delivered"];

export default function Dashboard() {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);
  
  const [profileForm, setProfileForm] = useState({ phone: "", address: "" });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (session?.user?.email) {
        setLoadingData(true);
        const [ordersRes, wishlistRes, profileRes] = await Promise.all([
          getUserOrders(session.user.email),
          getWishlist(session.user.email),
          getUserProfile(session.user.email)
        ]);

        if (ordersRes.success) setOrders(ordersRes.orders || []);
        if (wishlistRes.success) setWishlist(wishlistRes.products || []);
        if (profileRes.success && profileRes.profile) {
          setProfile(profileRes.profile);
          setProfileForm({ 
            phone: profileRes.profile.phone || "", 
            address: profileRes.profile.default_address || "" 
          });
        }
        setLoadingData(false);
      }
    }
    fetchData();
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return;

    setIsUpdatingProfile(true);
    const res = await updateUserProfile(session.user.email, {
      phone: profileForm.phone,
      default_address: profileForm.address
    });

    if (res.success) {
      setProfile((prev: any) => ({ ...prev, phone: profileForm.phone, default_address: profileForm.address }));
      alert("Profile updated successfully!");
    } else {
      alert("Failed to update profile.");
    }
    setIsUpdatingProfile(false);
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    if (!session?.user?.email) return;
    const res = await toggleWishlist(session.user.email, productId);
    if (res.success) {
      setWishlist((prev: any[]) => prev.filter(p => p.id !== productId));
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return alert("Please sign in to leave a review");
    
    setIsSubmitting(true);
    const res = await addReview({
      user_id: session.user.email || "unknown",
      name: session.user.name || "Premium Client",
      rating: reviewForm.rating,
      comment: reviewForm.comment
    });

    if (res.success) {
      setIsReviewModalOpen(false);
      setReviewForm({ rating: 5, comment: "" });
      alert("Thank you for your beautiful words!");
    } else {
      alert("Failed to submit review. Try again.");
    }
    setIsSubmitting(false);
  };

  const stats = [
    { label: "Total Orders", value: orders.length.toString(), icon: Package },
    { label: "Wishlist", value: wishlist.length.toString(), icon: Heart },
    { label: "Phone", value: profile?.phone || "Not Set", icon: Phone },
    { label: "Member Status", value: "Verified", icon: Star },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: `My Orders (${orders.length})`, icon: Package },
    { id: "wishlist", label: `Wishlist (${wishlist.length})`, icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (!session) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-secondary">
         <div className="text-center p-12 bg-white rounded-3xl shadow-xl border border-primary/5">
           <h2 className="text-2xl font-heading text-primary mb-4">Access Restricted</h2>
           <p className="text-textMuted mb-8">Please sign in to view your premium atelier dashboard.</p>
           <button onClick={() => router.push("/login")} className="btn-primary px-8 py-3">Sign In Now</button>
         </div>
       </div>
    );
  }

  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-20 lg:pt-32 pb-16 lg:pb-20 font-body">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-primary/5 p-6 lg:p-8 mb-6 lg:mb-8 flex flex-col md:flex-row items-center gap-6 lg:gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-secondary shadow-sm shrink-0">
            <img src={session.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user?.name}`} alt={session.user?.name || ""} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl lg:text-3xl font-heading text-primary mb-1">{session.user?.name}</h1>
            <p className="text-textMuted text-xs lg:text-sm flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {session.user?.email}
            </p>
          </div>
          <div className="flex gap-2 lg:gap-3">
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-4 py-2 border border-red-100 text-red-500 rounded-2xl text-xs lg:text-sm font-bold hover:bg-red-50 transition-colors uppercase tracking-widest"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-2xl text-xs lg:text-sm font-bold shadow-[0_10px_20px_rgba(201,169,110,0.2)] hover:shadow-lg transition-all hover:scale-105 uppercase tracking-widest"
            >
              <PlusCircle className="w-4 h-4" /> Review
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-[32px] shadow-sm border border-primary/5 mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-8 py-4 text-xs lg:text-sm font-bold uppercase tracking-widest transition-all rounded-3xl ${
                  activeTab === tab.id 
                    ? "bg-primary text-secondary pointer-events-none" 
                    : "text-textMuted hover:text-primary hover:bg-primary/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {loadingData ? (
          <div className="py-32 text-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-textMuted font-dancing text-xl">Curating your space...</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            {activeTab === "overview" && (
              <div className="space-y-6 lg:space-y-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[24px] border border-primary/5 shadow-sm flex flex-col group hover:border-accent/30 transition-all">
                      <div className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-secondary transition-colors">
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <p className="text-lg lg:text-xl font-bold text-primary mb-1 truncate">{stat.value}</p>
                      <p className="text-textMuted text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="bg-white p-8 rounded-[32px] border border-primary/5 shadow-sm">
                    <h3 className="text-lg font-heading text-primary mb-6">Recent Atelier Activity</h3>
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map(order => (
                          <div key={order.order_id} className="flex justify-between items-center p-4 rounded-2xl bg-[#FDFBF7] border border-secondary/50">
                            <div>
                              <p className="font-bold text-primary text-sm">{order.product_name}</p>
                              <p className="text-[10px] text-textMuted font-bold uppercase">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <span className="text-[10px] font-bold text-accent px-3 py-1 bg-white rounded-full uppercase tracking-tighter border border-accent/20">
                              {order.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center">
                        <Package className="w-12 h-12 text-primary/20 mx-auto mb-4" />
                        <p className="text-textMuted text-sm italic">Your latest interactions will appear here.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-primary text-secondary p-8 rounded-[32px] shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                      <h3 className="text-xl font-heading mb-2 flex items-center gap-2">
                        Premium Benefits
                      </h3>
                      <p className="text-secondary/70 text-sm mb-6 max-w-[280px]">
                        As a verified client, you have access to exclusive services.
                      </p>
                      <ul className="space-y-4 mb-8">
                        {["Priority Verification", "Free Shipping (Inside Dhaka)", "Direct Support Line"].map((f, i) => (
                          <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                            <CheckCircle2 className="w-4 h-4 text-accent" /> {f}
                          </li>
                        ))}
                      </ul>
                      <button className="w-full bg-accent text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-accent/90 transition-all">
                        Verified Member
                      </button>
                    </div>
                    <Star className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-[40px] p-8 lg:p-12 border border-primary/5 shadow-sm space-y-8">
                <div className="flex justify-between items-end mb-8">
                   <div>
                      <h3 className="text-3xl font-heading text-primary leading-tight">Order <span className="text-accent italic font-dancing">Archive</span></h3>
                      <p className="text-textMuted text-xs font-bold uppercase tracking-widest mt-1">Tracking your art voyage</p>
                   </div>
                   <p className="text-xs font-bold text-textMuted uppercase tracking-tighter">{orders.length} TOTAL</p>
                </div>
                
                {orders.length > 0 ? (
                  <div className="space-y-8">
                    {orders.map((order) => {
                      const currentStatusIndex = statusFlow.indexOf(order.status);
                      return (
                        <div key={order.order_id} className="p-8 rounded-[32px] border border-secondary hover:border-accent/40 transition-all group bg-[#FDFBF7]/30">
                          <div className="flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center mb-10">
                            <div>
                              <div className="flex items-center gap-4 mb-3">
                                <span className="text-lg font-heading text-primary">#{order.order_id}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-white border border-secondary text-primary shadow-sm">
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-primary font-bold text-lg">{order.product_name}</p>
                              <p className="text-textMuted text-xs font-medium mt-1">Ordered on {new Date(order.created_at).toLocaleString()}</p>
                            </div>
                            
                            <div className="flex flex-col items-end gap-3 shrink-0">
                              <p className="text-3xl font-bold text-primary tracking-tighter">৳{order.total_price}</p>
                              <Link 
                                href={`/track-order?id=${order.order_id}&phone=${order.phone}`}
                                className="inline-flex items-center gap-2 text-[10px] font-bold text-accent hover:text-primary transition-all uppercase tracking-[0.2em]"
                              >
                                Live Tracking <Truck className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>

                          {/* Progress Flow Visualization */}
                          <div className="relative mt-8">
                            <div className="absolute top-4 left-0 w-full h-0.5 bg-secondary/30 -z-0" />
                            <div 
                              className="absolute top-4 left-0 h-0.5 bg-accent transition-all duration-1000 -z-0" 
                              style={{ width: `${(currentStatusIndex / (statusFlow.length - 1)) * 100}%` }}
                            />
                            
                            <div className="flex justify-between relative z-10">
                              {statusFlow.map((step, idx) => {
                                const isCompleted = idx <= currentStatusIndex;
                                const isCurrent = idx === currentStatusIndex;
                                return (
                                  <div key={step} className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border-2 
                                      ${isCompleted ? 'bg-accent border-accent text-white shadow-lg' : 'bg-white border-secondary text-secondary'}`}>
                                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-secondary/50" />}
                                    </div>
                                    <p className={`text-[8px] lg:text-[10px] font-bold uppercase tracking-widest mt-3 whitespace-nowrap
                                      ${isCurrent ? 'text-accent' : isCompleted ? 'text-primary' : 'text-textMuted'}`}>
                                      {step}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-24 text-center">
                    <Package className="w-16 h-16 text-secondary mx-auto mb-6 opacity-30" />
                    <h4 className="text-xl font-heading text-primary mb-2">The Archive is Empty</h4>
                    <p className="text-textMuted text-sm mb-10 max-w-xs mx-auto italic">Your journey with our botanical art has yet to begin.</p>
                    <Link href="/products" className="btn-primary px-10 py-4 rounded-2xl">Start Your Collection</Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-[40px] p-8 lg:p-12 border border-primary/5 shadow-sm">
                <h3 className="text-3xl font-heading text-primary mb-10">Wishlist <span className="text-accent italic font-dancing">Vault</span></h3>
                
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="group relative bg-[#FDFBF7]/30 border border-secondary rounded-[32px] p-4 lg:p-6 hover:border-accent/40 transition-all overflow-hidden">
                        <div className="flex gap-6 items-center">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm shrink-0">
                            <img src={item.images?.[0] || ""} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          </div>
                          <div className="flex-1">
                             <h4 className="text-lg font-bold text-primary mb-1">{item.name}</h4>
                             <p className="text-accent font-bold text-xl">৳{item.price}</p>
                             <div className="flex gap-4 mt-4">
                               <Link href={`/products/${item.id}`} className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Details</Link>
                               <button 
                                 onClick={() => handleRemoveFromWishlist(item.id)}
                                 className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
                               >
                                 Remove
                               </button>
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center">
                    <Heart className="w-16 h-16 text-secondary mx-auto mb-6 opacity-20" />
                    <p className="text-textMuted italic">Your favorite items will be preserved here.</p>
                    <Link href="/products" className="text-accent font-bold uppercase tracking-widest text-[10px] mt-6 block hover:underline">Explore Collections</Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-[40px] p-8 lg:p-12 border border-primary/5 shadow-sm">
                 <h3 className="text-3xl font-heading text-primary mb-10">Atelier <span className="text-accent italic font-dancing">Settings</span></h3>
                 
                 <form onSubmit={handleUpdateProfile} className="max-w-xl space-y-8">
                    <div className="grid grid-cols-1 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-1">Contact Phone</label>
                          <div className="relative">
                             <Phone className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-textMuted" />
                             <input 
                               type="text" 
                               value={profileForm.phone}
                               onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                               className="w-full pl-12 pr-6 py-4 rounded-2xl border border-secondary bg-[#FDFBF7] outline-none focus:border-accent font-medium text-sm transition-all"
                               placeholder="01XXXXXXXXX"
                             />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] ml-1">Default Sanctuary (Address)</label>
                          <div className="relative">
                             <MapPin className="w-4 h-4 absolute left-5 top-6 text-textMuted" />
                             <textarea 
                               rows={4}
                               value={profileForm.address}
                               onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                               className="w-full pl-12 pr-6 py-4 rounded-2xl border border-secondary bg-[#FDFBF7] outline-none focus:border-accent font-medium text-sm transition-all resize-none"
                               placeholder="Your full delivery address as sanctuary"
                             />
                          </div>
                       </div>
                    </div>

                    <div className="pt-4">
                       <button 
                          type="submit" 
                          disabled={isUpdatingProfile}
                          className="btn-primary w-full py-5 rounded-[20px] text-xs font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                       >
                          {isUpdatingProfile ? <Loader2 className="w-5 h-5 animate-spin" /> : "Preserve Changes"}
                       </button>
                    </div>
                 </form>

                 <div className="mt-16 pt-12 border-t border-secondary">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-6">Security & Connection</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                       <div className="flex-1 p-6 rounded-3xl bg-[#FDFBF7] border border-secondary">
                          <p className="text-xs font-bold text-primary mb-1">Authenticated Account</p>
                          <p className="text-xs text-textMuted">{session.user?.email}</p>
                       </div>
                       <button 
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="px-8 py-6 rounded-3xl border border-red-100 text-red-500 font-bold text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all shrink-0"
                       >
                        Request Account Deletion
                       </button>
                    </div>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-6 bg-primary/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[40px] p-8 lg:p-12 shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
             <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-heading text-primary leading-tight">Post <span className="text-accent italic font-dancing">Appraisal</span></h2>
                <button onClick={() => setIsReviewModalOpen(false)} className="p-3 hover:bg-secondary rounded-full transition-colors"><X className="w-6 h-6 text-primary" /></button>
             </div>
             <form onSubmit={handleAddReview} className="space-y-8">
                <div>
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 block ml-1">Atelier Rating</label>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button 
                        key={num} 
                        type="button" 
                        onClick={() => setReviewForm({...reviewForm, rating: num})}
                        className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${reviewForm.rating >= num ? "bg-accent/10 border-accent text-accent" : "border-secondary/50 text-secondary hover:border-accent/50"}`}
                      >
                        <Star className={`w-6 h-6 ${reviewForm.rating >= num ? "fill-accent" : ""}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 block ml-1">Your Artistic Appraisal</label>
                  <textarea 
                    rows={4}
                    required
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                    placeholder="Describe your encounter with our botanical services..."
                    className="w-full p-6 bg-[#FDFBF7] rounded-[30px] outline-none border border-secondary focus:border-accent text-sm text-primary transition-all resize-none shadow-inner"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-primary py-5 flex items-center justify-center gap-3 rounded-[20px] shadow-2xl active:scale-95 transition-all text-xs font-bold uppercase tracking-widest"
                >
                  {isSubmitting ? "Submitting..." : <>Preserve Appraisal <Send className="w-4 h-4" /></>}
                </button>
             </form>
          </div>
        </div>
      )}
    </main>
  );
}
