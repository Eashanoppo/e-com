"use client";
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Package, LogOut, ArrowLeft, Menu, X, Home } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const ADMIN_EMAIL = "ridyhena@gmail.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.email !== ADMIN_EMAIL) {
      router.replace("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-textMuted text-sm font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user?.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center border border-red-100 max-w-sm">
          <p className="text-4xl mb-4">🔐</p>
          <h2 className="text-xl font-heading text-primary mb-2">Access Denied</h2>
          <p className="text-textMuted text-sm mb-8">This area is restricted to the site administrator only.</p>
          <Link href="/" className="btn-primary px-8 py-3">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-secondary relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-primary text-secondary p-8 flex flex-col transform transition-transform duration-300 ease-in-out
        lg:sticky lg:translate-x-0 lg:h-screen
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading text-white">RHA Admin</h2>
            <p className="text-[10px] text-secondary/40 uppercase tracking-[0.2em] mt-1 font-bold">Secure Panel</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Back to Website */}
        <Link 
          href="/" 
          className="flex items-center gap-3 p-4 mb-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group"
        >
          <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowLeft className="w-4 h-4 text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">Back to site</span>
            <span className="text-[8px] text-secondary/40 uppercase tracking-wider font-bold">View Storefront</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          <Link 
            href="/admin" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition-all text-sm font-bold group border border-transparent hover:border-white/5"
          >
            <div className="p-2 rounded-xl bg-secondary/10 text-secondary/60 group-hover:text-white transition-colors">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <span>Dashboard</span>
          </Link>
          <Link 
            href="/admin/orders" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition-all text-sm font-bold group border border-transparent hover:border-white/5"
          >
            <div className="p-2 rounded-xl bg-secondary/10 text-secondary/60 group-hover:text-white transition-colors">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <span>Orders</span>
          </Link>
          <Link 
            href="/admin/products" 
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition-all text-sm font-bold group border border-transparent hover:border-white/5"
          >
            <div className="p-2 rounded-xl bg-secondary/10 text-secondary/60 group-hover:text-white transition-colors">
              <Package className="w-4 h-4" />
            </div>
            <span>Products</span>
          </Link>
        </nav>

        <div className="pt-8 mt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-heading text-lg border border-accent/20">
              {session.user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex flex-col truncate">
              <p className="text-[10px] text-secondary/40 uppercase tracking-widest font-bold">Administrator</p>
              <p className="text-xs font-bold text-secondary/80 truncate">{session.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 p-4 w-full rounded-2xl hover:bg-red-500/10 text-red-300 transition-all text-sm font-bold border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-primary/5 p-4 flex items-center justify-between sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 bg-secondary rounded-2xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            <span className="font-heading text-lg text-primary">RHA Admin</span>
          </div>
          <div className="w-12 h-12" /> {/* Spacer */}
        </header>

        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
