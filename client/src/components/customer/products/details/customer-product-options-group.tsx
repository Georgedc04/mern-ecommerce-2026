import { getSwatchColor } from "@/features/customer/products/product-list.shared";
import type { ProductSize } from "@/features/customer/products/types";
import { cn } from "@/lib/utils";

/** * AMAZON STYLE: 
 * Tight gaps, smaller text, and subtle shadows instead of heavy rings.
 */
const STYLES = {
  wrap: "flex flex-wrap gap-2",
  // Reduced padding and smaller font
  base: "relative flex items-center justify-center border text-[13px] transition-all duration-200 cursor-pointer select-none",
  
  // Amazon uses a thin orange or black border for active items
  active: "border-orange-600 ring-1 ring-orange-600 bg-white z-10",
  inactive: "border-zinc-300 bg-white hover:border-zinc-400 text-zinc-900",
  
  // Size-specific: Square and uniform
  size: "h-8 min-w-[40px] px-2 rounded-sm",
  
  // Color-specific: Very compact
  color: "h-9 px-2.5 rounded-sm gap-2",
  swatch: "size-4 rounded-sm border border-black/10",
  
  // Sold out state (Optional but very Amazon)
  disabled: "opacity-40 grayscale cursor-not-allowed bg-zinc-50 border-dashed"
};

type CustomerProductOptionsGroupProps = {
  values: string[];
  selectedValue: string;
  onSelect: (value: ProductSize) => void;
  variant: "color" | "size";
  className?: string; // To allow parent to adjust spacing
};

function CustomerProductOptionsGroup({
  values,
  variant,
  selectedValue,
  onSelect,
  className
}: CustomerProductOptionsGroupProps) {
  return (
    <div role="group" className={cn(STYLES.wrap, className)}>
      {values.map((value) => {
        const isActive = selectedValue === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value as ProductSize)}
            className={cn(
              STYLES.base,
              variant === "color" ? STYLES.color : STYLES.size,
              isActive ? STYLES.active : STYLES.inactive
            )}
          >
            {variant === "color" ? (
              <>
                <div
                  className={STYLES.swatch}
                  style={{ backgroundColor: getSwatchColor(value) }}
                  aria-hidden="true"
                />
                <span className="text-[12px] capitalize">{value}</span>
              </>
            ) : (
              <span className="font-normal">{value}</span>
            )}

            {/* Subtle Active Checkmark (Amazon uses a tiny corner fold or border) */}
            {isActive && (
              <div className="absolute -right-px -bottom-px size-2 bg-orange-600 clip-path-triangle" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default CustomerProductOptionsGroup;