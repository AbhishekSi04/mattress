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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Side Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-white shadow-2xl animate-slideInRight flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-teal-600 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9" />
                </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
              <p className="text-teal-50">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some products to get started</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0 rounded-lg overflow-hidden">
                      {item.imageUrls && item.imageUrls.length > 0 ? (
                        <img
                          src={item.imageUrls[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1 truncate">{item.title}</h4>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Size: 1500×1900
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          30% OFF
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold text-teal-600">
                          ₹{(Math.round(item.price * 0.7) * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateItemQty(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:text-teal-600 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateItemQty(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:text-teal-600 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Missed something section */}
        {items.length > 0 && (
          <div className="px-6 py-4 bg-blue-50 border-t border-blue-100 flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Need something else?</span>
              <button 
                onClick={onClose}
                className="text-sm text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add More Items
              </button>
            </div>
          </div>
        )}

        {/* Order Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-white p-6 flex-shrink-0 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="font-semibold text-gray-900">₹{Math.round(subtotal * 0.7).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Discount (30%)</span>
                <span className="text-red-600 font-semibold">-₹{Math.round(subtotal * 0.3).toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 pt-4 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-teal-600">₹{Math.round(total * 0.7).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleRequestQuote}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 px-6 rounded-xl text-base font-bold hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Request Quote
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              🔒 Secure checkout • Free shipping • 24hr response
            </p>
          </div>
        )}
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