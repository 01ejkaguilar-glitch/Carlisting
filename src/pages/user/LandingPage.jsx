import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../../components/ui/navbar';
import PrimaryButton from '../../components/ui/primarybutton';
import Card from '../../components/ui/card';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [countedStats, setCountedStats] = useState({
    cars: 0,
    customers: 0,
    rating: 0
  });
  const [hasCountedStats, setHasCountedStats] = useState(false);
  const statsRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Executive",
      image: "👩‍💼",
      rating: 5,
      text: "Found my dream Tesla Model S here! The process was smooth, pricing was transparent, and the customer service was exceptional. Highly recommend!"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      image: "👨‍💻",
      rating: 5,
      text: "Best car buying experience ever. The platform is intuitive, and I love how detailed the specifications are. Got a great deal on my BMW!"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Business Owner",
      image: "👩‍💼",
      rating: 5,
      text: "Professional service from start to finish. They helped me find the perfect SUV for my family. The quality guarantee gave me peace of mind."
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Teacher",
      image: "👨‍🏫",
      rating: 5,
      text: "Incredible selection and competitive prices. The team went above and beyond to answer all my questions. My Audi arrived in perfect condition!"
    }
  ];

  // Function 1: Navigate to car listing
  const handleExplore = (index) => {
    navigate('/listing');
  };

  // Function 2: Navigate to order page
  const handleOrder = () => {
    navigate('/order');
  };

  // Testimonial carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Number counting animation for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCountedStats) {
            setHasCountedStats(true);
            
            // Animate cars count
            let carCount = 0;
            const carInterval = setInterval(() => {
              carCount += 30;
              if (carCount >= 1200) {
                carCount = 1200;
                clearInterval(carInterval);
              }
              setCountedStats(prev => ({ ...prev, cars: carCount }));
            }, 20);

            // Animate customers count
            let customerCount = 0;
            const customerInterval = setInterval(() => {
              customerCount += 25;
              if (customerCount >= 950) {
                customerCount = 950;
                clearInterval(customerInterval);
              }
              setCountedStats(prev => ({ ...prev, customers: customerCount }));
            }, 20);

            // Animate rating
            let ratingCount = 0;
            const ratingInterval = setInterval(() => {
              ratingCount += 0.1;
              if (ratingCount >= 4.8) {
                ratingCount = 4.8;
                clearInterval(ratingInterval);
              }
              setCountedStats(prev => ({ ...prev, rating: ratingCount }));
            }, 30);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasCountedStats]);

  // Smooth scroll animation on element visibility
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen w-full">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 xl:px-32 py-20 md:py-32">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Find Your Dream Car with <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Confidence</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed">
            Discover premium vehicles with transparent pricing, detailed specifications, and seamless online ordering. Your perfect ride is just a click away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <PrimaryButton
              label="Browse Cars →"
              onClick={handleExplore}
              type="primary"
            />
            <PrimaryButton
              label="Learn More"
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              type="outline"
            />
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>1000+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>Verified Dealers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-20 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Why Choose CarListing?
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Experience the best car buying journey with our comprehensive platform designed for your convenience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <Card
            icon="🚗"
            title="Wide Selection"
            description="Browse hundreds of certified vehicles from luxury sedans to rugged SUVs. Find the perfect match for your lifestyle."
          />

          {/* Card 2 */}
          <Card
            icon="💰"
            title="Transparent Pricing"
            description="No hidden fees, no surprises. See full pricing breakdown and financing options before you commit."
          />

          {/* Card 3 */}
          <Card
            icon="✅"
            title="Quality Guaranteed"
            description="Every vehicle is inspected, certified, and backed by our comprehensive warranty program."
          />
        </div>
      </section>

      {/* Social Proof Section with Counting Animation */}
      <section ref={statsRef} className="w-full py-16 bg-white animate-on-scroll">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Trusted by Thousands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 group hover:scale-105 transition-transform duration-300">
              <p className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2 group-hover:text-purple-600 transition-colors">
                {countedStats.cars.toLocaleString()}+
              </p>
              <p className="text-gray-600 font-medium">Cars Sold</p>
            </div>
            <div className="p-6 group hover:scale-105 transition-transform duration-300">
              <p className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2 group-hover:text-purple-600 transition-colors">
                {countedStats.customers.toLocaleString()}+
              </p>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div className="p-6 group hover:scale-105 transition-transform duration-300">
              <p className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2 group-hover:text-purple-600 transition-colors">
                {countedStats.rating > 0 ? countedStats.rating.toFixed(1) : '0.0'}★
              </p>
              <p className="text-gray-600 font-medium">Average Rating</p>
            </div>
            <div className="p-6 group hover:scale-105 transition-transform duration-300">
              <p className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2 group-hover:text-purple-600 transition-colors">
                24/7
              </p>
              <p className="text-gray-600 font-medium">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Preview Section */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-20 xl:px-32 bg-gray-50 animate-on-scroll">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Featured Vehicles
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Check out our handpicked selection of premium vehicles available right now.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
          {/* Featured Car 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group relative">
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
              ✨ Featured
            </div>
            <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              <span className="text-6xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">🚙</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Luxury Sedan 2024</h3>
              <p className="text-gray-600 text-sm mb-4">Premium comfort with advanced safety features</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-indigo-600">$45,999</span>
                <span className="text-sm text-gray-500">25K miles</span>
              </div>
              <div className="flex gap-2 text-xs text-gray-600 mb-4">
                <span className="px-2 py-1 bg-gray-100 rounded">2024</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Automatic</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Hybrid</span>
              </div>
              <button 
                onClick={handleExplore}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                View Details
              </button>
            </div>
          </div>

          {/* Featured Car 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group relative">
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
              🔥 Hot Deal
            </div>
            <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              <span className="text-6xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">🚗</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sport Coupe 2025</h3>
              <p className="text-gray-600 text-sm mb-4">Thrilling performance meets elegant design</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-indigo-600">$52,999</span>
                <span className="text-sm text-gray-500">12K miles</span>
              </div>
              <div className="flex gap-2 text-xs text-gray-600 mb-4">
                <span className="px-2 py-1 bg-gray-100 rounded">2025</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Manual</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Gasoline</span>
              </div>
              <button 
                onClick={handleExplore}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                View Details
              </button>
            </div>
          </div>

          {/* Featured Car 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group relative">
            <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
              ⚡ New
            </div>
            <div className="h-48 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              <span className="text-6xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">🚐</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Family SUV 2024</h3>
              <p className="text-gray-600 text-sm mb-4">Spacious interior perfect for family adventures</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-indigo-600">$38,999</span>
                <span className="text-sm text-gray-500">18K miles</span>
              </div>
              <div className="flex gap-2 text-xs text-gray-600 mb-4">
                <span className="px-2 py-1 bg-gray-100 rounded">2024</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Automatic</span>
                <span className="px-2 py-1 bg-gray-100 rounded">Electric</span>
              </div>
              <button 
                onClick={handleExplore}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <PrimaryButton
            label="View All Cars →"
            onClick={handleExplore}
            type="outline"
          />
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-br from-gray-50 to-white animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from real customers who found their perfect vehicles.
          </p>

          {/* Carousel Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Main Testimonial Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-indigo-100 text-9xl font-serif leading-none select-none">
                "
              </div>
              
              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">★</span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 text-center italic">
                  "{testimonials[currentTestimonial].text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                    {testimonials[currentTestimonial].image}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentTestimonial
                      ? 'w-12 h-3 bg-indigo-600'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white text-center py-20 px-6 md:px-12 animate-on-scroll relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="mb-10 text-lg text-indigo-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream vehicles through our platform. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton
              label="Start Shopping →"
              onClick={handleExplore}
              type="secondary"
            />
            <button
              onClick={handleOrder}
              className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="w-full bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-white font-bold text-2xl mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              The Car Listing
            </h3>
            <p className="text-sm leading-relaxed">
              Your trusted automotive marketplace for finding quality vehicles with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/listing" className="hover:text-indigo-400 transition-colors">
                  Browse Cars
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-indigo-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <Link to="/order" className="hover:text-indigo-400 transition-colors">
                  Order Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span>📧</span>
                <span>info@carlisting.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Auto Street, Car City, CC 12345</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span>f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span>𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <span>in</span>
              </a>
            </div>
            <p className="text-sm">
              <strong className="text-white">Open Daily</strong><br />
              Mon-Fri: 9AM - 8PM<br />
              Sat-Sun: 10AM - 6PM
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm">
            © 2026 The Car Listing. All rights reserved. | 
            <a href="#" className="hover:text-indigo-400 transition-colors ml-2">Privacy Policy</a> | 
            <a href="#" className="hover:text-indigo-400 transition-colors ml-2">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
