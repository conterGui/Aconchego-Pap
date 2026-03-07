"use client";

import React, { useState, useEffect } from "react";
import HeaderAdmin from "@/components/HeaderAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Users,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
} from "lucide-react";

interface Table {
  id: number;
  capacity: number;
  x: number;
  y: number;
  shape: "square" | "round";
  rotation?: number;
}

interface Reservation {
  id: string;
  tableId: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  people: number;
  day: string;
  time: string;
}

const HOURS_30MIN = Array.from({ length: 24 }, (_, i) => {
  const hour = 8 + Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${String(hour).padStart(2, "0")}:${minutes}`;
});

const TODAY = new Date().toISOString().split("T")[0];

export default function ReservasAdmin() {
  const [tables] = useState<Table[]>([
    { id: 1, capacity: 2, x: 15, y: 20, shape: "round" },
    { id: 2, capacity: 2, x: 30, y: 20, shape: "round" },
    { id: 3, capacity: 4, x: 50, y: 18, shape: "square", rotation: 0 },
    { id: 4, capacity: 4, x: 70, y: 18, shape: "square", rotation: 0 },
    { id: 5, capacity: 2, x: 85, y: 20, shape: "round" },
    { id: 6, capacity: 4, x: 15, y: 45, shape: "square", rotation: 90 },
    { id: 7, capacity: 6, x: 35, y: 45, shape: "square", rotation: 0 },
    { id: 8, capacity: 6, x: 60, y: 45, shape: "square", rotation: 0 },
    { id: 9, capacity: 4, x: 85, y: 45, shape: "square", rotation: 90 },
    { id: 10, capacity: 2, x: 20, y: 70, shape: "round" },
    { id: 11, capacity: 4, x: 40, y: 72, shape: "square", rotation: 0 },
    { id: 12, capacity: 4, x: 60, y: 72, shape: "square", rotation: 0 },
    { id: 13, capacity: 2, x: 80, y: 70, shape: "round" },
  ]);

  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Inputs para criar reserva
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [people, setPeople] = useState(2);
  const [createDay, setCreateDay] = useState(TODAY);
  const [createTime, setCreateTime] = useState("08:00");

  // Filtros do mapa
  const [viewDay, setViewDay] = useState(TODAY);
  const [viewTime, setViewTime] = useState("08:00");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const fetchReservations = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reservations");
      if (!res.ok) throw new Error("Erro ao buscar reservas");
      const data = await res.json();

      const mapped: Reservation[] = data.map((r: any) => ({
        id: r._id,
        tableId: r.tableNumber || 0,
        clientName: r.customerName,
        clientEmail: r.customerEmail || "",
        clientPhone: r.customerPhone || "",
        people: r.peopleQuantity,
        day: new Date(r.reservationDate).toISOString().split("T")[0],
        time: r.reservationTime,
      }));

      const withTables = mapped.map((r) => {
        if (!r.tableId || r.tableId === 0) {
          const availableTables = tables.filter(
            (t) =>
              !mapped.some(
                (resv) =>
                  resv.tableId === t.id &&
                  resv.day === r.day &&
                  resv.time === r.time,
              ) && t.capacity >= r.people,
          );
          if (availableTables.length > 0) {
            const chosen = availableTables.reduce((prev, curr) =>
              curr.capacity < prev.capacity ? curr : prev,
            );
            return { ...r, tableId: chosen.id };
          }
        }
        return r;
      });

      setReservations(withTables);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const isReservedAt = (tableId: number, day: string, time: string) =>
    reservations.some(
      (r) => r.tableId === tableId && r.day === day && r.time === time,
    );

  const availableCount = tables.filter(
    (t) => !isReservedAt(t.id, viewDay, viewTime),
  ).length;

  const reservedCount = tables.filter((t) =>
    isReservedAt(t.id, viewDay, viewTime),
  ).length;

  const reservationsAtView = reservations.filter(
    (r) => r.day === viewDay && r.time === viewTime,
  );

  const reserveTable = async () => {
    if (!clientName.trim()) return alert("Introduza o nome do cliente");
    if (!clientEmail.trim()) return alert("Introduza o email do cliente");
    if (!clientPhone.trim()) return alert("Introduza o telefone do cliente");

    const availableTables = tables.filter(
      (t) => !isReservedAt(t.id, createDay, createTime) && t.capacity >= people,
    );
    if (availableTables.length === 0)
      return alert("Não há mesas disponíveis para esse horário");

    const chosenTable = availableTables.reduce((prev, curr) =>
      curr.capacity < prev.capacity ? curr : prev,
    );

    const body = {
      customerName: clientName,
      customerEmail: clientEmail,
      customerPhone: clientPhone,
      peopleQuantity: people,
      reservationDate: createDay,
      reservationTime: createTime,
      tableNumber: chosenTable.id,
    };

    try {
      const res = await fetch("http://localhost:3000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));

      setReservations((prev) => [
        ...prev,
        {
          id: data._id,
          tableId: chosenTable.id,
          clientName,
          clientEmail,
          clientPhone,
          people,
          day: createDay,
          time: createTime,
        },
      ]);

      setViewDay(createDay);
      setViewTime(createTime);
      setSelectedTable(chosenTable.id);

      setClientName("");
      setClientEmail("");
      setClientPhone("");
      setPeople(2);
      setCreateTime("08:00");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar reserva: " + err);
    }
  };

  const cancelReservationById = async (reservationId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/reservations/${reservationId}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("Erro ao cancelar reserva");
      setReservations((prev) => prev.filter((r) => r.id !== reservationId));
      setSelectedTable(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao cancelar reserva");
    }
  };

  const cancelReservationAtView = (tableId: number) => {
    const resv = reservations.find(
      (r) => r.tableId === tableId && r.day === viewDay && r.time === viewTime,
    );
    if (resv) cancelReservationById(resv.id);
  };

  const renderChairs = (table: Table) => {
    const isRound = table.shape === "round";
    const chairSize = 14;
    const tableRadius = isRound ? 35 : 45;

    if (isRound) {
      return (
        <>
          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-lg shadow-md border border-amber-950"
            style={{
              width: chairSize,
              height: chairSize,
              top: -(tableRadius + 8),
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-lg shadow-md border border-amber-950"
            style={{
              width: chairSize,
              height: chairSize,
              bottom: -(tableRadius + 8),
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </>
      );
    }

    const isVertical = table.rotation === 90;
    return (
      <>
        {[
          ["25%", "top"],
          ["75%", "top"],
          ["25%", "bottom"],
          ["75%", "bottom"],
        ].map(([pos, side], i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-md border border-amber-950"
            style={{
              width: chairSize,
              height: chairSize,
              [isVertical ? (i < 2 ? "left" : "right") : side]: -(
                tableRadius - 5
              ),
              [isVertical ? "top" : "left"]: pos,
              transform: isVertical ? "translateY(-50%)" : "translateX(-50%)",
            }}
          />
        ))}
      </>
    );
  };

  const groupedByDay = Array.from(new Set(reservations.map((r) => r.day)))
    .sort()
    .map((d) => ({
      day: d,
      items: reservations
        .filter((r) => r.day === d)
        .sort((a, b) =>
          a.time === b.time
            ? a.tableId - b.tableId
            : a.time.localeCompare(b.time),
        ),
    }));

  return (
    <div className="min-h-screen bg-background p-6 mt-16">
      <HeaderAdmin />
      <div className="flex-grow container mx-auto px-4 py-16 pt-16">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          Gerenciamento de Reservas
        </h1>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-xl shadow-sm p-5 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total de Mesas
                </p>
                <p className="text-3xl font-bold mt-1 text-foreground">
                  {tables.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-5 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 font-medium">
                  Disponíveis
                </p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">
                  {availableCount}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {viewDay} às {viewTime}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-5 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">Reservadas</p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {reservedCount}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {viewDay} às {viewTime}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-sm p-6 border border-border sticky top-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">
                Nova Reserva
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome do Cliente
                  </Label>
                  <Input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telefone
                  </Label>
                  <Input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+351 912 345 678"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Número de Pessoas
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={people}
                    onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 space-y-1">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Dia
                    </Label>
                    <input
                      type="date"
                      value={createDay}
                      onChange={(e) => setCreateDay(e.target.value)}
                      className="w-full rounded border border-amber-300 bg-amber-50 text-amber-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Horário
                    </Label>
                    <Select value={createTime} onValueChange={setCreateTime}>
                      <SelectTrigger className="w-full border border-amber-300 bg-amber-50 text-amber-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {HOURS_30MIN.map((h) => (
                          <SelectItem key={h} value={h}>
                            {h}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={reserveTable}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3"
                >
                  Reservar Mesa Automaticamente
                </Button>
              </div>

              {/* Legenda */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-medium mb-3 text-muted-foreground">
                  Legenda:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border-4 border-emerald-500 shadow flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-700">
                        2
                      </span>
                    </div>
                    <span className="text-sm text-foreground">
                      Mesa Disponível
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 border-4 border-red-500 shadow flex items-center justify-center">
                      <span className="text-xs font-bold text-red-700">R</span>
                    </div>
                    <span className="text-sm text-foreground">
                      Mesa Reservada
                    </span>
                  </div>
                </div>
              </div>

              {/* Lista de todas as reservas */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-sm font-semibold mb-3 text-foreground">
                  Todas as Reservas
                </h3>
                <div className="max-h-72 overflow-auto space-y-3">
                  {groupedByDay.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      Sem reservas.
                    </p>
                  )}
                  {groupedByDay.map((g) => (
                    <div key={g.day}>
                      <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wide">
                        {g.day}
                      </div>
                      <div className="space-y-1">
                        {g.items.map((r) => (
                          <div
                            key={r.id}
                            className="flex items-center justify-between p-2 rounded border border-border bg-background"
                          >
                            <div>
                              <div className="text-sm font-medium text-foreground">
                                Mesa #{r.tableId} • {r.time}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {r.clientName} — {r.people} pess.
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {r.clientEmail}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {r.clientPhone}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <Button
                                onClick={() => {
                                  setViewDay(r.day);
                                  setViewTime(r.time);
                                  setSelectedTable(r.tableId);
                                }}
                                variant="outline"
                                className="text-xs px-2 py-1"
                              >
                                Ver
                              </Button>
                              <Button
                                onClick={() => cancelReservationById(r.id)}
                                variant="outline"
                                className="text-xs px-2 py-1 border-red-300 text-red-600 hover:bg-red-50"
                              >
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-sm p-6 border border-border">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  Planta do Restaurante
                </h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground whitespace-nowrap">
                      Dia
                    </Label>
                    <input
                      type="date"
                      value={viewDay}
                      onChange={(e) => {
                        setViewDay(e.target.value);
                        setSelectedTable(null);
                      }}
                      className="rounded border border-amber-300 bg-amber-50 text-amber-900 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                      <Clock className="w-4 h-4" />
                      Hora
                    </Label>
                    <Select
                      value={viewTime}
                      onValueChange={(v) => {
                        setViewTime(v);
                        setSelectedTable(null);
                      }}
                    >
                      <SelectTrigger className="border border-amber-300 bg-amber-50 text-amber-900 w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {HOURS_30MIN.map((h) => (
                          <SelectItem key={h} value={h}>
                            {h}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Planta */}
              <div
                className="relative w-full h-[700px] rounded-xl border-2 border-border overflow-hidden shadow-inner"
                style={{
                  background:
                    "linear-gradient(135deg, #f5f3ef 0%, #e8e4dc 50%, #f5f3ef 100%)",
                }}
              >
                <div className="absolute inset-0 border-8 border-slate-700 pointer-events-none" />

                {/* Entrada */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-2 bg-slate-300 z-10" />
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  <div className="w-14 h-8 bg-gradient-to-b from-amber-700 to-amber-800 border-2 border-amber-900 rounded-b-lg shadow-lg" />
                  <div className="w-14 h-8 bg-gradient-to-b from-amber-700 to-amber-800 border-2 border-amber-900 rounded-b-lg shadow-lg" />
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Entrada
                </div>

                {/* Janelas */}
                <div className="absolute left-0 top-1/4 w-2 h-32 bg-gradient-to-r from-sky-200 to-sky-300 border-y-2 border-sky-400 opacity-70" />
                <div className="absolute left-0 top-1/2 w-2 h-32 bg-gradient-to-r from-sky-200 to-sky-300 border-y-2 border-sky-400 opacity-70" />
                <div className="absolute right-0 top-1/4 w-2 h-32 bg-gradient-to-l from-sky-200 to-sky-300 border-y-2 border-sky-400 opacity-70" />
                <div className="absolute right-0 top-1/2 w-2 h-32 bg-gradient-to-l from-sky-200 to-sky-300 border-y-2 border-sky-400 opacity-70" />

                {/* Bar */}
                <div
                  className="absolute bottom-8 right-8 w-48 h-32 rounded-lg shadow-2xl z-20"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
                  }}
                >
                  <div className="absolute inset-0 border-4 border-slate-600 rounded-lg" />
                  <div className="h-full flex flex-col items-center justify-center text-white">
                    <div className="text-sm font-bold tracking-wider mb-1">
                      BAR
                    </div>
                    <div className="text-xs opacity-75">& COZINHA</div>
                  </div>
                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-6 h-24 bg-gradient-to-r from-amber-700 to-amber-800 border-2 border-amber-900 rounded-l-lg" />
                </div>

                {/* Plantas decorativas */}
                <div className="absolute top-12 left-8">
                  <div className="w-10 h-10 rounded-full bg-green-700 shadow-lg" />
                  <div className="absolute top-0 left-0 w-10 h-10 rounded-full bg-green-600 opacity-70 animate-pulse" />
                </div>
                <div className="absolute top-12 right-8">
                  <div className="w-10 h-10 rounded-full bg-green-700 shadow-lg" />
                  <div className="absolute top-0 left-0 w-10 h-10 rounded-full bg-green-600 opacity-70 animate-pulse" />
                </div>
                <div className="absolute bottom-44 left-8">
                  <div className="w-10 h-10 rounded-full bg-green-700 shadow-lg" />
                  <div className="absolute top-0 left-0 w-10 h-10 rounded-full bg-green-600 opacity-70 animate-pulse" />
                </div>

                {/* Tapete central */}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-2/3 rounded-lg opacity-20"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, #8b5cf6, #8b5cf6 10px, #a78bfa 10px, #a78bfa 20px)",
                  }}
                />

                {/* Mesas */}
                {tables.map((table) => {
                  const isRound = table.shape === "round";
                  const size = isRound ? 70 : 90;
                  const reservedHere = isReservedAt(
                    table.id,
                    viewDay,
                    viewTime,
                  );
                  const isSelected = selectedTable === table.id;
                  const resvHere = reservationsAtView.find(
                    (r) => r.tableId === table.id,
                  );

                  return (
                    <div
                      key={table.id}
                      onClick={() =>
                        setSelectedTable(isSelected ? null : table.id)
                      }
                      className="absolute cursor-pointer transition-all duration-300 z-10"
                      style={{
                        left: `${table.x}%`,
                        top: `${table.y}%`,
                        width: size,
                        height: size,
                        transform: `translate(-50%, -50%) ${isSelected ? "scale(1.06)" : "scale(1)"}`,
                      }}
                    >
                      {renderChairs(table)}
                      <div
                        className={`absolute inset-0 shadow-2xl transition-all duration-300 ${isRound ? "rounded-full" : "rounded-lg"} ${isSelected ? "ring-4 ring-amber-400 ring-offset-2" : ""}`}
                        style={{
                          background: reservedHere
                            ? "linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%)"
                            : "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
                          boxShadow:
                            "0 8px 20px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.5)",
                        }}
                      >
                        <div
                          className={`absolute inset-0 border-4 ${isRound ? "rounded-full" : "rounded-lg"}`}
                          style={{
                            borderColor: reservedHere ? "#dc2626" : "#16a34a",
                          }}
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div
                            className={`text-xs font-bold mb-1 ${reservedHere ? "text-red-700" : "text-emerald-800"}`}
                          >
                            {reservedHere
                              ? (resvHere?.clientName ?? "Reserv.").substring(
                                  0,
                                  6,
                                )
                              : `Mesa ${table.id}`}
                          </div>
                          <div
                            className={`text-[10px] ${reservedHere ? "text-red-600" : "text-emerald-700"}`}
                          >
                            {reservedHere
                              ? resvHere?.time
                              : `${table.capacity} pess.`}
                          </div>
                        </div>

                        <div
                          className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shadow-lg border-2 ${reservedHere ? "bg-red-600 text-white border-red-700" : "bg-emerald-600 text-white border-emerald-700"}`}
                        >
                          {table.capacity}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Detalhes da mesa selecionada */}
              {selectedTable &&
                (() => {
                  const table = tables.find((t) => t.id === selectedTable);
                  if (!table) return null;
                  const resvHere = reservations.find(
                    (r) =>
                      r.tableId === table.id &&
                      r.day === viewDay &&
                      r.time === viewTime,
                  );
                  return (
                    <div className="mt-4 p-5 bg-slate-50 rounded-xl border-2 border-blue-200 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-slate-800">
                              Mesa #{table.id}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${resvHere ? "bg-red-100 text-red-700 border border-red-300" : "bg-emerald-100 text-emerald-700 border border-emerald-300"}`}
                            >
                              {resvHere ? "Reservada" : "Disponível"}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Users className="w-4 h-4" />
                              <span>
                                Capacidade:{" "}
                                <strong>{table.capacity} pessoas</strong>
                              </span>
                            </div>
                            {resvHere && (
                              <>
                                <div className="flex items-center gap-2 text-slate-700">
                                  <User className="w-4 h-4" />
                                  <span>
                                    Cliente:{" "}
                                    <strong>{resvHere.clientName}</strong>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700">
                                  <Mail className="w-4 h-4" />
                                  <span>
                                    Email:{" "}
                                    <strong>{resvHere.clientEmail}</strong>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700">
                                  <Phone className="w-4 h-4" />
                                  <span>
                                    Telefone:{" "}
                                    <strong>{resvHere.clientPhone}</strong>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700">
                                  <Clock className="w-4 h-4" />
                                  <span>
                                    Horário: <strong>{resvHere.time}</strong> •{" "}
                                    <strong>{resvHere.day}</strong>
                                  </span>
                                </div>
                              </>
                            )}
                            <div className="flex items-center gap-2 text-slate-600">
                              <span>
                                Formato:{" "}
                                <strong>
                                  {table.shape === "round"
                                    ? "Redonda"
                                    : "Retangular"}
                                </strong>
                              </span>
                            </div>
                          </div>
                        </div>
                        {resvHere && (
                          <Button
                            onClick={() => cancelReservationAtView(table.id)}
                            variant="outline"
                            className="ml-4 border-red-300 text-red-600 hover:bg-red-50 font-medium"
                          >
                            Cancelar Reserva
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })()}

              {/* Lista de reservas no horário selecionado */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Reservas em {viewDay} às {viewTime}
                </h3>
                {reservationsAtView.length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    Nenhuma reserva neste horário.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reservationsAtView.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between p-3 rounded border bg-background shadow-sm border-border"
                      >
                        <div>
                          <div className="text-sm font-medium">
                            Mesa #{r.tableId} • {r.people} pessoas
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {r.clientName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {r.clientEmail} • {r.clientPhone}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => setSelectedTable(r.tableId)}
                            variant="outline"
                            className="text-xs px-2 py-1"
                          >
                            Ver Mesa
                          </Button>
                          <Button
                            onClick={() => cancelReservationById(r.id)}
                            variant="outline"
                            className="text-xs px-2 py-1 border-red-300 text-red-600 hover:bg-red-50"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
