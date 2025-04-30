import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-red-800 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-2xl">
          MattressWala
        </Link>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="text-white hover:text-gray-300 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/builder" className="text-white hover:text-gray-300 transition duration-300">
              Builder
            </Link>
          </li>
          <li>
            <Link href="/quiz" className="text-white hover:text-gray-300 transition duration-300">
              Quiz
            </Link>
          </li>
          <li>
            <Link href="/ugc" className="text-white hover:text-gray-300 transition duration-300">
              UGC
            </Link>
          </li>
          <li>
            <Link href="/collaborations" className="text-white hover:text-gray-300 transition duration-300">
              Collaborations
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-white hover:text-gray-300 transition duration-300">
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;