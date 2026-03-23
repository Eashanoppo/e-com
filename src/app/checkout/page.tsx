"use client";
import { useState } from "react";
import { useCart } from "@/components/providers/CartContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createOrder } from "@/lib/actions/orders";
import { ShoppingBag, Truck, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(11, "Valid phone number is required"),
  address: z.string().min(10, "Full address is required"),
  deliveryType: z.enum(["Inside Dhaka", "Outside Dhaka"]),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { deliveryType: "Inside Dhaka" }
  });

  const deliveryType = watch("deliveryType");
  const deliveryCharge = deliveryType === "Inside Dhaka" ? 0 : 120;
  const finalTotal = totalPrice + deliveryCharge;

  const onSubmit = async (data: CheckoutForm) => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    
    try {
      const result = await createOrder({
        customer_name: data.name,
        phone: data.phone,
        address: data.address,
        delivery_type: data.deliveryType,
        quantity: cart.reduce((acc, curr) => acc + curr.quantity, 0),
        product_name: cart.map(item => `${item.name} (x${item.quantity})`).join(", "),
        total_price: finalTotal,
      });

      if (result.success) {
        setIsSuccess(true);
        clearCart();
        setTimeout(() => router.push("/track-order"), 5000);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-12 text-center border border-white">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-heading text-primary mb-4">Atelier Order Confirmed</h1>
          <p className="text-textMuted mb-10 leading-relaxed">
            Your artisanal selection is being prepared. We’ve sent a confirmation to your registered details.
          </p>
          <div className="space-y-4">
            <Link href="/track" className="btn-primary w-full py-4 block">Track Your Order</Link>
            <Link href="/" className="text-sm font-bold text-textMuted uppercase tracking-widest hover:text-primary transition-colors">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#FBFBFB] min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/" className="p-3 bg-white rounded-2xl shadow-sm border border-secondary text-primary hover:text-accent transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl lg:text-4xl font-heading text-primary">Checkout Atelier</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[32px] shadow-soft border border-secondary p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">Shipping Boutique</h2>
                  <p className="text-xs text-textMuted font-medium uppercase tracking-widest mt-0.5">Where should we send your art?</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary uppercase tracking-wider">Full Name</label>
                    <input 
                      {...register("name")}
                      className="w-full bg-secondary/30 border-2 border-transparent focus:border-accent focus:bg-white p-4 rounded-2xl outline-none transition-all text-sm font-medium"
                      placeholder="e.g. Anika Rahman"
                    />
                    {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold tracking-tighter">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary uppercase tracking-wider">Phone Number</label>
                    <input 
                      {...register("phone")}
                      className="w-full bg-secondary/30 border-2 border-transparent focus:border-accent focus:bg-white p-4 rounded-2xl outline-none transition-all text-sm font-medium"
                      placeholder="01XXXXXXXXX"
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] uppercase font-bold tracking-tighter">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold text-primary uppercase tracking-wider">Full Delivery Address</label>
                   <textarea 
                    {...register("address")}
                    rows={3}
                    className="w-full bg-secondary/30 border-2 border-transparent focus:border-accent focus:bg-white p-4 rounded-2xl outline-none transition-all text-sm font-medium resize-none"
                    placeholder="Provide your complete landmark-based address..."
                   />
                   {errors.address && <p className="text-red-500 text-[10px] uppercase font-bold tracking-tighter">{errors.address.message}</p>}
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold text-primary uppercase tracking-wider">Region Selection</label>
                   <select 
                    {...register("deliveryType")}
                    className="w-full bg-secondary/30 border-2 border-transparent focus:border-accent focus:bg-white p-4 rounded-2xl outline-none transition-all text-sm font-extrabold text-primary"
                   >
                     <option value="Inside Dhaka">Inside Dhaka (Free Delivery)</option>
                     <option value="Outside Dhaka">Outside Dhaka (৳120 Charge)</option>
                   </select>
                </div>

                <div className="pt-8 border-t border-secondary flex items-center gap-4 text-textMuted">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <p className="text-xs font-medium">Your data is secured with AES-256 encryption within the Ridy Atelier.</p>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-primary text-white rounded-[32px] shadow-2xl p-8 lg:p-10 sticky top-28">
              <div className="flex items-center gap-4 mb-10">
                <ShoppingBag className="w-6 h-6 text-secondary" />
                <h2 className="text-xl font-heading">Order Preview</h2>
              </div>

              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate tracking-tight">{item.name}</p>
                        <p className="text-[10px] text-white/60 font-medium">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold whitespace-nowrap">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-10 text-sm font-medium">
                <div className="flex justify-between text-white/60">
                  <span>Atelier Subtotal</span>
                  <span>৳{totalPrice}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Delivery Premium</span>
                  <span>৳{deliveryCharge}</span>
                </div>
                <div className="pt-6 border-t border-white/20 flex justify-between items-baseline">
                  <span className="text-sm font-bold uppercase tracking-widest text-secondary">Final Total</span>
                  <span className="text-3xl font-extrabold tracking-tighter">৳{finalTotal}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-secondary text-primary py-5 rounded-2xl font-bold text-lg hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>Confirm & Place Order <CheckCircle2 className="w-6 h-6" /></>
                )}
              </button>
              
              <p className="text-center text-[10px] text-white/40 mt-6 uppercase tracking-widest font-bold">
                Cash on Delivery Only
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
