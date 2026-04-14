import { Commonloader } from "@/components/common/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminDashboardLiteStore } from "@/features/admin/dashboard/store";
import { formatPrice } from "@/lib/utils";
import {
  Boxes,
  IndianRupee,
  Layers3,
  PackageCheck,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { useEffect } from "react";

/**
 * ADMIN UTILITY STYLES: 
 * High-density grid, smaller text, and subtle data-viz cues.
 */
const STYLES = {
  container: "space-y-6 animate-in fade-in duration-500",
  header: "flex items-center justify-between border-b border-zinc-300 pb-4",
  title: "text-xl font-bold tracking-tight text-zinc-900",
  
  // Stats Grid: Use 3 or 4 columns for higher density
  grid: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  
  // Stat Card: Minimalist and flat
  statCard: "border-zinc-200 bg-white shadow-sm rounded-sm hover:border-zinc-400 transition-colors",
  statContent: "p-4 flex flex-col gap-2",
  labelRow: "flex items-center justify-between",
  statLabel: "text-[11px] font-bold uppercase tracking-wider text-zinc-500",
  statValue: "text-2xl font-bold tracking-tight text-zinc-900",
  icon: "size-4 text-zinc-400",
  
  // Professional indicator
  trending: "flex items-center gap-1 text-[10px] font-bold text-green-600 mt-1"
};

const statsItems = [
  { key: "totalSales", label: "Total Revenue", icon: IndianRupee, color: "text-emerald-600" },
  { key: "totalOrders", label: "Total Orders", icon: PackageCheck, color: "text-blue-600" },
  { key: "totalProducts", label: "Inventory Items", icon: Boxes, color: "text-orange-600" },
  { key: "totalCategories", label: "Taxonomies", icon: Layers3, color: "text-purple-600" },
  { key: "totalReturnedOrders", label: "Returns", icon: RotateCcw, color: "text-red-600" },
] as const;

function AdminDashboard() {
  const { loading, fetchDashboard, stats, hasLoaded } =
    useAdminDashboardLiteStore((state) => state);

  useEffect(() => {
    if (!hasLoaded) {
      void fetchDashboard();
    }
  }, [fetchDashboard, hasLoaded]);

  if (loading) return <Commonloader />;

  return (
    <div className={STYLES.container}>
      {/* 1. COMPACT HEADER */}
      <header className={STYLES.header}>
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-md bg-zinc-900 flex items-center justify-center">
            <TrendingUp className="size-4 text-white" />
          </div>
          <h1 className={STYLES.title}>Business Overview</h1>
        </div>
        <div className="text-[11px] font-medium text-zinc-400">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </header>

      {/* 2. DENSE STATS GRID */}
      <div className={STYLES.grid}>
        {statsItems.map((item) => {
          const Icon = item.icon;
          const value = stats[item.key];
          
          return (
            <Card key={item.key} className={STYLES.statCard}>
              <CardContent className={STYLES.statContent}>
                <div className={STYLES.labelRow}>
                  <p className={STYLES.statLabel}>{item.label}</p>
                  <Icon className={STYLES.icon} />
                </div>
                
                <div>
                  <p className={STYLES.statValue}>
                    {item.key === "totalSales" ? formatPrice(value) : value.toLocaleString()}
                  </p>
                  
                  {/* Visual Trust Indicator (Static for now) */}
                  <div className={STYLES.trending}>
                    <TrendingUp className="size-3" />
                    <span>Live Data</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 3. DASHBOARD CANVAS (For future Charts/Tables) */}
      <div className="grid gap-6 lg:grid-cols-2">
         <div className="h-64 rounded-sm border border-zinc-300 border-dashed bg-zinc-50 flex items-center justify-center">
            <p className="text-xs text-zinc-400 font-medium">Sales Performance Chart Placeholder</p>
         </div>
         <div className="h-64 rounded-sm border border-zinc-300 border-dashed bg-zinc-50 flex items-center justify-center">
            <p className="text-xs text-zinc-400 font-medium">Recent Activity Placeholder</p>
         </div>
      </div>
    </div>
  );
}

export default AdminDashboard;