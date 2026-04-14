import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react"; // Added for wishlist
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

function CustomerProductCard({ product, isWishlisted, onWishlistToggle }: CustomerProductCardProps) {
  const coverImage = getCoverImage(product);
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
      {/* Wishlist Button Overlay - Pro addition */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-3 top-3 z-10 size-8 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110",
          isWishlisted ? "text-red-500 fill-red-500" : "text-muted-foreground"
        )}
        onClick={onWishlistToggle}
      >
        <Heart className="size-4" />
      </Button>

      <Link to={`/collection/${product._id}`} className="block">
        {/* Image Section */}
        <div className="relative aspect-4/5 overflow-hidden bg-muted">
          {coverImage ? (
            <img
              src={coverImage}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground uppercase tracking-widest">
              No Image
            </div>
          )}

          {hasSale && (
            <Badge className="absolute left-3 top-3 border-none bg-primary text-primary-foreground font-bold shadow-lg">
              -{product.salePercentage}%
            </Badge>
          )}

          {/* Quick Action Overlay (Only visible on hover) */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-linear-to-t from-black/40 to-transparent">
            <div className="w-full bg-background/95 backdrop-blur py-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-xl">
              Quick View
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-3 p-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
              {product.brand}
            </span>
            <h3 className="line-clamp-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
              {product.title}
            </h3>
            <p className="text-xs text-muted-foreground italic">
              {product.category?.name}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-foreground">
                {formatPrice(salePrice)}
              </span>
              {hasSale && (
                <span className="text-xs text-muted-foreground line-through decoration-red-500/50">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div className="flex items-center gap-1.5 pt-1">
                {product.colors.slice(0, 4).map((color) => (
                  <span
                    key={color}
                    className="h-3 w-3 rounded-full ring-1 ring-offset-2 ring-transparent transition-all hover:ring-primary"
                    style={{ backgroundColor: getSwatchColor(color) }}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[9px] font-bold text-muted-foreground ml-1">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default CustomerProductCard;