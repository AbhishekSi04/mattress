import React from 'react';
import Link from 'next/link';

const ContactCTA = () => {
  return (
    <section className="py-16 bg-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Need help deciding?</h2>
          <p className="text-xl">Shop with our sleep experts today!</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 flex-1">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Call Us</h3>
            <p className="text-center text-gray-600 mb-4">We're here to answer all things sleep</p>
            <Link 
              href="tel:+918888888888" 
              className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
            >
              Ask away
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex-1">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Email Us</h3>
            <p className="text-center text-gray-600 mb-4">Drop us an email</p>
            <Link 
              href="mailto:support@yourmattress.com" 
              className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
            >
              Write to us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;