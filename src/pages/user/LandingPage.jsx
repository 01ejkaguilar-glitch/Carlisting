import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/ui/navbar';
import PrimaryButton from '../../components/ui/primarybutton';
import Card from '../../components/ui/card';

const LandingPage = () => {
  const navigate = useNavigate();

  // Function 1: Navigate to car listing
  const handleExplore = (index) => {
    navigate('/listing');
  };

  // Function 2: Navigate to order page
  const handleOrder = () => {
    navigate('/order');
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen w-full">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 xl:px-32 py-20 md:py-32">
        <div className="text-center max-w-4xl">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Build Modern Web Apps with <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Ease</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            Create fast, responsive, and modern web applications using React and Tailwind CSS. Get started in minutes with our flexible UI components and streamlined workflow.
          </p>

          <PrimaryButton
            label="Get Started"
            onClick={handleExplore}
            type="primary"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-20">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Platform?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <Card
            icon="⚡"
            title="Lightning Fast"
            description="Built with performance in mind, delivering blazing fast load times and smooth interactions."
          />

          {/* Card 2 */}
          <Card
            icon="📱"
            title="Responsive Design"
            description="Your website looks stunning on all devices, from mobile to desktop, with adaptive layouts."
          />

          {/* Card 3 */}
          <Card
            icon="⚙️"
            title="Easy Customization"
            description="Tailwind's utility-first classes make styling fast, flexible, and maintainable at scale."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white text-center py-20 px-6 md:px-12">
        <div className="w-full">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Launch Your Next Project?
          </h3>
          <p className="mb-10 text-lg text-indigo-100">
            Join thousands of developers who trust our modern UI components to build exceptional experiences.
          </p>
          <PrimaryButton
            label="Order Now →"
            onClick={handleOrder}
            type="secondary"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-400 text-center py-8">
        <p className="text-sm">© 2025 Put your name here. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
