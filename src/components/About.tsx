import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, CheckCircle, DollarSign } from 'lucide-react';
import plafonPvc from '@/assets/plafon-pvc.jpg';

const About = () => {
  const features = [
    {
      icon: Award,
      title: 'Material Premium',
      image: plafonPvc,
    },
    {
      icon: CheckCircle,
      title: 'Bergaransi & Terpercaya',
      image: plafonPvc,
    },
    {
      icon: DollarSign,
      title: 'Harga Kompetitif',
      image: plafonPvc,
    },
  ];

  return (
    <section id="tentang" className="py-16 md:py-24 bg-gradient-accent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Tentang Kami
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Istimewa Plafon adalah penyedia plafon PVC berkualitas premium dengan harga kompetitif. 
            Kami berkomitmen memberikan produk terbaik, layanan profesional, dan solusi interior 
            yang elegan untuk rumah maupun bisnis Anda. Dengan pengalaman berbagai proyek, 
            kami siap membantu mewujudkan hunian impian Anda.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group bg-white border border-border/50 shadow-card hover:shadow-hover transition-smooth hover:-translate-y-2"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="relative">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-16 h-16 mx-auto rounded-xl object-cover shadow-card group-hover:shadow-hover transition-smooth"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-card">
                    <feature.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
                  {feature.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;