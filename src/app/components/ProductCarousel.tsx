"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";

interface ProductCarouselProps {
  images: string[];
  alt?: string;
  // optional id to scope navigation buttons per carousel instance
  id?: string;
  // optionally hide navigation if desired
  showNav?: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  images,
  alt = "Product image",
  id = "carousel-default",
  showNav = true,
}) => {
  if (!images || images.length === 0) {
    return <div className="text-gray-500">No images available</div>;
  }

  return (
    <div className="relative w-full h-full">
      {/* Navigation buttons (scoped by id) */}
      {showNav && (
        <>
          <button
            id={`${id}-prev`}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-105 focus:outline-none"
          >
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            id={`${id}-next`}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-105 focus:outline-none"
          >
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={showNav ? { prevEl: `#${id}-prev`, nextEl: `#${id}-next` } : false}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        className="product-carousel w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-64">
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;