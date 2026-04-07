import React from 'react';
import './Brand.css';

const Brand = ({ name, logo }) => (
  <div className="brand">
    <img src={logo} alt={name} className="brand-logo" />
    <span className="brand-name">{name}</span>
  </div>
);

export default Brand;
