"use client";
import ReviewsGrid from "./ReviewsGrid";

export default function Reviews({ reviews }: { reviews: any[] }) {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-heading text-primary leading-tight mb-4">
            Loved by Our Community
          </h2>
          <p className="text-textMuted italic text-lg">
            Generations of beauty lovers raving about Ridy's Hena Art.
          </p>
        </div>

        <ReviewsGrid reviews={reviews} />
      </div>
    </section>
  );
}
