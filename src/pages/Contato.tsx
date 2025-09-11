import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Send } from "lucide-react";

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve. Obrigado!",
      className: "bg-gradient-gold text-primary"
    });

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-accent" />,
      title: "Endereço",
      content: "Rua do Jazz, 123 - Vila Madalena\nSão Paulo - SP, 05433-000"
    },
    {
      icon: <Phone className="h-5 w-5 text-accent" />,
      title: "Telefone",
      content: "(11) 98765-4321\n(11) 3456-7890"
    },
    {
      icon: <Mail className="h-5 w-5 text-accent" />,
      title: "E-mail",
      content: "contato@cafejazz.com.br\neventos@cafejazz.com.br"
    },
    {
      icon: <Clock className="h-5 w-5 text-accent" />,
      title: "Horário",
      content: "Seg-Qui: 08h-22h\nSex-Sáb: 08h-00h\nDom: 09h-21h"
    }
  ];

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      name: "Facebook",
      url: "#",
      color: "hover:text-blue-600"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      name: "Instagram", 
      url: "#",
      color: "hover:text-pink-600"
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      name: "Twitter",
      url: "#",
      color: "hover:text-blue-400"
    }
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
                Entre em Contato
              </h1>
              <p className="font-inter text-lg text-muted-foreground">
                Estamos aqui para ouvir você. Fale conosco!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="font-playfair text-2xl flex items-center space-x-2">
                      <Send className="h-6 w-6 text-accent" />
                      <span>Envie sua Mensagem</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensagem</Label>
                        <Textarea
                          id="message"
                          placeholder="Escreva sua mensagem aqui..."
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          className="min-h-[120px] w-full resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-gold text-primary shadow-gold hover:shadow-elegant transition-all duration-300"
                        size="lg"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-playfair font-bold text-2xl text-foreground mb-6">
                    Informações de Contato
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {contactInfo.map((info, index) => (
                      <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-3">
                            {info.icon}
                            <div>
                              <h3 className="font-playfair font-bold text-foreground mb-1">
                                {info.title}
                              </h3>
                              <p className="text-muted-foreground text-sm whitespace-pre-line">
                                {info.content}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <Card className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="font-playfair text-lg">Redes Sociais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      Siga-nos para ficar por dentro das novidades, eventos especiais e promoções exclusivas.
                    </p>
                    <div className="flex space-x-4">
                      {socialLinks.map((social, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="icon"
                          className={`transition-colors ${social.color}`}
                          asChild
                        >
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                          >
                            {social.icon}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="font-playfair text-lg">Localização</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground text-sm">
                          Mapa interativo
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Rua do Jazz, 123 - Vila Madalena
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-playfair font-bold text-3xl text-foreground mb-4">
                  Perguntas Frequentes
                </h2>
                <p className="font-inter text-lg text-muted-foreground">
                  Encontre respostas para as dúvidas mais comuns
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    question: "Vocês aceitam reservas para grupos grandes?",
                    answer: "Sim! Aceitamos reservas para grupos de até 20 pessoas. Para eventos maiores, entre em contato para discutirmos opções especiais."
                  },
                  {
                    question: "Têm opções veganas no menu?",
                    answer: "Claro! Oferecemos várias opções veganas, incluindo leites vegetais, doces sem ingredientes de origem animal e pratos especiais."
                  },
                  {
                    question: "É possível alugar o espaço para eventos privados?",
                    answer: "Sim, temos pacotes especiais para eventos privados. Entre em contato pelo e-mail eventos@cafejazz.com.br para mais informações."
                  },
                  {
                    question: "Vocês vendem os grãos de café para levar?",
                    answer: "Sim! Vendemos nossos blends exclusivos em grãos ou moídos. Confira nossa loja online ou visite-nos pessoalmente."
                  }
                ].map((faq, index) => (
                  <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                    <CardContent className="pt-6">
                      <h3 className="font-playfair font-bold text-foreground mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contato;