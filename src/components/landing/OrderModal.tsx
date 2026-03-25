"use client";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createOrder } from "@/lib/actions/orders";
import { useSession } from "next-auth/react";

const orderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(11, "Valid phone number is required"),
  address: z.string().min(10, "Full address is required"),
  deliveryType: z.enum(["Inside Dhaka", "Outside Dhaka"]),
  quantity: z.number().min(1),
});

type OrderForm = z.infer<typeof orderSchema>;

export default function OrderModal({ 
  isOpen, 
  onClose, 
  product, 
  selectedVariant,
  initialQuantity
}: { 
  isOpen: boolean; 
  onClose: () => void;
  product: any;
  selectedVariant: any;
  initialQuantity?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return (
    <OrderModalContent 
      isOpen={isOpen} 
      onClose={onClose} 
      product={product} 
      selectedVariant={selectedVariant}
      initialQuantity={initialQuantity}
    />
  );
}

function OrderModalContent({ 
  isOpen, 
  onClose, 
  product, 
  selectedVariant,
  initialQuantity
}: { 
  isOpen: boolean; 
  onClose: () => void;
  product: any;
  selectedVariant: any;
  initialQuantity?: number;
}) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      deliveryType: "Inside Dhaka",
      quantity: initialQuantity || 1,
    }
  });

  useEffect(() => {
    if (isOpen && initialQuantity) {
      setValue("quantity", initialQuantity);
    }
  }, [isOpen, initialQuantity, setValue]);

  const deliveryType = watch("deliveryType");
  const quantity = watch("quantity") || 1;
  const deliveryCharge = deliveryType === "Inside Dhaka" ? 0 : 120;
  const basePrice = Number(selectedVariant?.offerPrice || 0);
  const totalPrice = (basePrice * quantity) + deliveryCharge;

  const onSubmit = async (data: OrderForm) => {
    setIsSubmitting(true);
    try {
      const result = await createOrder({
        customer_name: data.name,
        phone: data.phone,
        address: data.address,
        delivery_type: data.deliveryType,
        quantity: data.quantity,
        product_name: product.name,
        variant_name: selectedVariant.name,
        total_price: totalPrice,
        user_email: session?.user?.email || null,
      });

      if (result.success) {
        setPlacedOrderId(result.orderId || null);
        setIsSuccess(true);
      } else {
        alert(result.error || "Failed to place order. Please check your connection.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setPlacedOrderId(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-md rounded-[40px] shadow-2xl relative z-10 overflow-hidden"
          >
            {isSuccess ? (
              <div className="p-10 lg:p-16 text-center space-y-6">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading text-primary mb-2">Order Placed!</h2>
                  <p className="text-textMuted text-sm font-medium">Thank you for choosing Ridy's Hena Art.</p>
                </div>
                
                <div className="bg-secondary/20 p-6 rounded-3xl border border-secondary shadow-inner">
                  <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-1">Your Order Number</p>
                  <p className="text-2xl font-bold text-primary tracking-tight">#{placedOrderId}</p>
                </div>

                <p className="text-textMuted text-xs leading-relaxed max-w-[240px] mx-auto italic">
                  Our team will contact you shortly for verification before dispatch.
                </p>

                <button 
                  onClick={handleClose}
                  className="w-full btn-primary py-4 rounded-2xl text-base shadow-lg hover:shadow-xl transition-all"
                >
                  OK - Take me back
                </button>
              </div>
            ) : (
              <>
                <div className="p-6 lg:p-8 border-b border-secondary flex items-center justify-between">
                  <h2 className="text-xl lg:text-2xl font-heading text-primary">Atelier Checkout</h2>
                  <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                    <X className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 lg:p-8 space-y-4 lg:space-y-5 max-h-[75vh] overflow-y-auto font-body scrollbar-hide">
                  <div className="bg-secondary/30 p-4 rounded-3xl mb-6 border border-secondary/50">
                    <p className="text-[10px] text-textMuted mb-2 font-bold uppercase tracking-widest">Item Selection</p>
                    <div className="flex justify-between items-center text-sm lg:text-base">
                      <span className="font-bold text-primary">{product.name}</span>
                      <span className="font-extrabold text-accent">৳{selectedVariant.offerPrice}</span>
                    </div>
                    <div className="text-[10px] text-textMuted mt-1 italic font-medium">Collection: {selectedVariant.name}</div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-2 ml-1">Your Name</label>
                    <input 
                      {...register("name")}
                      disabled={isSubmitting}
                      className="w-full px-5 py-3 rounded-2xl border border-secondary focus:border-accent outline-none transition-all text-sm disabled:opacity-50 bg-[#FDFBF7]" 
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold tracking-tight">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                    <input 
                      {...register("phone")}
                      disabled={isSubmitting}
                      className="w-full px-5 py-3 rounded-2xl border border-secondary focus:border-accent outline-none transition-all text-sm disabled:opacity-50 bg-[#FDFBF7]" 
                      placeholder="01XXXXXXXXX"
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold tracking-tight">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-2 ml-1">Delivery Address</label>
                    <textarea 
                      {...register("address")}
                      disabled={isSubmitting}
                      rows={2}
                      className="w-full px-5 py-3 rounded-2xl border border-secondary focus:border-accent outline-none transition-all resize-none text-sm disabled:opacity-50 bg-[#FDFBF7]" 
                      placeholder="House #, Road #, Area, District"
                    />
                    {errors.address && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold tracking-tight">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-2 ml-1">Area</label>
                      <select 
                        {...register("deliveryType")}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-2xl border border-secondary focus:border-accent outline-none transition-all bg-[#FDFBF7] text-sm disabled:opacity-50 font-bold"
                      >
                        <option value="Inside Dhaka">Inside Dhaka</option>
                        <option value="Outside Dhaka">Outside Dhaka</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-2 ml-1">Qty</label>
                      <input 
                        type="number"
                        {...register("quantity", { valueAsNumber: true })}
                        disabled={isSubmitting}
                        className="w-full px-5 py-3 rounded-2xl border border-secondary focus:border-accent outline-none transition-all text-sm disabled:opacity-50 bg-[#FDFBF7] font-bold" 
                      />
                    </div>
                  </div>

                  <div className="pt-8 border-t border-secondary mt-10">
                    <div className="flex justify-between items-center mb-6 px-1">
                      <span className="text-textMuted text-[10px] font-bold uppercase tracking-[0.2em]">Total Payable</span>
                      <span className="text-3xl font-bold text-primary">৳{totalPrice}</span>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(45,64,48,0.1)]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Place Order (COD)"
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
