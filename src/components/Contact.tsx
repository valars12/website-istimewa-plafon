import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, MessageSquare, Send, RotateCcw, Instagram, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      'Halo Istimewa Plafon!%0A%0A',
      `Nama: ${encodeURIComponent(formData.name)}%0A`,
      formData.email ? `Email: ${encodeURIComponent(formData.email)}%0A` : '',
      '%0A',
      `Pesan:%0A${encodeURIComponent(formData.message)}`,
    ].join('');
    const wa = `https://wa.me/082136244654?text=${lines}`;
    window.open(wa, '_blank');
    toast({ title: 'Mengarahkan ke WhatsApp…', description: 'Pesan Anda akan dikirim via WhatsApp.' });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="kontak" className="py-16 md:py-24 bg-gradient-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Hubungi Kami
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Hubungi kami untuk konsultasi, pemesanan, atau informasi lebih lanjut.
          </p>
        </div>
        {/* Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          <a href="https://wa.me/082136244654" target="_blank" className="group block no-underline" rel="noreferrer">
            <Card className="border shadow-card hover:shadow-hover transition-smooth">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                  <MessageSquare className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">WhatsApp</h3>
                  <p className="text-muted-foreground text-sm">Konsultasi langsung dan cepat</p>
                </div>
              </CardContent>
            </Card>
          </a>
          <a href="tel:082136244654" className="group block no-underline">
            <Card className="border shadow-card hover:shadow-hover transition-smooth">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                  <Phone className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Telepon</h3>
                  <p className="text-muted-foreground text-sm">Hubungi kami secara langsung</p>
                </div>
              </CardContent>
            </Card>
          </a>
          <a href="mailto:istimewaplafon@gmail.com" className="group block no-underline">
            <Card className="border shadow-card hover:shadow-hover transition-smooth">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground text-sm">Kirim pertanyaan detail</p>
                </div>
              </CardContent>
            </Card>
          </a>
          <a href="https://www.instagram.com/instimewaplafon86?igsh=MTdldG9udjJ1NW4ybQ==" target="_blank" className="group block no-underline" rel="noreferrer">
            <Card className="border shadow-card hover:shadow-hover transition-smooth">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                  <Instagram className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Instagram</h3>
                  <p className="text-muted-foreground text-sm">Lihat portofolio kami</p>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-primary border-0 shadow-glow">
            <CardContent className="p-0">
              <div className="bg-white m-1 rounded-[calc(var(--radius)-1px)] p-8">
                <CardHeader className="p-0 mb-8">
                  <CardTitle className="text-2xl font-bold text-primary text-center">
                    Kirim Pesan
                  </CardTitle>
                </CardHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-primary" />
                      <Input
                        type="text"
                        name="name"
                        placeholder="Nama Anda"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="pl-12 h-12 bg-muted border-border focus:border-primary transition-smooth"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-primary" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email Anda (Opsional)"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-12 h-12 bg-muted border-border focus:border-primary transition-smooth"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-primary" />
                      <Textarea
                        name="message"
                        placeholder="Pesan Anda"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="pl-12 pt-3 bg-muted border-border focus:border-primary transition-smooth resize-none"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      type="submit" 
                      variant="gradient" 
                      size="lg" 
                      className="flex-1 gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Kirim via WhatsApp
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg" 
                      onClick={handleReset}
                      className="flex-1 gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Kami akan merespons secepatnya pada jam operasional.</p>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
