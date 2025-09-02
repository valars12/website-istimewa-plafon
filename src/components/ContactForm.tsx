import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.name || !formData.phone || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi (*)",
        variant: "destructive"
      });
      return;
    }

    // Format pesan WhatsApp
    const whatsappMessage = `
Halo, saya ingin menghubungi Anda:

*Nama:* ${formData.name}
*Nomor WhatsApp:* ${formData.phone}
*Email:* ${formData.email || 'Tidak diisi'}
*Jenis Layanan:* ${getServiceLabel(formData.subject)}
*Pesan:*
${formData.message}
    `.trim();

    // Encode pesan untuk URL WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://api.whatsapp.com/send?phone=6285797355484&text=${encodedMessage}`;
    
    // Buka WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success toast
    toast({
      title: "Berhasil!",
      description: "Pesan akan dikirim melalui WhatsApp",
    });
  };

  const getServiceLabel = (value: string) => {
    const services = {
      'konsultasi': 'Konsultasi Produk',
      'harga': 'Pertanyaan Harga',
      'pemasangan': 'Layanan Pemasangan',
      'custom': 'Pesanan Custom',
      'lainnya': 'Lainnya'
    };
    return services[value as keyof typeof services] || value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Contact Form Section */}
        <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg mb-10 border border-border">
          <h3 className="text-3xl font-semibold text-primary text-center mb-8">
            Kirim Pesan
          </h3>
          
          <form onSubmit={sendMessage} className="space-y-6">
            {/* Nama Lengkap */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Nama Lengkap <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            {/* Nomor WhatsApp */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                Nomor WhatsApp <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Contoh: 08123456789"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email (Opsional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="email@example.com"
              />
            </div>

            {/* Jenis Layanan */}
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                Jenis Layanan <span className="text-destructive">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-3 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              >
                <option value="">Pilih Layanan</option>
                <option value="konsultasi">Konsultasi Produk</option>
                <option value="harga">Pertanyaan Harga</option>
                <option value="pemasangan">Layanan Pemasangan</option>
                <option value="custom">Pesanan Custom</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            {/* Pesan */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Pesan <span className="text-destructive">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-3 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Jelaskan kebutuhan proyek plafon Anda."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Kirim via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
