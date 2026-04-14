import { Commonloader } from "@/components/common/Loader";
import { Badge } from "@/components/ui/badge";
import {
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminOrdersStore } from "@/features/admin/orders/store";
import type {
  AdminOrderStatus,
  AdminPaymentStatus,
} from "@/features/admin/orders/types";
import { formatPrice, cn } from "@/lib/utils";
import { useEffect } from "react";
import { Package, Calendar, ArrowRightCircle } from "lucide-react";

/**
 * ADMIN DENSITY STYLES:
 * - text-[12px] base for table data
 * - h-8 for buttons and selects
 * - Minimal padding (py-2) for rows
 */
const STYLES = {
  header: "flex items-center justify-between mb-4 border-b border-zinc-300 pb-4",
  tableCard: "border border-zinc-200 bg-white rounded-sm shadow-sm overflow-hidden",
  thead: "bg-zinc-50 border-b border-zinc-200",
  th: "h-10 text-[11px] font-bold uppercase tracking-wider text-zinc-500",
  tr: "hover:bg-zinc-50/50 transition-colors border-b last:border-0",
  td: "py-2.5 text-[13px] text-zinc-700",
  orderId: "font-mono text-[11px] text-zinc-400 font-medium",
  selectTrigger: "h-8 w-[140px] text-[12px] rounded-sm border-zinc-300 bg-white",
  badgeBase: "rounded-full px-2 py-0 border-transparent text-[10px] font-bold uppercase tracking-tight",
};

const orderStatusOptions: AdminOrderStatus[] = ["placed", "shipped", "delivered"];

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }) : "-";
}

function AdminPaymentStatusBadge({ status }: { status: AdminPaymentStatus }) {
  const variants = {
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    pending: "bg-amber-100 text-amber-700"
  };
  return (
    <Badge className={cn(STYLES.badgeBase, variants[status] || "bg-zinc-100 text-zinc-600")}>
      {status}
    </Badge>
  );
}

function AdminOrderStatusBadge({ status }: { status: AdminOrderStatus | "returned" }) {
  const variants = {
    placed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    returned: "bg-zinc-100 text-zinc-800",
  };
  return (
    <Badge className={cn(STYLES.badgeBase, variants[status as keyof typeof variants])}>
      {status}
    </Badge>
  );
}

function AdminOrders() {
  const { loading, orders, updatingOrderId, fetchOrders, changeStatus } =
    useAdminOrdersStore((state) => state);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  if (loading) return <Commonloader />;

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* 1. COMPACT HEADER */}
      <div className={STYLES.header}>
        <div className="flex items-center gap-2">
          <Package className="size-5 text-zinc-400" />
          <h1 className="text-xl font-bold tracking-tight">Order Management</h1>
        </div>
        <Badge variant="outline" className="rounded-sm border-zinc-300 font-medium">
          Total: {orders.length}
        </Badge>
      </div>

      {/* 2. DENSE TABLE */}
      {!orders.length ? (
        <div className="p-12 text-center border-2 border-dashed rounded-sm bg-zinc-50 text-zinc-400 text-sm">
          No active orders found in the database.
        </div>
      ) : (
        <div className={STYLES.tableCard}>
          <Table>
            <TableHeader className={STYLES.thead}>
              <TableRow className="border-none">
                <TableHead className={cn(STYLES.th, "pl-4")}>ID & Date</TableHead>
                <TableHead className={STYLES.th}>Customer</TableHead>
                <TableHead className={STYLES.th}>Details</TableHead>
                <TableHead className={STYLES.th}>Payment</TableHead>
                <TableHead className={STYLES.th}>Status</TableHead>
                <TableHead className={cn(STYLES.th, "text-right pr-4")}>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => {
                const canUpdate = order.paymentStatus === "paid" && 
                                order.orderStatus !== "delivered" && 
                                order.orderStatus !== "returned";

                return (
                  <TableRow key={order._id} className={STYLES.tr}>
                    <TableCell className={cn(STYLES.td, "pl-4")}>
                      <div className={STYLES.orderId}>#{order._id.slice(-6).toUpperCase()}</div>
                      <div className="text-[11px] text-zinc-500 flex items-center gap-1">
                        <Calendar className="size-3" /> {formatDate(order.createdAt)}
                      </div>
                    </TableCell>

                    <TableCell className={STYLES.td}>
                      <div className="font-bold text-zinc-900">{order.customerName}</div>
                      <div className="text-[11px] text-zinc-500 uppercase">Customer</div>
                    </TableCell>

                    <TableCell className={STYLES.td}>
                      <div className="font-medium">{formatPrice(order.totalAmount)}</div>
                      <div className="text-[11px] text-zinc-500">{order.totalItems} Items</div>
                    </TableCell>

                    <TableCell className={STYLES.td}>
                      <AdminPaymentStatusBadge status={order.paymentStatus} />
                      <div className="text-[10px] text-zinc-400 mt-1">
                        {order.paidAt ? formatDate(order.paidAt) : "Unpaid"}
                      </div>
                    </TableCell>

                    <TableCell className={STYLES.td}>
                      <AdminOrderStatusBadge status={order.orderStatus} />
                    </TableCell>

                    <TableCell className={cn(STYLES.td, "text-right pr-4")}>
                      {canUpdate ? (
                        <div className="flex justify-end">
                          <Select
                            value={order.orderStatus}
                            onValueChange={(val) => void changeStatus(order._id, val as AdminOrderStatus)}
                            disabled={updatingOrderId === order._id}
                          >
                            <SelectTrigger className={STYLES.selectTrigger}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {orderStatusOptions.map((opt) => (
                                <SelectItem key={opt} value={opt} disabled={opt === "placed"}>
                                  <span className="capitalize">{opt}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5 text-zinc-400 text-[11px] font-bold uppercase">
                          Locked <ArrowRightCircle className="size-3" />
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;