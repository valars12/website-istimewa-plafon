import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Categories from '@/components/Categories';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Products />
        <Categories />
        <Stats />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;