import React, { useState } from 'react';
import './CarDetails.css';

const CarDetails = ({ car, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!car) return null;

  return (
    <div className="car-details">
      {onClose && (
        <button className="car-details-close" onClick={onClose}>
          ×
        </button>
      )}

      <div className="car-details-gallery">
        <div className="main-image">
          <img src={car.images[selectedImage]} alt={`${car.brand} ${car.model}`} />
        </div>
        
        <div className="image-thumbnails">
          {car.images.map((img, index) => (
            <button
              key={index}
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={img} alt={`Vue ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="car-details-info">
        <div className="car-details-header">
          <h1>{car.brand} {car.model} {car.year}</h1>
          <div className="car-details-price">
            <span className="price">{car.price.toLocaleString()} €</span>
          </div>
        </div>

        <div className="car-details-specs">
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Année</span>
              <span className="spec-value">{car.year}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kilométrage</span>
              <span className="spec-value">{car.mileage.toLocaleString()} km</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Carburant</span>
              <span className="spec-value">{car.fuel}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Boîte</span>
              <span className="spec-value">{car.transmission}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Couleur</span>
              <span className="spec-value">{car.color}</span>
            </div>
          </div>
        </div>

        <div className="car-details-description">
          <h2>Description</h2>
          <p>{car.description}</p>
        </div>

        <div className="car-details-features">
          <h2>Équipements</h2>
          <ul className="features-list">
            {car.features.map((feature, index) => (
              <li key={index}>✓ {feature}</li>
            ))}
          </ul>
        </div>

        <div className="car-details-actions">
          <button className="btn btn-primary" onClick={() => alert('Contact form to come')}>
            Contacter le vendeur
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;