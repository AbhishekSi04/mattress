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
  
  const paymentMethods = [
    { name: 'Visa', icon: '/dummy.png' },
    { name: 'Mastercard', icon: '/dummy.png' },
    { name: 'American Express', icon: '/dummy.png' },
    { name: 'PayPal', icon: '/dummy.png' },
    { name: 'Google Pay', icon: '/dummy.png' },
    { name: 'Apple Pay', icon: '/dummy.png' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#1aa39a]/10 blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#2a73af]/10 blur-3xl translate-y-1/3 -translate-x-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-[#1aa39a] to-[#2a73af] rounded-xl p-8 mb-12 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-2">Join our sleep community</h3>
              <p className="text-white/80">Sign up for exclusive offers, sleep tips, and product updates</p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg text-gray-800 w-full sm:w-64 border-2 border-transparent focus:border-white/30 focus:outline-none transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-[#1aa39a] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg"
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
                src="/logo.png"
                alt="MattressWala Logo"
                width={180}
                height={50}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 mb-6">
              We&apos;re on a mission to help everyone sleep better. Our award-winning mattresses are designed in India&lsquo; for Indian sleepers.
            </p>
            {/* <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1aa39a] transition-all duration-300 transform hover:scale-110"
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
            </div> */}
            <div>
              <p className="text-gray-400 mb-2">Customer Support</p>
              <Link href="tel:+918888888888" className="text-xl font-bold hover:text-[#1aa39a] transition-colors">
                +91 8888 888 888
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 relative inline-block">
              Products
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#1aa39a]"></span>
            </h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 h-0.5 bg-[#1aa39a] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#1aa39a]"></span>
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 h-0.5 bg-[#1aa39a] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 relative inline-block">
              Support
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#1aa39a]"></span>
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 h-0.5 bg-[#1aa39a] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-bold mt-8 mb-4 relative inline-block">
              Legal
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#1aa39a]"></span>
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 h-0.5 bg-[#1aa39a] mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-lg font-bold mb-4 relative inline-block">
            Secure Payment Options
            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#1aa39a]"></span>
          </h4>
          <div className="flex flex-wrap gap-4">
            {paymentMethods.map((payment) => (
              <div key={payment.name} className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
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
            © {currentYear} MattressWala. All rights reserved.
          </p>
          <div className="flex items-center">
            <p className="text-gray-400 text-sm mr-2">Made with <span className="text-[#1aa39a]">❤️</span> in India</p>
            <Image
              src="/globe.svg"
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