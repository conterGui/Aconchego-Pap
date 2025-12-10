import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Coffee, Utensils, Cookie, Star } from "lucide-react";

const Menu = () => {
  type MenuItem = {
    _id: string;
    name: string;
    description: string;
    image?: string;
    price: number;
    category: string;
    isSpecial?: boolean;
    allergens?: string[];
    available: boolean;
  };
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("cafes");

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

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("http://localhost:3000/api/menu");
        const data = await res.json();

        // Agrupado por categoria -> transforma em array
        const array = Object.values(data).flat() as MenuItem[];
        setMenuItems(array);
      } catch (err) {
        console.error("Erro ao carregar menu:", err);
        setMenuItems([]);
      }
    }

    fetchMenu();
  }, []);

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
                      key={item._id}
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
