import * as React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@clerk/react"
import {
  Heart,
  LogIn,
  LogOut,
  Menu,
  ShoppingBag,
  ShoppingBasket,
  Store,
  User,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Store Hooks - Connecting mobile to the same logic as desktop
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store"
import { useCustomerProfileStore } from "@/features/customer/profile/store"
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store"
import { useCustomerOrdersStore } from "@/features/customer/orders/store"

const MOBILE_NAV_STYLES = {
  item: "flex items-center justify-between w-full rounded-sm px-3 py-2.5 text-[13px] font-medium transition-colors hover:bg-zinc-100 active:bg-zinc-200",
  icon: "size-4 mr-3 text-zinc-500",
  badge: "ml-auto flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground",
  sectionLabel: "px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400",
}

export function CustomerMobileNavbar({ isSignedIn }: { isSignedIn: boolean }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { signOut } = useAuth()

  // Feature Stores
  const { items: wishlistItems, setOpen: setWishlistOpen } = useCustomerWishlistStore()
  const { openProfile } = useCustomerProfileStore()
  const { openOrders } = useCustomerOrdersStore()
  useCustomerCartAndCheckoutStore()

  const wishlistCount = wishlistItems.length

  // Helper: Closes mobile menu then triggers the Desktop-style Dialog
  const triggerAction = (action: () => void) => {
    setIsOpen(false)
    action()
  }

  return (
    <div className="ml-auto flex items-center gap-1 lg:hidden">
      
      

      {/* 2. MENU DRAWER */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="size-9 rounded-full">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-70 p-0 border-none rounded-r-xl flex flex-col">
          <SheetHeader className="p-4 border-b bg-zinc-50/50">
            <SheetTitle className="flex items-center gap-2">
              <Store className="size-5 text-primary" />
              <span className="text-base font-bold tracking-tight">E-Shopify</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {/* SHOP SECTION */}
            <div className="mb-6">
              <p className={MOBILE_NAV_STYLES.sectionLabel}>Shop</p>
              <Link 
                to="/collections" 
                onClick={() => setIsOpen(false)}
                className={MOBILE_NAV_STYLES.item}
              >
                <span className="flex items-center">
                  <ShoppingBag className={MOBILE_NAV_STYLES.icon} /> Collections
                </span>
                <ChevronRight className="size-3 text-zinc-300" />
              </Link>
            </div>

            <Separator className="mx-4 mb-6 opacity-50" />

            {/* ACCOUNT SECTION */}
            <div>
              <p className={MOBILE_NAV_STYLES.sectionLabel}>Personal</p>
              
              {isSignedIn ? (
                <div className="space-y-0.5">
                  <button 
                    onClick={() => triggerAction(openProfile)}
                    className={MOBILE_NAV_STYLES.item}
                  >
                    <span className="flex items-center">
                      <User className={MOBILE_NAV_STYLES.icon} /> My Profile
                    </span>
                  </button>

                  <button 
                    onClick={() => triggerAction(openOrders)}
                    className={MOBILE_NAV_STYLES.item}
                  >
                    <span className="flex items-center">
                      <ShoppingBasket className={MOBILE_NAV_STYLES.icon} /> My Orders
                    </span>
                  </button>

                  <button 
                    onClick={() => triggerAction(() => setWishlistOpen(true))}
                    className={MOBILE_NAV_STYLES.item}
                  >
                    <span className="flex items-center">
                      <Heart className={cn(MOBILE_NAV_STYLES.icon, wishlistCount > 0 && "fill-primary text-primary")} /> 
                      Wishlist
                    </span>
                    {wishlistCount > 0 && <span className={MOBILE_NAV_STYLES.badge}>{wishlistCount}</span>}
                  </button>

                  <div className="px-3 pt-6">
                    <Button 
                      variant="outline" 
                      className="w-full h-8 text-[11px] font-bold text-red-600 border-zinc-200 hover:bg-red-50 hover:text-red-700"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 size-3" /> Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/sign-in" 
                  onClick={() => setIsOpen(false)}
                  className={MOBILE_NAV_STYLES.item}
                >
                  <span className="flex items-center">
                    <LogIn className={MOBILE_NAV_STYLES.icon} /> Sign In
                  </span>
                  <ChevronRight className="size-3 text-zinc-300" />
                </Link>
              )}
            </div>
          </div>

          <div className="p-4 border-t bg-zinc-50/50">
            <p className="text-[10px] text-center text-zinc-400 font-medium uppercase tracking-widest">
              © 2026 E-Shopify
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}