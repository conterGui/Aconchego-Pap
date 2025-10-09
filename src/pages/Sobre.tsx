import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Coffee, Music, Heart, Users, Award, Clock } from "lucide-react";

const Sobre = () => {
  const values = [
    {
      icon: <Coffee className="h-8 w-8 text-accent" />,
      title: "Qualidade Premium",
      description:
        "Selecionamos os melhores grãos do mundo para oferecer uma experiência única em cada xícara.",
    },
    {
      icon: <Music className="h-8 w-8 text-accent" />,
      title: "Atmosfera Jazz",
      description:
        "Cada detalhe foi pensado para criar um ambiente que respira jazz, do design à trilha sonora.",
    },
    {
      icon: <Heart className="h-8 w-8 text-accent" />,
      title: "Paixão pelo Café",
      description:
        "Nossa equipe compartilha o amor pelo café e trabalha para transmitir essa paixão a cada cliente.",
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Comunidade",
      description:
        "Somos mais que uma cafeteria, somos um ponto de encontro para amantes do café e da boa música.",
    },
  ];

  const team = [
    {
      name: "Marcus Silva",
      role: "Fundador & Barista Principal",
      description:
        "Apaixonado por jazz e café há mais de 15 anos. Formado em gastronomia e especialista em torra artesanal.",
    },
    {
      name: "Ana Beatriz",
      role: "Chef Barista",
      description:
        "Campeã brasileira de latte art 2023. Responsável pelos workshops e criação de novos métodos de preparo.",
    },
    {
      name: "Carlos Mendonça",
      role: "Sommelier de Café",
      description:
        "Especialista em cafés especiais com certificação internacional. Curador dos nossos blends exclusivos.",
    },
    {
      name: "Lucia Santos",
      role: "Gerente de Eventos",
      description:
        "Produtora musical com experiência em eventos culturais. Organiza nossa programação de shows e workshops.",
    },
  ];

  const achievements = [
    {
      icon: <Award className="h-6 w-6 text-accent" />,
      title: "Melhor Cafeteria 2023",
      description: "Prêmio Europeu Gastronômico",
    },
    {
      icon: <Coffee className="h-6 w-6 text-accent" />,
      title: "Certificação Coffee Quality",
      description: "Specialty Coffee Association",
    },
    {
      icon: <Music className="h-6 w-6 text-accent" />,
      title: "Melhor Espaço Cultural",
      description: "Guia Jazz Europa 2023",
    },
    {
      icon: <Users className="h-6 w-6 text-accent" />,
      title: "+10.000 clientes",
      description: "Satisfeitos desde 2020",
    },
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
                Sobre o Aconchego
              </h1>
              <p className="font-inter text-lg text-muted-foreground">
                Nossa história, valores e paixão pela cultura do café
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-playfair font-bold text-3xl text-foreground mb-6">
                    Nossa História
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      O Aconchego nasceu em 2020 do sonho de Marcus Silva, um
                      apaixonado por música jazz e café especial. A ideia era
                      criar um espaço onde estas duas paixões pudessem se
                      encontrar harmoniosamente.
                    </p>
                    <p>
                      Localizado no coração de Lisboa, nosso café se tornou
                      rapidamente um ponto de encontro para músicos, artistas e
                      amantes da boa música. Cada detalhe foi pensado para criar
                      uma atmosfera única que transporta nossos clientes para os
                      clássicos clubes de jazz americanos.
                    </p>
                    <p>
                      Hoje, somos reconhecidos não apenas pela qualidade
                      excepcional dos nossos cafés, mas também pela nossa
                      programação cultural diversificada, que inclui shows ao
                      vivo, workshops e degustações especiais.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="overflow-hidden w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                    <img
                      src="/sobre/jazz.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />{" "}
                  </div>
                  <div className="overflow-hidden w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                    <img
                      src="/sobre/historiacafe.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden w-full h-48 bg-muted rounded-lg flex items-center justify-center col-span-2">
                    <img
                      src="/sobre/cafeteria.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair font-bold text-3xl text-foreground mb-4">
                Nossos Valores
              </h2>
              <p className="font-inter text-lg text-muted-foreground">
                Os pilares que guiam nossa forma de trabalhar
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-elegant transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-center mb-4">{value.icon}</div>
                    <CardTitle className="font-playfair text-xl">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair font-bold text-3xl text-foreground mb-4">
                Nossa Equipa
              </h2>
              <p className="font-inter text-lg text-muted-foreground">
                As pessoas que fazem a magia acontecer todos os dias
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-elegant transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <CardTitle className="font-playfair text-lg">
                      {member.name}
                    </CardTitle>
                    <p className="text-accent font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair font-bold text-3xl text-foreground mb-4">
                Reconhecimentos
              </h2>
              <p className="font-inter text-lg text-muted-foreground">
                Orgulhosos dos prêmios e certificações que conquistamos
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-elegant transition-all duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-3">
                      {achievement.icon}
                    </div>
                    <h3 className="font-playfair font-bold text-lg text-foreground mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-playfair font-bold text-3xl text-foreground mb-4">
                Venha nos visitar!
              </h2>
              <p className="font-inter text-lg text-muted-foreground mb-8">
                Estamos ansiosos para compartilhar nossa paixão pelo café e pelo
                jazz com você. Venha fazer parte da nossa comunidade!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-gold text-primary shadow-gold hover:shadow-elegant"
                >
                  <a href="/reservas">Reserve sua Mesa</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="/contato">Entre em Contacto</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Sobre;
