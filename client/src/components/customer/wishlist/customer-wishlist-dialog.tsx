import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { formatPrice } from "@/lib/utils";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

// AMAZON STYLES: 
// Tight vertical spacing, smaller product images, blue "utility" links.
const STYLES = {
  dialog: "sm:max-w-md max-h-[85vh] overflow-hidden flex flex-col p-0 border-none rounded-sm",
  header: "px-4 py-3 border-b bg-zinc-50",
  scrollArea: "flex-1 overflow-y-auto p-4 space-y-4",
  item: "flex gap-3 pb-4 border-b border-zinc-100 last:border-0",
  imageWrap: "h-20 w-20 shrink-0 border border-zinc-200 rounded-sm bg-white p-1",
  image: "h-full w-full object-contain mix-blend-multiply",
  content: "min-w-0 flex-1 flex flex-col",
  title: "text-[13px] font-medium leading-tight text-cyan-700 hover:text-orange-700 hover:underline line-clamp-2",
  price: "text-sm font-bold text-zinc-900 mt-1",
  btnRemove: "text-[11px] text-zinc-500 hover:text-red-600 flex items-center gap-1 transition-colors",
  btnView: "h-7 px-3 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-black text-[11px] font-medium border border-zinc-400/50 shadow-sm",
}

function CustomerWishlistDialog() {
  const { isOpen, setOpen, items, removeItem } = useCustomerWishlistStore(
    (state) => state,
  );

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className={STYLES.dialog}>
        <DialogHeader className={STYLES.header}>
          <DialogTitle className="flex items-center gap-2 text-sm font-bold">
            <Heart className="size-4 text-red-500 fill-red-500" />
            Your Shopping List ({items.length})
          </DialogTitle>
        </DialogHeader>

        <div className={STYLES.scrollArea}>
          {!items.length ? (
            <div className="py-10 text-center">
              <p className="text-sm text-zinc-500">Your list is empty.</p>
              <Link 
                to="/collections" 
                onClick={() => setOpen(false)}
                className="text-xs text-cyan-700 hover:underline mt-2 inline-block"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className={STYLES.item}>
                {/* Thumbnail */}
                <div className={STYLES.imageWrap}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={STYLES.image}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-zinc-50 text-[10px] text-zinc-400 uppercase">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className={STYLES.content}>
                  <Link
                    to={`/collection/${item.productId}`}
                    className={STYLES.title}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                  
                  <p className="text-[11px] text-zinc-500 mt-0.5">Brand: {item.brand}</p>
                  
                  <p className={STYLES.price}>{formatPrice(item.finalPrice)}</p>

                  <div className="flex items-center justify-between mt-auto pt-2">
                    <button
                      type="button"
                      className={STYLES.btnRemove}
                      onClick={() => void removeItem(item.productId)}
                    >
                      <Trash2 className="size-3" />
                      Delete
                    </button>

                    <Button
                      asChild
                      className={STYLES.btnView}
                    >
                      <Link
                        onClick={() => setOpen(false)}
                        to={`/collection/${item.productId}`}
                      >
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomerWishlistDialog;