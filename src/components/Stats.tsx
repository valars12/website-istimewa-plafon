import React from 'react';

const Stats = () => {
  const stats = [
    {
      number: '500+',
      label: 'Proyek Selesai'
    },
    {
      number: '98%',
      label: 'Kepuasan Pelanggan'
    },
    {
      number: '15',
      label: 'Tahun Pengalaman'
    },
    {
      number: '50+',
      label: 'Jenis Produk'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {stat.number}
              </div>
              <div className="text-white/80 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;