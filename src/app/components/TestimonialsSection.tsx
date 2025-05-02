import React from 'react';
import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonialGroups = [
    {
      highlight: '18x',
      title: 'MORE LIKELY TO EXPERIENCE',
      subtitle: 'Best Night\'s Sleep',
      testimonials: [
        {
          text: 'Easy to order, free and fast delivery. The mattress is comfortable as are the cushions, no more back and neck pain. I wonder why I waited so long to take the plunge. I highly recommend it!',
          name: 'Radhika Kapoor',
          verified: true
        },
        {
          text: 'Super comfortable. You don\'t feel when the person next to you moves. A real pleasure! Surely this is the best mattress to sleep',
          name: 'Siddharth Vohra',
          verified: true
        }
      ]
    },
    {
      highlight: '11x',
      title: 'MORE LIKELY TO SAY',
      subtitle: 'Most Comfortable Mattress',
      testimonials: [
        {
          text: 'This is my 2nd mattress from this brand and I would never buy another one. I will definitely recommend them to friends, family, etc. I am very happy :)',
          name: 'Aravind Menon',
          verified: true
        },
        {
          text: 'Unbelievable. Everything is amazing. The products are crazy, the comfort, the reliability, the quality! You have a problem? After 5 minutes you don\'t have one anymore! An exceptional customer service!',
          name: 'Leya D\'Cruz',
          verified: true
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl font-semibold text-indigo-600">
            "Exceptional, It's one of the best mattresses in India we've tested in years!"
          </p>
          <p className="text-lg">Our Original Mattress - Awarded Best Mattress by CHOICE®</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-indigo-600 text-white p-6 text-center">
                <div className="text-4xl font-bold mb-2">{group.highlight}</div>
                <div className="text-sm font-medium">{group.title}</div>
                <div className="text-xl font-bold mt-1">{group.subtitle}</div>
              </div>
              
              <div className="p-6">
                {group.testimonials.map((testimonial, index) => (
                  <div key={index} className={`${index > 0 ? 'mt-8 pt-8 border-t' : ''}`}>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                        <span className="text-gray-600 font-bold">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        {testimonial.verified && (
                          <div className="flex items-center text-sm text-green-600">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            verified customer
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;