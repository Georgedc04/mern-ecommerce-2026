import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import {
  extractSalePrice,
  getCoverImage,
  getSwatchColor,
} from "@/features/customer/products/product-list.shared";
import type { CustomerProduct } from "@/features/customer/products/types";
import { formatPrice, cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type CustomerProductCardProps = {
  product: CustomerProduct;
  isWishlisted?: boolean;
  onWishlistToggle?: (e: React.MouseEvent) => void;
};

// AMAZON STYLES: 
// - Sharp corners (rounded-sm)
// - Minimalist border
// - Blue links (cyan-700)
const STYLES = {
  card: "group relative flex h-full flex-col overflow-hidden border-zinc-200 bg-white transition-shadow hover:shadow-md rounded-sm",
  imageWrap: "relative aspect-square w-full overflow-hidden bg-white p-2", // Amazon uses squares
  image: "h-full w-full object-contain mix-blend-multiply transition-transform duration-500", // Contain is better for catalog views
  title: "line-clamp-2 text-[13px] leading-snug text-zinc-800 transition-colors group-hover:text-orange-700",
  brand: "text-[11px] font-medium text-cyan-700 hover:text-orange-700 hover:underline",
  price: "text-base font-medium text-zinc-900",
  strike: "text-[11px] text-zinc-500 line-through decoration-zinc-400",
}

function CustomerProductCard({ product, isWishlisted, onWishlistToggle }: CustomerProductCardProps) {
  const coverImage = getCoverImage(product);
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <Card className={STYLES.card}>
      {/* Wishlist - Made smaller for Amazon look */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-2 top-2 z-10 size-7 rounded-full border border-zinc-200 bg-white/90 shadow-sm transition-transform active:scale-90",
          isWishlisted ? "text-red-500 fill-red-500" : "text-zinc-400"
        )}
        onClick={onWishlistToggle}
      >
        <Heart className="size-3.5" />
      </Button>

      <Link to={`/collection/${product._id}`} className="flex flex-col h-full">
        {/* Image Section */}
        <div className={STYLES.imageWrap}>
          {coverImage ? (
            <img
              src={coverImage}
              alt={product.title}
              className={STYLES.image}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-zinc-400 uppercase">
              No Image
            </div>
          )}

          {hasSale && (
            <div className="absolute left-0 top-2 bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white rounded-r-sm">
              {product.salePercentage}% off
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-3 pt-1 space-y-1">
          {/* Brand Link */}
          <span className={STYLES.brand}>
            {product.brand}
          </span>

          {/* Title */}
          <h3 className={STYLES.title}>
            {product.title}
          </h3>

          {/* Amazon Rating Placeholder (Essential for the look) */}
          <div className="flex items-center gap-1">
            <div className="flex text-orange-400">
              {[...Array(4)].map((_, i) => <Star key={i} className="size-3 fill-current" />)}
              <Star className="size-3 text-zinc-300" />
            </div>
            <span className="text-[11px] text-cyan-700">82</span>
          </div>

          {/* Pricing */}
          <div className="pt-0.5">
            <div className="flex items-center gap-1.5">
              <span className={STYLES.price}>
                {formatPrice(salePrice)}
              </span>
              {hasSale && (
                <span className={STYLES.strike}>
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            {/* Amazon Delivery Tag */}
            <p className="text-[11px] text-zinc-600">
              Get it after <span className="font-bold text-zinc-900">2 Days +</span>
            </p>
          </div>

          {/* Mini Color Swatches (Small Circles) */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1 pt-1">
              {product.colors.slice(0, 3).map((color) => (
                <div
                  key={color}
                  className="size-2.5 rounded-full border border-zinc-200"
                  style={{ backgroundColor: getSwatchColor(color) }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-zinc-500">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}

export default CustomerProductCard;