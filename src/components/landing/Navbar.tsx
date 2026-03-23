"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, User, LogOut, LayoutDashboard, Leaf } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/components/providers/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: session } = useSession();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
        isScrolled ? "py-4 bg-white/95 backdrop-blur-xl shadow-premium border-b border-primary/5" : "py-6 bg-transparent"
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-secondary rounded-full flex items-center justify-center group-hover:bg-accent transition-colors duration-500 shadow-sm">
               <Leaf className="w-4 h-4 fill-secondary/20" />
            </div>
            <span className="text-2xl font-heading text-primary font-bold tracking-tight">
              Ridy’s <span className="font-dancing text-accent italic font-medium">Hena</span> Art
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 lg:gap-12">
            <Link href="/products" className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary/80 hover:text-accent transition-colors relative after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-full after:h-[1px] after:bg-accent after:transition-all after:duration-300">
              Products
            </Link>
            <Link href="/track-order" className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary/80 hover:text-accent transition-colors relative after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-full after:h-[1px] after:bg-accent after:transition-all after:duration-300">
              Track Order
            </Link>
            
            <div className="flex items-center gap-8">
              {session ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-accent/20 p-0.5 group-hover:border-accent transition-colors overflow-hidden">
                       <img src={session.user?.image || "/demo-user.png"} alt="User" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary hidden lg:block">Dashboard</span>
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-6 w-60 bg-white/90 backdrop-blur-2xl rounded-[32px] shadow-premium border border-white p-3 overflow-hidden transition-all duration-300 transform origin-top-right scale-100 opacity-100">
                      <div className="px-4 py-3 border-b border-primary/5 mb-2">
                        <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest">Signed in as</p>
                        <p className="text-xs font-bold text-primary truncate">{session.user?.email}</p>
                      </div>
                      {session.user?.email === "ridyhena@gmail.com" && (
                        <Link 
                          href="/admin"
                          className="flex items-center gap-3 p-4 text-xs font-bold text-accent cursor-pointer hover:bg-secondary/10 rounded-2xl transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Leaf className="w-4 h-4" /> Admin Panel
                        </Link>
                      )}
                      <Link 
                        href="/dashboard"
                        className="flex items-center gap-3 p-4 text-xs font-bold text-primary hover:bg-secondary/10 rounded-2xl transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4 text-accent" /> My Dashboard
                      </Link>
                      <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 p-4 text-xs font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="btn-primary h-12 px-8 text-[10px] uppercase tracking-widest">
                  Login / Sign Up
                </Link>
              )}

              <button 
                onClick={() => setIsCartOpen(true)}
                className="group relative w-12 h-12 glass rounded-[20px] flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative w-12 h-12 glass rounded-2xl flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            </button>
            <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-primary/5 p-8 flex flex-col gap-8 shadow-premium animate-reveal">
            <Link href="/products" className="text-xs font-extrabold uppercase tracking-widest text-primary" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
            <Link href="/track-order" className="text-xs font-extrabold uppercase tracking-widest text-primary" onClick={() => setIsMobileMenuOpen(false)}>Track My Order</Link>
            {session?.user?.email === "ridyhena@gmail.com" && (
              <Link href="/admin" className="text-xs font-extrabold uppercase tracking-widest text-accent" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>
            )}
            <Link href="/dashboard" className="text-xs font-extrabold uppercase tracking-widest text-primary" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
            <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="text-xs font-extrabold uppercase tracking-widest text-red-500 text-left">Sign Out</button>
          </div>
        )}
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

