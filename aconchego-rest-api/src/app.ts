import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";

import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import menuRoutes from "./routes/menuRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import contactRoutes from "./routes/contactRoutes";
import eventRoutes from "./routes/eventRoutes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/events", eventRoutes);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Aconchego API is running" });
});

/* =========================
   SERVIR O FRONTEND (VITE)
   ========================= */

const distPath = path.join(process.cwd(), "dist");

app.use(express.static(distPath));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(distPath, "index.html"));
});

/* =========================
   404 API
   ========================= */

app.use("/api", (req: Request, res: Response) => {
  res.status(404).json({ message: "API route not found" });
});

export default app;