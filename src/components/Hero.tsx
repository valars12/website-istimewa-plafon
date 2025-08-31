import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

// Aset jika ingin dipakai sebagai background hero
// const heroCeiling = '/img/page 1 website.jpg';

const Hero = () => {
  return (
    <section id="beranda" className="bg-gradient-hero py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* konten hero kamu tetap… */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <a href="/produk.html">
            <Button variant="hero" size="lg" className="gap-2 px-8 py-4 text-lg font-semibold">
              Lihat Produk
              <ArrowRight className="h-5 w-5" />
            </Button>
          </a>
          <a href="/kontak.html">
            <Button variant="outline" size="lg" className="gap-2 px-8 py-4 text-lg font-semibold">
              Konsultasi Gratis
              <MessageCircle className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
