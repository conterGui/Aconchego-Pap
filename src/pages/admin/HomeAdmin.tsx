import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Calendar,
  Coffee,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Euro,
  Users,
} from "lucide-react";
import HeaderAdmin from "@/components/HeaderAdmin";

// 🧾 Dados simulados de pedidos
const ordersData = [
  {
    _id: "1",
    customerName: "João Silva",
    totalAmount: 36,
    createdAt: "2025-11-01T10:00:00Z",
    items: [
      { productName: "Blend Jazz Especial", quantity: 1, price: 18 },
      { productName: "Expresso Forte", quantity: 1, price: 18 },
    ],
  },
  {
    _id: "2",
    customerName: "Maria Oliveira",
    totalAmount: 54,
    createdAt: "2025-10-28T14:20:00Z",
    items: [{ productName: "Café Intenso", quantity: 2, price: 27 }],
  },
  {
    _id: "3",
    customerName: "Pedro Santos",
    totalAmount: 27,
    createdAt: "2025-10-15T09:15:00Z",
    items: [{ productName: "Café Clássico", quantity: 1, price: 27 }],
  },
  {
    _id: "4",
    customerName: "Ana Costa",
    totalAmount: 72,
    createdAt: "2025-09-22T18:45:00Z",
    items: [{ productName: "Blend Premium", quantity: 2, price: 36 }],
  },
];

// 📊 Cálculos
const getTotalRevenue = () =>
  ordersData.reduce((acc, o) => acc + o.totalAmount, 0);

const getMonthlyRevenue = () => {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const grouped = Array(12).fill(0);
  ordersData.forEach((o) => {
    const m = new Date(o.createdAt).getMonth();
    grouped[m] += o.totalAmount;
  });
  return months
    .map((m, i) => ({ month: m, revenue: grouped[i] }))
    .filter((m) => m.revenue > 0);
};

const getTopProducts = () => {
  const map: Record<string, { sales: number; revenue: number }> = {};
  ordersData.forEach((o) =>
    o.items.forEach((i) => {
      if (!map[i.productName]) map[i.productName] = { sales: 0, revenue: 0 };
      map[i.productName].sales += i.quantity;
      map[i.productName].revenue += i.price * i.quantity;
    })
  );
  return Object.entries(map)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);
};

const getRecentActivity = () =>
  ordersData
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4)
    .map((order) => ({
      title: "Novo pedido confirmado",
      subtitle: `${order.customerName} - €${order.totalAmount.toFixed(2)}`,
      time: new Date(order.createdAt).toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "short",
      }),
    }));

// 📈 Dados calculados
const totalRevenue = getTotalRevenue();
const monthlyRevenue = getMonthlyRevenue();
const topProducts = getTopProducts();
const activities = getRecentActivity();

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-background mt-16">
      <HeaderAdmin />
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Painel de Controlo
            </h1>
            <p className="text-muted-foreground text-lg">
              Visão geral das vendas e facturamento
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-card rounded-lg shadow-sm border border-border">
            <Calendar className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-foreground">
              Últimos 30 dias
            </span>
          </div>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Receita Total"
            value={`€ ${totalRevenue.toFixed(2)}`}
            icon={<Euro className="w-5 h-5 text-primary-foreground" />}
            accent="bg-gradient-gold text-primary-foreground"
            trend="+12% vs mês anterior"
            up
          />
          <MetricCard
            title="Pedidos"
            value={ordersData.length}
            icon={<Package className="w-5 h-5 text-accent" />}
            accent="bg-card"
            trend="+8% esta semana"
            up
          />
          <MetricCard
            title="Clientes"
            value={new Set(ordersData.map((o) => o.customerName)).size}
            icon={<Users className="w-5 h-5 text-accent" />}
            accent="bg-card"
            trend="+5 novos este mês"
            up
          />
          <MetricCard
            title="Produtos"
            value={topProducts.length}
            icon={<Coffee className="w-5 h-5 text-accent" />}
            accent="bg-card"
            trend="Vendas estáveis"
          />
        </div>

        {/* Gráfico + Produtos em Destaque */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico compacto */}
          <Card className="border border-border shadow-md bg-card">
            <CardHeader className="pb-2 flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Receita Mensal
              </CardTitle>
              <div className="flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">+18%</span>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyRevenue}>
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
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
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

          {/* Produtos em destaque */}
          <Card className="border border-border shadow-md bg-card">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg font-semibold text-foreground">
                Cafés em Destaque
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {topProducts.map((p, i) => (
                <ProductItem
                  key={i}
                  name={p.name}
                  sales={p.sales}
                  revenue={`€${p.revenue.toFixed(2)}`}
                  trend={i % 2 === 0 ? "+12%" : "-3%"}
                  trendUp={i % 2 === 0}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Atividade Recente */}
        {/* Atividade Recente */}
        <Card className="border border-border shadow-md bg-card">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg font-semibold text-foreground">
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {activities.slice(0, 4).map((a, i) => (
              <ActivityItem
                key={i}
                icon={<Package className="w-5 h-5 text-accent" />}
                title={a.title}
                subtitle={a.subtitle}
                time={a.time}
                bgColor="bg-accent/20"
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// 🔹 Subcomponentes
const MetricCard = ({ title, value, icon, accent, trend, up }: any) => (
  <Card
    className={`${accent} border border-border shadow-md hover:shadow-lg transition-all`}
  >
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <div
        className={`flex items-center gap-1 text-sm ${
          up ? "text-accent" : "text-destructive"
        }`}
      >
        {up ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : (
          <ArrowDownRight className="w-4 h-4" />
        )}
        <span>{trend}</span>
      </div>
    </CardContent>
  </Card>
);

const ActivityItem = ({ icon, title, subtitle, time, bgColor }: any) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/10 transition-colors">
    <div className={`p-2 rounded-lg ${bgColor} flex-shrink-0`}>{icon}</div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
    </div>
    <span className="text-xs text-muted-foreground">{time}</span>
  </div>
);

const ProductItem = ({ name, sales, revenue, trend, trendUp }: any) => (
  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/10 transition-colors">
    <div>
      <p className="text-sm font-semibold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {sales} pacotes vendidos
      </p>
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
