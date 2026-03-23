import dynamic from "next/dynamic";
import { getReviews } from "@/lib/actions/reviews";

import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import ProductShowcase from "@/components/landing/ProductShowcase";
import PremiumCollection from "@/components/landing/PremiumCollection";
import WhyChoose from "@/components/landing/WhyChoose";
import Reviews from "@/components/landing/Reviews";
import PromoBanner from "@/components/landing/PromoBanner";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default async function Home() {
  const { reviews, success } = await getReviews() as any;
  const staticTestimonials = [
    { name: "Anika Rahman", comment: "The stain turned out stay way too dark! I love how consistent and dark it stayed on my hands.", rating: 5 },
    { name: "Nabila Islam", comment: "Beautiful packaging and smelled amazing. Highly recommended for bridal work!", rating: 5 },
    { name: "Farhana Ahmed", comment: "Long-lasting color that didn't flake at all. Definitely buying again soon!", rating: 5 },
  ];
  const displayReviews = success && reviews?.length > 0 ? reviews : staticTestimonials;

  return (
    <main className="min-h-screen bg-background text-textPrimary antialiased">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Ridy’s Hena Art",
            "description": "Premium organic herbal mehendi and bridal henna cones. 100% chemical-free natural stains.",
            "url": "https://ridy-heba.vercel.app",
            "telephone": "+8801XXXXXXXXX",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Dhaka",
              "addressLocality": "Dhaka",
              "addressCountry": "BD"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "22:00"
              }
            ],
            "sameAs": [
              "https://facebook.com/ridyshenaart",
              "https://instagram.com/ridyshenaart"
            ]
          })
        }}
      />
      <Hero />
      <TrustBar />
      <ProductShowcase />
      <PremiumCollection />
      <WhyChoose />
      <Reviews reviews={displayReviews} />
      <PromoBanner />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
