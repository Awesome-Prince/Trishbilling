import { createBrowserRouter } from "react-router";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Invoice from "./pages/Invoice";
import SalesHistory from "./pages/SalesHistory";
import OrderDetail from "./pages/OrderDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Menu,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/invoice/:orderId",
    Component: Invoice,
  },
  {
    path: "/sales-history",
    Component: SalesHistory,
  },
  {
    path: "/order/:orderId",
    Component: OrderDetail,
  },
  {
    path: "*",
    Component: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <p className="text-muted-foreground">Page not found</p>
        </div>
      </div>
    ),
  },
]);
