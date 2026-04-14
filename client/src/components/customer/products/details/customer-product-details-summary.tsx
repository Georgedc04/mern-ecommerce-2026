import { extractSalePrice } from "@/features/customer/products/product-list.shared";
import type {
  CustomerProduct,
  ProductSize,
} from "@/features/customer/products/types";
import { formatPrice, cn } from "@/lib/utils";
import CustomerProductOptionsGroup from "./customer-product-options-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart, Info } from "lucide-react";

type CustomerProductDetailsSummaryProps = {
  product: CustomerProduct;
  selectedColor: string;
  selectedSize: string;
  setSelectedColor: (value: string) => void;
  setSelectedSize: (value: ProductSize) => void;
  toggleWishlist: () => Promise<void>;
  isWishlistActive: boolean;
  onAddToCart: () => Promise<void>;
};

export function CustomerProductDetailsSummary({
  product,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  toggleWishlist,
  isWishlistActive,
  onAddToCart,
}: CustomerProductDetailsSummaryProps) {
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <section className="flex flex-col gap-2.5 py-1">
      {/* 1. Brand & Title (Amazon Density) */}
      <div className="space-y-0.5">
        <p className="text-[13px] font-medium text-cyan-700 hover:text-orange-700 hover:underline cursor-pointer transition-colors">
          Brand: {product?.brand}
        </p>
        <h1 className="text-xl font-normal text-zinc-900 leading-tight">
          {product.title}
        </h1>
      </div>

      {/* Ratings Placeholder (Essential for Amazon look) */}
      <div className="flex items-center gap-2 text-sm">
        <div className="flex text-orange-400 text-xs">★★★★☆</div>
        <span className="text-cyan-700 text-xs hover:text-orange-700 cursor-pointer">842 ratings</span>
      </div>

      <Separator className="my-1 opacity-60" />

      {/* 2. Pricing Section */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          {hasSale && (
            <span className="text-2xl font-light text-red-600">-{product.salePercentage}%</span>
          )}
          <span className="text-2xl font-medium">{formatPrice(salePrice)}</span>
        </div>
        
        {hasSale && (
          <p className="text-[12px] text-zinc-500">
            List Price: <span className="line-through">{formatPrice(product.price)}</span>
          </p>
        )}
        
        <div className="flex items-center gap-1.5 text-[12px] text-zinc-600">
          <Info className="size-3" />
          <span>Inclusive of all taxes</span>
        </div>
      </div>

      <Separator className="my-1 opacity-60" />

      {/* 3. Selections (Compact) */}
      <div className="space-y-3 py-2">
        {product.colors?.length > 0 && (
          <div className="space-y-1">
             <span className="text-xs font-bold">Color: <span className="font-normal">{selectedColor || "Select"}</span></span>
             <CustomerProductOptionsGroup
                values={product.colors}
                selectedValue={selectedColor}
                onSelect={setSelectedColor}
                variant="color"
             />
          </div>
        )}

        {product.sizes?.length > 0 && (
          <div className="space-y-1">
             <span className="text-xs font-bold">Size: <span className="font-normal">{selectedSize || "Select"}</span></span>
             <CustomerProductOptionsGroup
                values={product.sizes}
                selectedValue={selectedSize}
                onSelect={setSelectedSize}
                variant="size"
             />
          </div>
        )}
      </div>

      {/* 4. Buy Box (The Amazon Card) */}
      <div className="mt-2 flex flex-col gap-3 rounded-md border border-zinc-300 p-4 shadow-sm bg-white">
        <div className="space-y-0.5">
          <p className="text-xl font-medium">{formatPrice(salePrice)}</p>
          <p className={cn(
            "text-sm font-medium",
            product.stock > 0 ? "text-green-700" : "text-red-700"
          )}>
            {product.stock > 0 ? (product.stock <= 5 ? `Only ${product.stock} left - order soon.` : "In Stock") : "Temporarily out of stock."}
          </p>
        </div>

        <div className="space-y-2">
          <Button
            size="sm"
            className="w-full h-8 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-black border-none shadow-sm text-[13px] font-normal"
            disabled={product.stock < 1}
            onClick={() => void onAddToCart()}
          >
            Add to Cart
          </Button>
          <Button
            size="sm"
            className="w-full h-8 rounded-full bg-[#FFA41C] hover:bg-[#FA8900] text-black border-none shadow-sm text-[13px] font-normal"
            disabled={product.stock < 1}
          >
            Buy Now
          </Button>
        </div>

        <button 
          onClick={() => void toggleWishlist()}
          className="flex items-center gap-2 text-[12px] text-cyan-700 hover:text-orange-700 hover:underline pt-1"
        >
          <Heart className={cn("size-3", isWishlistActive && "fill-current")} />
          {isWishlistActive ? "Remove from List" : "Add to List"}
        </button>
      </div>

      {/* 5. Minimal Description */}
      {product.description && (
        <div className="mt-4">
          <h3 className="text-sm font-bold">About this item</h3>
          <p className="text-sm leading-snug text-zinc-800 mt-1">
            {product.description}
          </p>
        </div>
      )}
    </section>
  );
}

export default CustomerProductDetailsSummary;