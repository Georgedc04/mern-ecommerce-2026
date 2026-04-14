import {
  BadgePercent,
  BarChart3,
  ExternalLink,
  LayoutDashboard,
  Package,
  Settings2,
  Store,
  type LucideIcon,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils"; // Standard utility for merging classes
import { Button } from "@/components/ui/button";

type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const items: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Coupons", href: "/admin/coupons", icon: BadgePercent },
  { label: "Orders", href: "/admin/orders", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings2 },
];

function SidebarNav() {
  return (
    <nav className="flex flex-col gap-1 px-3 py-4" data-slot="sidebar-nav">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.label}
            to={item.href}
            end={item.href === "/admin"}
            className={({ isActive }) =>
              cn(
                "group relative flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-all duration-200 outline-none",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            {/* Active Indicator Bar */}
            {({ isActive }) => (
              <>
                <div
                  className={cn(
                    "absolute left-0 h-5 w-1 rounded-r-full bg-primary transition-all duration-300",
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  )}
                />
                
                <Icon 
                  className={cn(
                    "size-4.5 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-primary" : "text-muted-foreground/70"
                  )} 
                />
                
                <span className="tracking-tight">{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}



export function AdminSidebar() {
  return (
    <aside className="hidden h-screen w-70 shrink-0 border-r border-border/50 bg-card lg:flex lg:flex-col">
      <div className="flex h-16 items-center justify-between border-b border-border/50 px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Store className="size-4" />
          </div>
          <span className="text-lg font-bold tracking-tighter">E-Shopify</span>
        </div>
        
        {/* PRO TIP: A small 'Go to Store' icon button in the header */}
        <Button asChild variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-primary">
          <Link to="/" title="Go to Client Page">
            <ExternalLink className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>
  );
}