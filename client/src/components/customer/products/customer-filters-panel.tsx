import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SIZE_OPTIONS } from "@/features/admin/products/constants";
import type { ProductCategory } from "@/features/admin/products/types";
import {
  BRAND_OPTIONS,
  getSwatchColor,
  type CustomerProductFilters,
  type FacetKey,
} from "@/features/customer/products/product-list.shared";
import { cn } from "@/lib/utils";
import { ChevronLeft, X } from "lucide-react";

/**
 * AMAZON LOOK & FEEL:
 * - text-[13px] base font
 * - cyan-700 for links
 * - Minimal padding (density)
 * - Simple checkmark logic
 */
const STYLES = {
  panel: "flex flex-col gap-4 overflow-y-auto bg-white py-2",
  title: "text-[14px] font-bold text-zinc-900",
  link: "flex items-center gap-2 text-[13px] py-0.5 text-zinc-900 hover:text-orange-700 cursor-pointer transition-colors",
  activeLink: "font-bold text-zinc-900",
  clearBtn: "flex items-center gap-1 text-[12px] text-cyan-700 hover:text-orange-700 hover:underline px-0 h-auto",
  swatch: "size-5 rounded-sm border border-zinc-300 shadow-sm",
  sizeBtn: "flex items-center justify-center border border-zinc-300 bg-white px-2 py-1 text-[12px] min-w-[36px] hover:bg-zinc-50 rounded-sm",
  activeSize: "border-orange-600 ring-1 ring-orange-600 font-bold",
};

type CustomerFiltersPanelProps = {
  categories: ProductCategory[];
  filters: CustomerProductFilters;
  availableColors: string[];
  hasActiveFilters: boolean;
  onToggleFacet: (key: FacetKey, value: string) => void;
  onClearFilters: () => void;
};

function CustomerFiltersPanel({
  categories,
  filters,
  availableColors,
  hasActiveFilters,
  onClearFilters,
  onToggleFacet,
}: CustomerFiltersPanelProps) {
  return (
    <div className={STYLES.panel}>
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className={STYLES.title}>Filters</h2>
        {hasActiveFilters && (
          <Button variant="link" className={STYLES.clearBtn} onClick={onClearFilters}>
            <X className="size-3" /> Clear all
          </Button>
        )}
      </div>

      {/* Categories - Amazon uses a nested tree style */}
      <section className="space-y-1 px-1">
        <h3 className="text-[13px] font-bold">Category</h3>
        <div className="flex flex-col pl-1">
          {categories.map((item) => {
            const isActive = filters.category === item._id;
            return (
              <div
                key={item._id}
                onClick={() => onToggleFacet("category", item._id)}
                className={cn(STYLES.link, isActive && STYLES.activeLink)}
              >
                {isActive && <ChevronLeft className="size-3 -ml-3" />}
                {item.name}
              </div>
            );
          })}
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* Brands - Amazon uses checkboxes (text-based here) */}
      <section className="space-y-1 px-1">
        <h3 className="text-[13px] font-bold">Brand</h3>
        <div className="flex flex-col pl-1">
          {BRAND_OPTIONS.map((brand) => {
            const isActive = filters.brand === brand;
            return (
              <div
                key={brand}
                onClick={() => onToggleFacet("brand", brand)}
                className={cn(STYLES.link, isActive && STYLES.activeLink)}
              >
                <div className={cn(
                  "size-3.5 border border-zinc-400 rounded-sm flex items-center justify-center",
                  isActive && "bg-cyan-700 border-cyan-700"
                )}>
                  {isActive && <div className="size-1.5 bg-white rounded-full" />}
                </div>
                {brand}
              </div>
            );
          })}
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* Colors - Compact squares */}
      <section className="space-y-2 px-1">
        <h3 className="text-[13px] font-bold">Color</h3>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => {
            const isActive = filters.color === color;
            return (
              <button
                key={color}
                type="button"
                className="group flex flex-col items-center gap-1"
                onClick={() => onToggleFacet("color", color)}
                title={color}
              >
                <div
                  className={cn(
                    STYLES.swatch,
                    isActive && "ring-2 ring-orange-500 ring-offset-1 border-orange-500"
                  )}
                  style={{ backgroundColor: getSwatchColor(color) }}
                />
                <span className={cn("text-[10px] text-zinc-500", isActive && "font-bold text-zinc-900")}>
                  {color}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <Separator className="opacity-50" />

      {/* Sizes - Small grid of boxes */}
      <section className="space-y-2 px-1 pb-4">
        <h3 className="text-[13px] font-bold">Size</h3>
        <div className="flex flex-wrap gap-1.5">
          {SIZE_OPTIONS.map((size) => {
            const isActive = filters.size === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onToggleFacet("size", size)}
                className={cn(STYLES.sizeBtn, isActive && STYLES.activeSize)}
              >
                {size}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default CustomerFiltersPanel;