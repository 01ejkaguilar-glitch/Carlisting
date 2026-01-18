import React from 'react';

const Card = ({ icon, title, description, onClick }) => {
  return (
    <div
      className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-110 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Icon Section */}
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h4 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors">
        {title}
      </h4>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Card;
