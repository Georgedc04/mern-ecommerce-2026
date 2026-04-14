import { Commonloader } from "@/components/common/Loader";
import CustomerProductDetailsGallery from "@/components/customer/products/details/customer-product-details-gallery";
import CustomerProductDetailsSummary from "@/components/customer/products/details/customer-product-details-summary";
import CustomerProductRelatedCard from "@/components/customer/products/details/customer-related-product-card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store";
import { useCustomerProductDetailsStore } from "@/features/customer/products/details/store";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { useAuth } from "@clerk/react";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils"; // Now we will actually use this

// ... keeping your existing constants ...
const pageWrapClass = "min-h-screen bg-background pb-20";
const heroSectionClass = "border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background";
const heroContainerClass = "mx-auto max-w-7xl px-4 py-8";
const backButtonClass = "mb-4 rounded-none px-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors";
const backIconClass = "mr-2 h-4 w-4";
const heroContentClass = "space-y-2"; 
const heroEyebrowClass = "text-sm uppercase tracking-[0.2em] text-primary font-medium";
const heroTitleClass = "max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl";
const contentContainerClass = "mx-auto max-w-7xl px-4 py-8";
const contentGridClass = "grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start";
const relatedSectionClass = "mt-24 space-y-8";
const relatedHeadingWrapClass = "space-y-1 border-l-2 border-primary pl-4";
const relatedEyebrowClass = "text-sm uppercase tracking-[0.18em] text-muted-foreground";
const relatedTitleClass = "text-2xl font-semibold tracking-tight text-foreground";
const relatedGridClass = "grid gap-6 sm:grid-cols-2 xl:grid-cols-4";

function CollectionDetails() {
  const { id = "" } = useParams();
  const { isLoaded, isSignedIn } = useAuth();
  const { isBootstrapped } = useAuthStore();

  const {
    loadProduct,
    clear,
    data,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    toggleWishlist,
    addToCart,
  } = useCustomerProductDetailsStore((state) => state);

  const wishlistItems = useCustomerWishlistStore((state) => state.items);
  const product = data?.product ?? null;
  const relatedProducts = data?.relatedProducts ?? [];
  const isWishlistActive = product ? wishlistItems.some((item) => item.productId === product._id) : false;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    void loadProduct(id);
    return () => clear();
  }, [clear, id, loadProduct]);

  useEffect(() => {
    if (product?.title) {
      document.title = `${product.title} | ${product.brand || 'Store'}`;
    }
  }, [product]);

  if (!product) return <Commonloader />;

  return (
    <div className={pageWrapClass}>
      <section className={heroSectionClass}>
        <div className={heroContainerClass}>
          <Button asChild variant="ghost" className={backButtonClass}>
            <Link to="/collections">
              <ArrowLeft className={backIconClass} />
              Back to Collections
            </Link>
          </Button>
          {/* USAGE OF CN TO RESOLVE THE ERROR */}
          <div className={cn(heroContentClass, "animate-in fade-in slide-in-from-left-4 duration-500")}>
            <p className={heroEyebrowClass}>{product?.brand}</p>
            <h1 className={heroTitleClass}>{product?.title}</h1>
          </div>
        </div>
      </section>

      <main className={contentContainerClass}>
        <div className={contentGridClass}>
          <div className="animate-in fade-in duration-700">
            <CustomerProductDetailsGallery
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>

          <div className="lg:sticky lg:top-24 animate-in fade-in slide-in-from-right-4 duration-700">
            <CustomerProductDetailsSummary
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              setSelectedColor={setSelectedColor}
              setSelectedSize={setSelectedSize}
              toggleWishlist={() =>
                toggleWishlist(isLoaded, isBootstrapped, Boolean(isSignedIn), isWishlistActive)
              }
              isWishlistActive={isWishlistActive}
              onAddToCart={() => addToCart(isLoaded, isBootstrapped, Boolean(isSignedIn))}
            />
          </div>
        </div>

        {relatedProducts.length ? (
          <section className={relatedSectionClass}>
            <div className={relatedHeadingWrapClass}>
              <p className={relatedEyebrowClass}>You may also like</p>
              <h2 className={relatedTitleClass}>Related Products</h2>
            </div>

            {/* USAGE OF CN TO RESOLVE THE ERROR */}
            <div className={cn(relatedGridClass, "mt-4")}>
              {relatedProducts.map((item) => (
                <CustomerProductRelatedCard key={item._id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

export default CollectionDetails;