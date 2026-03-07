import { useEffect, useState } from "react";
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

// 📊 Cálculos
const getTotalRevenue = (orders: any[]) =>
  orders.reduce((acc, o) => acc + o.totalAmount, 0);

const getMonthlyRevenue = (orders: any[]) => {
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

  orders.forEach((o) => {
    if (!o.createdAt || !o.totalAmount) return;

    const date = new Date(o.createdAt);
    if (isNaN(date.getTime())) return;

    const monthIndex = date.getMonth();
    grouped[monthIndex] += Number(o.totalAmount);
  });

  return months.map((month, index) => ({
    month,
    revenue: grouped[index],
  }));
};

const getTopProducts = (orders: any[]) => {
  const map: Record<string, { sales: number; revenue: number }> = {};

  orders.forEach((o) =>
    o.items.forEach((i: any) => {
      if (!map[i.productName]) {
        map[i.productName] = { sales: 0, revenue: 0 };
      }
      map[i.productName].sales += i.quantity;
      map[i.productName].revenue += i.price * i.quantity;
    }),
  );

  return Object.entries(map)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);
};

const getRecentActivity = (orders: any[]) =>
  [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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

const AdminHome = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-10">A carregar dados…</div>;
  }

  const totalRevenue = getTotalRevenue(orders);
  const monthlyRevenue = getMonthlyRevenue(orders);
  const topProducts = getTopProducts(orders);
  const activities = getRecentActivity(orders);

  return (
    <div className="min-h-screen bg-background mt-16">
      <HeaderAdmin />
      <div className="container mx-auto px-6 py-8">
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
            value={orders.length}
            icon={<Package className="w-5 h-5 text-accent" />}
            accent="bg-card"
            trend="+8% esta semana"
            up
          />
          <MetricCard
            title="Clientes"
            value={new Set(orders.map((o) => o.customerName)).size}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
              <div className="w-full h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
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
                          stopColor="hsl(45,65%,75%)"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(45,65%,75%)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />

                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) =>
                        `€${value.toLocaleString("pt-PT")}`
                      }
                    />

                    <Tooltip
                      formatter={(value: number) =>
                        `€${value.toLocaleString("pt-PT")}`
                      }
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(45,65%,75%)"
                      strokeWidth={3}
                      fill="url(#colorRevenue)"
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

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

        <Card className="border border-border shadow-md bg-card">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg font-semibold text-foreground">
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {activities.map((a, i) => (
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
