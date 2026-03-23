import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import AuthContext from "@/components/providers/AuthContext";
import dynamic from "next/dynamic";
import { CartProvider } from "@/components/providers/CartContext";

import ConditionalNavbar from "@/components/providers/ConditionalNavbar";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import AIChat from "@/components/landing/AIChat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ridy’s Hena Art | Premium Organic Mehendi & Bridal Henna",
  description: "Discover the pure elegance of traditional herbal mehendi. 100% organic, chemical-free cones for stunning, long-lasting stains. Hand-crafted in Bangladesh.",
  keywords: ["henna", "mehendi", "bridal henna", "organic henna", "natural stain", "bangladesh mehendi", "ridy's hena art"],
  openGraph: {
    title: "Ridy’s Hena Art | Premium Organic Mehendi",
    description: "100% Organic, Chemical-free Henna Cones for Bridal & Party Art.",
    url: "https://ridy-hena.vercel.app",
    siteName: "Ridy's Hena Art",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ridy's Hena Art Premium Cones",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ridy’s Hena Art | Premium Organic Mehendi",
    description: "Experience the purest form of botanical art. Organic, safe, and stunning.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://ridy-hena.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} ${dancingScript.variable} font-body text-textPrimary bg-background antialiased`}>
        <AuthContext>
          <CartProvider>
            <ConditionalNavbar />
            {children}
            <AIChat />
            <WhatsAppButton />
          </CartProvider>
        </AuthContext>
      </body>
    </html>
  );
}
