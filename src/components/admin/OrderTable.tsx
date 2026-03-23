"use client";
import { useState } from "react";
import { MoreHorizontal, ArrowRightCircle, CheckCircle2, Package, Truck, Search, Filter, Eye, X, Clock } from "lucide-react";
import { updateOrderStatus } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";

const statusFlow = ["Pending", "Verified", "Packed", "Shifted", "Delivered"];

const statusColors: any = {
  Pending: "bg-slate-100 text-slate-700",
  Verified: "bg-blue-100 text-blue-700",
  Packed: "bg-amber-100 text-amber-700",
  Shifted: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
};

const statusIcons: any = {
  Pending: Clock,
  Verified: ArrowRightCircle,
  Packed: Package,
  Shifted: Truck,
  Delivered: CheckCircle2,
};

export default function OrderTable({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const router = useRouter();

  const handleUpdateStatus = async (orderId: string, currentStatus: string) => {
    const currentIndex = statusFlow.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === statusFlow.length - 1) return;

    const nextStatus = statusFlow[currentIndex + 1];
    setLoadingId(orderId);

    const res = await updateOrderStatus(orderId, nextStatus);
    if (res.success) {
      setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status: nextStatus } : o));
      router.refresh();
    }
    setLoadingId(null);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);
    
    const matchesFilter = filterStatus === "All" || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 px-8 pt-8">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, Name or Phone..." 
            className="w-full pl-10 pr-4 py-3 bg-[#FDFBF7] rounded-2xl border border-secondary outline-none focus:border-accent font-medium text-sm"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-9 pr-8 py-3 bg-[#FDFBF7] rounded-2xl border border-secondary outline-none focus:border-accent font-bold text-[10px] uppercase tracking-widest appearance-none"
            >
              <option value="All">All Statuses</option>
              {statusFlow.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#FDFBF7] text-textMuted text-[10px] font-bold uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5 border-b border-secondary">Order ID</th>
              <th className="px-8 py-5 border-b border-secondary">Customer</th>
              <th className="px-8 py-5 border-b border-secondary">Product</th>
              <th className="px-8 py-5 border-b border-secondary">Status</th>
              <th className="px-8 py-5 border-b border-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary">
            {filteredOrders.map((order) => {
              const currentIndex = statusFlow.indexOf(order.status);
              const nextStatus = statusFlow[currentIndex + 1];
              const StatusIcon = statusIcons[order.status] || ArrowRightCircle;

              return (
                <tr key={order.order_id} className="hover:bg-secondary/5 transition-colors group">
                  <td className="px-8 py-6 font-bold text-primary">#{order.order_id}</td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-primary">{order.customer_name}</div>
                    <div className="text-xs text-textMuted tracking-tight">{order.phone}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-xs font-medium text-primary line-clamp-1">{order.product_name}</div>
                    <div className="text-[10px] text-textMuted uppercase font-bold tracking-tighter">৳{order.total_price}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${statusColors[order.status]}`}>
                      <StatusIcon className="w-3 h-3" />
                      {order.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right flex items-center justify-end gap-3 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 hover:bg-white rounded-full text-textMuted hover:text-primary transition-all shadow-sm border border-transparent hover:border-secondary"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {nextStatus ? (
                      <button 
                        onClick={() => handleUpdateStatus(order.order_id, order.status)}
                        disabled={loadingId === order.order_id}
                        className="inline-flex items-center gap-2 text-[10px] font-bold text-accent hover:text-primary transition-colors uppercase tracking-widest disabled:opacity-50"
                      >
                        {loadingId === order.order_id ? "Syncing..." : `Move to ${nextStatus}`}
                        <ArrowRightCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest flex items-center gap-2">
                        Complete <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredOrders.length === 0 && (
          <div className="p-20 text-center">
            <Search className="w-12 h-12 text-secondary mx-auto mb-4 opacity-20" />
            <p className="text-textMuted font-medium italic">No orders match your atelier search.</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[1002] flex items-center justify-center p-6 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
            
            <div className="p-8 lg:p-10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-heading text-primary leading-tight">Order <span className="text-accent italic font-dancing">Manifest</span></h2>
                  <p className="text-textMuted text-xs font-bold uppercase tracking-widest mt-1">ID: #{selectedOrder.order_id}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-3 hover:bg-secondary rounded-full transition-colors text-primary"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-1.5">Customer Identity</p>
                    <p className="text-sm font-bold text-primary">{selectedOrder.customer_name}</p>
                    <p className="text-xs text-textMuted">{selectedOrder.phone}</p>
                    <p className="text-xs text-textMuted italic mt-1 truncate">{selectedOrder.user_email || "Guest Order"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-1.5">Delivery Sanctum</p>
                    <p className="text-xs text-primary leading-relaxed">{selectedOrder.address}</p>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-tighter mt-1">{selectedOrder.delivery_type}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-1.5">Botanical Items</p>
                    <p className="text-sm font-bold text-primary">{selectedOrder.product_name}</p>
                    <p className="text-xs text-textMuted">Quantity: <span className="font-bold text-primary">x{selectedOrder.quantity}</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-1.5">Value Transaction</p>
                    <p className="text-2xl font-bold text-primary tracking-tight">৳{selectedOrder.total_price}</p>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">Cash on Delivery</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-secondary flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest">Placement Date</p>
                    <p className="text-xs font-bold text-primary">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                 </div>
                 <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${statusColors[selectedOrder.status]}`}>
                    {selectedOrder.status}
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
