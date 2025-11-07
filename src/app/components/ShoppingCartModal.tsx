'use client';

import { useState } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../lib/cart';

interface ShoppingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCartModal({ isOpen, onClose }: ShoppingCartModalProps) {
  const { items, removeItem, updateItemQty } = useCart();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleRequestQuote = () => {
    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 overflow-y-auto animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden mt-4 animate-slideDown flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                <p className="text-gray-600">{items.length} items in your cart</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h3>
                <p className="text-lg text-gray-600">Add some products to get started</p>
              </div>
            ) : (
              <div className="p-8">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-6 py-6 border-b border-gray-200 last:border-b-0">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 flex-shrink-0 rounded">
                      {item.imageUrls && item.imageUrls.length > 0 ? (
                        <img
                          src={item.imageUrls[0]}
                          alt={item.title}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-12 h-8 bg-gray-300 rounded"></div>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h4 className="text-xl font-medium text-gray-900">{item.title}</h4>
                      <div className="text-base text-gray-600 mt-2">
                        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
                          Size: 1500×1900
                        </div>
                      </div>
                      <div className="text-base text-red-600 mt-2 font-medium">15% OFF</div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateItemQty(item.id, Math.max(1, item.quantity - 1))}
                        className="w-10 h-10 border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-50 rounded"
                      >
                        −
                      </button>
                      <span className="w-12 text-center text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateItemQty(item.id, item.quantity + 1)}
                        className="w-10 h-10 border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-50 rounded"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right min-w-[120px]">
                      <div className="text-xl font-semibold text-teal-600">
                        ₹{(Math.round(item.price * 0.7) * item.quantity).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Missed something section */}
          {items.length > 0 && (
            <div className="px-8 py-4 border-t border-gray-200 flex-shrink-0">
              <div className="text-base text-gray-600">
                Missed something?
                <button 
                  onClick={onClose}
                  className="text-gray-900 hover:text-gray-700 ml-3 font-medium"
                >
                  + Add More Items
                </button>
              </div>
            </div>
          )}

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 bg-green-50 p-8 flex-shrink-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-lg text-gray-700">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium">₹{Math.round(subtotal * 0.7).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
              </div>

              <div className="border-t border-green-200 pt-4 mb-6">
                <div className="flex justify-between text-2xl font-bold text-gray-900">
                  <span>Estimated Total</span>
                  <span>₹{Math.round(total * 0.7).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleRequestQuote}
                className="w-full bg-teal-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Request Quote
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Submit a quote request and our team will contact you with the best pricing and delivery options.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quote Request Modal */}
      {isQuoteModalOpen && (
        <QuoteRequestModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          cartItems={items}
          total={Math.round(total * 0.7)}
        />
      )}
    </>
  );
}

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  total: number;
}

function QuoteRequestModal({ isOpen, onClose, cartItems, total }: QuoteRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          cartItems,
          total,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to send quote request');
      }
    } catch (error) {
      console.error('Error sending quote request:', error);
      alert('Failed to send quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Sent Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your interest! We'll review your request and send you a detailed quote within 24 hours.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Request Quote</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Message (Optional)
              </label>
              <textarea
                id="message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                placeholder="Any specific requirements or questions?"
              />
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Quote Summary</h4>
            <div className="text-sm text-gray-600">
              <p>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items • Total: ₹{total.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Quote Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}