"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative subtle texture instead of missing image */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2D4030_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="bg-white/90 backdrop-blur-xl w-full max-w-[440px] rounded-3xl shadow-2xl p-12 border border-white/50 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <div className="mb-10">
          <h1 className="text-4xl font-heading mb-4 text-primary">Atelier Login</h1>
          <p className="text-textMuted text-sm leading-relaxed px-4">
            Connect your Google account to access your personalized dashboard, track orders, and join our premium community.
          </p>
        </div>

        <div className="space-y-6">
          <button 
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-4 py-5 px-6 bg-white border-2 border-primary/10 rounded-2xl font-bold text-sm text-primary shadow-sm hover:bg-white/50 hover:border-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>

          <div className="pt-4">
             <Link href="/" className="text-xs font-bold text-textMuted hover:text-primary transition-colors uppercase tracking-widest">
               Back to Home
             </Link>
          </div>

          <p className="pt-6 text-[10px] text-textMuted leading-tight">
            By signing in, you agree to Ridy’s Hena Art’s 
            <br />
            <Link href="#" className="underline hover:text-primary">Privacy Policy</Link> and <Link href="#" className="underline hover:text-primary">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
