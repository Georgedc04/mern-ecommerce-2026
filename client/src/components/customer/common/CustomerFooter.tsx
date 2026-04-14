import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const STYLES = {
  footer: "bg-zinc-50 dark:bg-zinc-950 border-t border-border/40",
  container: "mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8",
  grid: "grid grid-cols-1 gap-12 lg:grid-cols-4 md:grid-cols-2",
  sectionTitle:
    "text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6",
  link:
    "text-sm text-muted-foreground hover:text-primary transition-colors duration-200",
  socialIcon:
    "size-5 text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1 cursor-pointer",
};

export function CustomerFooter() {
  return (
    <footer className={STYLES.footer}>
      <div className={STYLES.container}>
        <div className={STYLES.grid}>
          
          {/* 1. BRAND & MISSION */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tighter">
                E-Shopify
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Curating the finest essentials for your modern lifestyle. Quality
              craftsmanship meets contemporary design.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-5">
              <a href="#" target="_blank">
                <FaInstagram className={STYLES.socialIcon} />
              </a>
              <a href="#" target="_blank">
                <FaFacebook className={STYLES.socialIcon} />
              </a>
              <a href="#" target="_blank">
                <FaTwitter className={STYLES.socialIcon} />
              </a>
              <a href="#" target="_blank">
                <FaYoutube className={STYLES.socialIcon} />
              </a>
            </div>
          </div>

          {/* 2. QUICK SHOP */}
          <div>
            <h3 className={STYLES.sectionTitle}>Shop</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/collections" className={STYLES.link}>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections" className={STYLES.link}>
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/collections" className={STYLES.link}>
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/collections" className={STYLES.link}>
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. SUPPORT */}
          <div>
            <h3 className={STYLES.sectionTitle}>Support</h3>
            <ul className="space-y-4">
              <li>
                <Link to="#" className={STYLES.link}>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="#" className={STYLES.link}>
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faqs" className={STYLES.link}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className={STYLES.link}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. NEWSLETTER */}
          <div className="space-y-6">
            <h3 className={STYLES.sectionTitle}>Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get special offers and first look at new drops.
            </p>

            <div className="flex flex-col gap-2">
              <Input
                placeholder="Enter your email"
                className="rounded-full bg-background border-border/60 focus-visible:ring-primary/20"
              />
              <Button className="w-full rounded-full font-bold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12 opacity-50" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            © 2026 E-Shopify Studio. All rights reserved.
          </p>

          {/* PAYMENT ICONS */}
          <div className="flex items-center gap-4 opacity-50 grayscale">
            <div className="h-6 w-10 bg-muted rounded-sm flex items-center justify-center text-[8px] font-bold italic">
              VISA
            </div>
            <div className="h-6 w-10 bg-muted rounded-sm flex items-center justify-center text-[8px] font-bold italic">
              AMEX
            </div>
            <div className="h-6 w-10 bg-muted rounded-sm flex items-center justify-center text-[8px] font-bold italic">
              PAYPAL
            </div>
            <div className="h-6 w-10 bg-muted rounded-sm flex items-center justify-center text-[8px] font-bold italic">
              APPLE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}