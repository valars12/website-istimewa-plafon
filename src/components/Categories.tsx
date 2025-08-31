import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Shield, Zap } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 1,
      title: 'WPC Premium',
      description: 'Material panel berkualitas tinggi berbahan campuran kayu dan plastik',
      href: '/kategori.html#wpc-premium',
      icon: Shield,
    },
    {
      id: 2,
      title: 'PVC',
      description: 'Ringan dan tahan air, dengan berbagai motif elegan',
      href: '/kategori.html#pvc',
      icon: Building,
    },
    {
      id: 3,
      title: 'WPC Wallpanel',
      description: 'Panel dinding kuat, tahan air, anti rayap, menyerupai kayu alami',
      href: '/kategori.html#wpc-wallpanel',
      icon: Zap,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Kategori Plafon
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Pilih jenis plafon yang sesuai dengan kebutuhan dan budget anda
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <a key={category.id} href={category.href} className="block">
              <Card 
                className="group bg-gradient-card border border-border/50 shadow-card hover:shadow-hover transition-smooth hover:-translate-y-2 hover:bg-gradient-primary cursor-pointer"
              >
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-smooth">
                  <category.icon className="h-8 w-8 text-primary group-hover:text-white transition-smooth" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-white transition-smooth">
                  {category.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-white/80 transition-smooth leading-relaxed">
                  {category.description}
                </p>
              </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
