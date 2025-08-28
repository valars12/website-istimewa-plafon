import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';
import logo from '@/assets/logo.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="Istimewa Plafon Logo" 
              className="h-12 w-12 md:h-16 md:w-16 rounded-lg object-cover shadow-card transition-smooth hover:shadow-hover hover:scale-105"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#beranda" 
              className="text-muted-foreground hover:text-primary font-medium transition-smooth relative group px-2 py-1"
            >
              Beranda
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a 
              href="#produk" 
              className="text-muted-foreground hover:text-primary font-medium transition-smooth relative group px-2 py-1"
            >
              Produk
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="gradient" 
                  className="gap-1 px-4 py-2"
                >
                  Kategori
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-56 bg-white border border-border shadow-hover rounded-xl"
              >
                <DropdownMenuItem className="hover:bg-primary/5 hover:text-primary transition-smooth">
                  Plafon PVC Glossy
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/5 hover:text-primary transition-smooth">
                  Plafon PVC Motif Kayu
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/5 hover:text-primary transition-smooth">
                  Plafon PVC Putih Polos
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/5 hover:text-primary transition-smooth">
                  Plafon PVC Premium
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/5 hover:text-primary transition-smooth">
                  Plafon PVC Minimalis
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a 
              href="#kontak" 
              className="text-muted-foreground hover:text-primary font-medium transition-smooth relative group px-2 py-1"
            >
              Kontak
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a 
              href="#tentang" 
              className="text-muted-foreground hover:text-primary font-medium transition-smooth relative group px-2 py-1"
            >
              Tentang Kami
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
          </nav>

          {/* Order Button */}
          <Button variant="order" className="hidden md:flex items-center gap-2 px-4 py-2">
            <ShoppingCart className="h-4 w-4" />
            Pesan
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-3">
              <a 
                href="#beranda" 
                className="text-muted-foreground hover:text-primary font-medium transition-smooth px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </a>
              <a 
                href="#produk" 
                className="text-muted-foreground hover:text-primary font-medium transition-smooth px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Produk
              </a>
              <div className="px-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="gradient" size="sm" className="w-full justify-between">
                      Kategori
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full bg-white border border-border shadow-hover rounded-xl">
                    <DropdownMenuItem>Plafon PVC Glossy</DropdownMenuItem>
                    <DropdownMenuItem>Plafon PVC Motif Kayu</DropdownMenuItem>
                    <DropdownMenuItem>Plafon PVC Putih Polos</DropdownMenuItem>
                    <DropdownMenuItem>Plafon PVC Premium</DropdownMenuItem>
                    <DropdownMenuItem>Plafon PVC Minimalis</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <a 
                href="#kontak" 
                className="text-muted-foreground hover:text-primary font-medium transition-smooth px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </a>
              <a 
                href="#tentang" 
                className="text-muted-foreground hover:text-primary font-medium transition-smooth px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </a>
              <div className="px-2 pt-2">
                <Button variant="order" className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Pesan
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;