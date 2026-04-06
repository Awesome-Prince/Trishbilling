import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ShoppingCart, History } from "lucide-react";
import { MENU_ITEMS, CATEGORIES } from "../data/menu";
import { CartItem } from "../types";
import { database } from "../services/database";
import { MenuItemCard } from "../components/MenuItemCard";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

export default function Menu() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    // Load cart from database
    const savedCart = database.getCart();
    setCart(savedCart);
  }, []);

  useEffect(() => {
    // Save cart whenever it changes
    database.saveCart(cart);
  }, [cart]);

  const getItemQuantity = (itemId: string): number => {
    const cartItem = cart.find((item) => item.menuItem.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const addToCart = (itemId: string) => {
    const menuItem = MENU_ITEMS.find((item) => item.id === itemId);
    if (!menuItem) return;

    const existingItem = cart.find((item) => item.menuItem.id === itemId);
    
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.menuItem.id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { menuItem, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find((item) => item.menuItem.id === itemId);
    if (!existingItem) return;

    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.menuItem.id !== itemId));
    } else {
      setCart(
        cart.map((item) =>
          item.menuItem.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredItems =
    selectedCategory === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">☕ Trish Billing</h1>
              <p className="text-sm text-muted-foreground">Take orders quickly</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/sales-history")}
              >
                <History className="size-4 mr-2" />
                History
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/cart")}
                disabled={cart.length === 0}
                className="relative"
              >
                <ShoppingCart className="size-4 mr-2" />
                Cart
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 size-6 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
            <TabsTrigger value="all">All Items</TabsTrigger>
            {CATEGORIES.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Menu Items Grid */}
      <div className="container mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              quantity={getItemQuantity(item.id)}
              onAdd={() => addToCart(item.id)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Floating Cart Button for Mobile */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 lg:hidden">
          <Button
            size="lg"
            className="w-full shadow-lg"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="size-5 mr-2" />
            View Cart ({totalItems} items)
          </Button>
        </div>
      )}
    </div>
  );
}
