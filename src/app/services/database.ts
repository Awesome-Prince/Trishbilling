import { Order, CartItem, OrderItem } from "../types";
import { format } from "date-fns";

const ORDERS_KEY = "cafe_orders";
const CART_KEY = "cafe_cart";

// 💾 Local Storage Database Service
// All orders are stored in browser's localStorage

export const database = {
  // Save order to database
  saveOrder: (items: CartItem[], total: number): Order => {
    const orders = database.getAllOrders();
    const timestamp = Date.now();
    const date = format(timestamp, "dd/MM/yyyy");
    const time = format(timestamp, "hh:mm a");

    const orderItems: OrderItem[] = items.map((item) => ({
      id: item.menuItem.id,
      name: item.menuItem.name,
      price: item.menuItem.price,
      quantity: item.quantity,
    }));

    const newOrder: Order = {
      id: `ORD-${timestamp}`,
      items: orderItems,
      total,
      timestamp,
      date,
      time,
    };

    orders.unshift(newOrder); // Add to beginning of array
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return newOrder;
  },

  // Get all orders
  getAllOrders: (): Order[] => {
    const ordersJson = localStorage.getItem(ORDERS_KEY);
    return ordersJson ? JSON.parse(ordersJson) : [];
  },

  // Get single order by ID
  getOrderById: (id: string): Order | null => {
    const orders = database.getAllOrders();
    return orders.find((order) => order.id === id) || null;
  },

  // Delete order
  deleteOrder: (id: string): void => {
    const orders = database.getAllOrders();
    const filteredOrders = orders.filter((order) => order.id !== id);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(filteredOrders));
  },

  // Cart management
  saveCart: (cart: CartItem[]): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  getCart: (): CartItem[] => {
    const cartJson = localStorage.getItem(CART_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
  },

  clearCart: (): void => {
    localStorage.removeItem(CART_KEY);
  },

  // Get sales statistics
  getSalesStats: () => {
    const orders = database.getAllOrders();
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    return {
      totalSales,
      totalOrders,
      averageOrderValue,
    };
  },
};
