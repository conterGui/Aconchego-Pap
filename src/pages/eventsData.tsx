export type Event = {
  id: number;
  image?: string;
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

export const events: Event[] = [
  {
    id: 1,
    image: "/events/jazzClassico.jpg",
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
    image: "/events/arteLatte.jpg",
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
    image: "/events/cafesMundo.png",
    title: "Degustação de Cafés do Mundo",
    date: "2024-01-22",
    time: "16:30",
    description:
      "Viagem pelos sabores dos melhores cafés do mundo. Degustação comentada de 8 origens diferentes com harmonização de doces.",
    artist: "Sommelier de Café Ana Costa",
    price: 40.0, // Ajustado
    venue: "Mesa do Sommelier",
    category: "degustacao",
  },
  {
    id: 4,
    image: "/events/jazzPoetry.jpg",
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
    image: "/events/bossaNova.jpg",
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
    image: "/events/torraCafe.jpg",
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
    image: "/events/instrumentos.jpg",
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
    image: "/events/cafeGelado.jpg",
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
