"use client";

import React, { useState } from "react";
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
import { Users, Clock, User, CheckCircle, XCircle } from "lucide-react";

interface Table {
  id: number;
  capacity: number;
  x: number;
  y: number;
  shape: "square" | "round";
  rotation?: number;
}

interface Reservation {
  id: string; // uuid-like simple id
  tableId: number;
  clientName: string;
  people: number;
  day: DayOption;
  time: string; // "08:00"
}

type DayOption = "Quarta" | "Quinta" | "Sexta" | "Sábado" | "Domingo";

const DAYS: DayOption[] = ["Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

const HOURS = Array.from({ length: 12 }, (_, i) => {
  const hour = 8 + i; // 08 -> 19
  return `${String(hour).padStart(2, "0")}:00`;
});

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

  // All reservations
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Create inputs
  const [clientName, setClientName] = useState<string>("");
  const [people, setPeople] = useState<number>(2);
  const [createDay, setCreateDay] = useState<DayOption>("Quarta");
  const [createTime, setCreateTime] = useState<string>("08:00");

  // View filter
  const [viewDay, setViewDay] = useState<DayOption>("Quarta");
  const [viewTime, setViewTime] = useState<string>("08:00");

  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  // Helpers
  const isReservedAt = (tableId: number, day: DayOption, time: string) =>
    reservations.some(
      (r) => r.tableId === tableId && r.day === day && r.time === time
    );

  const availableCount = tables.filter(
    (t) => !isReservedAt(t.id, viewDay, viewTime)
  ).length;
  const reservedCount = tables.filter((t) =>
    isReservedAt(t.id, viewDay, viewTime)
  ).length;

  const reserveTable = () => {
    if (!clientName.trim() || !createTime) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    if (!DAYS.includes(createDay)) {
      alert("Dia inválido. Escolha entre Quarta e Domingo.");
      return;
    }
    if (!HOURS.includes(createTime)) {
      alert(
        "Horário inválido. Escolha um horário entre 08:00 e 19:00, de hora em hora."
      );
      return;
    }

    const availableTables = tables.filter(
      (t) => !isReservedAt(t.id, createDay, createTime) && t.capacity >= people
    );

    if (availableTables.length === 0) {
      alert(
        "Não há mesas disponíveis para este número de pessoas nesse dia/horário!"
      );
      return;
    }

    const chosenTable = availableTables.reduce((prev, curr) =>
      curr.capacity < prev.capacity ? curr : prev
    );

    const newReservation: Reservation = {
      id: `${chosenTable.id}-${createDay}-${createTime}-${Date.now()}`,
      tableId: chosenTable.id,
      clientName: clientName.trim(),
      people,
      day: createDay,
      time: createTime,
    };

    setReservations((prev) => [...prev, newReservation]);

    // reset inputs (keep day for convenience)
    setClientName("");
    setPeople(2);
    setCreateTime("08:00");
    setSelectedTable(chosenTable.id);

    // jump visualizador to the created slot
    setViewDay(createDay);
    setViewTime(createTime);
  };

  const cancelReservationAtView = (tableId: number) => {
    const exists = reservations.some(
      (r) => r.tableId === tableId && r.day === viewDay && r.time === viewTime
    );
    if (!exists) return;
    setReservations((prev) =>
      prev.filter(
        (r) =>
          !(r.tableId === tableId && r.day === viewDay && r.time === viewTime)
      )
    );
    setSelectedTable(null);
  };

  const cancelReservationById = (reservationId: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== reservationId));
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
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              top: `-${tableRadius + 8}px`,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-lg shadow-md border border-amber-950"
            style={{
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              bottom: `-${tableRadius + 8}px`,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </>
      );
    } else {
      const rotation = table.rotation || 0;
      const isVertical = rotation === 90;

      return (
        <>
          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-md border border-amber-950"
            style={{
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              [isVertical ? "left" : "top"]: `-${tableRadius - 5}px`,
              [isVertical ? "top" : "left"]: "25%",
              transform: isVertical ? "translateY(-50%)" : "translateX(-50%)",
            }}
          />
          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-md border border-amber-950"
            style={{
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              [isVertical ? "left" : "top"]: `-${tableRadius - 5}px`,
              [isVertical ? "top" : "left"]: "75%",
              transform: isVertical ? "translateY(-50%)" : "translateX(-50%)",
            }}
          />
          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-md border border-amber-950"
            style={{
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              [isVertical ? "right" : "bottom"]: `-${tableRadius - 5}px`,
              [isVertical ? "top" : "left"]: "25%",
              transform: isVertical ? "translateY(-50%)" : "translateX(-50%)",
            }}
          />
          <div
            className="absolute bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-md border border-amber-950"
            style={{
              width: `${chairSize}px`,
              height: `${chairSize}px`,
              [isVertical ? "right" : "bottom"]: `-${tableRadius - 5}px`,
              [isVertical ? "top" : "left"]: "75%",
              transform: isVertical ? "translateY(-50%)" : "translateX(-50%)",
            }}
          />
        </>
      );
    }
  };

  const reservationsAtView = reservations.filter(
    (r) => r.day === viewDay && r.time === viewTime
  );

  const groupedByDay = DAYS.map((d) => ({
    day: d,
    items: reservations
      .filter((r) => r.day === d)
      .sort((a, b) => {
        if (a.time === b.time) return a.tableId - b.tableId;
        return a.time.localeCompare(b.time);
      }),
  }));

  return (
    <div className="min-h-screen bg-background from-slate-50 to-slate-100 p-6 mt-16">
      <HeaderAdmin />
      <div className="flex-grow container mx-auto px-4 py-16 pt-16">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Gerenciamento de Reservas
          </h1>
        </div>

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
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm p-5 border border-destructive-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-destructive-700 font-medium">
                  Reservadas
                </p>
                <p className="text-3xl font-bold text-destructive-600 mt-1">
                  {reservedCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-destructive-100 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive-600" />
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
                  <Label className="text-foreground font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome do Cliente
                  </Label>
                  <Input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Digite o nome"
                    className="border-border focus:ring-amber-400"
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
                    className="border-border focus:ring-amber-400"
                  />
                </div>

                {/* Dia e Hora alinhados lado a lado (com tom marrom/amber) */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Dia */}
                  <div className="flex-1">
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">
                      Dia da Semana
                    </label>
                    <Select
                      value={createDay}
                      onValueChange={(v) => setCreateDay(v as DayOption)}
                    >
                      <SelectTrigger className="w-full rounded border border-amber-300 bg-amber-50 text-amber-900 focus:ring-2 focus:ring-amber-400">
                        <SelectValue placeholder="Escolha o dia" />
                      </SelectTrigger>
                      <SelectContent className="bg-card text-foreground border border-border">
                        {DAYS.map((d) => (
                          <SelectItem
                            key={d}
                            value={d}
                            className="hover:bg-amber-100 hover:text-amber-900"
                          >
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Hora */}
                  <div className="flex-1">
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">
                      Horário
                    </label>
                    <Select
                      value={createTime}
                      onValueChange={(v) => setCreateTime(v)}
                    >
                      <SelectTrigger className="w-full rounded border border-amber-300 bg-amber-50 text-amber-900 focus:ring-2 focus:ring-amber-400">
                        <SelectValue placeholder="Escolha o horário" />
                      </SelectTrigger>
                      <SelectContent className="bg-card text-foreground border border-border">
                        {HOURS.map((h) => (
                          <SelectItem
                            key={h}
                            value={h}
                            className="hover:bg-amber-100 hover:text-amber-900"
                          >
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

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-medium mb-3 text-muted-foreground">
                  Legenda:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-card border-4 border-emerald-500 shadow flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-700">
                        2
                      </span>
                    </div>
                    <span className="text-sm text-foreground">
                      Mesa Disponível (no filtro)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-card border-4 border-destructive-500 shadow flex items-center justify-center">
                      <span className="text-xs font-bold text-destructive-700">
                        Eu
                      </span>
                    </div>
                    <span className="text-sm text-foreground">
                      Mesa Reservada (no filtro)
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar: Lista de todas as reservas */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-3 text-foreground">
                  Lista de Reservas (todas)
                </h3>
                <div className="max-h-56 overflow-auto space-y-3">
                  {groupedByDay.map((g) => (
                    <div key={g.day} className="mb-2">
                      <div className="text-xs font-bold mb-1 text-muted-foreground">
                        {g.day}
                      </div>
                      {g.items.length === 0 ? (
                        <div className="text-xs text-slate-500 mb-2">
                          Nenhuma reserva
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {g.items.map((r) => (
                            <div
                              key={r.id}
                              className="flex items-center justify-between bg-slate-50 p-2 rounded border"
                            >
                              <div>
                                <div className="text-sm font-medium text-foreground">
                                  Mesa #{r.tableId} • {r.time}
                                </div>
                                <div className="text-xs text-slate-600">
                                  {r.clientName} — {r.people} pessoas
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
                                  className="text-xs px-2 py-1 border-border"
                                >
                                  Ver
                                </Button>
                                <Button
                                  onClick={() => cancelReservationById(r.id)}
                                  variant="outline"
                                  className="text-xs px-2 py-1 border-destructive-300 text-destructive-600 hover:bg-destructive-50"
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map area */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-sm p-6 border border-border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-foreground">
                  Planta do Restaurante (Vista Aérea)
                </h2>

                {/* Filters above map (also amber) */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground">Dia</Label>
                    <Select
                      value={viewDay}
                      onValueChange={(v) => setViewDay(v as DayOption)}
                    >
                      <SelectTrigger className="p-2 rounded border border-amber-300 bg-amber-50 text-amber-900 focus:ring-2 focus:ring-amber-400">
                        <SelectValue placeholder="Dia" />
                      </SelectTrigger>
                      <SelectContent className="bg-card text-foreground border border-border">
                        {DAYS.map((d) => (
                          <SelectItem
                            key={d}
                            value={d}
                            className="hover:bg-amber-100 hover:text-amber-900"
                          >
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Horário
                    </Label>
                    <Select
                      value={viewTime}
                      onValueChange={(v) => setViewTime(v)}
                    >
                      <SelectTrigger className="p-2 rounded border border-amber-300 bg-amber-50 text-amber-900 focus:ring-2 focus:ring-amber-400">
                        <SelectValue placeholder="Horário" />
                      </SelectTrigger>
                      <SelectContent className="bg-card text-foreground border border-border">
                        {HOURS.map((h) => (
                          <SelectItem
                            key={h}
                            value={h}
                            className="hover:bg-amber-100 hover:text-amber-900"
                          >
                            {h}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div
                className="relative w-full h-[700px] rounded-xl border-2 border-border overflow-hidden shadow-inner"
                style={{
                  background:
                    "linear-gradient(135deg, #f5f3ef 0%, #e8e4dc 50%, #f5f3ef 100%)",
                }}
              >
                {/* Walls */}
                <div className="absolute inset-0 border-8 border-slate-700 pointer-events-none" />

                {/* Entrance */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-2 bg-slate-300 z-10" />
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  <div className="w-14 h-8 bg-gradient-to-b from-amber-700 to-amber-800 border-2 border-amber-900 rounded-b-lg shadow-lg" />
                  <div className="w-14 h-8 bg-gradient-to-b from-amber-700 to-amber-800 border-2 border-amber-900 rounded-b-lg shadow-lg" />
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Entrada
                </div>

                {/* Windows */}
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
                  <div className="h-full flex flex-col items-center justify-center text-card">
                    <div className="text-sm font-bold tracking-wider mb-1">
                      BAR
                    </div>
                    <div className="text-xs opacity-75">& COZINHA</div>
                  </div>
                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-6 h-24 bg-gradient-to-r from-amber-700 to-amber-800 border-2 border-amber-900 rounded-l-lg" />
                </div>

                {/* Plants */}
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

                {/* Central rug */}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-2/3 rounded-lg opacity-20"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, #8b5cf6, #8b5cf6 10px, #a78bfa 10px, #a78bfa 20px)",
                  }}
                />

                {/* Tables */}
                {tables.map((table) => {
                  const isRound = table.shape === "round";
                  const size = isRound ? 70 : 90;
                  const reservedHere = isReservedAt(
                    table.id,
                    viewDay,
                    viewTime
                  );

                  return (
                    <div
                      key={table.id}
                      onClick={() => setSelectedTable(table.id)}
                      className="absolute cursor-pointer transition-all duration-300 z-10"
                      style={{
                        left: `${table.x}%`,
                        top: `${table.y}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: `translate(-50%, -50%) ${
                          selectedTable === table.id
                            ? "scale(1.06)"
                            : "scale(1)"
                        }`,
                      }}
                    >
                      {renderChairs(table)}

                      <div
                        className={`absolute inset-0 shadow-2xl transition-all duration-300 ${
                          isRound ? "rounded-full" : "rounded-lg"
                        } ${
                          selectedTable === table.id
                            ? "ring-4 ring-amber-400 ring-offset-2"
                            : ""
                        }`}
                        style={{
                          background: reservedHere
                            ? "linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%)"
                            : "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
                          boxShadow:
                            "0 8px 20px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.5)",
                        }}
                      >
                        <div
                          className={`absolute inset-0 border-4 ${
                            isRound ? "rounded-full" : "rounded-lg"
                          }`}
                          style={{
                            borderColor: reservedHere ? "#dc2626" : "#16a34a",
                          }}
                        />

                        <div
                          className={`absolute inset-2 ${
                            isRound ? "rounded-full" : "rounded-lg"
                          } opacity-20`}
                          style={{
                            background:
                              "radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.1) 100%)",
                          }}
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div
                            className={`text-xs font-bold mb-1 ${
                              reservedHere
                                ? "text-destructive-700"
                                : "text-emerald-800"
                            }`}
                          >
                            {reservedHere
                              ? (
                                  reservationsAtView.find(
                                    (r) => r.tableId === table.id
                                  )?.clientName ?? "Reserv."
                                ).substring(0, 6)
                              : `Mesa ${table.id}`}
                          </div>
                          <div
                            className={`text-[10px] ${
                              reservedHere
                                ? "text-destructive-600"
                                : "text-emerald-700"
                            }`}
                          >
                            {reservedHere
                              ? reservationsAtView.find(
                                  (r) => r.tableId === table.id
                                )?.time
                              : `${table.capacity} pessoas`}
                          </div>
                        </div>

                        <div
                          className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shadow-lg border-2 ${
                            reservedHere
                              ? "bg-destructive-600 text-card border-destructive-700"
                              : "bg-emerald-600 text-card border-emerald-700"
                          }`}
                        >
                          {table.capacity}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected table details */}
              {selectedTable && (
                <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm">
                  {(() => {
                    const table = tables.find((t) => t.id === selectedTable);
                    if (!table) return null;
                    const reservationHere = reservations.find(
                      (r) =>
                        r.tableId === table.id &&
                        r.day === viewDay &&
                        r.time === viewTime
                    );
                    return (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg text-slate-800">
                              Mesa #{table.id}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                reservationHere
                                  ? "bg-destructive-100 text-destructive-700 border border-destructive-300"
                                  : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                              }`}
                            >
                              {reservationHere ? "Reservada" : "Disponível"}
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

                            {reservationHere && (
                              <>
                                <div className="flex items-center gap-2 text-slate-700">
                                  <User className="w-4 h-4" />
                                  <span>
                                    Cliente:{" "}
                                    <strong>
                                      {reservationHere.clientName}
                                    </strong>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700">
                                  <Clock className="w-4 h-4" />
                                  <span>
                                    Horário:{" "}
                                    <strong>{reservationHere.time}</strong> •{" "}
                                    <strong>{reservationHere.day}</strong>
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

                        {reservationHere && (
                          <Button
                            onClick={() => cancelReservationAtView(table.id)}
                            variant="outline"
                            className="ml-4 border-destructive-300 text-destructive-600 hover:bg-destructive-50 font-medium"
                          >
                            Cancelar Reserva (este horário)
                          </Button>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Bottom list: reservations in current view */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Reservas em {viewDay} às {viewTime}
                </h3>
                {reservationsAtView.length === 0 ? (
                  <div className="text-sm text-slate-600">
                    Nenhuma reserva neste horário.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reservationsAtView.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between p-3 rounded border bg-white"
                      >
                        <div>
                          <div className="text-sm font-medium">
                            Mesa #{r.tableId} • {r.people} pessoas
                          </div>
                          <div className="text-xs text-slate-600">
                            {r.clientName}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => setSelectedTable(r.tableId)}
                            variant="outline"
                            className="text-xs px-2 py-1 border-border"
                          >
                            Ver Mesa
                          </Button>
                          <Button
                            onClick={() => cancelReservationById(r.id)}
                            variant="outline"
                            className="text-xs px-2 py-1 border-destructive-300 text-destructive-600 hover:bg-destructive-50"
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
