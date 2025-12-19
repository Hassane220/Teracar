import React from 'react';
import CarCard from '../CarCard/CarCard';
import './carlist.css';

const CarList = ({ cars, title = "Nos Véhicules", subtitle }) => {
  return (
    <section className="car-list">
      <div className="container">
        <div className="section__header">
          <h2 className="section__title">{title}</h2>
          {subtitle && <p className="section__subtitle">{subtitle}</p>}
        </div>
        
        <div className="car-list__grid">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarList;