import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/ui/navbar';
import PrimaryButton from '../../components/ui/primarybutton';

const ListingPage = () => {
  const navigate = useNavigate();
  
  // Mock car data
  const carsData = [
    {
      id: 1,
      model: "Tesla Model S",
      brand: "Tesla",
      year: 2024,
      price: 89990,
      mileage: 5000,
      fuelType: "Electric",
      transmission: "Automatic",
      image: "🚗",
      color: "from-blue-100 to-cyan-100",
      featured: true,
      description: "Premium electric sedan with autopilot",
      condition: "Excellent"
    },
    {
      id: 2,
      model: "BMW M4",
      brand: "BMW",
      year: 2025,
      price: 75990,
      mileage: 2000,
      fuelType: "Gasoline",
      transmission: "Manual",
      image: "🏎️",
      color: "from-gray-100 to-slate-100",
      featured: true,
      description: "High-performance sports coupe",
      condition: "Like New"
    },
    {
      id: 3,
      model: "Mercedes-Benz GLE",
      brand: "Mercedes",
      year: 2024,
      price: 68990,
      mileage: 12000,
      fuelType: "Hybrid",
      transmission: "Automatic",
      image: "🚙",
      color: "from-indigo-100 to-purple-100",
      featured: false,
      description: "Luxury SUV with premium features",
      condition: "Excellent"
    },
    {
      id: 4,
      model: "Audi Q7",
      brand: "Audi",
      year: 2024,
      price: 62990,
      mileage: 8500,
      fuelType: "Diesel",
      transmission: "Automatic",
      image: "🚐",
      color: "from-green-100 to-emerald-100",
      featured: false,
      description: "Spacious family SUV with advanced tech",
      condition: "Very Good"
    },
    {
      id: 5,
      model: "Porsche 911",
      brand: "Porsche",
      year: 2025,
      price: 115990,
      mileage: 1500,
      fuelType: "Gasoline",
      transmission: "Automatic",
      image: "🏁",
      color: "from-red-100 to-orange-100",
      featured: true,
      description: "Iconic sports car with legendary performance",
      condition: "Like New"
    },
    {
      id: 6,
      model: "Toyota Camry",
      brand: "Toyota",
      year: 2023,
      price: 32990,
      mileage: 25000,
      fuelType: "Hybrid",
      transmission: "Automatic",
      image: "🚗",
      color: "from-yellow-100 to-amber-100",
      featured: false,
      description: "Reliable sedan with excellent fuel economy",
      condition: "Good"
    },
    {
      id: 7,
      model: "Honda CR-V",
      brand: "Honda",
      year: 2024,
      price: 38990,
      mileage: 15000,
      fuelType: "Gasoline",
      transmission: "Automatic",
      image: "🚙",
      color: "from-teal-100 to-cyan-100",
      featured: false,
      description: "Practical SUV perfect for families",
      condition: "Very Good"
    },
    {
      id: 8,
      model: "Ford Mustang",
      brand: "Ford",
      year: 2024,
      price: 45990,
      mileage: 8000,
      fuelType: "Gasoline",
      transmission: "Manual",
      image: "🏎️",
      color: "from-purple-100 to-pink-100",
      featured: false,
      description: "American muscle car with raw power",
      condition: "Excellent"
    },
    {
      id: 9,
      model: "Lexus RX 350",
      brand: "Lexus",
      year: 2024,
      price: 52990,
      mileage: 10000,
      fuelType: "Hybrid",
      transmission: "Automatic",
      image: "🚐",
      color: "from-slate-100 to-gray-100",
      featured: false,
      description: "Luxury SUV with supreme comfort",
      condition: "Excellent"
    },
    {
      id: 10,
      model: "Chevrolet Corvette",
      brand: "Chevrolet",
      year: 2025,
      price: 82990,
      mileage: 3000,
      fuelType: "Gasoline",
      transmission: "Automatic",
      image: "🏁",
      color: "from-orange-100 to-red-100",
      featured: true,
      description: "Mid-engine supercar with stunning design",
      condition: "Like New"
    },
    {
      id: 11,
      model: "Volvo XC90",
      brand: "Volvo",
      year: 2024,
      price: 59990,
      mileage: 7000,
      fuelType: "Hybrid",
      transmission: "Automatic",
      image: "🚙",
      color: "from-blue-100 to-indigo-100",
      featured: false,
      description: "Safe and sophisticated family SUV",
      condition: "Excellent"
    },
    {
      id: 12,
      model: "Nissan Altima",
      brand: "Nissan",
      year: 2023,
      price: 29990,
      mileage: 20000,
      fuelType: "Gasoline",
      transmission: "Automatic",
      image: "🚗",
      color: "from-green-100 to-lime-100",
      featured: false,
      description: "Affordable sedan with modern features",
      condition: "Good"
    }
  ];

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedFuelType, setSelectedFuelType] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  // Get unique brands and fuel types
  const brands = ['All', ...new Set(carsData.map(car => car.brand))];
  const fuelTypes = ['All', ...new Set(carsData.map(car => car.fuelType))];

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    let filtered = carsData.filter(car => {
      const matchesSearch = car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
      const matchesFuel = selectedFuelType === 'All' || car.fuelType === selectedFuelType;
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      
      return matchesSearch && matchesBrand && matchesFuel && matchesPrice;
    });

    // Sort
    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year-new':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'mileage-low':
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, selectedBrand, selectedFuelType, priceRange, sortBy, carsData]);

  // Pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handleOrderCar = (car) => {
    navigate('/order', { state: { selectedCar: car } });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <NavBar />
      
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Explore Our Premium Collection
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
            Browse {carsData.length} carefully selected vehicles from top brands. Find your perfect match today.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by model or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-lg shadow-sm"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Fuel Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fuel Type</label>
              <select
                value={selectedFuelType}
                onChange={(e) => setSelectedFuelType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none"
              >
                {fuelTypes.map(fuel => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Newest First</option>
                <option value="mileage-low">Lowest Mileage</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="w-full px-4 py-2 bg-indigo-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Showing</p>
                <p className="text-lg font-bold text-indigo-600">{filteredCars.length} Cars</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {currentCars.length > 0 ? (
          <>
            {/* Car Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative"
                >
                  {/* Featured Badge */}
                  {car.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Car Image */}
                  <div className={`h-52 bg-gradient-to-br ${car.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    <span className="text-7xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">
                      {car.image}
                    </span>
                  </div>

                  {/* Car Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{car.model}</h3>
                        <p className="text-sm text-gray-500">{car.brand} • {car.year}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        {car.condition}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{car.description}</p>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📏</span>
                        <span>{car.mileage.toLocaleString()} mi</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>⚙️</span>
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>⛽</span>
                        <span>{car.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📅</span>
                        <span>{car.year}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="border-t pt-4 mb-4">
                      <p className="text-3xl font-bold text-indigo-600">
                        ${car.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOrderCar(car)}
                        className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
                      >
                        Order Now
                      </button>
                      <button
                        onClick={() => handleOrderCar(car)}
                        className="px-4 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 font-semibold"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentPage === index + 1
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">No cars found</p>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">© 2026 The Car Listing. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ListingPage;
