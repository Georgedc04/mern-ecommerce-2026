import PromoDialog from "@/components/admin/promos/promo-dialog";
import PromoToolbar from "@/components/admin/promos/promo-toolbar";
import PromoTable from "@/components/admin/promos/promos-table";
import { useAdminPromos } from "@/features/admin/promo/use-admin-promo";
import { TicketPercent, Activity } from "lucide-react";

/**
 * ADMIN WORKSPACE STYLES:
 * Flat borders, high-density spacing, and industrial typography.
 */
const STYLES = {
  pageWrap: "flex flex-col gap-4 py-4 px-6 animate-in fade-in duration-500",
  header: "flex items-center justify-between border-b border-zinc-300 pb-4",
  title: "text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2",
  tableWorkspace: "border border-zinc-200 bg-white rounded-sm shadow-sm overflow-hidden",
  toolbarArea: "bg-zinc-50/50 p-4 border-b border-zinc-200",
  infoBar: "bg-zinc-50 border-b border-zinc-200 px-4 py-2 text-[11px] font-bold text-zinc-500 flex items-center gap-4 uppercase tracking-tight",
};

function AdminPromos() {
  const {
    search,
    setSearch,
    promos,
    loading,
    promoDialogOpen,
    setPromoDialogOpen,
    editingPromo,
    openCreateDialog,
    closePromoDialog,
    savePromo,
    removePromo,
    saving,
    deletingPromoId,
    openEditDialog,
  } = useAdminPromos();

  return (
    <div className={STYLES.pageWrap}>
      {/* 1. COMPACT UTILITY HEADER */}
      <header className={STYLES.header}>
        <h1 className={STYLES.title}>
          <TicketPercent className="size-5 text-zinc-400" />
          Promotions & Discounts
        </h1>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">Campaign Status</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Activity className="size-3" /> System Active
            </span>
          </div>
        </div>
      </header>

      {/* 2. DATA WORKSPACE */}
      <div className={STYLES.tableWorkspace}>
        {/* Toolbar Wrapper */}
        <div className={STYLES.toolbarArea}>
          <PromoToolbar
            search={search}
            onSearchChange={setSearch}
            onAddPromo={openCreateDialog}
          />
        </div>

        {/* Data Metadata Bar */}
        <div className={STYLES.infoBar}>
          <span>Active Promos: {promos.length}</span>
          <span className="text-zinc-300">|</span>
          <span>Region: Global</span>
        </div>

        {/* Dense Data Table */}
        <div className="overflow-x-auto">
          <PromoTable
            promos={promos}
            loading={loading}
            deletingPromoId={deletingPromoId}
            onEdit={openEditDialog}
            onDelete={removePromo}
          />
        </div>
      </div>

      {/* 3. MANAGED DIALOG */}
      <PromoDialog
        open={promoDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            closePromoDialog();
            return;
          }
          setPromoDialogOpen(true);
        }}
        promo={editingPromo}
        saving={saving}
        onSaved={savePromo}
      />
    </div>
  );
}

export default AdminPromos;