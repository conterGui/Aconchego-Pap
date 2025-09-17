import { useState } from "react";
import { useCart, CartItem } from "@/context/cartcontext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FinalizarCompra = () => {
  const { items, totalPrice, clearCart } = useCart(); // clearCart para limpar após pedido

  const [customerInfo, setCustomerInfo] = useState({
    nome: "",
    email: "",
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

  const handleChangeCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleChangeCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleConfirmOrder = async () => {
    if (items.length === 0) {
      toast.error("Adicione produtos antes de finalizar a compra.");
      return;
    }

    if (
      !customerInfo.nome ||
      !customerInfo.email ||
      !customerInfo.morada ||
      !customerInfo.cidade
    ) {
      toast.error("Por favor, preencha todos os campos de envio e contato.");
      return;
    }

    if (!validateEmail(customerInfo.email)) {
      toast.error("Insira um email válido.");
      return;
    }

    if (paymentMethod === "cartao") {
      if (!cardInfo.numero || !cardInfo.validade || !cardInfo.cvc) {
        toast.error("Preencha todos os dados do cartão.");
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: customerInfo.nome,
          email: customerInfo.email,
          items,
          totalPrice,
          shippingInfo: customerInfo,
        }),
      });

      if (!response.ok) throw new Error("Erro concluir pedido");

      toast.success("Pedido confirmado! Enviaremos uma confirmação por email");

      // Limpa carrinho e formulário
      clearCart();
      setCustomerInfo({ nome: "", email: "", morada: "", cidade: "" });
      setCardInfo({ numero: "", validade: "", cvc: "" });
    } catch (err) {
      toast.error("Erro ao concluir pedido. Tente novamente.");
    }
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
            <section className="bg-card p-6 rounded-xl shadow-sm space-y-4">
              <h2 className="font-semibold text-xl text-foreground mb-4">
                Informações do Cliente
              </h2>
              <input
                type="text"
                name="nome"
                placeholder="Nome completo"
                className="w-full p-3 rounded-lg border border-border bg-input text-foreground"
                value={customerInfo.nome}
                onChange={handleChangeCustomer}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg border border-border bg-input text-foreground"
                value={customerInfo.email}
                onChange={handleChangeCustomer}
              />
              <input
                type="text"
                name="morada"
                placeholder="Morada"
                className="w-full p-3 rounded-lg border border-border bg-input text-foreground"
                value={customerInfo.morada}
                onChange={handleChangeCustomer}
              />
              <input
                type="text"
                name="cidade"
                placeholder="Cidade"
                className="w-full p-3 rounded-lg border border-border bg-input text-foreground"
                value={customerInfo.cidade}
                onChange={handleChangeCustomer}
              />
            </section>

            {/* Método de pagamento */}
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
                  {items.map((item: CartItem) => (
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
