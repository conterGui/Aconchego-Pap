import { useState } from "react";
import { Product, products as initialProducts } from "../data/lojaData";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import HeaderAdmin from "@/components/HeaderAdmin";
import { Plus, Search } from "lucide-react";

export default function StorkAdmin() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSave = (product: Product) => {
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? product : p))
      );
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setEditingProduct(null);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 space-y-10">
      <HeaderAdmin />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Gerenciamento de Estoque
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
            </DialogHeader>
            <ProductForm onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Pesquisa */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar produto..."
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setProducts(
              value
                ? initialProducts.filter((p) =>
                    p.name.toLowerCase().includes(value)
                  )
                : initialProducts
            );
          }}
          className="pl-9"
        />
      </div>

      {/* Lista de Produtos */}
      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-md transition-all duration-200"
            >
              {product.image && (
                <div className="relative w-full h-52">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain bg-transparent p-2"
                  />
                </div>
              )}

              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-medium">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {product.roast.charAt(0).toUpperCase() +
                    product.roast.slice(1)}{" "}
                  • {product.weight}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 pt-2">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-base">
                    € {product.price.toFixed(2)}
                  </span>
                  {product.inStock ? (
                    <Badge className="bg-green-500">Em stock</Badge>
                  ) : (
                    <Badge variant="destructive">Esgotado</Badge>
                  )}
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Origem: {product.origin}</p>
                  <p>Tipo: {product.type}</p>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setEditingProduct(product)}
                      >
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Produto</DialogTitle>
                      </DialogHeader>
                      <ProductForm initialData={product} onSave={handleSave} />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    Excluir
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
    </div>
  );
}

// ----------------------
// FORM COMPONENT
// ----------------------

interface ProductFormProps {
  initialData?: Product;
  onSave: (product: Product) => void;
}

function ProductForm({ initialData, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    initialData || {
      id: 0,
      name: "",
      price: 0,
      weight: "",
      roast: "medio",
      type: "grao",
      origin: "",
      description: "",
      inStock: true,
      image: "",
    }
  );

  const handleChange = (field: keyof Product, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
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

      {/* Nome e descrição */}
      <div className="space-y-2">
        <Label>Nome</Label>
        <Input
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Ex: Blend Jazz Especial"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Descrição</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Breve descrição do produto"
          rows={3}
        />
      </div>

      {/* Preço e Peso */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Preço (€)</Label>
          <Input
            type="number"
            step="0.1"
            value={formData.price}
            onChange={(e) =>
              handleChange("price", parseFloat(e.target.value) || 0)
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Peso</Label>
          <Input
            value={formData.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
            placeholder="Ex: 250g"
            required
          />
        </div>
      </div>

      {/* Torra e Tipo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Torra</Label>
          <Select
            value={formData.roast}
            onValueChange={(val) => handleChange("roast", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="claro">Claro</SelectItem>
              <SelectItem value="medio">Médio</SelectItem>
              <SelectItem value="escuro">Escuro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tipo</Label>
          <Select
            value={formData.type}
            onValueChange={(val) => handleChange("type", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grao">Grão</SelectItem>
              <SelectItem value="moido">Moído</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Origem */}
      <div className="space-y-2">
        <Label>Origem</Label>
        <Input
          value={formData.origin}
          onChange={(e) => handleChange("origin", e.target.value)}
          placeholder="Ex: Brasil / Colômbia"
        />
      </div>

      {/* Imagem */}
      <div className="space-y-2">
        <Label>Imagem (URL)</Label>
        <Input
          value={formData.image}
          onChange={(e) => handleChange("image", e.target.value)}
          placeholder="/products/BlendJazz.png"
        />
      </div>

      {/* Estoque */}
      <div className="flex items-center justify-between border-t pt-4">
        <Label>Disponível em Stock</Label>
        <Switch
          checked={formData.inStock}
          onCheckedChange={(checked) => handleChange("inStock", checked)}
        />
      </div>

      {/* Botão */}
      <Button type="submit" className="w-full mt-4">
        {initialData ? "Salvar Alterações" : "Adicionar Produto"}
      </Button>
    </form>
  );
}
