import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Calendar,
  Coffee,
  DollarSign,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Euro,
} from "lucide-react";
import HeaderAdmin from "@/components/HeaderAdmin";

const revenueData = [
  { month: "Jan", revenue: 4200, orders: 145 },
  { month: "Fev", revenue: 3800, orders: 132 },
  { month: "Mar", revenue: 5100, orders: 178 },
  { month: "Abr", revenue: 4600, orders: 156 },
  { month: "Mai", revenue: 5800, orders: 198 },
  { month: "Jun", revenue: 6200, orders: 215 },
];

const productPerformance = [
  { name: "Cafés", sales: 3400 },
  { name: "Doces", sales: 2100 },
  { name: "Bebidas", sales: 1800 },
  { name: "Especiais", sales: 2800 },
];

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-background mt-16">
      <HeaderAdmin />
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Painel de Controle
              </h1>
              <p className="text-muted-foreground text-lg">
                Visão geral do desempenho do café
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-card rounded-lg shadow-sm border border-border">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Últimos 30 dias
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics - 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-gold overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -mr-16 -mt-16" />
            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-primary-foreground/80">
                  Receita Total
                </CardTitle>
                <div className="p-2 bg-primary-foreground/20 rounded-lg">
                  <Euro className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-3xl font-bold mb-1 text-primary-foreground">
                € 24.500
              </p>
              <div className="flex items-center gap-1 text-primary-foreground/80 text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>+12% vs mês anterior</span>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Card */}
          <Card className="border border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Reservas
                </CardTitle>
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground mb-1">142</p>
              <div className="flex items-center gap-1 text-accent text-sm font-medium">
                <ArrowUpRight className="w-4 h-4" />
                <span>+8% esta semana</span>
              </div>
            </CardContent>
          </Card>

          {/* Events Card */}
          <Card className="border border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Eventos Ativos
                </CardTitle>
                <div className="p-2 bg-secondary/30 rounded-lg">
                  <Users className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground mb-1">12</p>
              <div className="flex items-center gap-1 text-muted-foreground text-sm font-medium">
                <span>3 eventos esta semana</span>
              </div>
            </CardContent>
          </Card>

          {/* Products Card */}
          <Card className="border border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Produtos
                </CardTitle>
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Coffee className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground mb-1">87</p>
              <div className="flex items-center gap-1 text-destructive text-sm font-medium">
                <Package className="w-4 h-4" />
                <span>5 com estoque baixo</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart - Takes 2 columns */}
          <Card className="lg:col-span-2 border border-border shadow-lg bg-card">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    Receita Mensal
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tendência dos últimos 6 meses
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/20 rounded-full">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">
                    +18%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(45, 65%, 75%)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(45, 65%, 75%)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(45, 65%, 75%)"
                    strokeWidth={3}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Product Performance - Takes 1 column */}
          <Card className="border border-border shadow-lg bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl font-bold text-foreground">
                Mais Vendidos
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Por categoria
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productPerformance} layout="vertical">
                  <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar
                    dataKey="sales"
                    fill="hsl(45, 65%, 75%)"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions / Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="border border-border shadow-lg bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl font-bold text-foreground">
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <ActivityItem
                  icon={<Calendar className="w-5 h-5 text-accent" />}
                  title="Nova reserva confirmada"
                  subtitle="Mesa para 4 pessoas - 20:00h"
                  time="5 min atrás"
                  bgColor="bg-accent/20"
                />
                <ActivityItem
                  icon={<Coffee className="w-5 h-5 text-accent" />}
                  title="Produto adicionado"
                  subtitle="Cappuccino Especial - €3.50"
                  time="1 hora atrás"
                  bgColor="bg-accent/20"
                />
                <ActivityItem
                  icon={<Users className="w-5 h-5 text-accent" />}
                  title="Novo evento publicado"
                  subtitle="Jazz Night - Sexta-feira"
                  time="2 horas atrás"
                  bgColor="bg-secondary/30"
                />
                <ActivityItem
                  icon={<Package className="w-5 h-5 text-destructive" />}
                  title="Alerta de estoque baixo"
                  subtitle="5 produtos precisam reposição"
                  time="3 horas atrás"
                  bgColor="bg-destructive/20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="border border-border shadow-lg bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl font-bold text-foreground">
                Produtos em Destaque
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <ProductItem
                  name="Café Filtrado V60"
                  sales={245}
                  revenue="€686"
                  trend="+15%"
                  trendUp={true}
                />
                <ProductItem
                  name="Cappuccino Blue Note"
                  sales={198}
                  revenue="€495"
                  trend="+8%"
                  trendUp={true}
                />
                <ProductItem
                  name="Cheesecake New York"
                  sales={156}
                  revenue="€499"
                  trend="-3%"
                  trendUp={false}
                />
                <ProductItem
                  name="Espresso Doppio"
                  sales={312}
                  revenue="€624"
                  trend="+22%"
                  trendUp={true}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ icon, title, subtitle, time, bgColor }: any) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/10 transition-colors">
    <div className={`p-2 rounded-lg ${bgColor} flex-shrink-0`}>{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
    </div>
    <span className="text-xs text-muted-foreground flex-shrink-0">{time}</span>
  </div>
);

const ProductItem = ({ name, sales, revenue, trend, trendUp }: any) => (
  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/10 transition-colors">
    <div className="flex-1">
      <p className="text-sm font-semibold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sales} vendas</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-foreground">{revenue}</p>
      <div
        className={`flex items-center gap-1 text-xs font-medium ${
          trendUp ? "text-accent" : "text-destructive"
        }`}
      >
        {trendUp ? (
          <ArrowUpRight className="w-3 h-3" />
        ) : (
          <ArrowDownRight className="w-3 h-3" />
        )}
        <span>{trend}</span>
      </div>
    </div>
  </div>
);

export default AdminHome;
