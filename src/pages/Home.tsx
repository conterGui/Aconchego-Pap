import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Coffee, Music } from "lucide-react";
import Typewriter from "@/components/dinamicFonts";

const Home = () => {
  const menuHighlights = [
    {
      name: "Café Filtrado V60",
      price: "2,80",
      description: "Método manual com grãos especiais",
      image: "/home/one.png",
    },
    {
      name: "Cappuccino Blue Note",
      price: "2,50",
      description: "Cappuccino cremoso com arte latte e canela",
      image: "/home/two.png",
    },
    {
      name: "Cheesecake New York",
      price: "3,20",
      description: "Clássico americano com calda de frutas vermelhas",
      image: "/home/three.png",
    },
  ];

  const events = [
    {
      date: "15 JAN",
      name: "Noite do Jazz Clássico",
      description: "Trio Bossa Jazz",
      time: "20:00h",
    },
    {
      date: "22 JAN",
      name: "Degustação de Cafés do Mundo",
      description: "Sommelier de café Ana Costa",
      time: "16:30h",
    },
    {
      date: "01 FEV",
      name: "Masterclass: Torra Artesanal",
      description: "Mestre torrador convidado",
      time: "14:00h",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-8 lg:py-16 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Content Side */}
              <div className="lg:col-span-6 space-y-8 relative z-20 lg:pl-12 lg:pr-4 flex flex-col justify-center min-h-[60vh]">
                <div className="space-y-4">
                  <h1 className="font-playfair font-bold text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1]">
                    Bem-vindo ao <br />
                    <Typewriter />
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-lg">
                    Descubra uma experiência única onde cada xícara conta uma
                    história
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="px-6 py-5 rounded-lg bg-gradient-gold text-primary shadow-gold font-medium text-base hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-fit"
                >
                  <Link to="/menu">Explore o Menu</Link>
                </Button>
              </div>

              {/* Image Side - Overlapping */}
              <div className="lg:col-span-6 relative lg:-ml-24 lg:-mt-12 z-30 lg:scale-90">
                <div className="relative">
                  {/* Main image container */}
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src="/home/LatteArtHome.png"
                      alt="Latte art"
                      className="w-full h-auto object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl -z-10" />
      </section>

      {/* Menu Highlights */}
      <section className="bg-background">
        {" "}
        <div className="container mx-auto px-4">
          {" "}
          <div className="text-center mb-12">
            {" "}
            <h2 className="font-playfair font-bold text-4xl text-foreground mb-4">
              {" "}
              Destaques do Menu{" "}
            </h2>{" "}
            <p className="font-inter text-lg text-muted-foreground">
              {" "}
              Sabores especiais selecionados para você{" "}
            </p>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {" "}
            {menuHighlights.map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-elegant transition-all duration-300"
              >
                {" "}
                <CardHeader>
                  {" "}
                  <div className="w-full h-48 overflow-hidden rounded-md mb-4 flex items-center justify-center">
                    {" "}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Coffee className="h-12 w-12 text-muted-foreground" />
                    )}{" "}
                  </div>{" "}
                  <CardTitle className="font-playfair text-xl">
                    {" "}
                    {item.name}{" "}
                  </CardTitle>{" "}
                </CardHeader>{" "}
                <CardContent>
                  {" "}
                  <p className="text-muted-foreground mb-4">
                    {" "}
                    {item.description}{" "}
                  </p>{" "}
                  <div className="flex items-center justify-between">
                    {" "}
                    <span className="font-bold text-accent text-xl">
                      {" "}
                      € {item.price}{" "}
                    </span>{" "}
                    <Button variant="outline" size="sm">
                      {" "}
                      <Link to="/menu">Ver mais</Link>{" "}
                    </Button>{" "}
                  </div>{" "}
                </CardContent>{" "}
              </Card>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-bold text-4xl text-foreground mb-4">
              Eventos em Destaque
            </h2>
            <p className="font-inter text-lg text-muted-foreground">
              Momentos especiais que fazem a diferença
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Card
                key={index}
                className="group hover:shadow-elegant transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-gold rounded-lg flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-accent">{event.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.time}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="font-playfair text-xl">
                    {event.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {event.description}
                  </p>
                  <Button
                    asChild
                    className="w-full bg-gradient-gold text-primary"
                  >
                    <Link to="/reservas">Saiba mais</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
