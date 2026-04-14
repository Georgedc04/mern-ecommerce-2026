import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Promo, PromoFormValues } from "@/features/admin/promo/types";
import { useState } from "react";

/** * AMAZON ADMIN STYLES */
const STYLES = {
  content: "max-h-[95vh] overflow-y-auto sm:max-w-xl p-0 border-none rounded-sm shadow-2xl",
  header: "px-6 py-4 border-b bg-zinc-50/50",
  body: "p-6 space-y-5",
  gridRow: "grid gap-4 md:grid-cols-2",
  field: "space-y-1.5",
  label: "text-[12px] font-bold text-zinc-700 uppercase tracking-tight",
  input: "h-9 rounded-sm border-zinc-300 text-sm focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600",
  footer: "flex justify-end gap-2 pt-4 border-t",
  btnPrimary: "h-9 rounded-sm bg-zinc-900 px-6 text-xs font-bold text-white hover:bg-zinc-800 shadow-sm transition-all",
  btnCancel: "h-9 rounded-sm px-4 text-xs font-medium text-zinc-600 hover:bg-zinc-100",
};

type PromoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promo: Promo | null;
  saving: boolean;
  onSaved: (values: PromoFormValues) => Promise<void>;
};

/**
 * HELPER: Formats date to datetime-local string
 */
function toDateTimeLocal(value?: string | Date) {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * HELPER: Dynamic date picker logic
 */
function getDynamicDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setMinutes(0, 0, 0); // Normalize to top of the hour
  return toDateTimeLocal(date);
}

function PromoForm({ 
  promo, 
  saving, 
  onSaved, 
  onCancel 
}: { 
  promo: Promo | null; 
  saving: boolean; 
  onSaved: (values: PromoFormValues) => Promise<void>;
  onCancel: () => void;
}) {
  // DYNAMIC INITIALIZATION: Pre-fills dates for new promos
  const [form, setForm] = useState<PromoFormValues>({
    code: promo?.code ?? "",
    percentage: promo ? String(promo.percentage) : "",
    count: promo ? String(promo.count) : "",
    minimumOrderValue: promo ? String(promo.minimumOrderValue) : "",
    startsAt: promo ? toDateTimeLocal(promo.startsAt) : getDynamicDate(0),
    endsAt: promo ? toDateTimeLocal(promo.endsAt) : getDynamicDate(30),
  });

  const updateField = <K extends keyof PromoFormValues>(key: K, value: PromoFormValues[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async () => {
    if (Object.values(form).some(v => !v.trim())) return;

    await onSaved({
      ...form,
      code: form.code.trim().toUpperCase(),
      startsAt: new Date(form.startsAt).toISOString(),
      endsAt: new Date(form.endsAt).toISOString(),
    });
  };

  return (
    <div className={STYLES.body}>
      <div className={STYLES.gridRow}>
        <div className={STYLES.field}>
          <Label className={STYLES.label}>Promo Code</Label>
          <Input 
            className={STYLES.input} 
            value={form.code} 
            placeholder="E.g. FLASH50"
            onChange={(e) => updateField("code", e.target.value)} 
          />
        </div>
        <div className={STYLES.field}>
          <Label className={STYLES.label}>Discount %</Label>
          <Input 
            className={STYLES.input} 
            type="number" 
            value={form.percentage} 
            placeholder="10"
            onChange={(e) => updateField("percentage", e.target.value)} 
          />
        </div>
      </div>

      <div className={STYLES.gridRow}>
        <div className={STYLES.field}>
          <Label className={STYLES.label}>Promo Count</Label>
          <Input 
            className={STYLES.input} 
            type="number" 
            value={form.count} 
            placeholder="100"
            onChange={(e) => updateField("count", e.target.value)} 
          />
        </div>
        <div className={STYLES.field}>
          <Label className={STYLES.label}>Min. Order Value</Label>
          <Input 
            className={STYLES.input} 
            type="number" 
            value={form.minimumOrderValue} 
            placeholder="500"
            onChange={(e) => updateField("minimumOrderValue", e.target.value)} 
          />
        </div>
      </div>

      <div className={STYLES.gridRow}>
        <div className={STYLES.field}>
          <Label className={STYLES.label}>Valid From</Label>
          <Input 
            className={STYLES.input} 
            type="datetime-local" 
            value={form.startsAt} 
            onChange={(e) => updateField("startsAt", e.target.value)} 
          />
        </div>
        <div className={STYLES.field}>
          <div className="flex justify-between items-center">
            <Label className={STYLES.label}>Valid Till</Label>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => updateField("endsAt", getDynamicDate(7))}
                className="text-[10px] text-cyan-700 hover:underline font-bold"
              >
                +7d
              </button>
              <button 
                type="button"
                onClick={() => updateField("endsAt", getDynamicDate(30))}
                className="text-[10px] text-cyan-700 hover:underline font-bold"
              >
                +30d
              </button>
            </div>
          </div>
          <Input 
            className={STYLES.input} 
            type="datetime-local" 
            value={form.endsAt} 
            onChange={(e) => updateField("endsAt", e.target.value)} 
          />
        </div>
      </div>

      <div className={STYLES.footer}>
        <Button variant="ghost" className={STYLES.btnCancel} onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={saving} className={STYLES.btnPrimary} onClick={handleSubmit}>
          {saving ? "Saving..." : promo ? "Update Promo" : "Create Promo"}
        </Button>
      </div>
    </div>
  );
}

function PromoDialog({ open, onOpenChange, promo, saving, onSaved }: PromoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={STYLES.content}>
        <DialogHeader className={STYLES.header}>
          <DialogTitle className="text-sm font-bold">
            {promo ? "Edit Promotion" : "Add New Promotion"}
          </DialogTitle>
        </DialogHeader>

        {open && (
          <PromoForm
            key={promo?._id ?? "new-promo"}
            promo={promo}
            saving={saving}
            onSaved={onSaved}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PromoDialog;