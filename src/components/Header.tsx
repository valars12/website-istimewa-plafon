import React, { useEffect, useMemo, useState } from 'react';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';

const logo = '/img/logo.jpg';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  type NavItem = { label: string; href: string } | { label: string; children: { label: string; href: string }[] };
  const navLinks: NavItem[] = useMemo(
    () => [
      { label: 'Beranda', href: '/' },
      { label: 'Produk', href: '/produk.html' },
      {
        label: 'Kategori',
        children: [
          { label: 'WPC Premium', href: '/kategori.html#wpc-premium' },
          { label: 'PVC', href: '/kategori.html#pvc' },
          { label: 'WPC Wallpanel', href: '/kategori.html#wpc-wallpanel' },
        ],
      },
      { label: 'Tentang Kami', href: '/tentang.html' },
      { label: 'Kontak', href: '/kontak.html' },
    ],
    []
  );

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const computeCartCount = () => {
    try {
      const raw = JSON.parse(localStorage.getItem('cart') || '[]');
      const list: { quantity?: number }[] = Array.isArray(raw) ? raw : [];
      const total = list.reduce((sum: number, item) => sum + (item.quantity || 0), 0);
      setCartCount(total);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    computeCartCount();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cart') computeCartCount();
    };
    const onCustom = () => computeCartCount();
    window.addEventListener('storage', onStorage);
    window.addEventListener('cart:updated', onCustom as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cart:updated', onCustom as EventListener);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Istimewa Plafon Logo"
              className="h-10 w-10 md:h-12 md:w-12 rounded-lg object-cover"
            />
            <span className="font-semibold hidden sm:block">Istimewa Plafon</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              'children' in link ? (
                <div className="relative group" key={link.label}>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary">
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-md border p-2 min-w-48">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary"
                >
                  {link.label}
                </a>
              )
            )}

            <a href="/keranjang.html" className="relative inline-flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm">Keranjang</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-black/5 py-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) =>
                'children' in link ? (
                  <div key={link.label} className="px-2">
                    <div className="text-sm font-semibold text-gray-700 mb-1">{link.label}</div>
                    <div className="ml-2 flex flex-col">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="px-2 py-1.5 text-sm text-gray-700 rounded hover:bg-gray-50"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a key={link.label} href={link.href} className="px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded">
                    {link.label}
                  </a>
                )
              )}

              <a href="/keranjang.html" className="px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded inline-flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" /> Keranjang
                {cartCount > 0 && (
                  <span className="ml-auto bg-primary text-white text-xs rounded-full px-2 py-0.5">{cartCount}</span>
                )}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
