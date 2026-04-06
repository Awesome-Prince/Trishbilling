import { CartItem as CartItemType } from "../types";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const totalPrice = item.menuItem.price * item.quantity;

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
      <div className="flex-1">
        <h3 className="font-semibold">{item.menuItem.name}</h3>
        <p className="text-sm text-muted-foreground">₹{item.menuItem.price} each</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={onDecrease}
          variant="outline"
          size="icon"
          className="size-8"
        >
          <Minus className="size-4" />
        </Button>
        <div className="w-12 text-center font-semibold">
          {item.quantity}
        </div>
        <Button
          onClick={onIncrease}
          variant="outline"
          size="icon"
          className="size-8"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="text-right min-w-20">
        <p className="font-bold">₹{totalPrice}</p>
      </div>

      <Button
        onClick={onRemove}
        variant="ghost"
        size="icon"
        className="text-destructive hover:text-destructive"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
