import { useState } from "react";
import { useCart } from "@/context/cartcontext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const FinalizarCompra = () => {
  const { items, totalPrice } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    nome: "",
    morada: "",
    cidade: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cartao" | "multibanco">(
    "cartao"
  );

  const [cardInfo, setCardInfo] = useState({
    numero: "",
    validade: "",
    cvc: "",
  });

  const handleChangeShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleChangeCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = () => {
    // Carrinho vazio
    if (items.length === 0) {
      toast.error("Adicione produtos antes de finalizar a compra.");
      return;
    }

    // Morada incompleta
    if (!shippingInfo.nome || !shippingInfo.morada || !shippingInfo.cidade) {
      toast.error("Preencha todos os campos de morada para continuar.");
      return;
    }

    // Dados do cartão incompletos
    if (paymentMethod === "cartao") {
      if (!cardInfo.numero || !cardInfo.validade || !cardInfo.cvc) {
        toast.error("Preencha todos os campos do cartão.");
        return;
      }
    }

    // Pedido confirmado
    toast.success("Pedido confirmado! Obrigado pela sua compra.");

    <Link to="/home" />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 pt-32">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-8">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulário de envio e pagamento */}
          <div className="space-y-6">
            <section className="bg-card p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold text-xl text-foreground mb-4">
                Morada de Entrega
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome completo"
                  className="w-full p-3 rounded-lg border border-border bg-input text-foreground"
                  value={shippingInfo.nome}
                  onChange={handleChangeShipping}
                />
                <input
                  type="text"
                  name="morada"
                  placeholder="Morada"
                  className="w-full p-3 rounded-lg border border-border bg-input text-foreground"
                  value={shippingInfo.morada}
                  onChange={handleChangeShipping}
                />
                <input
                  type="text"
                  name="cidade"
                  placeholder="Cidade"
                  className="w-full p-3 rounded-lg border border-border bg-input text-foreground"
                  value={shippingInfo.cidade}
                  onChange={handleChangeShipping}
                />
              </div>
            </section>

            <section className="bg-card p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold text-xl text-foreground mb-4">
                Método de Pagamento
              </h2>
              <div className="flex flex-col space-y-3 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cartao"
                    checked={paymentMethod === "cartao"}
                    onChange={() => setPaymentMethod("cartao")}
                  />
                  Cartão de Crédito/Débito
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="multibanco"
                    checked={paymentMethod === "multibanco"}
                    onChange={() => setPaymentMethod("multibanco")}
                  />
                  Multibanco
                </label>
              </div>

              {paymentMethod === "cartao" && (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="numero"
                    placeholder="Número do cartão"
                    className="w-full p-3 rounded-lg border border-border bg-input text-foreground"
                    value={cardInfo.numero}
                    onChange={handleChangeCard}
                  />
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="validade"
                      placeholder="Validade (MM/AA)"
                      className="w-1/2 p-3 rounded-lg border border-border bg-input text-foreground"
                      value={cardInfo.validade}
                      onChange={handleChangeCard}
                    />
                    <input
                      type="text"
                      name="cvc"
                      placeholder="CVC"
                      className="w-1/2 p-3 rounded-lg border border-border bg-input text-foreground"
                      value={cardInfo.cvc}
                      onChange={handleChangeCard}
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "multibanco" && (
                <div className="bg-card rounded-xl shadow-sm p-6 flex flex-col items-center space-y-4">
                  <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center border border-border">
                    <img
                      src="/frame.png"
                      alt="QR Code Multibanco"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Instruções */}
                  <p className="text-center text-muted-foreground text-sm">
                    Utilize o QR code acima no seu homebanking ou app de
                    Multibanco para efetuar o pagamento.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Resumo do pedido */}
          <div className="space-y-6">
            <section className="bg-card p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold text-xl text-foreground mb-4">
                Resumo do Pedido
              </h2>
              {items.length === 0 ? (
                <p className="text-muted-foreground">Carrinho vazio</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-foreground"
                    >
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>€ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-accent border-t border-border pt-4">
                    <span>Total</span>
                    <span>€ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </section>

            <Button
              className="w-full bg-gradient-gold text-primary shadow-gold hover:shadow-elegant"
              onClick={handleConfirmOrder}
              disabled={items.length === 0}
            >
              Confirmar Pedido
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FinalizarCompra;
