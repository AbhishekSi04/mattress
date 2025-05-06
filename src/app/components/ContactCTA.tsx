import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MessageSquare, Clock, ArrowRight } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1aa39a]/10 via-[#22a8a2]/10 to-[#2a73af]/10 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full translate-y-1/2 -translate-x-1/3 opacity-60"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header with badge */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium mb-6">
              <MessageSquare size={16} />
              <span>24/7 Support</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1aa39a] to-[#2a73af] bg-clip-text text-transparent">
              Need help deciding?
            </h2>
            
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Our sleep experts are available around the clock to help you find your perfect mattress match.
            </p>
          </div>
          
          {/* Contact cards with enhanced design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Phone card */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Talk to Us</h3>
                <p className="text-gray-600 mb-6">Get personalized advice from our sleep experts in real-time</p>
                
                <div className="bg-indigo-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <div className="text-indigo-600 font-medium">Available 24/7</div>
                  </div>
                  <div className="text-gray-700 font-bold">+91 888 888 8888</div>
                </div>
                
                <Link 
                  href="tel:+918888888888" 
                  className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:bg-indigo-700 transition-colors group-hover:shadow-lg"
                >
                  <span>Call Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              {/* Decorative bottom bar */}
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
            </div>
            
            {/* Email card */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Email Us</h3>
                <p className="text-gray-600 mb-6">Send us your questions and we&apos;ll get back to you within 24 hours</p>
                
                <div className="bg-purple-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div className="text-purple-600 font-medium">Response within 24h</div>
                  </div>
                  <div className="text-gray-700 font-bold">support@yourmattress.com</div>
                </div>
                
                <Link 
                  href="mailto:support@yourmattress.com" 
                  className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-4 px-6 rounded-xl font-bold hover:bg-purple-700 transition-colors group-hover:shadow-lg"
                >
                  <span>Send Email</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              {/* Decorative bottom bar */}
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
            </div>
            
            {/* Chat card */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Live Chat</h3>
                <p className="text-gray-600 mb-6">Connect with our team instantly through our live chat service</p>
                
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div className="text-blue-600 font-medium">Instant Support</div>
                  </div>
                  <div className="text-gray-700 font-bold">Average response time: 30 seconds</div>
                </div>
                
                <Link 
                  href="#chat"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-bold hover:bg-blue-700 transition-colors group-hover:shadow-lg"
                >
                  <span>Start Chat</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              {/* Decorative bottom bar */}
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            </div>
          </div>
          
          {/* Testimonial/Trust indicator */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-full shadow-md">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-medium text-xs">JD</div>
                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-600 font-medium text-xs">SK</div>
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-medium text-xs">AR</div>
              </div>
              <span className="text-gray-600 font-medium">
                <span className="text-indigo-600 font-bold">85% of customers</span> find their perfect mattress with our help
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;