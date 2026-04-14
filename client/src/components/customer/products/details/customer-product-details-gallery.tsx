import { Card } from "@/components/ui/card";
import { getCoverImage } from "@/features/customer/products/product-list.shared";
import type { CustomerProduct } from "@/features/customer/products/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type CustomerProductDetailsGalleryProps = {
  product: CustomerProduct;
  selectedImage: string;
  setSelectedImage: (value: string) => void;
};

// PRO TIP: Standardize sizing for high-end boutique look
const STYLES = {
  mainCard: "relative overflow-hidden rounded-[2rem] border-border/40 bg-muted/20 shadow-sm",
  mainImage: "aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105",
  thumbnailGrid: "mt-4 grid grid-cols-5 gap-3",
  thumbnailBtn: "relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-300",
}

function CustomerProductDetailsGallery({
  product,
  selectedImage,
  setSelectedImage,
}: CustomerProductDetailsGalleryProps) {
  const galleryImages = product.images || [];
  const displayImage = selectedImage || getCoverImage(product);

  return (
    <div className="flex flex-col gap-4">
      {/* --- Main Stage --- */}
      <Card className={STYLES.mainCard}>
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={displayImage} // Key triggers animation on source change
              src={displayImage || "/placeholder.png"}
              alt={product.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={STYLES.mainImage}
            />
          </AnimatePresence>

          {/* Luxury Overlay for Discount/New */}
          {product.salePercentage > 0 && (
            <div className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
              -{product.salePercentage}%
            </div>
          )}
        </div>
      </Card>

      {/* --- Thumbnail Selector --- */}
      {galleryImages.length > 1 && (
        <div className={STYLES.thumbnailGrid}>
          {galleryImages.map((item) => {
            const isActive = displayImage === item.url;

            return (
              <button
                key={item.publicId}
                type="button"
                onClick={() => setSelectedImage(item.url)}
                className={cn(
                  STYLES.thumbnailBtn,
                  isActive 
                    ? "border-primary ring-2 ring-primary/20 scale-95" 
                    : "border-border/60 hover:border-primary/50 opacity-70 hover:opacity-100"
                )}
              >
                <img
                  src={item.url}
                  alt="Thumbnail"
                  className="h-full w-full object-cover"
                />
                
                {/* Active Overlay */}
                {isActive && (
                   <div className="absolute inset-0 bg-primary/5" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomerProductDetailsGallery;