import TrackOrderClient from "@/components/track/TrackOrderClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order | Ridy's Hena Art",
  description: "Enter your order ID and phone number to track the real-time status of your premium mehendi delivery.",
};

export default function TrackOrderPage() {
  return (
    <main className="min-h-[80vh] bg-[#FDFBF7] py-24 flex items-center justify-center pt-32">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading text-primary mb-4">Track Your Journey</h1>
          <p className="text-textMuted text-lg">Follow your premium mehendi from our atelier to your hands.</p>
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-primary/5">
          <TrackOrderClient />
        </div>
      </div>
    </main>
  );
}
