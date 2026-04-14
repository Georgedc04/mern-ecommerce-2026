import { CategoryDialog } from "@/components/admin/products/category-dialog";
import { ProductDialog } from "@/components/admin/products/product-dialog";
import { ProductsTable } from "@/components/admin/products/products-table";
import { ProductToolbar } from "@/components/admin/products/products-toolbar";
import { useAdminProducts } from "@/features/admin/products/use-admin-products";
import { Boxes, Package } from "lucide-react";

// AMAZON ADMIN STYLES: 
// Flat design, high contrast borders, and reduced vertical gaps.
const STYLES = {
  pageWrap: "flex flex-col gap-4 py-4 px-6 animate-in fade-in duration-500",
  header: "flex items-center justify-between border-b border-zinc-300 pb-4",
  title: "text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2",
  tableContainer: "border border-zinc-200 bg-white rounded-sm shadow-sm overflow-hidden",
  statusBar: "bg-zinc-50 border-b border-zinc-200 px-4 py-2 text-[11px] font-medium text-zinc-500 flex items-center gap-4",
};

function AdminProducts() {
  const {
    search,
    setSearch,
    products,
    categories,
    loading,
    categoryDialogOpen,
    setcategoryDialogOpen,
    productDialogOpen,
    setProductDialogOpen,
    editingProduct,
    openCreateDialog,
    closeProductDialog,
    refreshAll,
    openEditDialog,
  } = useAdminProducts();

  return (
    <div className={STYLES.pageWrap}>
      {/* 1. FLAT HEADER */}
      <header className={STYLES.header}>
        <h1 className={STYLES.title}>
          <Boxes className="size-5 text-zinc-400" />
          Product Catalog
        </h1>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-[10px] font-bold uppercase text-zinc-400">Inventory Status</p>
            <p className="text-xs font-bold text-green-600">All Systems Nominal</p>
          </div>
        </div>
      </header>

      {/* 2. TABLE WORKSPACE */}
      <div className={STYLES.tableContainer}>
        {/* Amazon-style Toolbar Wrapper */}
        <div className="bg-zinc-50/50 p-4 border-b border-zinc-200">
          <ProductToolbar
            search={search}
            onSearchChange={setSearch}
            onManageCategories={() => setcategoryDialogOpen(true)}
            onAddProduct={openCreateDialog}
          />
        </div>

        {/* Dynamic Status Bar (Utility Info) */}
        <div className={STYLES.statusBar}>
          <div className="flex items-center gap-1">
            <Package className="size-3" />
            <span>Total SKUs: {products.length}</span>
          </div>
          <span className="text-zinc-300">|</span>
          <span>Live Catalog</span>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <ProductsTable
            loading={loading}
            products={products}
            onEdit={openEditDialog}
          />
        </div>
      </div>

      {/* 3. DIALOGS */}
      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setcategoryDialogOpen}
        categories={categories}
        onSaved={refreshAll}
      />

      <ProductDialog
        open={productDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeProductDialog();
            return;
          }
          setProductDialogOpen(true);
        }}
        categories={categories}
        product={editingProduct}
        onSaved={refreshAll}
      />
    </div>
  );
}

export default AdminProducts;