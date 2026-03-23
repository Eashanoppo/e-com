import { getAdminStats } from "@/lib/actions/admin";
import { Users, ShoppingBag, Clock, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const { stats, success } = await getAdminStats() as any;

  const statsDisplay = [
    { label: "Total Sales", value: `৳${stats?.totalSales?.toLocaleString() || 0}`, icon: TrendingUp, color: "text-green-600", change: "+0%" },
    { label: "Total Orders", value: stats?.totalOrders || 0, icon: ShoppingBag, color: "text-blue-600", change: "+0%" },
    { label: "Pending Orders", value: stats?.pendingOrders || 0, icon: Clock, color: "text-amber-600", change: "+0%" },
    { label: "Total Customers", value: stats?.totalCustomers || 0, icon: Users, color: "text-purple-600", change: "+0%" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-3xl font-heading text-primary">Dashboard Overview</h1>
        <p className="text-textMuted text-sm tracking-wide uppercase font-bold">Live Atelier Analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsDisplay.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-card shadow-soft border border-secondary group hover:border-accent/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl bg-secondary/50 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                {stat.change}
              </span>
            </div>
            <h3 className="text-textMuted text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-primary tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-card shadow-soft border border-secondary">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-heading text-primary">Recent Terminal Activity</h2>
            <a href="/admin/orders" className="text-xs font-bold text-accent uppercase tracking-widest hover:text-primary transition-colors">View All Orders</a>
          </div>
          <div className="space-y-4">
            {stats?.recentOrders?.length > 0 ? (
              stats.recentOrders.map((order: any) => (
                <div key={order.order_id} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-transparent hover:border-accent/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-bold shadow-sm">
                      {order.customer_name?.[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">{order.customer_name}</p>
                      <p className="text-[10px] text-textMuted uppercase tracking-wider">{new Date(order.created_at).toLocaleDateString()} • {order.product_name}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-textMuted italic text-center py-10 border-2 border-dashed border-secondary rounded-2xl">
                No recent activity to display.
              </p>
            )}
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-card shadow-soft border border-secondary">
           <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-heading text-primary">Performance Products</h2>
            <a href="/admin/products" className="text-xs font-bold text-accent uppercase tracking-widest hover:text-primary transition-colors">Manage Inventory</a>
          </div>
          <div className="space-y-4">
            {stats?.topProducts?.length > 0 ? (
              stats.topProducts.map((product: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center text-primary font-bold text-xs ring-1 ring-primary/10">
                      #{i + 1}
                    </div>
                    <p className="text-sm font-bold text-primary">{product.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{product.orders} Orders</p>
                    <p className="text-[10px] text-accent font-bold uppercase tracking-widest">Trending Up</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-textMuted italic text-center py-10 border-2 border-dashed border-secondary rounded-2xl">
                Product metrics will appear here once orders are placed.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
