import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Pakai URL dari /public/img (nama file mengikuti folder public)
const IMAGES = {
  pvc1: '/img/plafon pvc 1.jpg',
  pvc2: '/img/plafon pvc 2.jpg',
  wpcPremium: '/img/plafon wpc premium.jpg',
  wallpaper: '/img/walpaper.jpg',
};

const Products = () => {
  type Product = {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    unit: 'meter' | 'Lembar' | 'Gulung';
  };

  const products: Product[] = [
    {
      id: 1,
      name: 'Plafon PVC',
      description: 'Plastik mengkilap yang kuat, tahan air, dan cocok untuk cetak premium',
      image: IMAGES.pvc1,
      price: 45000,
      unit: 'meter',
    },
    {
      id: 2,
      name: 'Plafon PVC Glossy',
      description: 'Plastik mengkilap yang kuat, tahan air, dan cocok untuk cetak premium',
      image: IMAGES.pvc2,
      price: 55000,
      unit: 'meter',
    },
    {
      id: 3,
      name: 'Plafon WPC Premium',
      description: 'Material panel berkualitas, tampilan elegan menyerupai kayu alami',
      image: IMAGES.wpcPremium,
      price: 85000,
      unit: 'Lembar',
    },
    {
      id: 4,
      name: 'Wallpaper',
      description: 'Motif marmer/warna elegan untuk nuansa mewah & modern',
      image: IMAGES.wallpaper,
      price: 25000,
      unit: 'Gulung',
    },
  ];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  type CartItem = { name: string; price: number; image: string; quantity: number; unit?: 'meter' | 'Lembar' | 'Gulung'; area?: number };
  const addToCart = (name: string, price: number, image: string, quantity = 1, unit?: 'meter' | 'Lembar' | 'Gulung') => {
    try {
      const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
      const idx = Array.isArray(cart) ? cart.findIndex((i) => i.name === name) : -1;
      if (idx >= 0) {
        cart[idx].quantity = (cart[idx].quantity || 0) + quantity;
        if (!cart[idx].unit && unit) cart[idx].unit = unit;
      } else {
        cart.push({ name, price, image, quantity, unit });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart:updated'));
    } catch {
      // noop
    }
  };

  return (
    <section id="produk" className="py-16 md:py-24 bg-gradient-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Produk Unggulan
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Plafon Berkualitas Premium dengan Harga Kompetitif
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group bg-gradient-card border border-border/50 shadow-card hover:shadow-hover transition-smooth hover:-translate-y-2 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-smooth">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">{formatPrice(product.price)}</span>
                    <span className="text-xs text-muted-foreground">/ {product.unit}</span>
                  </div>
                  <button
                    className="mt-2 inline-flex items-center justify-center text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md px-4 py-2"
                    onClick={() => addToCart(product.name, product.price, product.image, 1, product.unit)}
                  >
                    + Tambah ke Keranjang
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
