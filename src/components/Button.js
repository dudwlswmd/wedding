import React from 'react';
import '../styles/Button.css';

const Button = ({ children, onClick, variant = 'primary', size = 'medium', ...props }) => {
  return (
    <button 
      className={`button button-${variant} button-${size}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 