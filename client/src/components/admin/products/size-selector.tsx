import { Button } from "@/components/ui/button";
import { SIZE_OPTIONS } from "@/features/admin/products/constants";
import { cn } from "@/lib/utils";
import { Check, MousePointerClick } from "lucide-react";

type SizeSelectorProps = {
  selectedSizes: string[];
  onToggle: (size: string) => void;
  onSelectAll?: (sizes: string[]) => void;
  onClear?: () => void;
};

export function SizeSelector({ 
  onToggle, 
  selectedSizes, 
  onSelectAll, 
  onClear 
}: SizeSelectorProps) {
  
  const allSelected = selectedSizes.length === SIZE_OPTIONS.length;

  return (
    <div className="space-y-4" data-slot="size-selector">
      {/* Header with Pro Actions */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Product Sizes
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Select available stock sizes
          </p>
        </div>

        <div className="flex gap-2">
          {onSelectAll && (
            <button
              type="button"
              onClick={() => allSelected ? onClear?.() : onSelectAll([...SIZE_OPTIONS])}
              className="text-[10px] font-bold uppercase tracking-wider text-primary hover:underline"
            >
              {allSelected ? "Clear All" : "Select All"}
            </button>
          )}
        </div>
      </div>

      {/* Modernized Grid */}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4">
        {SIZE_OPTIONS.map((sizeItem) => {
          const isActive = selectedSizes.includes(sizeItem);

          return (
            <Button
              key={sizeItem}
              type="button"
              variant="outline"
              onClick={() => onToggle(sizeItem)}
              className={cn(
                "relative h-12 w-full transition-all duration-200 font-bold",
                "hover:border-primary/50 hover:bg-primary/5",
                isActive 
                  ? "border-primary bg-primary/10 text-primary ring-1 ring-primary shadow-sm" 
                  : "text-muted-foreground border-border/60"
              )}
            >
              {sizeItem}
              
              {/* Subtle Checkmark Indicator */}
              {isActive && (
                <div className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[8px] text-primary-foreground shadow-sm animate-in zoom-in-50">
                  <Check className="size-2.5 stroke-4" />
                </div>
              )}
            </Button>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selectedSizes.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2 animate-in fade-in slide-in-from-bottom-2">
          <MousePointerClick className="size-3 text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">
            Currently selecting: <span className="font-bold text-foreground">{selectedSizes.join(", ")}</span>
          </p>
        </div>
      )}
    </div>
  );
}