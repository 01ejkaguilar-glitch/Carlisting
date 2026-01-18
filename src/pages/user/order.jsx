import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/ui/navbar';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCar = location.state?.selectedCar;

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Pricing calculations
  const taxRate = 0.08; // 8% tax
  const deliveryFee = 500;
  const subtotal = selectedCar?.price || 0;
  const tax = subtotal * taxRate;
  const total = subtotal + tax + deliveryFee;

  useEffect(() => {
    if (!selectedCar) {
      // If no car selected, redirect to listing page
      const timer = setTimeout(() => {
        navigate('/listing');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedCar, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid 5-digit ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after 3 seconds and redirect
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 3000);
  };

  if (!selectedCar) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <NavBar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <p className="text-6xl mb-4">🚗</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Car Selected</h2>
            <p className="text-gray-600 mb-4">Redirecting you to our catalog...</p>
            <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <NavBar />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-fade-in shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. We'll contact you shortly with delivery details.
            </p>
            <div className="text-sm text-gray-500">
              Redirecting to homepage...
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Complete Your Order
          </h1>
          <p className="text-lg md:text-xl text-indigo-100">
            Just a few more steps to get your dream car!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>👤</span> Customer Information
                </h2>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-200'
                      } focus:border-indigo-500 focus:outline-none transition-colors`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        } focus:border-indigo-500 focus:outline-none transition-colors`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.phone ? 'border-red-500' : 'border-gray-200'
                        } focus:border-indigo-500 focus:outline-none transition-colors`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.address ? 'border-red-500' : 'border-gray-200'
                      } focus:border-indigo-500 focus:outline-none transition-colors`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.city ? 'border-red-500' : 'border-gray-200'
                        } focus:border-indigo-500 focus:outline-none transition-colors`}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.state ? 'border-red-500' : 'border-gray-200'
                        } focus:border-indigo-500 focus:outline-none transition-colors`}
                        placeholder="NY"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.zipCode ? 'border-red-500' : 'border-gray-200'
                        } focus:border-indigo-500 focus:outline-none transition-colors`}
                        placeholder="10001"
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span>💳</span> Payment Method
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-indigo-600"
                    />
                    <span className="ml-3 flex items-center gap-2">
                      <span className="text-2xl">💳</span>
                      <span className="font-semibold">Credit / Debit Card</span>
                    </span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-indigo-600"
                    />
                    <span className="ml-3 flex items-center gap-2">
                      <span className="text-2xl">💰</span>
                      <span className="font-semibold">PayPal</span>
                    </span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={formData.paymentMethod === 'bank-transfer'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-indigo-600"
                    />
                    <span className="ml-3 flex items-center gap-2">
                      <span className="text-2xl">🏦</span>
                      <span className="font-semibold">Bank Transfer</span>
                    </span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="financing"
                      checked={formData.paymentMethod === 'financing'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-indigo-600"
                    />
                    <span className="ml-3 flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      <span className="font-semibold">Financing Options</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin w-5 h-5 border-3 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </span>
                ) : (
                  'Complete Order'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>📋</span> Order Summary
              </h2>

              {/* Selected Car */}
              <div className={`bg-gradient-to-br ${selectedCar.color} rounded-xl p-4 mb-6`}>
                <div className="flex items-center justify-center mb-3">
                  <span className="text-6xl">{selectedCar.image}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {selectedCar.model}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {selectedCar.brand} • {selectedCar.year}
                </p>
              </div>

              {/* Specifications */}
              <div className="space-y-2 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Mileage:</span>
                  <span className="font-semibold">{selectedCar.mileage.toLocaleString()} mi</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fuel Type:</span>
                  <span className="font-semibold">{selectedCar.fuelType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transmission:</span>
                  <span className="font-semibold">{selectedCar.transmission}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Condition:</span>
                  <span className="font-semibold text-green-600">{selectedCar.condition}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%):</span>
                  <span className="font-semibold">${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-semibold">${deliveryFee.toLocaleString()}</span>
                </div>
                <div className="border-t-2 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="text-green-500">✓</span>
                  <span>Secure Payment Processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="text-green-500">✓</span>
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span>
                  <span>Free Nationwide Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">© 2026 The Car Listing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default OrderPage;
