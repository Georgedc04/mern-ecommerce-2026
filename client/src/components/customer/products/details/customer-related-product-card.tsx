import { Card, CardContent } from "@/components/ui/card";
import {
  extractSalePrice,
  getCoverImage,
} from "@/features/customer/products/product-list.shared";
import type { CustomerProduct } from "@/features/customer/products/types";
import { formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";

/**
 * AMAZON DENSITY:
 * Small fonts (12px-14px), tight padding, and high-contrast links.
 */
const STYLES = {
  card: "group overflow-hidden border-zinc-200 bg-white shadow-none hover:shadow-md transition-shadow duration-200 rounded-sm",
  imageWrap: "relative aspect-square bg-white p-2", // Amazon usually uses white backgrounds for related items
  image: "h-full w-full object-contain mix-blend-multiply", // 'contain' works better for various product shapes in a grid
  content: "space-y-1 p-3 pt-1",
  brand: "text-[11px] font-normal text-zinc-500",
  title: "line-clamp-2 text-[13px] leading-snug text-cyan-700 group-hover:text-orange-700 group-hover:underline",
  priceRow: "flex flex-wrap items-center gap-1.5 pt-0.5",
  salePrice: "text-[15px] font-medium text-zinc-900",
  originalPrice: "text-[12px] text-zinc-500 line-through",
  badge: "absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm"
};

type CustomerProductRelatedCardProps = {
  product: CustomerProduct;
};

function CustomerProductRelatedCard({
  product,
}: CustomerProductRelatedCardProps) {
  const coverImage = getCoverImage(product);
  const salePrice = extractSalePrice(product);
  const hasSale = product.salePercentage > 0;

  return (
    <Card className={STYLES.card}>
      <Link to={`/collection/${product._id}`} className="block">
        <div className={STYLES.imageWrap}>
          {hasSale && (
             <div className={STYLES.badge}>
               {product.salePercentage}% off
             </div>
          )}
          
          {coverImage ? (
            <img 
              src={coverImage} 
              alt={product.title} 
              className={STYLES.image} 
              loading="lazy" 
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-zinc-400">
              No Image
            </div>
          )}
        </div>

        <CardContent className={STYLES.content}>
          {/* Amazon often puts the title first, then the rating, then the price */}
          <h3 className={STYLES.title}>
            {product.title}
          </h3>

          <p className={STYLES.brand}>
            by {product.brand}
          </p>

          {/* Amazon Style Rating Placeholder */}
          <div className="flex items-center gap-1 text-[11px]">
             <span className="text-orange-400">★★★★☆</span>
             <span className="text-cyan-700">12</span>
          </div>

          <div className={STYLES.priceRow}>
            <span className={STYLES.salePrice}>{formatPrice(salePrice)}</span>
            {hasSale && (
              <span className={STYLES.originalPrice}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {/* Delivery tag adds to the Amazon feel */}
          <p className="text-[11px] text-zinc-600 pt-1">
            Get it by <span className="font-bold text-zinc-900">Tomorrow</span>
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}

export default CustomerProductRelatedCard;