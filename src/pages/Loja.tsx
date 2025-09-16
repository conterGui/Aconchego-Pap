import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Coffee, Filter, Package, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cartcontext"; // import do contexto

type Product = {
  id: number;
  name: string;
  price: number;
  weight: string;
  roast: string;
  type: string;
  origin: string;
  description: string;
  inStock: boolean;
};

const Loja = () => {
  const [selectedRoast, setSelectedRoast] = useState<string>("all");
  const [selectedWeight, setSelectedWeight] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const { addItem } = useCart(); // pegar a função para adicionar itens

  const products: Product[] = [
    {
      id: 1,
      name: "Blend Jazz Especial",
      price: 12.5,
      weight: "250g",
      roast: "medio",
      type: "grao",
      origin: "Brasil/Colômbia",
      description: "Blend exclusivo da casa com notas de chocolate e caramelo",
      inStock: false,
    },
    {
      id: 2,
      name: "Espresso Forte",
      price: 18.0,
      weight: "500g",
      roast: "escuro",
      type: "moido",
      origin: "Itália",
      description: "Moagem fina para espresso perfeito, sabor intenso",
      inStock: true,
    },
    {
      id: 3,
      name: "Bourbon Santos",
      price: 11.5,
      weight: "250g",
      roast: "claro",
      type: "grao",
      origin: "São Paulo - Brasil",
      description: "Café doce e suave, ideal para métodos filtrados",
      inStock: true,
    },
    {
      id: 4,
      name: "Colombian Premium",
      price: 17.0,
      weight: "500g",
      roast: "medio",
      type: "grao",
      origin: "Huila - Colômbia",
      description: "Acidez equilibrada com notas frutadas",
      inStock: true,
    },
    {
      id: 5,
      name: "Ethiopian Yirgacheffe",
      price: 13.5,
      weight: "250g",
      roast: "claro",
      type: "moido",
      origin: "Etiópia",
      description: "Café floral com notas cítricas, moído para V60",
      inStock: true,
    },
    {
      id: 6,
      name: "French Roast",
      price: 22.0,
      weight: "1kg",
      roast: "escuro",
      type: "grao",
      origin: "Blend Internacional",
      description: "Torra francesa tradicional, corpo encorpado",
      inStock: true,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const roastMatch =
      selectedRoast === "all" || product.roast === selectedRoast;
    const weightMatch =
      selectedWeight === "all" || product.weight === selectedWeight;
    const typeMatch = selectedType === "all" || product.type === selectedType;
    return roastMatch && weightMatch && typeMatch;
  });

  const getRoastBadgeColor = (roast: string) => {
    switch (roast) {
      case "claro":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      case "medio":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "escuro":
        return "bg-stone-100 text-stone-800 dark:bg-stone-900 dark:text-stone-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    return type === "grao"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-20">
        {/* Page Header */}
        <section className="py-12 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-4">
                Loja de Cafés
              </h1>
              <p className="font-inter text-lg text-muted-foreground">
                Leve para casa a qualidade do Aconchego
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Filtros:</span>
              </div>

              <Select value={selectedRoast} onValueChange={setSelectedRoast}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Torra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as torras</SelectItem>
                  <SelectItem value="claro">Torra Clara</SelectItem>
                  <SelectItem value="medio">Torra Média</SelectItem>
                  <SelectItem value="escuro">Torra Escura</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedWeight} onValueChange={setSelectedWeight}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Peso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os pesos</SelectItem>
                  <SelectItem value="250g">250g</SelectItem>
                  <SelectItem value="500g">500g</SelectItem>
                  <SelectItem value="1kg">1kg</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="grao">Grão</SelectItem>
                  <SelectItem value="moido">Moído</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSelectedRoast("all");
                  setSelectedWeight("all");
                  setSelectedType("all");
                }}
              >
                Limpar filtros
              </Button>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group hover:shadow-elegant transition-all duration-300 ${
                    !product.inStock ? "opacity-75" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <Coffee className="h-12 w-12 text-muted-foreground" />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getRoastBadgeColor(product.roast)}>
                        Torra {product.roast}
                      </Badge>
                      <Badge className={getTypeBadgeColor(product.type)}>
                        {product.type === "grao" ? "Grão" : "Moído"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center space-x-1"
                      >
                        <Package className="h-3 w-3" />
                        <span>{product.weight}</span>
                      </Badge>
                    </div>

                    <CardTitle className="font-playfair text-xl">
                      {product.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Origem:</strong> {product.origin}
                    </p>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-accent text-2xl">
                          € {product.price.toFixed(2).replace(".", ",")}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          por {product.weight}
                        </div>
                      </div>

                      <Button
                        className={`${
                          product.inStock
                            ? "bg-gradient-gold text-primary shadow-gold hover:shadow-elegant"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                        disabled={!product.inStock}
                        onClick={() =>
                          product.inStock &&
                          addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            image: undefined,
                          })
                        }
                      >
                        {product.inStock ? (
                          <>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Comprar
                          </>
                        ) : (
                          "Esgotado"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Coffee className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-playfair text-xl text-foreground mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros para encontrar o café perfeito para
                  você.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Loja;
