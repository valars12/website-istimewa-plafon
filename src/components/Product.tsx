import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import plafonPvc from '@/assets/plafon-pvc.jpg';
import plafonGlossy from '@/assets/plafon-glossy.jpg';
import plafonWpc from '@/assets/plafon-wpc.jpg';
import wallpaper from '@/assets/wallpaper.jpg';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Plafon PVC',
      description: 'Plastik mengkilap yang kuat, tahan air, dan cocok untuk cetak premium',
      image: plafonPvc,
    },
    {
      id: 2,
      name: 'Plafon PVC Glossy',
      description: 'Plastik mengkilap yang kuat, tahan air, dan cocok untuk cetak premium',
      image: plafonGlossy,
    },
    {
      id: 3,
      name: 'Plafon WPC Premium',
      description: 'Plastik mengkilap yang kuat, tahan air, dan cocok untuk cetak premium',
      image: plafonWpc,
    },
    {
      id: 4,
      name: 'Wallpaper',
      description: 'Plastik mengkilap yang kuat, tahan air, dan cocok untuk cetak premium',
      image: wallpaper,
    },
  ];

  return (
    <section id="produk" className="py-16 md:py-24 bg-gradient-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Produk Unggulan
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Plafon Berkualitas Premium dengan Harga Kompetitif
          </p>
        </div>

        {/* Products Grid */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-smooth">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
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