'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    products: [
      { name: 'Original Mattress', href: '/products/original' },
      { name: 'Hybrid Mattress', href: '/products/hybrid' },
      { name: 'Luxury Mattress', href: '/products/luxury' },
      { name: 'Pillows', href: '/products/pillows' },
      { name: 'Bed Frames', href: '/products/bed-frames' },
      { name: 'Mattress Toppers', href: '/products/toppers' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Technology', href: '/technology' },
      { name: 'Sleep Science', href: '/sleep-science' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Shipping & Delivery', href: '/shipping' },
      { name: 'Returns & Warranty', href: '/warranty' },
      { name: 'Sleep Quiz', href: '/sleep-quiz' },
    ],
    legal: [
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Sitemap', href: '/sitemap' },
    ]
  };
  
  const socialLinks = [
    { name: 'Facebook', icon: '/icons/facebook.svg', href: 'https://facebook.com' },
    { name: 'Instagram', icon: '/icons/instagram.svg', href: 'https://instagram.com' },
    { name: 'Twitter', icon: '/icons/twitter.svg', href: 'https://twitter.com' },
    { name: 'YouTube', icon: '/icons/youtube.svg', href: 'https://youtube.com' },
  ];
  
  const paymentMethods = [
    { name: 'Visa', icon: '/icons/visa.svg' },
    { name: 'Mastercard', icon: '/icons/mastercard.svg' },
    { name: 'American Express', icon: '/icons/amex.svg' },
    { name: 'PayPal', icon: '/icons/paypal.svg' },
    { name: 'Google Pay', icon: '/icons/gpay.svg' },
    { name: 'Apple Pay', icon: '/icons/applepay.svg' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Signup */}
        <div className="bg-indigo-600 rounded-xl p-8 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-2">Join our sleep community</h3>
              <p className="text-indigo-100">Sign up for exclusive offers, sleep tips, and product updates</p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-lg text-gray-800 w-full sm:w-64"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/images/logo-white.png" 
                alt="Mattress Company Logo" 
                width={180} 
                height={50} 
              />
            </Link>
            <p className="text-gray-400 mb-6">
              We&apos;re on a mission to help everyone sleep better. Our award-winning mattresses are designed in India&lsquo; for Indian sleepers.
            </p>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <Image 
                    src={social.icon} 
                    alt={social.name} 
                    width={20} 
                    height={20} 
                  />
                </Link>
              ))}
            </div>
            <div>
              <p className="text-gray-400 mb-2">Customer Support</p>
              <Link href="tel:+918888888888" className="text-xl font-bold hover:text-indigo-400 transition-colors">
                +91 8888 888 888
              </Link>
            </div>
          </div>
          
          {/* Footer Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="text-lg font-bold mt-8 mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-lg font-bold mb-4">Secure Payment Options</h4>
          <div className="flex flex-wrap gap-4">
            {paymentMethods.map((payment) => (
              <div key={payment.name} className="bg-white p-2 rounded">
                <Image 
                  src={payment.icon} 
                  alt={payment.name} 
                  width={40} 
                  height={24} 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Your Mattress Company. All rights reserved.
          </p>
          <div className="flex items-center">
            <p className="text-gray-400 text-sm mr-2">Made with ❤️ in India</p>
            <Image 
              src="/icons/india-flag.svg" 
              alt="Indian Flag" 
              width={20} 
              height={15} 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;