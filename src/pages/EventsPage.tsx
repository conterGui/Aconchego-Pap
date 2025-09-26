import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  Music,
  MapPin,
  Ticket,
  Share2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { events } from "./eventsData";

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find((e) => e.id === Number(id));

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Link copiado para a área de transferência!");
      })
      .catch(() => {
        toast.error("Erro ao copiar link");
      });
  };

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Ticket className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold">Evento não encontrado</h2>
            <p className="text-muted-foreground max-w-md">
              O evento que você está procurando não existe ou foi removido.
            </p>
            <Link
              to="/eventos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-primary rounded-lg font-medium shadow-gold hover:shadow-elegant transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Eventos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <div className="mb-6  mt-10">
          <Link
            to="/eventos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar aos eventos
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant border-0">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-48 md:h-64 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent relative overflow-hidden">
                    {event.image && (
                      <img
                        src={event.image}
                        alt="Event"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {/* Share Button */}
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={handleShare}
                      className="p-2 bg-white backdrop-blur-sm rounded-full shadow-elegant hover:shadow-gold transition-all duration-200 hover:scale-110"
                    >
                      <Share2 className="w-4 h-4 text-muted-foreground hover:text-accent transition-colors" />
                    </button>
                  </div>
                </div>

                <CardHeader className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors">
                      {event.category}
                    </Badge>
                    {event.featured && (
                      <Badge className="bg-gradient-gold text-primary shadow-gold">
                        Destaque
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="text-2xl md:text-3xl font-playfair leading-tight">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Event Details Grid */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:secondary transition-colors">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Calendar className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Data</p>
                        <p className="font-medium">{event.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:secondary transition-colors">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Clock className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Horário</p>
                        <p className="font-medium">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:secondary transition-colors">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Music className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Artista</p>
                        <p className="font-medium">{event.artist}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:secondary transition-colors">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <MapPin className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Local</p>
                        <p className="font-medium">{event.venue}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Sobre o Evento</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 lg:sticky lg:top-6">
                {/* Booking Card */}
                <Card className="shadow-elegant border-0">
                  <CardContent className="p-6 space-y-6">
                    <div className="text-center space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Preço do bilhete
                      </p>
                      <div className="text-3xl font-bold text-accent">
                        € {event.price.toFixed(2).replace(".", ",")}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        por pessoa
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Link to="/reservas" className="block">
                        <button className="w-full px-6 py-4 rounded-lg bg-gradient-gold text-primary shadow-gold font-medium text-lg hover:shadow-elegant transition-all duration-200 hover:scale-105">
                          <Ticket className="w-5 h-5 mr-2 inline" />
                          Reservar Agora
                        </button>
                      </Link>

                      <button className="w-full px-6 py-4 rounded-lg border border-accent/20 text-accent hover:bg-accent/5 font-medium transition-all duration-200">
                        Adicionar ao Calendário
                      </button>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Ingressos disponíveis
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Event Info */}
                <Card className="shadow-elegant border-0">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">
                      Informações Importantes
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Capacidade:
                        </span>
                        <span className="font-medium">150 pessoas</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Idade mínima:
                        </span>
                        <span className="font-medium">16 anos</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duração:</span>
                        <span className="font-medium">2 horas</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Categoria:
                        </span>
                        <Badge className="text-xs bg-accent/10 text-accent">
                          {event.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-4 border-t text-xs text-muted-foreground">
                      <p>
                        Política de cancelamento: Reembolso integral até 24h
                        antes do evento.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="shadow-elegant border-0">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold">Alguma dúvida?</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        Entre em contacto conosco para mais informações sobre
                        este evento.
                      </p>

                      <button className="w-full text-left p-2 rounded text-accent hover:bg-accent/5 transition-colors">
                        (11) 9999-9999
                      </button>

                      <button className="w-full text-left p-2 rounded text-accent hover:bg-accent/5 transition-colors">
                        contato@eventos.com
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventPage;
