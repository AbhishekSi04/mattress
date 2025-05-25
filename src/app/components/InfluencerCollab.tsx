import React from 'react';
import { Users, Star, Instagram, Twitter } from 'lucide-react';

interface Influencer {
  id: number;
  name: string;
  image: string;
  role: string;
  followers: string;
  quote: string;
  instagram?: string;
  twitter?: string;
}

const InfluencerCollab: React.FC = () => {
  // Enhanced data for influencers
  const influencers: Influencer[] = [
    {
      id: 1,
      name: "Sleep Expert Alex",
      image: "/images/influencer1.jpg",
      role: "Sleep Scientist",
      followers: "1.2M",
      quote: "This mattress revolutionized my sleep quality completely.",
      instagram: "sleepexpert_alex",
      twitter: "alexsleepguru"
    },
    {
      id: 2,
      name: "Wellness Guru Maya",
      image: "/images/influencer2.jpg",
      role: "Wellness Coach",
      followers: "850K",
      quote: "The perfect balance of comfort and support for optimal rest.",
      instagram: "wellness_maya"
    },
    {
      id: 3,
      name: "Home Design Pro Jordan",
      image: "/images/influencer3.jpg",
      role: "Interior Designer",
      followers: "1.5M",
      quote: "A beautiful addition to any bedroom that delivers on comfort.",
      instagram: "homedesign_jordan",
      twitter: "jordandesigns"
    },
    {
      id: 4,
      name: "Health Coach Taylor",
      image: "/images/influencer4.jpg",
      role: "Health & Fitness Expert",
      followers: "920K",
      quote: "Improved sleep means better recovery - this mattress delivers both.",
      instagram: "coach_taylor",
      twitter: "taylorhealthpro"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      {/* <div className="absolute top-0 left-0 w-64 h-64 bg-[#2a73af] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-70"></div> */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-[#1aa39a] to-[#2a73af] rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-[#1aa39a] bg-indigo-50 rounded-full font-medium mb-6">
            <Users size={18} />
            <span>Sleep Influencers</span>
          </div>
          
          <h2 className="text-4xl font-bold text-center text-[#1aa39a] mb-4">Our Sleep Ambassadors</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Trusted by sleep experts and wellness influencers who&apos;ve experienced the difference our mattresses make.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {influencers.map(influencer => (
            <div 
              key={influencer.id} 
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="aspect-square relative overflow-hidden bg-white">
                {/* In a real app, use next/image with proper dimensions */}
                <img 
                  src={`/api/placeholder/400/400`} 
                  alt={influencer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1aa39a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <p className="font-light italic">{influencer.quote}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{influencer.name}</h3>
                    <p className="text-[#1aa39a] text-sm font-medium">{influencer.role}</p>
                  </div>
                  <div className="bg-indigo-50 rounded-full px-3 py-1 flex items-center gap-1">
                    <Star size={14} className="text-[#1aa39a]" />
                    <span className="text-[#1aa39a] font-medium text-sm">{influencer.followers}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-4">
                  {influencer.instagram && (
                    <a href={`https://instagram.com/${influencer.instagram}`} className="text-gray-500 hover:text-[#1aa39a] transition-colors">
                      <Instagram size={20} />
                    </a>
                  )}
                  {influencer.twitter && (
                    <a href={`https://twitter.com/${influencer.twitter}`} className="text-gray-500 hover:text-[#1aa39a] transition-colors">
                      <Twitter size={20} />
                    </a>
                  )}
                  <div className="flex-grow"></div>
                  <button className="text-sm font-medium text-[#1aa39a] hover:text-[#2a73af] transition-colors flex items-center gap-1">
                    View Story
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1aa39a] to-[#2a73af] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
            See More Ambassadors
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InfluencerCollab;