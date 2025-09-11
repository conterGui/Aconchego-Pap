import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-subtle border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-playfair font-bold text-lg text-foreground">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">
                  Rua do Jazz, 123 - Centro, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">
                  (11) 98765-4321
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">
                  contato@cafejazz.com.br
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-playfair font-bold text-lg text-foreground">Redes Sociais</h3>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="hover:bg-accent hover:text-accent-foreground">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-accent hover:text-accent-foreground">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-accent hover:text-accent-foreground">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-playfair font-bold text-lg text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Receba novidades sobre nossos eventos e promoções especiais.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Seu e-mail" 
                className="flex-1"
              />
              <Button className="bg-gradient-gold text-primary shadow-gold">
                Assinar
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Café Jazz. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;