"use client";
import { useState } from "react";
import { trackOrder } from "@/lib/actions/track";
import { Search, Package, Clock, CheckCircle2, Truck, Loader2, ClipboardCheck } from "lucide-react";

const TIMELINE_STEPS = ["Pending", "Verified", "Packed", "Shifted", "Delivered"];

const statusIcons: any = {
  Pending: Clock,
  Verified: ClipboardCheck,
  Packed: Package,
  Shifted: Truck,
  Delivered: CheckCircle2,
};

export default function TrackOrderClient() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderInfo, setOrderInfo] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !phone) return;
    
    setLoading(true);
    setError(null);
    setOrderInfo(null);

    const res = await trackOrder(orderId.replace("#", "").trim(), phone.trim());
    
    if (res.success) {
      setOrderInfo(res.order);
    } else {
      setError(res.error || "Order not found");
    }
    
    setLoading(false);
  };

  const currentStepIndex = orderInfo ? TIMELINE_STEPS.indexOf(orderInfo.status) : -1;

  return (
    <div className="space-y-8">
      <form onSubmit={handleTrack} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-[0.2em]">Order ID</label>
            <input 
              type="text" 
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. ORD-12345" 
              className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-primary/10 rounded-none outline-none focus:border-accent focus:ring-0 transition-colors text-primary font-heading text-xl placeholder:text-primary/20"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-[0.2em]">Phone Number</label>
            <input 
              type="tel" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 01XXXXXXXXX" 
              className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-primary/10 rounded-none outline-none focus:border-accent focus:ring-0 transition-colors text-primary font-heading text-xl placeholder:text-primary/20"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading || !orderId || !phone}
          className="w-full btn-primary py-4 flex items-center justify-center gap-3 shadow-premium hover:shadow-[0_0_20px_rgba(201,169,110,0.4)] transition-all disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          Track Status
        </button>
      </form>

      {/* Results Timeline */}
      {orderInfo && (
        <div className="pt-10 border-t border-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold text-textMuted uppercase tracking-widest mb-1">Status for</p>
              <h3 className="text-xl font-heading text-primary">{orderInfo.order_id}</h3>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm font-bold text-textMuted uppercase tracking-widest mb-1">Total Value</p>
              <h3 className="text-xl font-heading text-accent">৳{orderInfo.total_price}</h3>
            </div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-10 bottom-10 w-[2px] bg-secondary/50 sm:left-10" />

            {/* Timeline Steps */}
            <div className="space-y-12 relative z-10">
              {TIMELINE_STEPS.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = statusIcons[step] || CheckCircle2;

                return (
                  <div key={step} className={`flex items-start gap-6 sm:gap-10 transition-all duration-500 ${isCompleted ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                    {/* Icon Circle */}
                    <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors duration-500
                      ${isCurrent ? 'bg-accent text-white scale-110 shadow-[0_0_20px_rgba(201,169,110,0.5)]' : 
                        isCompleted ? 'bg-primary text-white' : 'bg-secondary text-textMuted'}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="pt-2">
                      <h4 className={`text-lg font-bold tracking-tight ${isCurrent ? 'text-accent' : 'text-primary'}`}>
                        {step}
                      </h4>
                      <p className="text-sm text-textMuted mt-1">
                        {isCurrent ? "Your order is currently in this stage." : 
                         isCompleted ? "Completed." : "Pending"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
