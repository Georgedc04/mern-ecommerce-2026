import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Truck, RotateCcw, ShieldCheck } from "lucide-react";

const STYLES = {
  container: "mx-auto max-w-4xl px-6 py-12 space-y-10 animate-in fade-in duration-500",
  header: "text-center space-y-4",
  searchWrap: "relative max-w-xl mx-auto",
  categoryGrid: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  categoryCard: "p-4 border border-zinc-200 rounded-sm bg-white hover:border-zinc-400 transition-colors cursor-pointer",
  sectionTitle: "text-lg font-bold text-zinc-900 border-b border-zinc-200 pb-2 mb-4",
  accordionTrigger: "text-[14px] font-bold text-zinc-700 hover:text-cyan-700 hover:no-underline py-4",
  accordionContent: "text-[13px] leading-relaxed text-zinc-600 pb-4 pr-8",
};

const FAQ_DATA = [
  {
    category: "Shipping & Delivery",
    icon: Truck,
    items: [
      { q: "How long does shipping take?", a: "Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for 1-2 day delivery." },
      { q: "Do you ship internationally?", a: "Currently, we only ship within India. We are looking to expand our international shipping capabilities soon." }
    ]
  },
  {
    category: "Returns & Refunds",
    icon: RotateCcw,
    items: [
      { q: "What is your return policy?", a: "You can return most items within 7 days of delivery. Items must be in original packaging with tags intact." },
      { q: "How do I track my refund?", a: "Once we receive your return, refunds are processed within 2-4 business days to your original payment method." }
    ]
  },
  {
    category: "Payments & Security",
    icon: ShieldCheck,
    items: [
      { q: "Is my payment secure?", a: "Yes, we use Razorpay for all transactions, which is PCI-DSS compliant and uses 256-bit encryption." },
      { q: "Can I pay with Loyalty Points?", a: "Absolutely! If you have enough points to cover the order total, you can select 'Pay with Points' at checkout." }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className={STYLES.container}>
      {/* 1. Header & Search */}
      <header className={STYLES.header}>
        <h1 className="text-3xl font-black tracking-tighter text-zinc-900">Help Center</h1>
        <p className="text-zinc-500 text-sm">Search our knowledge base for quick answers.</p>
        
        <div className={STYLES.searchWrap}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <Input 
            placeholder="Search for articles, policies, or tracking..." 
            className="h-12 pl-10 border-zinc-300 rounded-md shadow-sm text-sm focus:ring-cyan-600"
          />
        </div>
      </header>

      {/* 2. Categorized Accordions */}
      <div className="space-y-12">
        {FAQ_DATA.map((section) => (
          <section key={section.category}>
            <div className="flex items-center gap-2 mb-4">
              <section.icon className="size-5 text-zinc-400" />
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-500">
                {section.category}
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="border-t border-zinc-200">
              {section.items.map((item, idx) => (
                <AccordionItem key={idx} value={`${section.category}-${idx}`} className="border-zinc-200">
                  <AccordionTrigger className={STYLES.accordionTrigger}>
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className={STYLES.accordionContent}>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>

      {/* 3. "Still Need Help" Footer */}
      <footer className="bg-zinc-50 border border-zinc-200 rounded-sm p-8 text-center space-y-4">
        <h3 className="font-bold text-zinc-900">Still need help?</h3>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          Our support team is available Monday through Friday, 9:00 AM to 6:00 PM IST.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="h-9 text-xs font-bold rounded-sm border-zinc-300">
            Email Support
          </Button>
          <Button className="h-9 text-xs font-bold rounded-sm bg-zinc-900">
            Live Chat
          </Button>
        </div>
      </footer>
    </div>
  );
}