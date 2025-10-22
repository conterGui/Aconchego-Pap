export type Product = {
  id: string;
  name: string;
  price: number;
  weight: string;
  roast: string;
  type: string;
  origin: string;
  description: string;
  inStock: boolean;
  image?: string;
};

export const products: Product[] = [
  {
    id: "68f6416d04a22178995df67c",
    image: "/products/JazzEspecial.png",
    name: "Produtex",
    price: 35.5,
    weight: "250g",
    roast: "medio",
    type: "grao",
    origin: "Brasil/Colômbia",
    description: "Blend exclusivo da casa com notas de chocolate e caramelo",
    inStock: true,
  },
  {
    id: "2",
    image: "/products/ExpressoForte.png",
    name: "Espresso Forte",
    price: 18.0,
    weight: "500g",
    roast: "escuro",
    type: "moido",
    origin: "Itália",
    description: "Moagem fina para espresso perfeito, sabor intenso",
    inStock: true,
  },
  {
    id: "3",
    image: "/products/BourbonSantos.png",
    name: "Bourbon Santos",
    price: 11.5,
    weight: "250g",
    roast: "claro",
    type: "grao",
    origin: "São Paulo - Brasil",
    description: "Café doce e suave, ideal para métodos filtrados",
    inStock: true,
  },
  {
    id: "4",
    image: "/products/ColombianPremium.png",
    name: "Colombian Premium",
    price: 17.0,
    weight: "500g",
    roast: "medio",
    type: "grao",
    origin: "Huila - Colômbia",
    description: "Acidez equilibrada com notas frutadas",
    inStock: true,
  },
  {
    id: "5",
    image: "/products/Ethiopian.png",
    name: "Ethiopian Yirgacheffe",
    price: 13.5,
    weight: "250g",
    roast: "claro",
    type: "moido",
    origin: "Etiópia",
    description: "Café floral com notas cítricas, moído para V60",
    inStock: true,
  },
  {
    id: "6",
    image: "/products/FrenchRoast.png",
    name: "French Roast",
    price: 22.0,
    weight: "1kg",
    roast: "escuro",
    type: "grao",
    origin: "Blend Internacional",
    description: "Torra francesa tradicional, corpo encorpado",
    inStock: true,
  },
];
