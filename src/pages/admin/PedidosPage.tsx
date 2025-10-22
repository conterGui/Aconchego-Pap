import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HeaderAdmin from "@/components/HeaderAdmin";
import Footer from "@/components/Footer";
import { Phone } from "lucide-react";

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
  customerAddress?: string;
  customerCity?: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const PedidoDetalhePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/orders/${id}`);
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error("Erro ao buscar pedido:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading)
    return <p className="text-muted-foreground p-8">Carregando pedido...</p>;
  if (!order)
    return <p className="text-muted-foreground p-8">Pedido não encontrado.</p>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow container mx-auto px-4 py-16 pt-32">
        <HeaderAdmin />
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          ← Voltar
        </Button>

        <Card className="shadow-md border-border">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Pedido #{order._id.slice(-6).toUpperCase()}
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
            <h2 className="font-semibold text-lg text-foreground mb-2">
              Cliente
            </h2>
            <p className="text-sm text-muted-foreground">
              Nome: {order.customerName}
              <br />
              Email: {order.customerEmail}
              <br />
              {order.customerPhone && (
                <>
                  <Phone /> {order.customerPhone}
                  <br />
                </>
              )}
              {order.customerAddress && (
                <>
                  Morada: {order.customerAddress}
                  <br />
                </>
              )}
              {order.customerCity && (
                <>
                  Cidade: {order.customerCity}
                  <br />
                </>
              )}
            </p>

            <h2 className="font-semibold text-lg text-foreground mt-4 mb-2">
              Itens do Pedido
            </h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  • {item.productName} x {item.quantity} — €
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-between items-center border-t pt-3">
              <span className="font-semibold text-foreground">Total:</span>
              <span className="font-bold text-accent">
                € {order.totalAmount.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              Criado em: {formatDate(order.createdAt)}
              <br />
              Última atualização: {formatDate(order.updatedAt)}
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default PedidoDetalhePage;
