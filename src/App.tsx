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
import { CartProvider } from "@/context/cartcontext";
import Checkout from "./pages/Checkout";
import EventsPage from "./pages/EventsPage";
import HomeAdmin from "./pages/admin/HomeAdmin";
import EventsAdmin from "./pages/admin/EventsAdmin";
import MenuAdmin from "./pages/admin/AdminMenu";
import StockAdmin from "./pages/admin/StockAdmin";
import ReservasAdmin from "./pages/admin/ReservasAdmin";
import Login from "./pages/Login";
import PedidosPage from "./pages/admin/PedidosAdmin";
import PedidoDetalhePage from "./pages/admin/PedidosPage";

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
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/eventos/:id" element={<EventsPage />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/estoque" element={<StockAdmin />} />
            <Route path="/admin/eventos" element={<EventsAdmin />} />
            <Route path="/admin/reservas" element={<ReservasAdmin />} />
            <Route path="/admin/menu" element={<MenuAdmin />} />
            <Route path="/admin/pedidos" element={<PedidosPage />} />
            <Route path="/pedidos/:id" element={<PedidoDetalhePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
