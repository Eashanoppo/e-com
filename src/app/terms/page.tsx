import Footer from "@/components/landing/Footer";

export default function TermsPage() {
  return (
    <main className="bg-[#FDFBF7] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl lg:text-5xl font-heading text-primary mb-12 text-center">
          Terms of <span className="text-accent italic font-dancing">Service</span>
        </h1>
        
        <div className="bg-white rounded-[40px] p-8 lg:p-16 shadow-premium border border-primary/5 prose prose-stone max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-heading text-primary mb-6">1. Introduction</h2>
            <p className="text-textMuted leading-relaxed">
              Welcome to Ridy's Hena Art. By accessing or using our website, you agree to be bound by these Terms of Service. 
              Our service provides premium botanical henna products and related artistry services based in Dhaka, Bangladesh.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading text-primary mb-6">2. Product Information</h2>
            <p className="text-textMuted leading-relaxed">
              We strive to display our products as accurately as possible. However, as our henna is a natural, 
              hand-crafted botanical product, slight variations in color, consistency, and staining results may occur. 
              These variations are a testament to the purity of our ingredients.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading text-primary mb-6">3. Orders & Payments</h2>
            <p className="text-textMuted leading-relaxed">
              Orders placed through our website are subject to acceptance and availability. 
              We currently offer Cash on Delivery (COD) for all orders nationwide. 
              Upon placing an order, our team will contact you for verification before dispatch.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading text-primary mb-6">4. Shipping & Delivery</h2>
            <p className="text-textMuted leading-relaxed">
              We offer free delivery within Dhaka city. For orders outside Dhaka, a standard delivery charge applies. 
              Delivery times are estimates and may vary due to external factors.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading text-primary mb-6">5. Ethical Use</h2>
            <p className="text-textMuted leading-relaxed">
              Our designs and content are the intellectual property of Ridy's Hena Art. 
              Users are prohibited from using our content for commercial purposes without explicit permission.
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
