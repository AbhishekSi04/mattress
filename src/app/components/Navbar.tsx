'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Star, User, BedDouble, Search, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 h-1.5 w-full`}></div>
      <nav className={`${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white'
      } py-5 sticky top-0 z-50 transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space a-x-2 group">
              <div className="relative">
                <BedDouble className="h-10 w-10 text-purple-600" />
                <div className="absolute -top-1 -right-1">
                  <Star fill="#FFD700" className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
              <div className="ml-2">
                <span className="font-extrabold text-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                  Mattress<span className="text-purple-700">Wala</span>
                </span>
                <p className="text-xs text-gray-500 -mt-1">Premium Comfort Solutions</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href} icon={link.icon}>
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right icons section */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-full hover:bg-purple-100">
                <Search className="h-5 w-5" />
              </button>
              <Link href="/wishlist" className="text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-full hover:bg-purple-100 relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
              </Link>
              <Link href="/account" className="text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-full hover:bg-purple-100">
                <User className="h-5 w-5" />
              </Link>
              <Link href="/cart" className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full transition-transform hover:scale-110">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </div>
              </Link>
              <Link href="/builder" className="hidden xl:block">
                <button className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                  Build Your Mattress
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden space-x-3">
              <Link href="/cart" className="relative text-gray-700">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </div>
              </Link>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-100 p-2 rounded-md focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 bg-white border-t border-gray-100 shadow-2xl animate-slideDown">
            <div className="container mx-auto px-4 py-3">
              {navLinks.map((link) => (
                <MobileNavLink key={link.href} href={link.href} icon={link.icon} onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </MobileNavLink>
              ))}
              
              <Link href="/builder" onClick={() => setIsMenuOpen(false)} className="block mt-4">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300">
                  Build Your Mattress Now
                </button>
              </Link>
              
              <div className="flex justify-between items-center border-t border-gray-100 mt-4 pt-4">
                <Link href="/account" className="flex items-center text-gray-700 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-5 w-5 mr-2" />
                  <span>My Account</span>
                </Link>
                <Link href="/wishlist" className="flex items-center text-gray-700 hover:text-purple-600 relative" onClick={() => setIsMenuOpen(false)}>
                  <Heart className="h-5 w-5 mr-2" />
                  <span>Wishlist</span>
                  <span className="ml-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Promotional Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 text-white text-center py-2 text-sm font-medium">
        🎁 Special Offer: Get 10% OFF your custom mattress! Use code: <span className="font-bold">DREAMY10</span>
      </div>
    </>
  );
};

// Navigation links data
const navLinks = [
  { href: "/", label: "Home", icon: <BedDouble className="h-4 w-4" /> },
  { href: "/builder", label: "Mattress Builder", icon: <Star className="h-4 w-4" /> },
  { href: "/quiz", label: "Sleep Quiz", icon: <Search className="h-4 w-4" /> },
  { href: "/ugc", label: "Reviews", icon: <Star className="h-4 w-4" /> },
  { href: "/collaborations", label: "Partners", icon: <User className="h-4 w-4" /> },
  { href: "/dashboard", label: "Dashboard", icon: <ShoppingCart className="h-4 w-4" /> },
];

// Desktop nav link component
const NavLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) => {
  return (
    <Link 
      href={href} 
      className="relative px-3 py-2 group"
    >
      <div className="absolute inset-0 bg-purple-100 rounded-md scale-0 transition-all duration-300 group-hover:scale-100 -z-10"></div>
      <div className="flex items-center space-x-1">
        {icon && <span className="text-purple-600">{icon}</span>}
        <span className="font-medium text-gray-700 group-hover:text-purple-700 transition-colors">{children}</span>
      </div>
    </Link>
  );
};

// Mobile nav link component
const MobileNavLink = ({ href, onClick, children, icon }: { href: string; onClick: () => void; children: React.ReactNode; icon?: React.ReactNode }) => {
  return (
    <Link 
      href={href} 
      className="flex items-center space-x-2 px-2 py-3 hover:bg-purple-50 rounded-lg mb-1 text-gray-700 hover:text-purple-700 transition-colors" 
      onClick={onClick}
    >
      {icon && <span className="text-purple-600">{icon}</span>}
      <span className="font-medium">{children}</span>
    </Link>
  );
};
export default Navbar;