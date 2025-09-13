import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Coffee, Utensils, Cookie, Star } from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  isSpecial?: boolean;
  allergens?: string[];
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("cafes");

  const menuItems: MenuItem[] = [
    // Cafés
    {
      id: 1,
      name: "Espresso Jazz",
      price: 8.5,
      description: "Blend exclusivo da casa com notas de chocolate amargo",
      category: "cafes",
      image: "/menu/expresso.png",
    },
    {
      id: 2,
      name: "Cappuccino Blue Note",
      price: 12.0,
      description: "Cappuccino cremoso com arte latte e canela",
      category: "cafes",
      image: "/menu/capuccino.png",
    },
    {
      id: 3,
      name: "Macchiato Miles",
      price: 10.5,
      description: "Espresso com espuma de leite e caramelo",
      category: "cafes",
      image: "/menu/macciato.png",
    },
    {
      id: 4,
      name: "Café Filtrado V60",
      price: 14.9,
      description: "Método manual com grãos especiais, acidez equilibrada",
      category: "cafes",
      isSpecial: true,
      image: "/menu/v60.png",
    },
    {
      id: 5,
      name: "Cold Brew Coltrane",
      price: 13.5,
      description: "Extração a frio por 24h, doce e suave",
      category: "cafes",
      image: "/menu/coldbrew.png",
    },

    // Bebidas
    {
      id: 6,
      name: "Chocolate Quente Duke",
      price: 11.9,
      description: "Chocolate belga com chantilly e marshmallow",
      category: "bebidas",
      allergens: ["leite"],
      image: "/menu/chocolate.png",
    },
    {
      id: 7,
      name: "Chai Latte Ella",
      price: 13.9,
      description: "Especiarias indianas com leite vaporizado",
      category: "bebidas",
      allergens: ["leite"],
      image: "/menu/chailatte.png",
    },
    {
      id: 8,
      name: "Smoothie Berry Fitzgerald",
      price: 16.9,
      description: "Frutas vermelhas, banana e iogurte grego",
      category: "bebidas",
      allergens: ["leite"],
      image: "/menu/smoothie.png",
    },
    {
      id: 9,
      name: "Limonada Sparkling",
      price: 9.9,
      description: "Limão siciliano, água com gás e hortelã",
      category: "bebidas",
      image: "/menu/lemonade.png",
    },
    {
      id: 10,
      name: "Suco Natural Armstrong",
      price: 8.9,
      description: "Laranja, cenoura e gengibre",
      category: "bebidas",
      image: "/menu/juice.png",
    },

    // Doces
    {
      id: 11,
      name: "Cheesecake New York",
      price: 15.9,
      description: "Clássico americano com calda de frutas vermelhas",
      category: "doces",
      allergens: ["leite", "ovos", "glúten"],
      isSpecial: true,
      image: "/menu/cheesecake.png",
    },
    {
      id: 12,
      name: "Brownie Davis",
      price: 12.9,
      description: "Chocolate meio amargo com nozes e sorvete",
      category: "doces",
      allergens: ["leite", "ovos", "glúten", "nozes"],
      image: "/menu/brownie.png",
    },
    {
      id: 13,
      name: "Tiramisu Monk",
      price: 17.9,
      description: "Clássico italiano com café espresso",
      category: "doces",
      allergens: ["leite", "ovos", "glúten"],
      image: "/menu/tiramisu.png",
    },
    {
      id: 14,
      name: "Croissant de Amêndoa",
      price: 8.9,
      description: "Massa folhada com creme de amêndoas",
      category: "doces",
      allergens: ["leite", "ovos", "glúten", "amêndoas"],
      image: "/menu/croissant.png",
    },
    {
      id: 15,
      name: "Muffin de Blueberry",
      price: 7.9,
      description: "Muffin artesanal com frutas frescas",
      category: "doces",
      allergens: ["leite", "ovos", "glúten"],
      image: "/menu/muffin.png",
    },

    // Especiais
    {
      id: 16,
      name: "Affogato al Caffè",
      price: 14.9,
      description: "Sorvete de baunilha afogado no espresso quente",
      category: "especiais",
      allergens: ["leite"],
      isSpecial: true,
      image: "/menu/affogato.png",
    },
    {
      id: 17,
      name: "Irish Coffee Parker",
      price: 18.9,
      description: "Café, whisky irlandês, açúcar e chantilly",
      category: "especiais",
      allergens: ["leite"],
      isSpecial: true,
      image: "/menu/irish.png",
    },
    {
      id: 18,
      name: "Café Bombom Jobim",
      price: 13.9,
      description: "Espresso com leite condensado em camadas",
      category: "especiais",
      allergens: ["leite"],
      isSpecial: true,
      image: "/menu/bombom.png",
    },
  ];

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cafes":
        return <Coffee className="h-5 w-5" />;
      case "bebidas":
        return <Coffee className="h-5 w-5" />;
      case "doces":
        return <Cookie className="h-5 w-5" />;
      case "especiais":
        return <Star className="h-5 w-5" />;
      default:
        return <Utensils className="h-5 w-5" />;
    }
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
                Nosso Menu
              </h1>
              <p className="font-inter text-lg text-muted-foreground">
                Sabores inspirados pelos grandes mestros do jazz
              </p>
            </div>
          </div>
        </section>

        {/* Menu Categories */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Tabs
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger
                  value="cafes"
                  className="flex items-center space-x-2"
                >
                  <Coffee className="h-4 w-4" />
                  <span>Cafés</span>
                </TabsTrigger>
                <TabsTrigger
                  value="bebidas"
                  className="flex items-center space-x-2"
                >
                  <Coffee className="h-4 w-4" />
                  <span>Bebidas</span>
                </TabsTrigger>
                <TabsTrigger
                  value="doces"
                  className="flex items-center space-x-2"
                >
                  <Cookie className="h-4 w-4" />
                  <span>Doces</span>
                </TabsTrigger>
                <TabsTrigger
                  value="especiais"
                  className="flex items-center space-x-2"
                >
                  <Star className="h-4 w-4" />
                  <span>Especiais</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedCategory}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <Card
                      key={item.id}
                      className="group hover:shadow-elegant transition-all duration-300"
                    >
                      <CardHeader>
                        <div className="w-full h-32 bg-card rounded-md mb-4 flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover block"
                            />
                          ) : (
                            getCategoryIcon(item.category)
                          )}
                        </div>

                        <div className="flex items-start justify-between">
                          <CardTitle className="font-playfair text-lg">
                            {item.name}
                            {item.isSpecial && (
                              <Badge className="ml-2 bg-gradient-gold text-primary">
                                Especial
                              </Badge>
                            )}
                          </CardTitle>
                          <span className="font-bold text-accent text-xl">
                            € {item.price.toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-muted-foreground mb-4 text-sm">
                          {item.description}
                        </p>

                        {item.allergens && (
                          <div className="mb-4">
                            <p className="text-xs text-muted-foreground mb-2">
                              <strong>Contém:</strong>
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {item.allergens.map((allergen, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {allergen}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;
