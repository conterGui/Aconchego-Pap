// backend/server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Verifica se as variáveis de ambiente estão definidas
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("⚠️  Defina EMAIL_USER e EMAIL_PASS no arquivo .env");
  process.exit(1);
}

// Tipagem dos itens do pedido
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type SendEmailRequest = {
  nome: string;
  email: string;
  items: CartItem[];
  totalPrice: number;
  shippingInfo: {
    nome: string;
    email?: string;
    morada: string;
    cidade: string;
  };
};

// Configuração do transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint para envio de email
app.post("/send-email", async (req: Request<{}, {}, SendEmailRequest>, res: Response) => {
  const { nome, email, items, totalPrice, shippingInfo } = req.body;

  try {
    console.log("✅ Dados recebidos do frontend:", req.body);

    await transporter.sendMail({
      from: `"Aconchego Café" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmação da sua compra - Aconchego Café",
      html: `
        <h2>Olá, ${nome}!</h2>
        <p>Obrigado pela sua compra no <strong>Aconchego Café</strong> ☕🎷</p>
        
        <h3>📦 Morada de Entrega:</h3>
        <p>${shippingInfo.nome}<br>${shippingInfo.morada}<br>${shippingInfo.cidade}</p>

        <h3>🛒 Itens do Pedido:</h3>
        <ul>
          ${items
            .map(
              (item: CartItem) =>
                `<li>${item.name} x ${item.quantity} - € ${(item.price * item.quantity).toFixed(2)}</li>`
            )
            .join("")}
        </ul>

        <h3>Total: € ${totalPrice.toFixed(2)}</h3>
        <p>Seu pedido está a ser processado. Em breve entraremos em contacto!</p>
      `,
    });

    console.log("✅ Email enviado com sucesso para:", email);
    res.status(200).json({ success: true, message: "Email enviado com sucesso!" });
  } catch (error: any) {
    console.error("❌ Erro ao enviar email:", error.message || error);
    res.status(500).json({
      success: false,
      message: error.message || "Erro ao enviar email.",
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
