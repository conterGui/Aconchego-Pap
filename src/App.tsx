import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./context/ScrollToTop";

import Index from "./Index";
import Menu from "./pages/Menu";
import Loja from "./pages/Loja";
import Eventos from "./pages/Eventos";
import Reservas from "./pages/Reservas";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import EventsPage from "./pages/EventsPage";
import PedidoDetalhePage from "./pages/admin/PedidosPage";

import HomeAdmin from "./pages/admin/HomeAdmin";
import EventsAdmin from "./pages/admin/EventsAdmin";
import MenuAdmin from "./pages/admin/AdminMenu";
import StockAdmin from "./pages/admin/StockAdmin";
import ReservasAdmin from "./pages/admin/ReservasAdmin";
import PedidosPage from "./pages/admin/PedidosAdmin";

import Login from "./pages/Login";
import { CartProvider } from "@/context/cartcontext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/eventos/:id" element={<EventsPage />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pedidos/:id" element={<PedidoDetalhePage />} />

            {/* Rotas protegidas do admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <HomeAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/estoque"
              element={
                <ProtectedRoute>
                  <StockAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/eventos"
              element={
                <ProtectedRoute>
                  <EventsAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reservas"
              element={
                <ProtectedRoute>
                  <ReservasAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/menu"
              element={
                <ProtectedRoute>
                  <MenuAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pedidos"
              element={
                <ProtectedRoute>
                  <PedidosPage />
                </ProtectedRoute>
              }
            />

            {/* Página não encontrada */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
