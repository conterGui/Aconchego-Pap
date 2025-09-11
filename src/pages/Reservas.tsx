import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, Users, Phone, Mail, User } from "lucide-react";

const Reservas = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time || !formData.guests) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    // Show success message
    toast({
      title: "Reserva solicitada!",
      description: "Entraremos em contato em breve para confirmar sua reserva.",
      className: "bg-gradient-gold text-primary"
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00"
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
                      <Label htmlFor="name" className="flex items-center space-x-2">
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
                      <Label htmlFor="email" className="flex items-center space-x-2">
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
                      <Label htmlFor="phone" className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-accent" />
                        <span>Telefone</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full"
                      />
                    </div>

                    {/* Data e Hora */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center space-x-2">
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
                        <Select value={formData.time} onValueChange={(value) => handleChange("time", value)}>
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
                      <Select value={formData.guests} onValueChange={(value) => handleChange("guests", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Quantas pessoas?" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "pessoa" : "pessoas"}
                            </SelectItem>
                          ))}
                          <SelectItem value="more">Mais de 8 pessoas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-gold text-primary shadow-gold hover:shadow-elegant transition-all duration-300"
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
                    <CardTitle className="font-playfair text-lg">Horário de Funcionamento</CardTitle>
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
                    <CardTitle className="font-playfair text-lg">Informações Importantes</CardTitle>
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