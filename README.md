# Istimewa Plafon

Website katalog produk dan layanan pemasangan plafon untuk Istimewa Plafon. Menampilkan produk (PVC, WPC Premium, dan wallpanel), kategori, statistik, serta form/kontak terintegrasi WhatsApp, telepon, email, dan Instagram. Dibangun dengan React + TypeScript + Tailwind CSS.

## Fitur Utama

- Katalog produk: daftar produk unggulan dengan harga dan satuan.
- Kategori: navigasi cepat ke kategori WPC Premium, PVC, dan WPC Wallpanel.
- Keranjang sederhana: penyimpanan kuantitas di `localStorage` (client-side).
- Kontak cepat: WhatsApp, telepon, email, dan Instagram langsung dari halaman.
- Desain responsif: antarmuka modern dengan shadcn/ui dan Tailwind CSS.

## Teknologi

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui (komponen UI)
- React Router
- TanStack Query (data fetching/caching)
- Lucide Icons

## Prasyarat

- Node.js 18+ dan npm

## Menjalankan Secara Lokal

```bash
# Install dependensi
npm install

# Jalankan mode pengembangan
npm run dev

# Build untuk produksi
npm run build

# Preview build produksi secara lokal
npm run preview
```

Catatan: skrip `dev` akan membuka aplikasi secara otomatis di browser.

## Skrip NPM

- `npm run dev`: Menjalankan server dev Vite.
- `npm run build`: Build produksi.
- `npm run build:dev`: Build dengan mode development (untuk debugging build).
- `npm run preview`: Menjalankan preview hasil build.
- `npm run lint`: Menjalankan ESLint.

## Struktur Singkat

- `src/pages/Index.tsx`: Halaman utama yang merangkai semua komponen.
- `src/components/`: Komponen UI utama seperti Header, Hero, Products, Categories, Stats, About, Contact, Footer.
- `public/img/`: Aset gambar untuk produk dan konten (ganti sesuai kebutuhan brand).

## Kustomisasi Brand & Kontak

Ubah informasi kontak atau tautan sosial pada file berikut bila diperlukan:

- `src/components/Contact.tsx`: Nomor WhatsApp (`wa.me/082136244654`) dan email (`istimewaplafon@gmail.com`).
- `src/components/Footer.tsx`: Tautan Instagram, WhatsApp, Email, dan Alamat Google Maps.
- `src/components/ContactForm.tsx`: Pengiriman pesan via WhatsApp dari form.
- `src/components/Header.tsx`: Tautan navigasi seperti Produk, Kategori, Tentang, dan Kontak.

Ganti aset logo/gambar di `public/img` (misal `logo.jpg`, foto produk, dsb.) bila ingin menyesuaikan tampilan.

## Deploy

Proyek ini adalah aplikasi Vite (SPA) dan dapat di-deploy ke penyedia static hosting seperti Netlify, Vercel, GitHub Pages, Cloudflare Pages, dsb.

Langkah umum (contoh Vercel/Netlify):

1. Hubungkan repository Git Anda ke platform hosting.
2. Set build command: `npm run build` dan output directory: `dist`.
3. Deploy dan atur custom domain bila diperlukan.

## Kontak

- WhatsApp: https://wa.me/082136244654
- Email: istimewaplafon@gmail.com
- Instagram: https://www.instagram.com/instimewaplafon86

&copy; 2025 Istimewa Plafon. Seluruh hak cipta dilindungi.
