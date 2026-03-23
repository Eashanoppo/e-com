import Footer from "@/components/landing/Footer";

export default function PrivacyPage() {
  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-heading text-primary mb-12 text-center">
          Privacy <span className="text-accent italic font-dancing">Policy</span>
        </h1>
        
        <div className="bg-white rounded-[40px] p-8 lg:p-16 shadow-premium border border-primary/5 prose prose-stone max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-heading text-primary mb-6">1. Information Collection</h2>
            <p className="text-textMuted leading-relaxed">
              At Ridy's Hena Art, we collect minimal personal information necessary to fulfill your orders. 
              This includes your name, phone number, and delivery address. When you sign in with Google, 
              we also retrieve your email address and profile image to personalize your dashboard experience.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading text-primary mb-6">2. Use of Information</h2>
            <p className="text-textMuted leading-relaxed">
              Your information is primarily used to process orders, verify deliveries via phone, 
              and maintain your purchase history in your personal dashboard. We do not sell or share 
              your personal data with third parties for marketing purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading text-primary mb-6">3. Data Security</h2>
            <p className="text-textMuted leading-relaxed">
              We utilize secure database systems (Supabase) and industry-standard authentication (NextAuth) 
              to protect your data. While we implement robust security measures, no method of transmission 
              over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading text-primary mb-6">4. Cookies</h2>
            <p className="text-textMuted leading-relaxed">
              Our website uses cookies to maintain your login session and enhance your browsing experience. 
              By using our service, you consent to the use of these essential cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading text-primary mb-6">5. Your Rights</h2>
            <p className="text-textMuted leading-relaxed">
              You have the right to access, update, or delete your personal information. 
              You can manage most of this directly through your user dashboard settings. 
              For further assistance, please contact us at hello@ridyshenaart.com.
            </p>
          </section>

          <div className="pt-12 border-t border-primary/5 text-center">
            <p className="text-textMuted text-sm italic">Last updated: March 2026</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
