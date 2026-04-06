import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Receipt, TrendingUp, Calendar, IndianRupee } from "lucide-react";
import { Order } from "../types";
import { database } from "../services/database";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export default function SalesHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
  });

  useEffect(() => {
    const allOrders = database.getAllOrders();
    setOrders(allOrders);
    setStats(database.getSalesStats());
  }, []);

  const handleOrderClick = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="size-4 mr-2" />
              Back to Menu
            </Button>
            <div>
              <h1 className="text-xl font-bold">Sales History</h1>
              <p className="text-sm text-muted-foreground">All completed orders</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <IndianRupee className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">₹{stats.totalSales}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Receipt className="size-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <TrendingUp className="size-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Order</p>
                <p className="text-2xl font-bold">₹{stats.averageOrderValue.toFixed(0)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <Receipt className="size-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">No Orders Yet</h2>
              <p className="text-muted-foreground mb-6">
                Start taking orders to see sales history
              </p>
              <Button onClick={() => navigate("/")}>Take First Order</Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleOrderClick(order.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Receipt className="size-6 text-primary" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{order.id}</h3>
                      <Badge variant="secondary">
                        {order.items.length} items
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {order.date}
                      </span>
                      <span>{order.time}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      ₹{order.total}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
