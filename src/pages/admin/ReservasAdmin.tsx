import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Tipagem da mesa
interface Table {
  id: number;
  capacity: number; // capacidade máxima de pessoas
  reserved: boolean; // se está reservada
  clientName?: string; // nome do cliente
  time?: string; // horário da reserva
  x: number; // posição horizontal no mapa (0-100%)
  y: number; // posição vertical no mapa (0-100%)
}

export default function MapReservation() {
  // Estado das mesas
  const [tables, setTables] = useState<Table[]>([
    { id: 1, capacity: 2, reserved: false, x: 10, y: 10 },
    { id: 2, capacity: 4, reserved: false, x: 40, y: 10 },
    { id: 3, capacity: 2, reserved: false, x: 70, y: 10 },
    { id: 4, capacity: 4, reserved: false, x: 10, y: 50 },
    { id: 5, capacity: 6, reserved: false, x: 40, y: 50 },
    { id: 6, capacity: 2, reserved: false, x: 70, y: 50 },
  ]);

  // Formulário
  const [clientName, setClientName] = useState<string>("");
  const [people, setPeople] = useState<number>(1);
  const [time, setTime] = useState<string>("");

  // Função para escolher automaticamente a melhor mesa
  const reserveTable = () => {
    const availableTables = tables.filter(
      (t) => !t.reserved && t.capacity >= people
    );

    if (availableTables.length === 0) {
      alert("Não há mesas disponíveis para este número de pessoas!");
      return;
    }

    // Escolhe a mesa com menor capacidade que ainda acomoda o grupo
    const chosenTable = availableTables.reduce((prev, curr) =>
      curr.capacity < prev.capacity ? curr : prev
    );

    const updatedTables = tables.map((t) =>
      t.id === chosenTable.id ? { ...t, reserved: true, clientName, time } : t
    );
    setTables(updatedTables);

    // Limpa o formulário
    setClientName("");
    setPeople(1);
    setTime("");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mapa de Reservas</h1>

      {/* Formulário de reserva */}
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          reserveTable();
        }}
        className="space-y-4 max-w-md"
      >
        <div className="space-y-2">
          <Label>Nome do Cliente</Label>
          <Input
            value={clientName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setClientName(e.target.value)
            }
            placeholder="Nome do cliente"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Número de Pessoas</Label>
          <Input
            type="number"
            min={1}
            value={people}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPeople(parseInt(e.target.value) || 1)
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Horário</Label>
          <Input
            type="time"
            value={time}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTime(e.target.value)
            }
            required
          />
        </div>

        <Button type="submit">Reservar Mesa</Button>
      </form>

      {/* Mapa visual */}
      <div className="relative w-full h-96 bg-gray-100 rounded-lg border border-gray-300">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`absolute w-16 h-16 rounded-full flex items-center justify-center font-semibold text-sm cursor-pointer 
              ${
                table.reserved
                  ? "bg-red-400 text-white"
                  : "bg-green-400 text-white"
              }
              hover:scale-110 transition-transform`}
            style={{
              left: `${table.x}%`,
              top: `${table.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            title={
              table.reserved
                ? `${table.clientName} - ${table.time}`
                : `Mesa livre - Capacidade: ${table.capacity}`
            }
          >
            {table.reserved ? table.clientName : table.capacity}
          </div>
        ))}
      </div>
    </div>
  );
}
