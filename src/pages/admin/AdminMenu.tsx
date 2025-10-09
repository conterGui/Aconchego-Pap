import React, { useState } from "react";
import { MenuItem, menuItems } from "@/pages/data/menuData";
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
import HeaderAdmin from "@/components/HeaderAdmin";

export default function MenuAdmin() {
  const [items, setItems] = useState<MenuItem[]>(menuItems);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Estados do formulário
  const [formData, setFormData] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    isSpecial: false,
    allergens: [],
  });

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    const newItem: MenuItem = {
      id: Date.now(),
      ...formData,
    };
    setItems((prev) => [...prev, newItem]);
    setFormData({
      name: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      isSpecial: false,
      allergens: [],
    });
    setIsAddOpen(false);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (item: MenuItem) => {
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
    setIsEditOpen(false);
  };

  return (
    <div className="p-6">
      <HeaderAdmin />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 mt-12">
        <h1 className="text-2xl font-semibold tracking-tight">
          Gerenciamento de Menu
        </h1>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Produto</DialogTitle>
            </DialogHeader>
            <StockForm
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

      {/* Lista de produtos */}
      {filteredItems.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-md transition-all duration-200"
            >
              {item.image && (
                <div className="w-full h-40 bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-medium">
                      {item.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {item.isSpecial && (
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">
                      Especial
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">
                    {item.price.toFixed(2)} €
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {item.category}
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-12 text-sm">
          Nenhum produto encontrado.
        </div>
      )}

      {/* Modal de edição */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          <StockForm
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

/* 🧩 Componente de Formulário Reutilizável */
interface StockFormProps {
  formData: Omit<MenuItem, "id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<MenuItem, "id">>>;
  onSubmit: () => void;
  onCancel: () => void;
}

function StockForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
}: StockFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6 max-h-[80vh] overflow-y-auto p-1"
    >
      {/* Preview da imagem */}
      {formData.image && (
        <div className="w-full flex justify-center bg-transparent">
          <img
            src={formData.image}
            alt={formData.name || "Pré-visualização"}
            className="w-full max-w-md h-56 object-contain rounded-lg shadow-sm bg-transparent"
          />
        </div>
      )}

      {/* Nome e Preço lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nome</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nome do produto"
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
              setFormData({
                ...formData,
                price: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <Label>Descrição</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Descreve o produto..."
          rows={3}
          required
        />
      </div>

      {/* Categoria */}
      <div className="space-y-2">
        <Label>Categoria</Label>
        <Input
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          placeholder="cafes, doces, bebidas..."
          required
        />
      </div>

      {/* Imagem */}
      <div className="space-y-2">
        <Label>Imagem (URL)</Label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="/menu/expresso.png"
        />
      </div>

      {/* Botões */}
      <DialogFooter className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </DialogFooter>
    </form>
  );
}
