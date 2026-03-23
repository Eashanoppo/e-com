import { getAllOrders } from "@/lib/actions/admin";
import OrderTable from "@/components/admin/OrderTable";
import { Filter, Search } from "lucide-react";

export default async function AdminOrders() {
  const { orders, success } = await getAllOrders() as any;

  return (
    <div className="min-h-screen bg-[#FDFBF7]/30">
      <div className="max-w-[1600px] mx-auto p-6 lg:p-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-heading text-primary leading-tight">Order <span className="text-accent italic font-dancing">Registry</span></h1>
            <p className="text-textMuted text-xs font-bold uppercase tracking-[0.3em] mt-2 ml-1">Atelier Resource Management</p>
          </div>
          <div className="flex items-center gap-6 bg-white px-8 py-5 rounded-[30px] border border-secondary shadow-sm">
             <div className="text-right">
                <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-1">Active Database</p>
                <p className="text-2xl font-bold text-primary tabular-nums">{success ? orders?.length || 0 : 0} <span className="text-[10px] font-medium text-textMuted">Manifests</span></p>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-secondary shadow-[0_30px_60px_rgba(45,64,48,0.05)] overflow-hidden">
          {success && orders && orders.length > 0 ? (
            <OrderTable initialOrders={orders} />
          ) : (
            <div className="p-32 text-center space-y-4">
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto opacity-40">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <p className="text-textMuted font-medium italic">No orders found in the atelier archives.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
