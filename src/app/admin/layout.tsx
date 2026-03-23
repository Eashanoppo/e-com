"use client";
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Package, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "ridyhena@gmail.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

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
    <div className="flex min-h-screen bg-secondary">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-secondary p-6 flex flex-col shrink-0">
        <div className="mb-10">
          <h2 className="text-xl font-heading">RHA Admin</h2>
          <p className="text-[10px] text-secondary/40 uppercase tracking-widest mt-1">Secure Panel</p>
        </div>
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-button hover:bg-white/10 transition-colors text-sm font-medium">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded-button hover:bg-white/10 transition-colors text-sm font-medium">
            <ShoppingCart className="w-4 h-4" />
            <span>Orders</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 p-3 rounded-button hover:bg-white/10 transition-colors text-sm font-medium">
            <Package className="w-4 h-4" />
            <span>Products</span>
          </Link>
        </nav>
        <div className="pt-6 border-t border-white/10">
          <p className="text-[10px] text-secondary/40 uppercase tracking-widest mb-3 px-3">Signed in as</p>
          <p className="text-xs font-bold text-secondary/70 px-3 mb-4 truncate">{session.user?.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 p-3 w-full rounded-button hover:bg-red-500/20 text-red-300 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
