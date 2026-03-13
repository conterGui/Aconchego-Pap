import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  User,
  Ticket,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const Reservas = () => {
  const { toast } = useToast();
  const location = useLocation();

  type EventItem = {
    _id: string;
    title: string;
    description: string;
    eventDate: string;
    eventTime: string;
    location?: string;
  };

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/events");

        if (!res.ok) {
          throw new Error("Erro ao buscar eventos");
        }

        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    }

    fetchEvents();
  }, []);

  const eventData = location.state as {
    eventId?: string;
    title?: string;
    eventDate?: string;
    eventTime?: string;
    location?: string;
  } | null;

  const normalizeDate = (date?: string) => {
    if (!date) return "";

    // ISO: 2026-02-19T00:00:00.000Z
    if (date.includes("T")) {
      return date.split("T")[0];
    }

    // Brasileiro: 19/02/2026
    if (date.includes("/")) {
      const [day, month, year] = date.split("/");
      return `${year}-${month}-${day}`;
    }

    return date;
  };

  const [formData, setFormData] = useState({
    eventId: eventData?.eventId || "",
    name: "",
    email: "",
    phone: "",
    date: normalizeDate(eventData?.eventDate),
    time: eventData?.eventTime || "",
    guests: "",
  });

  useEffect(() => {
    if (!eventData?.eventId) return;
    if (events.length === 0) return;

    const selectedEvent = events.find((e) => e._id === eventData.eventId);

    if (!selectedEvent) return;

    setFormData((prev) => ({
      ...prev,
      eventId: selectedEvent._id,
      date: normalizeDate(selectedEvent.eventDate),
      time: selectedEvent.eventTime,
    }));
  }, [events, eventData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.guests
    ) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // ✅ Payload correto para o backend
    const payload = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      peopleQuantity: Number(formData.guests),
      reservationDate: new Date(formData.date),
      reservationTime: formData.time,
      eventId: formData.eventId || null,
    };

    try {
      // ✅ Enviar reserva para API
      const res = await fetch(import.meta.env.VITE_API_URL + "/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Erro ao enviar reserva");
      }

      const data = await res.json();
      console.log("Reserva criada:", data);

      // ✅ Toast sucesso
      toast({
        title: "Reserva solicitada!",
        description:
          "Entraremos em contacto em breve para confirmar sua reserva.",
        className: "bg-gradient-gold text-primary",
      });

      // ✅ Reset form depois do sucesso
      setFormData({
        eventId: "",
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
      });
    } catch (error) {
      console.error("Erro ao criar reserva:", error);

      toast({
        title: "Erro ao enviar reserva",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-20">
        {/* Page Header */}
        <section className="py-12 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-4">
                Reserve sua Mesa
              </h1>
              <p className="font-inter text-lg text-muted-foreground">
                Garante seu lugar na melhor atmosfera jazzística da cidade
              </p>
            </div>
          </div>
        </section>

        {/* Reservation Form */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl text-center">
                    Faça sua Reserva
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nome */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="flex items-center space-x-2"
                      >
                        <User className="h-4 w-4 text-accent" />
                        <span>Nome completo</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center space-x-2"
                      >
                        <Mail className="h-4 w-4 text-accent" />
                        <span>E-mail</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full"
                      />
                    </div>

                    {/* Telefone */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="flex items-center space-x-2"
                      >
                        <Phone className="h-4 w-4 text-accent" />
                        <span>Telemóvel</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(351) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full"
                      />
                    </div>

                    {/* Evento (opcional) */}
                    <div className="space-y-2">
                      <Label className="flex items-center space-x-2">
                        <Ticket className="h-4 w-4 text-accent" />
                        <span>Evento (opcional)</span>
                      </Label>

                      <Select
                        value={formData.eventId}
                        onValueChange={(value) => {
                          const selectedEvent = events.find(
                            (e) => e._id === value,
                          );

                          setFormData((prev) => ({
                            ...prev,
                            eventId: value,
                            date: normalizeDate(selectedEvent?.eventDate),
                            time: selectedEvent?.eventTime || "",
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              loadingEvents
                                ? "Carregando eventos..."
                                : "Sem evento"
                            }
                          />
                        </SelectTrigger>

                        <SelectContent>
                          {events.map((event) => (
                            <SelectItem key={event._id} value={event._id}>
                              {event.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Data e Hora */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="date"
                          className="flex items-center space-x-2"
                        >
                          <Calendar className="h-4 w-4 text-accent" />
                          <span>Data</span>
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleChange("date", e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>Horário</span>
                        </Label>
                        <Select
                          value={formData.time}
                          onValueChange={(value) => handleChange("time", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o horário" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Número de pessoas */}
                    <div className="space-y-2">
                      <Label className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-accent" />
                        <span>Número de pessoas</span>
                      </Label>
                      <Select
                        value={formData.guests}
                        onValueChange={(value) => handleChange("guests", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Quantas pessoas?" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "pessoa" : "pessoas"}
                            </SelectItem>
                          ))}
                          <SelectItem value="more">
                            Mais de 8 pessoas
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full px-4 py-3 rounded-lg bg-gradient-gold text-primary shadow-gold font-medium hover:shadow-elegant transition-all duration-200 hover:scale-105"
                      size="lg"
                    >
                      Enviar Reserva
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair text-lg">
                      Horário de Funcionamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Segunda a Quinta</span>
                      <span>08:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sexta e Sábado</span>
                      <span>08:00 - 00:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo</span>
                      <span>09:00 - 21:00</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair text-lg">
                      Informações Importantes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>• Reservas confirmadas por telefone ou e-mail</p>
                    <p>• Tolerância de 15 minutos para chegada</p>
                    <p>• Mesa disponível por 2 horas nos fins de semana</p>
                    <p>• Política de cancelamento até 2 horas antes</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Reservas;
