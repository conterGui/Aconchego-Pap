import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, Music, MapPin, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Eventos = () => {
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

  type EventItem = {
    _id: string;
    image?: string;
    title: string;
    eventDate: string;
    eventTime: string;
    description: string;
    artist: string;
    price: number;
    venue: string;
    category: "jazz" | "workshop" | "degustacao" | "especial";
    featured?: boolean;
    location?: string;
  };

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/events");

        if (!res.ok) {
          throw new Error("Erro na resposta da API");
        }

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Erro ao carregar eventos:", err);
        setError("Não foi possível carregar os eventos.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

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
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="text-center mt-20">
        <p>Carregando eventos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  console.log(events[0]);

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
                    key={event._id}
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
                          <span>{formatDate(event.eventDate)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{event.eventTime}</span>
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
                        <Button
                          asChild
                          className="bg-gradient-gold text-primary shadow-gold"
                        >
                          <Link to={`/eventos/${event._id}`}>Ver Detalhes</Link>
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
                  key={event._id}
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
                        <span>{formatDate(event.eventDate)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-accent" />
                        <span>{event.eventTime}</span>
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
                      <Button
                        size="sm"
                        asChild
                        className="bg-gradient-gold text-primary"
                      >
                        <Link to={`/eventos/${event._id}`}>Ver Detalhes</Link>
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
