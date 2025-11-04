import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type CartItem = {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  // Inicializa o estado a partir do localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Erro ao ler o carrinho do localStorage:", error);
      return [];
    }
  });

  // Sempre que items mudar, atualiza o localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Erro ao salvar o carrinho no localStorage:", error);
    }
  }, [items]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((i) => i._id !== id));

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
