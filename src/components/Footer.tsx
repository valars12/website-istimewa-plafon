import React from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, MessageCircle, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/instimewaplafon86?igsh=MTdldG9udjJ1NW4ybQ==',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/085797355484',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:istimewaplafon@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Alamat',
      href: 'https://maps.app.goo.gl/Z47WDUinSyZZVWqp6',
    },
  ];

  return (
    <footer className="bg-gradient-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.map((link, index) => (
            <Button
              key={index}
              variant="hero"
              asChild
              className="gap-3 px-6 py-3 text-white hover:text-primary"
            >
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                  <link.icon className="h-3 w-3 text-primary" />
                </div>
                {link.label}
              </a>
            </Button>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/20">
          <p className="text-white/80 text-sm">
            &copy; 2025 Istimewa Plafon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
