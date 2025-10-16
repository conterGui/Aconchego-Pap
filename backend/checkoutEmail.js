export default async function sendEmail({ email, items, totalPrice, shippingInfo }) {
  const { nome, morada, cidade } = shippingInfo;

  const itemsHtml = items
    .map(
      (item) =>
        `<li>${item.name} x ${item.quantity} — € ${(item.price * item.quantity).toFixed(
          2
        )}</li>`
    )
    .join("");

  const html = `
    <h2>Olá ${nome}, obrigado pela sua compra!</h2>
    <p>Aqui estão os detalhes do seu pedido:</p>

    <h3>🛍️ Itens:</h3>
    <ul>${itemsHtml}</ul>

    <h3>Total: € ${totalPrice.toFixed(2)}</h3>

    <h3>📦 Informações de Envio:</h3>
    <p>
      Nome: ${nome}<br/>
      Email: ${email}<br/>
      Morada: ${morada}<br/>
      Cidade: ${cidade}
    </p>

    <p>O seu pedido já está a ser preparado. Obrigado por confiar em nossa loja!</p>
  `;

  await transporter.sendMail({
    from: `"Aconchego" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Confirmação da sua compra 🛒",
    html,
  });
}
