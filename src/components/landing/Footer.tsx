"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-primary/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand & Bio */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="text-2xl font-heading text-primary mb-6 block"
            >
              Ridy’s Hena Art
            </Link>
            <p className="text-textMuted text-sm leading-relaxed">
              Premium herbal mehendi focused on purity and traditional artistry.
              Based in Dhaka, delivering nationwide beauty since 2023.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-8">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-sm text-textMuted hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-textMuted hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-sm text-textMuted hover:text-primary transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-textMuted hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-textMuted hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-8">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="text-sm text-textMuted">Dhaka, Bangladesh</li>
              <li className="text-sm text-textMuted">+880 1346-646181</li>
              <li className="text-sm text-textMuted">ridyhena@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/5 flex flex-col items-center gap-4 text-textMuted text-[10px] lg:text-xs">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
            <p>© 2026 Ridy's Hena Art. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <a href="#" className="hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Instagram
              </a>
            </div>
          </div>
          <p className="text-textMuted/50 font-medium uppercase tracking-[0.2em]">
            Developed by{" "}
            <a
              href="https://www.unleft.space"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors font-bold"
            >
              UNLEFT
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
