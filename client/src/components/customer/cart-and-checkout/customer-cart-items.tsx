import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@clerk/react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

// AMAZON UTILITY STYLES
const STYLES = {
  wrap: "flex h-full min-h-0 flex-col bg-white",
  head: "border-b border-zinc-200 bg-zinc-50 px-4 py-3",
  headingText: "flex items-center gap-2 text-sm font-bold text-zinc-900",
  
  scroll: "min-h-0 flex-1",
  list: "space-y-0 divide-y divide-zinc-100", // Using dividers instead of spaced cards
  
  item: "group flex gap-3 p-4 transition-colors hover:bg-zinc-50/50",
  image: "h-20 w-20 shrink-0 border border-zinc-200 object-contain p-1 bg-white",
  
  textWrap: "min-w-0 flex-1 flex flex-col gap-0.5",
  brand: "text-[10px] font-bold uppercase tracking-tight text-zinc-400",
  title: "line-clamp-2 text-[13px] leading-snug text-cyan-700 hover:text-orange-700 hover:underline transition-colors",
  meta: "text-[11px] text-zinc-500",
  price: "text-sm font-bold text-zinc-900",

  footerRow: "flex items-center justify-between gap-3 pt-2",
  
  // Compact Qty Selector
  qtyWrap: "flex items-center rounded-md border border-zinc-300 bg-zinc-100 shadow-sm overflow-hidden",
  qtyButton: "h-7 w-7 rounded-none px-0 bg-zinc-100 hover:bg-zinc-200 text-zinc-600",
  qtyValue: "flex h-7 min-w-8 items-center justify-center bg-white border-x border-zinc-300 text-[12px] font-bold",
  
  // Utility Links
  removeBtn: "text-[11px] text-cyan-700 hover:text-red-600 hover:underline flex items-center gap-1",
  emptyWrap: "flex flex-col items-center justify-center py-20 px-6 text-center",
};

function CustomerCartItems() {
  const { isSignedIn } = useAuth();
  const { cart, setOpen, increase, decrease, remove } =
    useCustomerCartAndCheckoutStore((state) => state);

  return (
    <div className={STYLES.wrap}>
      <div className={STYLES.head}>
        <p className={STYLES.headingText}>
          <ShoppingCart className="size-4" />
          Shopping Cart ({cart.items.length} items)
        </p>
      </div>

      <ScrollArea className={STYLES.scroll}>
        <div className={STYLES.list}>
          {!cart.items.length ? (
            <div className={STYLES.emptyWrap}>
              <div className="size-16 rounded-full bg-zinc-50 flex items-center justify-center mb-4">
                 <ShoppingCart className="size-8 text-zinc-200" />
              </div>
              <p className="text-sm font-medium text-zinc-900">Your cart is empty</p>
              <Button 
                variant="link" 
                className="text-cyan-700 text-xs" 
                onClick={() => setOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            cart.items.map((item, index) => (
              <div key={`${item.productId}-${index}`} className={STYLES.item}>
                {/* Product Image */}
                <img src={item.image} alt={item.title} className={STYLES.image} />

                <div className={STYLES.textWrap}>
                  <p className={STYLES.brand}>{item.brand}</p>

                  <Link
                    to={`/collection/${item.productId}`}
                    className={STYLES.title}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>

                  <p className={STYLES.meta}>
                    {item.color && <span>Color: {item.color}</span>}
                    {item.color && item.size && <span className="mx-1">|</span>}
                    {item.size && <span>Size: {item.size}</span>}
                  </p>

                  <p className={STYLES.price}>{formatPrice(item.finalPrice)}</p>

                  <div className={STYLES.footerRow}>
                    {/* Compact Quantity Selector */}
                    <div className={STYLES.qtyWrap}>
                      <button
                        type="button"
                        className={STYLES.qtyButton}
                        onClick={() => void decrease(item, Boolean(isSignedIn))}
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className={STYLES.qtyValue}>{item.quantity}</span>
                      <button
                        type="button"
                        className={STYLES.qtyButton}
                        onClick={() => void increase(item, Boolean(isSignedIn))}
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>

                    {/* Utility Remove Link */}
                    <button
                      type="button"
                      className={STYLES.removeBtn}
                      onClick={() => void remove(item, Boolean(isSignedIn))}
                    >
                      <Trash2 className="size-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default CustomerCartItems;