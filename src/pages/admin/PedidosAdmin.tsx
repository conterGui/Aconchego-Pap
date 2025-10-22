import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HeaderAdmin from "@/components/HeaderAdmin";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

const PedidosPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow container mx-auto px-4 py-16 pt-32">
        <HeaderAdmin />
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
          Pedidos Realizados
        </h1>

        {loading ? (
          <p className="text-muted-foreground">Carregando pedidos...</p>
        ) : orders.length === 0 ? (
          <p className="text-muted-foreground">Nenhum pedido encontrado.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <Card key={order._id} className="shadow-md border-border">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Pedido #{order._id.slice(-6).toUpperCase()}</span>
                    <Badge
                      variant={
                        order.status === "pending"
                          ? "outline"
                          : order.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Cliente: <strong>{order.customerName}</strong>
                    <br />
                    Email: {order.customerEmail}
                    {order.customerPhone && (
                      <>
                        <br />
                        📞 {order.customerPhone}
                      </>
                    )}
                  </p>

                  <div className="mt-4">
                    <h3 className="font-semibold text-foreground mb-2">
                      Itens:
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          • {item.productName} x {item.quantity} — €
                          {(item.price * item.quantity).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-between items-center border-t pt-3">
                    <span className="font-semibold text-foreground">
                      Total:
                    </span>
                    <span className="font-bold text-accent">
                      € {order.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    Criado em: {formatDate(order.createdAt)}
                  </p>

                  <Button asChild className="w-full mt-4">
                    <Link to={`/pedidos/${order._id}`}>Ver detalhes</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PedidosPage;
