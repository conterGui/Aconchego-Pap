import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartcontext";
import { Plus, Minus } from "lucide-react";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <div className="p-4 bg-card text-card-foreground shadow-lg rounded-lg w-80 max-w-full space-y-4">
      <h2 className="text-xl font-bold mb-2 border-b border-border pb-2">
        Seu Carrinho
      </h2>

      {items.length === 0 ? (
        <p className="text-muted-foreground">Carrinho vazio</p>
      ) : (
        <ul className="space-y-4 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-2 border-b border-border pb-2"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-sm text-muted-foreground">
                    € {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeItem(item.id)}
                  className="h-6 w-6 p-0 flex items-center justify-center"
                >
                  ×
                </Button>
              </div>

              {/* Spinner de quantidade */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-6 w-6 p-0 flex items-center justify-center"
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <span className="text-center w-6">{item.quantity}</span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-6 w-6 p-0 flex items-center justify-center"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="pt-2 border-t border-border flex justify-between items-center">
          <span className="font-bold">Total:</span>
          <span className="font-bold text-accent">
            € {totalPrice.toFixed(2)}
          </span>
        </div>
      )}
      <Button>Avanças para o Checkout</Button>
    </div>
  );
};

export default Cart;
