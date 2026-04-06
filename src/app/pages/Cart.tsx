import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { CartItem as CartItemType } from "../types";
import { database } from "../services/database";
import { CartItem } from "../components/CartItem";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItemType[]>([]);

  useEffect(() => {
    const savedCart = database.getCart();
    setCart(savedCart);
  }, []);

  useEffect(() => {
    database.saveCart(cart);
  }, [cart]);

  const increaseQuantity = (itemId: string) => {
    setCart(
      cart.map((item) =>
        item.menuItem.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemId: string) => {
    const item = cart.find((item) => item.menuItem.id === itemId);
    if (!item) return;

    if (item.quantity === 1) {
      removeItem(itemId);
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

  const removeItem = (itemId: string) => {
    setCart(cart.filter((item) => item.menuItem.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cart.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const total = calculateSubtotal();
    const order = database.saveOrder(cart, total);
    database.clearCart();
    toast.success("Order placed successfully!");
    navigate(`/invoice/${order.id}`);
  };

  const subtotal = calculateSubtotal();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-card border-b">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="size-4 mr-2" />
              Back to Menu
            </Button>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="size-20 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Cart is Empty</h2>
            <p className="text-muted-foreground mb-6">
              Add items from the menu to get started
            </p>
            <Button onClick={() => navigate("/")}>Browse Menu</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 lg:pb-6">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="size-4 mr-2" />
              Back to Menu
            </Button>
            <div>
              <h1 className="text-xl font-bold">Your Cart</h1>
              <p className="text-sm text-muted-foreground">{totalItems} items</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Cart Items */}
        <div className="space-y-3 mb-6">
          {cart.map((item) => (
            <CartItem
              key={item.menuItem.id}
              item={item}
              onIncrease={() => increaseQuantity(item.menuItem.id)}
              onDecrease={() => decreaseQuantity(item.menuItem.id)}
              onRemove={() => removeItem(item.menuItem.id)}
            />
          ))}
        </div>

        {/* Bill Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Bill Summary</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({totalItems} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full mt-6"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </Card>
      </div>
    </div>
  );
}
