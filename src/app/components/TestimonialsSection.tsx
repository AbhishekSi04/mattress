'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, Quote, ChevronLeft, ChevronRight, MessageCircle, Award, ThumbsUp } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeTab, setActiveTab] = useState('sleep');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const videoRef = useRef(null);

  interface renderStars{
    rating: number;
  }
  
  const testimonialGroups = [
    {
      id: 'sleep',
      highlight: '18x',
      title: 'MORE LIKELY TO EXPERIENCE',
      subtitle: 'Best Night\'s Sleep',
      testimonials: [
        {
          id: 1,
          text: 'Easy to order, free and fast delivery. The mattress is comfortable as are the cushions, no more back and neck pain. I wonder why I waited so long to take the plunge. I highly recommend it!',
          name: 'Radhika Kapoor',
          location: 'Mumbai',
          rating: 5,
          date: 'April 2025',
          verified: true,
          image: '/api/placeholder/80/80'
        },
        {
          id: 2,
          text: 'Super comfortable. You don\'t feel when the person next to you moves. A real pleasure! Surely this is the best mattress to sleep on. My husband and I have never slept better in our lives!',
          name: 'Siddharth Vohra',
          location: 'Bangalore',
          rating: 5,
          date: 'March 2025',
          verified: true,
          image: '/api/placeholder/80/80'
        },
        {
          id: 3,
          text: 'I\'ve struggled with back pain for years, and this mattress has completely transformed my sleep. I wake up refreshed without any pain. The cooling technology also works wonders during summer months.',
          name: 'Priya Sharma',
          location: 'Delhi',
          rating: 5,
          date: 'April 2025',
          verified: true,
          image: '/api/placeholder/80/80'
        }
      ]
    },
    {
      id: 'comfort',
      highlight: '11x',
      title: 'MORE LIKELY TO SAY',
      subtitle: 'Most Comfortable Mattress',
      testimonials: [
        {
          id: 4,
          text: 'This is my 2nd mattress from this brand and I would never buy another one. I will definitely recommend them to friends, family, etc. I am very happy with the comfort and support it provides.',
          name: 'Aravind Menon',
          location: 'Hyderabad', 
          rating: 5,
          date: 'February 2025',
          verified: true,
          image: '/api/placeholder/80/80'
        },
        {
          id: 5,
          text: 'Unbelievable. Everything is amazing. The products are crazy, the comfort, the reliability, the quality! You have a problem? After 5 minutes you don\'t have one anymore! An exceptional customer service!',
          name: 'Leya D\'Cruz',
          location: 'Chennai',
          rating: 5, 
          date: 'March 2025',
          verified: true,
          image: '/api/placeholder/80/80'
        },
        {
          id: 6,
          text: 'The mattress is the perfect balance of firm and soft. I\'ve tried many premium brands before, but this one truly stands out. The edge support is fantastic, and it stays cool throughout the night.',
          name: 'Vikram Malhotra',
          location: 'Pune',
          rating: 5,
          date: 'January 2025',
          verified: true,
          image: '/api/placeholder/80/80'
        }
      ]
    },
    {
      id: 'delivery',
      highlight: '9x',
      title: 'MORE LIKELY TO PRAISE',
      subtitle: 'Exceptional Service',
      testimonials: [
        {
          id: 7,
          text: 'From ordering to delivery, everything was smooth. The mattress was delivered in a compact box that was easy to handle, and it expanded perfectly after unwrapping. Customer service was prompt and helpful.',
          name: 'Neha Gupta',
          location: 'Kolkata',
          rating: 5,
          date: 'March 2025',
          verified: true,
          image: '/api/placeholder/80/80'
        },
        {
          id: 8,
          text: 'Ordered on Monday, received on Wednesday! The unpacking experience was delightful, and the team called to check if everything was OK the next day. Truly impressed with the service quality.',
          name: 'Rahul Patel',
          location: 'Ahmedabad',
          rating: 5,
          date: 'February 2025',
          verified: true,
          image: '/api/placeholder/80/80'
        },
        {
          id: 9,
          text: 'I had so many questions before purchasing, and their support team was incredibly patient and knowledgeable. They helped me choose the perfect mattress for my needs. The 30-day trial period gave me complete peace of mind.',
          name: 'Ananya Iyer',
          location: 'Goa',
          rating: 5,
          date: 'April 2025',
          verified: true,
          image: '/api/placeholder/80/80'
        }
      ]
    }
  ];

  const videoTestimonials = [
    {
      id: 1,
      name: 'Rajesh & Sunita Verma',
      title: 'Resolved our different firmness preferences',
      thumbnail: '/api/placeholder/400/225',
      duration: '2:34'
    },
    {
      id: 2,
      name: 'Dr. Kavita Murthy',
      title: 'How it improved my patients\' back pain',
      thumbnail: '/api/placeholder/400/225',
      duration: '3:16'
    },
    {
      id: 3,
      name: 'The Sharma Family',
      title: 'Our whole family sleeps better now',
      thumbnail: '/api/placeholder/400/225',
      duration: '1:58'
    }
  ];

  const awards = [
    {
      id: 1,
      title: 'Best Mattress',
      organization: 'CHOICE®',
      year: '2024',
      logo: '/api/placeholder/120/60'
    },
    {
      id: 2,
      title: 'Innovation Award',
      organization: 'Sleep Technology',
      year: '2024',
      logo: '/api/placeholder/120/60'
    },
    {
      id: 3,
      title: 'Customer Satisfaction',
      organization: 'India Retail Federation',
      year: '2025',
      logo: '/api/placeholder/120/60'
    }
  ];

  const statistics = [
    { value: '97%', label: 'satisfaction rate' },
    { value: '30', label: 'night trial' },
    { value: '1M+', label: 'happy sleepers' },
    { value: '10+', label: 'years warranty' }
  ];

  const activeGroup = testimonialGroups.find(group => group.id === activeTab);
  
  const nextTestimonial = () => {
    if (activeGroup) {
      setCurrentTestimonial((currentTestimonial + 1) % activeGroup.testimonials.length);
    }
  };
  
  const prevTestimonial = () => {
    if (activeGroup) {
      setCurrentTestimonial((currentTestimonial - 1 + activeGroup.testimonials.length) % activeGroup.testimonials.length);
    }
  };

  useEffect(() => {
    setCurrentTestimonial(0);
  }, [activeTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVideoPlaying) {
        nextTestimonial();
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentTestimonial, isVideoPlaying, activeGroup]);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        (videoRef.current as HTMLVideoElement).pause();
      } else {
        (videoRef.current as HTMLVideoElement).play()
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const renderStars = (rating:number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < rating ? "#FFD700" : "none"} 
        stroke={i < rating ? "#FFD700" : "#D1D5DB"} 
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header with Animation */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-10">
            <Quote size={150} className="text-indigo-600" />
          </div>
          
          <h2 className="text-4xl font-bold mb-4 text-indigo-900">What Our Customers Say</h2>
          <p className="text-xl font-semibold text-indigo-600 mb-2">
            "Exceptional&lsquo; It&apos;s one of the best mattresses in India we&apos;ve tested in years!"
          </p>
          <p className="text-lg text-gray-600">
            Our Original Mattress - Awarded Best Mattress by CHOICE®
          </p>
          
          {/* Awards Showcase */}
          <div className="flex justify-center items-center mt-8 flex-wrap gap-6">
            {awards.map(award => (
              <div key={award.id} className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md">
                <img src={award.logo} alt={award.organization} className="h-8 mr-3" />
                <div className="text-left">
                  <p className="font-bold text-sm">{award.title}</p>
                  <p className="text-xs text-gray-500">{award.organization} {award.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-inner">
            {testimonialGroups.map(group => (
              <button
                key={group.id}
                onClick={() => setActiveTab(group.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === group.id
                    ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {group.subtitle}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Highlight Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl shadow-xl overflow-hidden transform rotate-1 lg:rotate-2 hover:rotate-0 transition-all duration-300">
            <div className="p-8 text-center">
              <div className="text-6xl font-bold mb-2">{activeGroup?.highlight}</div>
              <div className="text-sm font-medium text-indigo-200">{activeGroup?.title}</div>
              <div className="text-2xl font-bold mt-2">{activeGroup?.subtitle}</div>
              
              <div className="mt-10 p-6 bg-white bg-opacity-10 rounded-xl backdrop-filter backdrop-blur-sm">
                <div className="flex justify-center mb-4">
                  {activeTab === 'sleep' && <ThumbsUp size={40} className="text-white" />}
                  {activeTab === 'comfort' && <Award size={40} className="text-white" />}
                  {activeTab === 'delivery' && <MessageCircle size={40} className="text-white" />}
                </div>
                <p className="text-sm italic">
                  {activeTab === 'sleep' && "Our customers report significantly better sleep quality within the first week."}
                  {activeTab === 'comfort' && "Independent tests confirm our mattresses provide optimal pressure relief."}
                  {activeTab === 'delivery' && "Our customer service team resolves 99% of inquiries within 24 hours."}
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              <div className="absolute top-4 right-4 z-10 flex space-x-2">
                <button 
                  onClick={prevTestimonial}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="relative overflow-hidden h-full">
                <div 
                  className="flex transition-transform duration-500 h-full"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {activeGroup?.testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0 p-8">
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 mr-4"
                        />
                        <div>
                          <div className="flex mb-1">
                            {renderStars(testimonial.rating)}
                          </div>
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{testimonial.location}</span>
                            <span className="mx-2">•</span>
                            <span>{testimonial.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Quote size={36} className="absolute -top-2 -left-1 text-indigo-100 opacity-60" />
                        <p className="text-gray-700 text-lg pl-6 mb-6 italic">
                          {testimonial.text}
                        </p>
                      </div>
                      
                      {testimonial.verified && (
                        <div className="flex items-center text-sm text-green-600 font-medium">
                          <CheckCircle size={16} className="mr-1" />
                          Verified Purchase
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                {activeGroup?.testimonials.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2 h-2 rounded-full mx-1 transition-all ${
                      i === currentTestimonial 
                        ? 'bg-indigo-600 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistics Bar */}
        <div className="bg-indigo-900 text-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-indigo-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Video Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Customer Stories</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTestimonials.map((video) => (
              <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative cursor-pointer group" onClick={toggleVideoPlay}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-indigo-600 border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold">{video.name}</h4>
                  <p className="text-gray-600 text-sm">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* All Testimonials Section */}
        <div className="text-center">
          <button 
            onClick={() => setShowAllTestimonials(!showAllTestimonials)}
            className="inline-flex items-center px-6 py-3 rounded-full bg-indigo-100 text-indigo-600 font-medium hover:bg-indigo-200 transition-colors"
          >
            {showAllTestimonials ? 'Show Less' : 'See All 400+ Reviews'}
            <ChevronRight size={16} className={`ml-1 transition-transform ${showAllTestimonials ? 'rotate-90' : ''}`} />
          </button>
        </div>
        
        {showAllTestimonials && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonialGroups.flatMap(group => group.testimonials).map(testimonial => (
              <div key={testimonial.id} className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="text-xs text-gray-500">{testimonial.date}</span>
                </div>
                <p className="text-gray-700 text-sm mb-3">"{testimonial.text}"</p>
                <div className="flex items-center text-sm">
                  <span className="font-semibold">{testimonial.name}</span>
                  {testimonial.verified && (
                    <div className="flex items-center ml-2 text-green-600">
                      <CheckCircle size={12} className="mr-1" />
                      <span className="text-xs">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* More testimonial placeholders */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`more-${index}`} className="bg-white p-4 rounded-lg shadow border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex">
                    {renderStars(5)}
                  </div>
                  <span className="text-xs text-gray-500">March 2025</span>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  "This mattress has completely changed how I sleep. Amazing quality and great value for money."
                </p>
                <div className="flex items-center text-sm">
                  <span className="font-semibold">Happy Customer</span>
                  <div className="flex items-center ml-2 text-green-600">
                    <CheckCircle size={12} className="mr-1" />
                    <span className="text-xs">Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;