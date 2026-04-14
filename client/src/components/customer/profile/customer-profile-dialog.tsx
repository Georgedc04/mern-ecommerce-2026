import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store";
import { useCustomerProfileStore } from "@/features/customer/profile/store";
import { useUser } from "@clerk/react";
import { Pencil, Plus, Trash2, MapPin, Award } from "lucide-react";
import { cn } from "@/lib/utils";

// AMAZON STYLES: Tight density, sharp corners, clear hierarchy
const STYLES = {
  content: "max-h-[95vh] overflow-y-auto sm:max-w-4xl p-0 border-none rounded-sm shadow-2xl",
  header: "px-6 py-4 border-b bg-zinc-50/50",
  shell: "p-6 space-y-6",
  
  // User Info Block
  accountCard: "flex items-center justify-between p-4 rounded-md border bg-white shadow-sm",
  userName: "text-lg font-bold text-zinc-900",
  userEmail: "text-sm text-zinc-600",
  points: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold",

  // Layout Grid
  grid: "grid gap-8 lg:grid-cols-[1fr_350px]",
  
  // Address Items
  addressCard: "group relative p-4 rounded-md border border-zinc-200 hover:border-zinc-400 bg-white transition-all",
  addressName: "text-[14px] font-bold text-zinc-900",
  addressText: "text-[13px] text-zinc-600 leading-snug mt-1",
  badgeDefault: "text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200",
  
  // Form elements
  input: "h-9 text-sm rounded-sm border-zinc-300 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600",
  btnPrimary: "h-8 rounded-sm bg-[#FFD814] hover:bg-[#F7CA00] text-zinc-900 text-xs font-medium border border-zinc-400/50 shadow-sm",
  btnSecondary: "h-8 rounded-sm bg-white hover:bg-zinc-50 text-zinc-700 text-xs border border-zinc-300 shadow-sm",
  btnDanger: "h-8 rounded-sm bg-white hover:bg-red-50 text-red-600 text-xs border border-zinc-300 hover:border-red-200"
};

function CustomerProfileDialog() {
  const {
    isOpen,
    closeProfile,
    mode,
    startAdd,
    startEdit,
    updateForm,
    cancelForm,
    saveForm,
    removeAddress,
    items,
    form,
  } = useCustomerProfileStore();

  const { points } = useCustomerCartAndCheckoutStore((state) => state);
  const { user } = useUser();
  const showForm = mode !== "none";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeProfile()}>
      <DialogContent className={STYLES.content}>
        <DialogHeader className={STYLES.header}>
          <DialogTitle className="text-base font-bold">Your Account & Addresses</DialogTitle>
        </DialogHeader>

        <div className={STYLES.shell}>
          {/* User Account Summary */}
          <section className={STYLES.accountCard}>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-zinc-100 border flex items-center justify-center text-lg font-bold text-zinc-400">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div>
                <h2 className={STYLES.userName}>{user?.fullName}</h2>
                <p className={STYLES.userEmail}>{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
            <div className={STYLES.points}>
              <Award className="size-3.5" />
              {points} Points
            </div>
          </section>

          <div className={cn("grid gap-6", showForm ? STYLES.grid : "grid-cols-1")}>
            {/* Addresses List */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <MapPin className="size-4 text-zinc-400" />
                  Your Addresses
                </h3>
                <Button variant="outline" className={STYLES.btnSecondary} onClick={startAdd}>
                  <Plus className="mr-1.5 size-3.5" /> Add New
                </Button>
              </div>

              <div className="space-y-3">
                {items.length === 0 ? (
                  <div className="p-8 text-center border border-dashed rounded-md bg-zinc-50">
                    <p className="text-sm text-zinc-500 italic">No saved addresses found.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item._id} className={STYLES.addressCard}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className={STYLES.addressName}>{item.fullName}</p>
                          {item.isDefault && <span className={STYLES.badgeDefault}>Default</span>}
                        </div>
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="outline" size="icon" className="size-7" onClick={() => startEdit(item)}>
                            <Pencil className="size-3.5" />
                          </Button>
                          <Button variant="outline" size="icon" className="size-7 text-red-600 hover:bg-red-50" onClick={() => removeAddress(item._id)}>
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                      <p className={STYLES.addressText}>
                        {item.address}, {item.state}, {item.postalCode}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Form Section (Buy-Box Style Side Panel) */}
            {showForm && (
              <section className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="p-5 rounded-md border border-zinc-300 bg-zinc-50/50 shadow-sm space-y-4 sticky top-0">
                  <h3 className="text-sm font-bold border-b pb-2">
                    {mode === "edit" ? "Edit Address" : "Add Address"}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-[12px] font-bold text-zinc-700">Full Name</Label>
                      <Input
                        className={STYLES.input}
                        value={form.fullName}
                        onChange={(e) => updateForm("fullName", e.target.value)}
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[12px] font-bold text-zinc-700">Street Address</Label>
                      <Input
                        className={STYLES.input}
                        value={form.address}
                        onChange={(e) => updateForm("address", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[12px] font-bold text-zinc-700">State</Label>
                        <Input
                          className={STYLES.input}
                          value={form.state}
                          onChange={(e) => updateForm("state", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[12px] font-bold text-zinc-700">Postal Code</Label>
                        <Input
                          className={STYLES.input}
                          value={form.postalCode}
                          onChange={(e) => updateForm("postalCode", e.target.value)}
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 py-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={form.isDefault}
                        onChange={(e) => updateForm("isDefault", e.target.checked)}
                        className="size-4 rounded-sm border-zinc-300 accent-cyan-700"
                      />
                      <span className="text-[12px] text-zinc-600">Set as default address</span>
                    </label>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <Button className={cn(STYLES.btnPrimary, "h-9 text-sm")} onClick={() => void saveForm()}>
                      {mode === "edit" ? "Update Address" : "Save Address"}
                    </Button>
                    <Button variant="ghost" className="text-xs text-cyan-700 hover:underline" onClick={cancelForm}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomerProfileDialog;