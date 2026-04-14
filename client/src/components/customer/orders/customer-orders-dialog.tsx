import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCustomerOrdersStore } from "@/features/customer/orders/store";
import type {
  CustomerOrder,
} from "@/features/customer/orders/types";
import { formatPrice, cn } from "@/lib/utils";
import { ShoppingBasket, RefreshCw, Clock } from "lucide-react";

// AMAZON UTILITY STYLES
const STYLES = {
  content: "max-h-[95vh] overflow-y-auto sm:max-w-4xl p-0 border-none rounded-sm shadow-2xl",
  header: "px-6 py-4 border-b bg-zinc-50/50",
  body: "p-6 space-y-4",
  tableWrap: "rounded-md border border-zinc-200 overflow-hidden",
  th: "h-10 bg-zinc-50 text-[11px] font-bold uppercase tracking-wider text-zinc-500",
  td: "py-3 text-[13px] text-zinc-700 border-b last:border-0",
  orderId: "font-mono text-[11px] text-cyan-700 font-bold hover:underline cursor-pointer",
  badgeBase: "rounded-full px-2 py-0 border-transparent text-[10px] font-bold uppercase",
  btnRefresh: "h-8 px-3 text-[11px] font-bold border-zinc-300 bg-white hover:bg-zinc-50 rounded-sm shadow-sm",
  btnReturn: "h-7 px-3 text-[10px] font-bold bg-white border border-zinc-300 rounded-sm hover:bg-red-50 hover:text-red-700 transition-colors",
};

function StatusBadge({ status }: { status: string; type: 'payment' | 'order' }) {
  const variants: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    delivered: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    placed: "bg-amber-100 text-amber-700",
    returned: "bg-zinc-100 text-zinc-600",
  };
  return (
    <Badge className={cn(STYLES.badgeBase, variants[status] || "bg-zinc-100 text-zinc-600")}>
      {status}
    </Badge>
  );
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }) : "-";
}

function canReturnOrder(order: CustomerOrder) {
  if (order.orderStatus !== "delivered" || !order.deliveredAt) return false;
  const diff = Date.now() - new Date(order.deliveredAt).getTime();
  return diff <= 7 * 24 * 60 * 60 * 1000;
}

function CustomerOrdersDialog() {
  const { isOpen, closeOrders, loading, items, returnOrder, loadOrders } =
    useCustomerOrdersStore((state) => state);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeOrders()}>
      <DialogContent className={STYLES.content}>
        <DialogHeader className={STYLES.header}>
          <DialogTitle className="text-base font-bold flex items-center gap-2">
            <ShoppingBasket className="size-4 text-primary" />
            Your Orders
          </DialogTitle>
        </DialogHeader>

        <div className={STYLES.body}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12px] text-zinc-500">
              <Clock className="size-3.5" />
              Showing your last {items.length} orders
            </div>
            <Button
              variant="outline"
              className={STYLES.btnRefresh}
              onClick={() => void loadOrders()}
              disabled={loading}
            >
              <RefreshCw className={cn("mr-1.5 size-3", loading && "animate-spin")} />
              Refresh
            </Button>
          </div>

          {!items.length && !loading ? (
            <div className="py-12 text-center border-2 border-dashed rounded-md bg-zinc-50">
              <p className="text-sm text-zinc-500 italic">No orders found in your account.</p>
            </div>
          ) : (
            <div className={STYLES.tableWrap}>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className={STYLES.th}>Order ID</TableHead>
                    <TableHead className={STYLES.th}>Date</TableHead>
                    <TableHead className={STYLES.th}>Total</TableHead>
                    <TableHead className={STYLES.th}>Payment</TableHead>
                    <TableHead className={STYLES.th}>Status</TableHead>
                    <TableHead className={cn(STYLES.th, "text-right")}>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {items.map((order) => (
                    <TableRow key={order._id} className="hover:bg-zinc-50/50">
                      <TableCell className={STYLES.td}>
                        <span className={STYLES.orderId}>
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                      </TableCell>
                      
                      <TableCell className={STYLES.td}>
                        {formatDate(order.createdAt)}
                      </TableCell>

                      <TableCell className={STYLES.td}>
                        <div className="font-bold">{formatPrice(order.totalAmount)}</div>
                        <div className="text-[10px] text-zinc-400">{order.totalItems} Items</div>
                      </TableCell>

                      <TableCell className={STYLES.td}>
                        <StatusBadge status={order.paymentStatus} type="payment" />
                      </TableCell>

                      <TableCell className={STYLES.td}>
                        <StatusBadge status={order.orderStatus} type="order" />
                      </TableCell>

                      <TableCell className={cn(STYLES.td, "text-right")}>
                        {canReturnOrder(order) ? (
                          <button
                            className={STYLES.btnReturn}
                            onClick={() => returnOrder(order._id)}
                          >
                            Return Order
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-tight">
                            {order.orderStatus === "returned" ? "Returned" : "Closed"}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomerOrdersDialog;