import React from 'react';
import NavBar from '../../components/ui/navbar';

const ListingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Car Listings</h1>
        <p className="text-gray-600">Car listing page - Coming in Commit 3</p>
      </div>
    </div>
  );
};

export default ListingPage;
