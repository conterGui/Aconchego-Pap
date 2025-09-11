import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartcontext";

const Cart = () => {
  const { items, removeItem } = useCart();

  return (
    <div className="p-4 bg-white shadow rounded-lg max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Seu Carrinho</h2>
      {items.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
              <div>
                {item.name} x {item.quantity}
              </div>
              <div className="flex items-center gap-2">
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeItem(item.id)}
                >
                  Remover
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
