import React from 'react';

const PrimaryButton = ({ label, onClick, type = 'primary' }) => {
  const baseStyles = 'px-6 py-2.5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg cursor-pointer';
  
  const typeStyles = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 hover:shadow-xl',
    secondary: 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 hover:shadow-xl',
    outline: 'border-2 border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-600 hover:text-white hover:scale-105'
  };

  return (
    <button
      className={`${baseStyles} ${typeStyles[type]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
