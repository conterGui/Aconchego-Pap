import nodemailer from "nodemailer";
import { IOrder } from "../models/Order";

export const sendOrderConfirmationEmail = async (order: IOrder) => {
  // ← Transporter criado aqui dentro, não fora
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // ← EMAIL_PASS, não EMAIL_PASSWORD
    },
  });

  try {
    console.log("📧 Tentando enviar e-mail para:", order.customerEmail);
    console.log("🔧 Configuração SMTP:", {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? "✅ carregada" : "❌ undefined",
    });

    const itemsHtml = order.items
      .map(
        (item) =>
          `<li>${item.productName} x ${item.quantity} — € ${(item.price * item.quantity).toFixed(2)}</li>`
      )
      .join("");

    const html = `
      <h2>Olá ${order.customerName}, obrigado pela sua compra!</h2>
      <p>Aqui estão os detalhes do seu pedido:</p>
      <h3>🛍️ Itens:</h3>
      <ul>${itemsHtml}</ul>
      <h3>Total: € ${order.totalAmount.toFixed(2)}</h3>
      <h3>📦 Informações de envio:</h3>
      <p>
        Nome: ${order.customerName}<br/>
        Email: ${order.customerEmail}<br/>
        ${order.customerAddress ? `Morada: ${order.customerAddress}<br/>` : ""}
        ${order.customerCity ? `Cidade: ${order.customerCity}<br/>` : ""}
      </p>
      <p>O seu pedido já está a ser preparado. ☕<br/>
      Obrigado por confiar na <strong>Aconchego Coffee Shop</strong>!</p>
    `;

    await transporter.sendMail({
      from: `"Aconchego Coffee Shop" <${process.env.EMAIL_USER}>`,
      to: order.customerEmail,
      subject: "Confirmação da sua compra 🛒",
      html,
    });

    console.log("✅ E-mail enviado com sucesso para:", order.customerEmail);
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    throw error;
  }
};