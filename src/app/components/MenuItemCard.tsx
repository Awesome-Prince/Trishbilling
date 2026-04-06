import { MenuItem } from "../types";
import { Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function MenuItemCard({ item, quantity, onAdd, onRemove }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">₹{item.price}</p>
          </div>
        </div>

        {quantity === 0 ? (
          <Button onClick={onAdd} className="w-full mt-2" size="sm">
            <Plus className="size-4 mr-1" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between mt-2 gap-2">
            <Button
              onClick={onRemove}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Minus className="size-4" />
            </Button>
            <div className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-md">
              {quantity}
            </div>
            <Button
              onClick={onAdd}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Plus className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
