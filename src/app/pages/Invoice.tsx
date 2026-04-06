import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Printer, Share2, CheckCircle } from "lucide-react";
import { Order } from "../types";
import { database } from "../services/database";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";

export default function Invoice() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

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
🧾 INVOICE - ${order.id}
📅 ${order.date} | ⏰ ${order.time}

${order.items.map((item) => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join("\n")}

━━━━━━━━━━━━━━━━━━
💰 TOTAL: ₹${order.total}
━━━━━━━━━━━━━━━━━━

Thank you for your order! ☕
    `;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${order.id}`,
          text: invoiceText,
        });
        toast.success("Invoice shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(invoiceText);
      toast.success("Invoice copied to clipboard");
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The order you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/")}>Back to Menu</Button>
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
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="size-4 mr-2" />
              New Order
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
            </div>
          </div>
        </div>
      </header>

      {/* Success Message - Hidden in print */}
      <div className="bg-green-50 border-b border-green-200 py-4 print:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-green-700">
            <CheckCircle className="size-5" />
            <span className="font-semibold">Order Placed Successfully!</span>
          </div>
        </div>
      </div>

      {/* Invoice */}
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card className="p-8" ref={invoiceRef}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">☕ Café Billing</h1>
            <p className="text-muted-foreground">Tax Invoice</p>
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
            <p className="mt-1">Please visit again ☕</p>
          </div>
        </Card>

        {/* Action Buttons - Hidden in print */}
        <div className="flex gap-3 mt-6 print:hidden">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/sales-history")}
          >
            View All Orders
          </Button>
          <Button className="flex-1" onClick={() => navigate("/")}>
            New Order
          </Button>
        </div>
      </div>
    </div>
  );
}
