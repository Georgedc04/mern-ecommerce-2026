import * as React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@clerk/react"
import {
  Heart,
  LogIn,
  LogOut,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Store,
  User,
  type LucideIcon,
} from "lucide-react"

// UI Components
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Store Hooks
import { useAuthStore } from "@/features/auth/store"
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store"
import { useCustomerProfileStore } from "@/features/customer/profile/store"
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store"
import { useCustomerOrdersStore } from "@/features/customer/orders/store"

// Dialogs
import CustomerWishlistDialog from "../wishlist/customer-wishlist-dialog"
import CustomerProfileDialog from "../profile/customer-profile-dialog"
import CustomerOrdersDialog from "../orders/customer-orders-dialog"
import CustomerCartAndCheckoutDrawer from "../cart-and-checkout/customer-cart-and-checkout-drawer"
import { CustomerMobileNavbar } from "./mobile-navbar"

/**
 * PRO TIP: Moving styles to a structured object makes maintenance 
 * much easier as the project grows.
 */
const NAV_STYLES = {
  header: "sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
  container: "mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8",
  navItem: "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
  iconBtn: "relative inline-flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground",
  badge: "absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in duration-300",
}

function NavTextLink({ href, label, icon: Icon, className }: { href: string; label: string; icon: LucideIcon; className?: string }) {
  return (
    <Link to={href} className={cn(NAV_STYLES.navItem, className)}>
      <Icon className="size-4" />
      <span>{label}</span>
    </Link>
  )
}

export function CustomerNavbar() {
  const { isSignedIn, signOut, isLoaded } = useAuth()
  const { isBootstrapped } = useAuthStore()

  // Feature Stores
  const { items: wishlistItems, loadWishlist, clear: clearWishlist, setOpen: setWishlistOpen } = useCustomerWishlistStore()
  const { openProfile, clear: clearProfile } = useCustomerProfileStore()
  const { setOpen: setCartOpen, cart, loadCart } = useCustomerCartAndCheckoutStore()
  const { openOrders } = useCustomerOrdersStore()

  // Data Loading Logic
  React.useEffect(() => {
    if (!isLoaded || !isBootstrapped) return
    
    void loadCart(Boolean(isSignedIn))

    if (!isSignedIn) {
      clearWishlist()
      clearProfile()
      return
    }

    void loadWishlist()
  }, [isLoaded, isBootstrapped, isSignedIn, loadCart, loadWishlist, clearWishlist, clearProfile])

  const showFullUi = isLoaded && isBootstrapped && isSignedIn
  const wishlistCount = wishlistItems.length
  const cartCount = cart?.items?.length || 0

  return (
    <header className={NAV_STYLES.header}>
      <div className={NAV_STYLES.container}>
        
        {/* Brand Section */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Store className="size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              E-Shopify
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:block">
            <NavTextLink href="/collections" label="Collections" icon={ShoppingBag} />
          </div>
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            
            {/* Wishlist Icon */}
            {showFullUi && (
              <button 
                onClick={() => setWishlistOpen(true)} 
                className={NAV_STYLES.iconBtn}
                title="Wishlist"
              >
                <Heart className={cn("size-5", wishlistCount > 0 && "fill-primary text-primary")} />
                {wishlistCount > 0 && <span className={NAV_STYLES.badge}>{wishlistCount}</span>}
              </button>
            )}

            {/* Account Menu */}
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 rounded-lg font-semibold">
                    <User className="size-4" />
                    <span className="max-w-25 truncate">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl">
                  <DropdownMenuItem onClick={() => openProfile()} className="gap-2 cursor-pointer">
                    <User className="size-4" /> My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openOrders()} className="gap-2 cursor-pointer">
                    <ShoppingBasket className="size-4" /> My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="gap-2 text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="size-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavTextLink href="/sign-in" label="Sign In" icon={LogIn} />
            )}
          </nav>

          {/* Cart Trigger (Always Visible) */}
          <button 
            onClick={() => setCartOpen(true)} 
            className={NAV_STYLES.iconBtn}
            title="Cart"
          >
            <ShoppingCart className="size-5" />
            {cartCount > 0 && <span className={NAV_STYLES.badge}>{cartCount}</span>}
          </button>

          {/* Mobile Menu */}
          <CustomerMobileNavbar isSignedIn={!!isSignedIn} />
        </div>

        {/* Global Dialogs/Drawers */}
        {showFullUi && (
          <>
            <CustomerWishlistDialog />
            <CustomerProfileDialog />
            <CustomerOrdersDialog />
          </>
        )}
        <CustomerCartAndCheckoutDrawer />
      </div>
    </header>
  )
}