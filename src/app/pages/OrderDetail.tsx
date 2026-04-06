import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Printer, Share2, Trash2 } from "lucide-react";
import { Order } from "../types";
import { database } from "../services/database";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { toast } from "sonner";

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const fetchedOrder = database.getOrderById(orderId);
      setOrder(fetchedOrder);
    }
  }, [orderId]);

  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened");
  };

  const handleShare = async () => {
    if (!order) return;

    const invoiceText = `
🧾 ORDER DETAILS - ${order.id}
📅 ${order.date} | ⏰ ${order.time}

${order.items.map((item) => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join("\n")}

━━━━━━━━━━━━━━━━━━
💰 TOTAL: ₹${order.total}
━━━━━━━━━━━━━━━━━━
    `;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Order ${order.id}`,
          text: invoiceText,
        });
        toast.success("Order shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(invoiceText);
      toast.success("Order details copied to clipboard");
    }
  };

  const handleDelete = () => {
    if (!orderId) return;
    database.deleteOrder(orderId);
    toast.success("Order deleted successfully");
    navigate("/sales-history");
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The order you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/sales-history")}>
            Back to History
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hidden in print */}
      <header className="bg-card border-b print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/sales-history")}>
              <ArrowLeft className="size-4 mr-2" />
              Back to History
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="size-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="size-4 mr-2" />
                Share
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="size-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Order?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the order from your sales history.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </header>

      {/* Order Details */}
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2"> Trish Billing</h1>
            <p className="text-muted-foreground">Order Details</p>
          </div>

          <Separator className="mb-6" />

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-semibold">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-semibold">{order.date}</p>
              <p className="text-sm">{order.time}</p>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Items Table */}
          <div className="mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-semibold">Item</th>
                  <th className="text-center py-2 font-semibold w-20">Qty</th>
                  <th className="text-right py-2 font-semibold w-24">Price</th>
                  <th className="text-right py-2 font-semibold w-28">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{item.name}</td>
                    <td className="text-center py-3">{item.quantity}</td>
                    <td className="text-right py-3">₹{item.price}</td>
                    <td className="text-right py-3 font-semibold">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Separator className="mb-6" />

          {/* Total */}
          <div className="space-y-2">
            <div className="flex justify-between text-2xl font-bold">
              <span>Grand Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Thank you for your order!</p>
            <p className="mt-1">Please visit again </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
