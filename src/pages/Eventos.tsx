import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, Music, MapPin, Ticket } from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  artist: string;
  price: number;
  venue: string;
  category: "jazz" | "workshop" | "degustacao" | "especial";
  featured?: boolean;
};

const Eventos = () => {
  const events: Event[] = [
    {
      id: 1,
      title: "Noite do Jazz Clássico",
      date: "2024-01-15",
      time: "20:00",
      description:
        "Uma noite especial com os clássicos do jazz americano. Trio formado por piano, contrabaixo e bateria apresenta sucessos de Miles Davis, John Coltrane e Bill Evans.",
      artist: "Trio Bossa Jazz",
      price: 30.0, // Ajustado
      venue: "Salão Principal",
      category: "jazz",
      featured: true,
    },
    {
      id: 2,
      title: "Workshop: Arte do Latte",
      date: "2024-01-18",
      time: "15:00",
      description:
        "Aprenda técnicas profissionais de latte art com nosso barista especializado. Inclui certificado e degustação de cafés especiais.",
      artist: "Chef Barista Roberto Silva",
      price: 35.0, // Preço mais acessível
      venue: "Espaço Gourmet",
      category: "workshop",
    },
    {
      id: 3,
      title: "Degustação de Cafés do Mundo",
      date: "2024-01-22",
      time: "16:30",
      description:
        "Viagem pelos sabores dos melhores cafés do mundo. Degustação comentada de 8 origens diferentes com harmonização de doces.",
      artist: "Sommelier de Café Ana Costa",
      price: 40.0, // Ajustado
      venue: "Mesa do Sommelier",
      category: "degustacao",
      featured: true,
    },
    {
      id: 4,
      title: "Jazz & Poetry Night",
      date: "2024-01-25",
      time: "19:30",
      description:
        "Encontro entre música e literatura. Poetas locais declamam enquanto o quarteto de jazz improvisa acompanhamentos únicos.",
      artist: "Quarteto Verbal & Jazz",
      price: 25.0, // Ajustado
      venue: "Salão Principal",
      category: "especial",
    },
    {
      id: 5,
      title: "Manhã de Bossa Nova",
      date: "2024-01-28",
      time: "10:00",
      description:
        "Brunch especial com o melhor da bossa nova brasileira. Inclui café da manhã completo e apresentação ao vivo.",
      artist: "Duo Ipanema",
      price: 40.0, // Ajustado
      venue: "Terraço Jazz",
      category: "jazz",
    },
    {
      id: 6,
      title: "Masterclass: Torra Artesanal",
      date: "2024-02-01",
      time: "14:00",
      description:
        "Processo completo da torra artesanal de café. Dos grãos verdes até a xícara perfeita. Leve sua própria mistura para casa.",
      artist: "Mestre Torrador João Café",
      price: 45.0, // Preço mais acessível
      venue: "Torrefação",
      category: "workshop",
      featured: true,
    },
    {
      id: 7,
      title: "Noite dos Instrumentos",
      date: "2024-02-05",
      time: "21:00",
      description:
        "Cada músico apresenta seu instrumento em solos únicos. Piano, saxofone, trompete e guitarra em harmonias improvisadas.",
      artist: "Coletivo Jazz SP",
      price: 30.0, // Ajustado
      venue: "Salão Principal",
      category: "jazz",
    },
    {
      id: 8,
      title: "Festival do Café Gelado",
      date: "2024-02-08",
      time: "13:00",
      description:
        "Celebração dos métodos de extração a frio. Cold brew, ice drip, nitro coffee e criações autorais dos nossos baristas.",
      artist: "Equipe Aconchego",
      price: 18.0, // Ajustado para acessibilidade
      venue: "Todo o Café",
      category: "degustacao",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "jazz":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "workshop":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "degustacao":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      case "especial":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "jazz":
        return "Jazz";
      case "workshop":
        return "Workshop";
      case "degustacao":
        return "Degustação";
      case "especial":
        return "Especial";
      default:
        return category;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
                Eventos Especiais
              </h1>
              <p className="font-inter text-lg text-muted-foreground">
                Momentos únicos que celebram a cultura do café e do jazz
              </p>
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair font-bold text-2xl text-foreground mb-6">
              Eventos em Destaque
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {events
                .filter((event) => event.featured)
                .map((event) => (
                  <Card
                    key={event.id}
                    className="group hover:shadow-elegant transition-all duration-300 border-accent/20"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={getCategoryColor(event.category)}>
                          {getCategoryName(event.category)}
                        </Badge>
                        <Badge className="bg-gradient-gold text-primary">
                          Destaque
                        </Badge>
                      </div>
                      <CardTitle className="font-playfair text-xl">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-accent" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Music className="h-4 w-4 text-accent" />
                          <span>{event.artist}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span>{event.venue}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {event.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Ticket className="h-4 w-4 text-accent" />
                          <span className="font-bold text-accent text-lg">
                            € {event.price.toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                        <Button
                          asChild
                          className="bg-gradient-gold text-primary shadow-gold"
                        >
                          <a href="/reservas">Reserve seu lugar</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* All Events */}
        <section className="py-8 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair font-bold text-2xl text-foreground mb-6">
              Todos os Eventos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="group hover:shadow-elegant transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getCategoryColor(event.category)}>
                        {getCategoryName(event.category)}
                      </Badge>
                      {event.featured && (
                        <Badge className="bg-gradient-gold text-primary">
                          Destaque
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="font-playfair text-lg">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-accent" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Music className="h-4 w-4 text-accent" />
                        <span>{event.artist}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-accent">
                        R$ {event.price.toFixed(2).replace(".", ",")}
                      </span>
                      <Button
                        size="sm"
                        asChild
                        className="bg-gradient-gold text-primary"
                      >
                        <a href="/reservas">Reservar</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Eventos;
