import React from 'react';

interface Review {
  id: number;
  name: string;
  image: string;
  text: string;
  rating: number;
}

const UGCSection: React.FC = () => {
  // Dummy data for customer reviews
  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah J.",
      image: "/images/customer1.jpg",
      text: "The custom mattress has completely transformed my sleep. I wake up refreshed every morning!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael T.",
      image: "/images/customer2.jpg",
      text: "After taking the sleep quiz, I found the perfect mattress for my back pain. Couldn't be happier!",
      rating: 5
    },
    {
      id: 3,
      name: "Emma R.",
      image: "/images/customer3.jpg",
      text: "The quality and comfort are unmatched. Worth every penny!",
      rating: 4
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Customer Spotlight</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
                  {/* In a real app, you'd use next/image with proper dimensions */}
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                    {review.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{review.name}</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UGCSection;