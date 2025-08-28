import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, MessageSquare, Send, RotateCcw } from 'lucide-react';
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
    // Here you would typically send the form data to your backend
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
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
                      Kirim Pesan
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