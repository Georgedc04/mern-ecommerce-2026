import AdminSettingsBannersTable from "@/components/admin/settings/admin-settings-banner-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminSettings } from "@/features/admin/settings/use-admin-settings";
import { ImagePlus, RefreshCw, UploadCloud, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ADMIN UTILITY STYLES:
 * - Reduced vertical padding
 * - High-contrast dashed borders
 * - Amazon-style primary button (#FFD814 style or Zinc-900)
 */
const STYLES = {
  pageWrap: "flex flex-col gap-4 py-4 px-6 animate-in fade-in duration-500",
  header: "flex items-center justify-between border-b border-zinc-300 pb-4",
  grid: "grid gap-6 lg:grid-cols-[340px_1fr]",
  
  // Sidebar Upload Panel
  uploadCard: "border border-zinc-200 bg-white rounded-sm shadow-sm p-5 h-fit space-y-4",
  dropzone: "flex flex-col items-center justify-center gap-3 border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-6 rounded-sm transition-colors hover:bg-zinc-50 hover:border-zinc-300",
  
  // Content Table Area
  tableWorkspace: "border border-zinc-200 bg-white rounded-sm shadow-sm overflow-hidden",
  tableHeader: "flex items-center justify-between bg-zinc-50 px-4 py-3 border-b border-zinc-200",
  
  // Typography
  title: "text-xl font-bold tracking-tight text-zinc-900",
  sectionLabel: "text-[11px] font-bold uppercase tracking-wider text-zinc-500",
  
  // Inputs & Buttons
  input: "h-9 text-xs rounded-sm border-zinc-300 bg-white cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200",
  btnPrimary: "h-9 w-full rounded-sm bg-zinc-900 text-xs font-bold text-white hover:bg-zinc-800 shadow-sm",
  btnSecondary: "h-8 px-3 rounded-sm bg-white border border-zinc-300 text-[11px] font-bold text-zinc-600 hover:bg-zinc-50"
};

function AdminSettings() {
  const {
    items,
    setFiles,
    fileCountLabel,
    loading,
    refreshBanners,
    handleUpload,
    uploading,
  } = useAdminSettings();

  return (
    <div className={STYLES.pageWrap}>
      {/* 1. FLAT HEADER */}
      <header className={STYLES.header}>
        <h1 className={STYLES.title}>Homepage Management</h1>
        <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400 uppercase">
          <Info className="size-3" />
          Optimal Size: 1920x600px
        </div>
      </header>

      {/* 2. MANAGEMENT PANEL */}
      <div className={STYLES.grid}>
        
        {/* LEFT: UPLOAD CONTROLS */}
        <aside className={STYLES.uploadCard}>
          <p className={STYLES.sectionLabel}>Add New Banner</p>
          
          <div className={STYLES.dropzone}>
            <div className="size-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
              <ImagePlus className="size-5 text-zinc-400" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-zinc-900">Choose image files</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">JPG, PNG or WebP</p>
            </div>
          </div>

          <div className="space-y-3">
            <Input
              type="file"
              multiple
              accept="image/*"
              className={STYLES.input}
              onChange={(event) => setFiles(Array.from(event.target.files || []))}
            />
            
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase">Selection</span>
              <span className="text-[10px] font-bold text-cyan-700">{fileCountLabel}</span>
            </div>

            <Button
              className={STYLES.btnPrimary}
              disabled={uploading}
              onClick={() => handleUpload()}
            >
              <UploadCloud className="mr-2 size-4" />
              {uploading ? "Processing..." : "Deploy Banners"}
            </Button>
          </div>
        </aside>

        {/* RIGHT: CURRENT ASSETS */}
        <section className={STYLES.tableWorkspace}>
          <div className={STYLES.tableHeader}>
            <h2 className={STYLES.sectionLabel}>Active Homepage Banners</h2>
            <Button className={STYLES.btnSecondary} onClick={() => refreshBanners()}>
              <RefreshCw className={cn("mr-1.5 size-3", loading && "animate-spin")} />
              Sync Assets
            </Button>
          </div>

          <div className="p-0">
            {loading ? (
              <div className="h-40 flex items-center justify-center bg-zinc-50/30">
                <RefreshCw className="size-6 text-zinc-200 animate-spin" />
              </div>
            ) : !items.length ? (
              <div className="p-12 text-center border-b border-zinc-100 bg-zinc-50/20">
                <p className="text-xs font-medium text-zinc-400 italic">No banners are currently deployed to the homepage.</p>
              </div>
            ) : (
              <AdminSettingsBannersTable items={items} />
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default AdminSettings;