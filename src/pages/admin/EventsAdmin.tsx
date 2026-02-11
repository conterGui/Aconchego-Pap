import React, { useState, useEffect } from "react";
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

interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  artist: string;
  price: number;
  venue: string;
  category: string;
  image?: string;
  featured: boolean;
}

export default function EventsAdmin() {
  const [items, setItems] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Event | null>(null);

  const [formData, setFormData] = useState<Omit<Event, "_id">>({
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

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:3000/api/events");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEvents();
  }, []);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

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

  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newEvent = await res.json();
      setItems((prev) => [...prev, newEvent]);
      resetForm();
      setIsAddOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: Event) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsEditOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/events/${editingItem._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const updatedEvent = await res.json();
      setItems((prev) =>
        prev.map((item) =>
          item._id === editingItem._id ? updatedEvent : item,
        ),
      );
      setEditingItem(null);
      resetForm();
      setIsEditOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/events/${id}`, {
        method: "DELETE",
      });
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-grow container mx-auto px-4 py-16 pt-16">
      <HeaderAdmin />
      <div className="flex justify-between items-center mb-6 mt-12">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Gerenciamento de Eventos
          </h1>
        </div>

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

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((event) => (
          <Card key={event._id} className="overflow-hidden">
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
                  onClick={() => handleDelete(event._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="w-full max-w-3xl sm:max-w-2xl md:max-w-3xl mx-auto my-8 rounded-lg bg-background shadow-lg overflow-hidden">
          {/* Container rolável */}
          <div className="max-h-[70vh] sm:max-h-[80vh] overflow-y-auto p-6">
            <DialogHeader>
              <DialogTitle>Editar Evento</DialogTitle>
            </DialogHeader>

            <EventForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSaveEdit}
              onCancel={() => setIsEditOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface EventFormProps {
  formData: Omit<Event, "_id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Event, "_id">>>;
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
      {/* Campos exatamente como seu código atual */}
      {/* Mantendo Título, Data, Hora, Artista, Descrição, Local, Preço, Categoria, Imagem e Featured */}
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
            setFormData({ ...formData, category: e.target.value })
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
