import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Contato = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-accent" />,
      title: "Endereço",
      content: "Rua do Jazz, 123 - Rossio\nLisboa, 12345-678",
    },
    {
      icon: <Phone className="h-5 w-5 text-accent" />,
      title: "Telefone",
      content: "(351) 21 1234-567\n(351) 123 456 789",
    },
    {
      icon: <Mail className="h-5 w-5 text-accent" />,
      title: "E-mail",
      content: "contacto@aconchego.com.br\neventos@aconchego.com.br",
    },
    {
      icon: <Clock className="h-5 w-5 text-accent" />,
      title: "Horário",
      content: "Seg-Qui: 08h-22h\nSex-Sáb: 08h-00h\nDom: 09h-21h",
    },
  ];

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      name: "Facebook",
      url: "#",
      color: "hover:text-blue-600",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      name: "Instagram",
      url: "#",
      color: "hover:text-pink-600",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      name: "Twitter",
      url: "#",
      color: "hover:text-blue-400",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-20">
        {/* Page Header */}
        <section className="py-12 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-4">
              Entre em Contacto
            </h1>
            <p className="font-inter text-lg text-muted-foreground">
              Estamos aqui para ouvir você. Fale conosco!
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="font-playfair font-bold text-2xl text-foreground mb-6">
                  Informações de Contacto
                </h2>

                <div className="grid gap-4">
                  {contactInfo.map((info, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-elegant transition-all duration-300"
                    >
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

                {/* Social Media */}
                <Card className="mt-6 hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="font-playfair text-lg">
                      Redes Sociais
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      Siga-nos para ficar por dentro das novidades e eventos.
                    </p>
                    <div className="flex space-x-4">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className={`transition-colors ${social.color}`}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Functional Map */}
              <div>
                <Card className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="font-playfair text-lg">
                      Localização
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg overflow-hidden">
                      <iframe
                        title="Mapa localização"
                        src="https://www.google.com/maps?q=Escola+Rainha+Dona+Leonor+Lisboa&output=embed"
                        width="100%"
                        height="350"
                        loading="lazy"
                        className="border-0"
                      ></iframe>
                    </div>

                    <a
                      href="https://www.google.com/maps?q=Escola+Rainha+Dona+Leonor+Lisboa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-accent hover:underline text-sm"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Abrir no Google Maps
                    </a>
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

export default Contato;
