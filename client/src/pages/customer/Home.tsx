import { Commonloader } from "@/components/common/Loader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCustomerHomeStore } from "@/features/customer/home/store";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Grid2X2, TicketPercent, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// PRO TIP: Moving standard constants into a STYLES object keeps JSX cleaner
const STYLES = {
  pageWrap: "min-h-screen bg-background antialiased selection:bg-primary/20 pb-20",
  container: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  sectionStack: "space-y-24 pt-8", // Increased spacing for more "premium" feel
  sectionHead: "mb-10 space-y-3",
  eyebrow: "text-xs font-bold uppercase tracking-[0.3em] text-primary/80 flex items-center gap-2",
  title: "text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl",
} as const;

export function StoreHome() {
  const { data, loading, loadHome } = useCustomerHomeStore((state) => state);

  useEffect(() => {
    // PRO FEATURE: Ensure user starts at top of page on load
    window.scrollTo(0, 0);
    void loadHome();
  }, [loadHome]);

  if (loading) return <Commonloader />;

  const mainBanner = data.banners[0] || null;
  const sideBanners = data.banners.slice(1, 3);

  return (
    <div className={STYLES.pageWrap}>
      <div className={STYLES.container}>
        <div className={STYLES.sectionStack}>
          
          {/* --- HERO BANNER SECTION --- */}
          <section aria-label="Featured Promotions">
            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              <Link to={mainBanner?.link || "/collections"} className="group relative overflow-hidden rounded-[2.5rem] border border-border/30 shadow-2xl transition-all duration-700">
                <img
                  src={mainBanner?.imageUrl || "/placeholder.png"}
                  alt={mainBanner?.title || "Main Promotion"}
                  className="h-135 w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {sideBanners?.map((item) => (
                  <Link 
                    key={item._id} 
                    to={item.link || "/collections"} 
                    className="group overflow-hidden rounded-4xl border border-border/40 shadow-lg transition-all duration-500 hover:-translate-y-1"
                  >
                    <img
                      src={item.imageUrl || "/placeholder.png"}
                      alt={item.title || "Promotion"}
                      className="h-64.5 w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* --- CATEGORIES SECTION --- */}
          {data?.categories?.length > 0 && (
            <section>
              <div className={STYLES.sectionHead}>
                <p className={STYLES.eyebrow}><Sparkles className="size-3" /> Categories</p>
                <h2 className={STYLES.title}>Browse by collection</h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {data.categories.slice(0, 4).map((category) => (
                  <Link
                    to={`/collections?category=${category._id}`}
                    key={category._id}
                    className="group relative h-full"
                  >
                    <Card className="h-full overflow-hidden rounded-4xl border-border/40 bg-card p-1.5 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-primary/30 group-hover:shadow-2xl">
                      <CardContent className="flex h-full flex-col justify-between space-y-8 rounded-[1.6rem] bg-linear-to-br from-background to-muted/50 p-8">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/10">
                          <Grid2X2 className="size-6" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-xl font-semibold tracking-tight">{category.name}</h3>
                          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                            Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* --- COUPONS SECTION --- */}
          {data?.coupons?.length > 0 && (
            <section className="rounded-[3rem] bg-primary/3 border border-primary/5 p-12">
              <div className={STYLES.sectionHead}>
                <p className={STYLES.eyebrow}>Exclusive Offers</p>
                <h2 className={STYLES.title}>Save on your next order</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {data.coupons.slice(0, 4).map((coupon) => (
                  <div key={coupon._id} className="group relative overflow-hidden rounded-4xl border border-dashed border-primary/30 bg-background p-8 transition-all hover:border-primary">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-500 group-hover:rotate-12 mb-6">
                      <TicketPercent className="size-6" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
                      {coupon.percentage}% DISCOUNT
                    </Badge>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Coupon Code</p>
                      <p className="text-2xl font-black tracking-tighter text-primary">{coupon.code}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- RECENT PRODUCTS --- */}
          {data?.recentProducts?.length > 0 && (
            <section>
              <div className={STYLES.sectionHead}>
                <p className={STYLES.eyebrow}>New Arrivals</p>
                <h2 className={STYLES.title}>Recently added items</h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {data.recentProducts.slice(0, 4).map((product) => (
                  <Link key={product._id} to={`/collection/${product._id}`} className="group">
                    <Card className="h-full flex flex-col overflow-hidden rounded-[2.5rem] border-border/40 bg-card p-3 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="relative aspect-4/5 w-full overflow-hidden rounded-[1.8rem] bg-muted/30">
                        <img
                          src={product?.image || "/placeholder.png"}
                          alt={product?.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                           <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-black shadow-xl">
                              Quick View
                           </div>
                        </div>
                      </div>

                      <CardContent className="flex flex-1 flex-col justify-between p-5">
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{product.brand}</p>
                          <h3 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-primary transition-colors">{product.title}</h3>
                        </div>

                        <div className="flex items-end justify-between pt-4">
                          <div className="space-y-1">
                            <p className="text-lg font-bold tracking-tight">{formatPrice(product.finalPrice)}</p>
                            {product.salePercentage > 0 && (
                              <p className="text-xs text-muted-foreground line-through decoration-red-400/50">
                                {formatPrice(product.price)}
                              </p>
                            )}
                          </div>
                          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                             <ArrowRight className="size-4" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}