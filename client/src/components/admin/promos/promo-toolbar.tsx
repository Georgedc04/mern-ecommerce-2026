import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

/**
 * ADMIN UTILITY STYLES:
 * - Reduced height (h-8)
 * - Smaller font (text-xs/sm)
 * - High-contrast borders (border-zinc-300)
 */
const STYLES = {
  wrap: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-zinc-50 p-2 border border-zinc-200 rounded-sm mb-4",
  searchWrap: "relative w-full max-w-[320px]",
  searchIcon: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500",
  // Shrink input to h-8 (32px) for density
  searchInput: "h-8 rounded-sm border-zinc-300 bg-white pl-8 text-xs focus-visible:ring-cyan-600 focus-visible:border-cyan-600 shadow-sm",
  // Action Button: Amazon-style yellow or standard grey utility
  addButton: "h-8 rounded-sm bg-zinc-900 text-white hover:bg-zinc-800 px-3 text-xs font-medium shadow-sm active:bg-zinc-950 transition-all",
  addIcon: "mr-1.5 size-3.5"
};

type PromoToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAddPromo: () => void;
};

function PromoToolbar({
  search,
  onSearchChange,
  onAddPromo,
}: PromoToolbarProps) {
  return (
    <div className={STYLES.wrap}>
      {/* 1. COMPACT SEARCH */}
      <div className={STYLES.searchWrap}>
        <Search className={STYLES.searchIcon} />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Filter promotions..."
          className={STYLES.searchInput}
        />
      </div>

      {/* 2. ACTIONS */}
      <div className="flex items-center gap-2">
        <Button onClick={onAddPromo} className={STYLES.addButton}>
          <Plus className={STYLES.addIcon} />
          Add Promotion
        </Button>
        
        {/* Pro Touch: Added a secondary 'Help' or 'Refresh' placeholder often seen in Admin tools */}
        <Button variant="outline" className="h-8 size-8 p-0 rounded-sm border-zinc-300 bg-white hover:bg-zinc-50 shadow-sm">
           <span className="sr-only">Refresh</span>
           <svg className="size-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
           </svg>
        </Button>
      </div>
    </div>
  );
}

export default PromoToolbar;