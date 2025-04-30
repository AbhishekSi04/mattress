import React from 'react';

interface Influencer {
  id: number;
  name: string;
  image: string;
  followers: string;
}

const InfluencerCollab: React.FC = () => {
  // Dummy data for influencers
  const influencers: Influencer[] = [
    {
      id: 1,
      name: "Sleep Expert Alex",
      image: "/images/influencer1.jpg",
      followers: "1.2M"
    },
    {
      id: 2,
      name: "Wellness Guru Maya",
      image: "/images/influencer2.jpg",
      followers: "850K"
    },
    {
      id: 3,
      name: "Home Design Pro Jordan",
      image: "/images/influencer3.jpg",
      followers: "1.5M"
    },
    {
      id: 4,
      name: "Health Coach Taylor",
      image: "/images/influencer4.jpg",
      followers: "920K"
    }
  ];

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Sleep Ambassadors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {influencers.map(influencer => (
            <div key={influencer.id} className="bg-white rounded-lg shadow-md p-6 text-center transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                {/* In a real app, you'd use next/image with proper dimensions */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                  {influencer.name.charAt(0)}
                </div>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{influencer.name}</h3>
              <p className="text-gray-500 text-sm">{influencer.followers} followers</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfluencerCollab;