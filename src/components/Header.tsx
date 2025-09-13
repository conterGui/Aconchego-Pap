import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cartcontext";
import Cart from "@/pages/Cart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const cartRef = useRef<HTMLDivElement>(null); // referência ao popover do carrinho

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Loja", path: "/loja" },
    { name: "Eventos", path: "/eventos" },
    { name: "Reservas", path: "/reservas" },
    { name: "Sobre", path: "/sobre" },
    { name: "Contacto", path: "/contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Fecha o carrinho ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-playfair font-bold text-lg">
                AC
              </span>
            </div>
            <span className="font-playfair font-bold text-xl text-foreground">
              Aconchego
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-inter font-medium transition-colors hover:text-accent ${
                  isActive(item.path) ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA + Cart */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {/* Reserve Button */}
            <Button
              asChild
              className="bg-gradient-gold text-primary shadow-gold hover:shadow-elegant transition-all duration-300"
            >
              <Link to="/reservas">Reserve sua Mesa</Link>
            </Button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 rounded-md hover:bg-card/80 transition"
              aria-label="Toggle Cart"
            >
              <ShoppingCart className="w-6 h-6 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Cart Pop-up */}
            {isCartOpen && (
              <div ref={cartRef} className="absolute right-0 top-12 z-50">
                <Cart />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 flex flex-col space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-inter font-medium py-2 transition-colors ${
                  isActive(item.path) ? "text-accent" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="mt-4 bg-gradient-gold text-primary shadow-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/reservas">Reserve sua Mesa</Link>
            </Button>

            {/* Mobile Cart Button */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 rounded-md hover:bg-card/80 transition mt-2"
              aria-label="Toggle Cart"
            >
              <ShoppingCart className="w-6 h-6 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Cart Pop-up */}
            {isCartOpen && (
              <div ref={cartRef} className="mt-2 z-50">
                <Cart />
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
