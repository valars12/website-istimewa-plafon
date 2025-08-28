import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import heroCeiling from '@/assets/hero-ceiling.jpg';

const Hero = () => {
  return (
    <section id="beranda" className="bg-gradient-hero py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Text */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transformasi Ruangan dengan{' '}
              <span className="text-white/90">Plafon Berkualitas Premium</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              Solusi lengkap plafon modern untuk rumah, kantor, dan bangunan komersial 
              dengan harga terjangkau dan kualitas terjamin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="lg" 
                className="gap-2 px-8 py-4 text-lg font-semibold"
              >
                Lihat Produk
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="hero" 
                size="lg" 
                className="gap-2 px-8 py-4 text-lg font-semibold border-2"
              >
                <MessageCircle className="h-5 w-5" />
                Konsultasi Gratis
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-glow">
              <img 
                src={heroCeiling} 
                alt="Plafon Premium Istimewa" 
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-smooth hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-hover">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Tahun Pengalaman</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-hover">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Proyek Selesai</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;