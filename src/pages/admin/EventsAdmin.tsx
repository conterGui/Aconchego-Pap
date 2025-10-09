import React, { useState } from "react";
import { Event, events } from "@/pages/data/eventsData";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import HeaderAdmin from "@/components/HeaderAdmin";

export default function EventsAdmin() {
  const [items, setItems] = useState<Event[]>(events);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Event | null>(null);

  const [formData, setFormData] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    description: "",
    artist: "",
    price: 0,
    venue: "",
    category: "jazz",
    image: "",
    featured: false,
  });

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    const newEvent: Event = { id: Date.now(), ...formData };
    setItems((prev) => [...prev, newEvent]);
    resetForm();
    setIsAddOpen(false);
  };

  const handleEdit = (item: Event) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id ? { ...editingItem, ...formData } : item
      )
    );
    setEditingItem(null);
    resetForm();
    setIsEditOpen(false);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      description: "",
      artist: "",
      price: 0,
      venue: "",
      category: "jazz",
      image: "",
      featured: false,
    });
  };

  return (
    <div className="p-6">
      <HeaderAdmin />
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-12">
        <h1 className="text-2xl font-semibold">Gerenciamento de Eventos</h1>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Evento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Evento</DialogTitle>
            </DialogHeader>
            <EventForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleAdd}
              onCancel={() => setIsAddOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Pesquisa */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader className="p-0">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
              )}
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <CardTitle className="flex justify-between items-center">
                <span>{event.title}</span>
                {event.featured && (
                  <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">
                    Destaque
                  </span>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>
              <p className="text-sm font-semibold">
                {event.price.toFixed(2)} €
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {event.date} • {event.time}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                Local: {event.venue}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                Categoria: {event.category}
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(event)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de edição */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
          </DialogHeader>
          <EventForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSaveEdit}
            onCancel={() => setIsEditOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* 🧩 Formulário Reutilizável */
interface EventFormProps {
  formData: Omit<Event, "id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Event, "id">>>;
  onSubmit: () => void;
  onCancel: () => void;
}

function EventForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
}: EventFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label>Título</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Nome do evento"
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="space-y-2 flex-1">
          <Label>Data</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2 flex-1">
          <Label>Hora</Label>
          <Input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Artista / Palestrante</Label>
        <Input
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
          placeholder="Nome do artista"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Descrição</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Detalhes do evento..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Local</Label>
        <Input
          value={formData.venue}
          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          placeholder="Ex: Salão Principal"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Preço (€)</Label>
        <Input
          type="number"
          step="0.1"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Categoria</Label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value as Event["category"],
            })
          }
          className="w-full border rounded-md p-2 bg-background"
        >
          <option value="jazz">Jazz</option>
          <option value="workshop">Workshop</option>
          <option value="degustacao">Degustação</option>
          <option value="especial">Especial</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Imagem (URL)</Label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="/events/jazzClassico.jpg"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, featured: !!checked })
          }
        />
        <Label htmlFor="featured">Evento em destaque</Label>
      </div>

      <DialogFooter className="flex justify-end gap-2 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </form>
  );
}
