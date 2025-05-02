import React from 'react';
import Image from 'next/image';

const TrustBadges = () => {
  const badges = [
    {
      icon: '/icons/shipping.svg',
      title: 'Free & fast',
      subtitle: 'shipping'
    },
    {
      icon: '/icons/trial.svg',
      title: '100-night',
      subtitle: 'risk-free trial'
    },
    {
      icon: '/icons/warranty.svg',
      title: '15-year warranty',
      subtitle: ''
    },
    {
      icon: '/icons/emi.svg',
      title: 'No-cost EMIs',
      subtitle: ''
    }
  ];

  return (
    <section className="bg-white py-4 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center flex-wrap">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center px-4">
              <div className="w-10 h-10 mr-2">
                <Image 
                  src={badge.icon} 
                  alt={badge.title} 
                  width={40} 
                  height={40} 
                />
              </div>
              <div>
                <p className="font-bold text-sm">{badge.title}</p>
                <p className="text-xs">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;