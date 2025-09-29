import HeaderAdmin from "@/components/HeaderAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const dataFinance = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 2000 },
];

const dataReservasEventos = [
  { name: "Reservas", value: 65 },
  { name: "Eventos", value: 35 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderAdmin />

      <main className="pt-24 px-6">
        {/* Seção de boas-vindas */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel do Administrador</h1>
            <p className="text-muted-foreground">
              Bem-vindo de volta! Aqui está um resumo rápido do sistema.
            </p>
          </div>
          {/* Espaço para imagem/banner */}
          <div className="w-full md:w-1/3 h-40 bg-muted rounded-2xl flex items-center justify-center">
            <span className="text-muted-foreground">[Imagem ou Banner]</span>
          </div>
        </div>

        {/* Cards de resumo rápido */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle>Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">120</p>
              <p className="text-sm text-muted-foreground">no último mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">itens baixos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ 12.400</p>
              <p className="text-sm text-muted-foreground">este trimestre</p>
            </CardContent>
          </Card>
        </div>

        {/* Seção de gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico de Barras - Financeiro */}
          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataFinance}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Pizza - Reservas/Eventos */}
          <Card>
            <CardHeader>
              <CardTitle>Reservas x Eventos</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataReservasEventos}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {dataReservasEventos.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
