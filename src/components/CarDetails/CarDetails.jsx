import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarDetails.css';

const CarDetails = ({ car, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Message envoyé:', contactData);
    alert('Message envoyé avec succès !');
    setShowContactForm(false);
    setContactData({ name: '', email: '', phone: '', message: '' });
  };

  const handleTestDrive = () => {
    alert('Demande d\'essai enregistrée !');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${car.brand} ${car.model}`,
        text: `Découvrez cette ${car.brand} ${car.model} ${car.year} à ${car.price}€`,
        url: window.location.href,
      });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié !');
    }
  };

  if (!car) {
    return (
      <div className="car-details-loading">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="car-details">
      {/* Bouton fermer pour modal */}
      {onClose && (
        <button className="car-details-close" onClick={onClose}>
          ×
        </button>
      )}

      {/* Galerie d'images */}
      <div className="car-details-gallery">
        <div className="main-image">
          <img 
            src={car.images[selectedImage]} 
            alt={`${car.brand} ${car.model}`}
          />
          <button 
            className="favorite-button"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
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

      {/* Informations principales */}
      <div className="car-details-info">
        <div className="car-details-header">
          <h1>{car.brand} {car.model} {car.year}</h1>
          <div className="car-details-price">
            <span className="price">{car.price.toLocaleString()} €</span>
            <span className="vat">TTC</span>
          </div>
        </div>

        {/* Caractéristiques */}
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

        {/* Description */}
        <div className="car-details-description">
          <h2>Description</h2>
          <p>{car.description}</p>
        </div>

        {/* Équipements */}
        <div className="car-details-features">
          <h2>Équipements</h2>
          <ul className="features-list">
            {car.features.map((feature, index) => (
              <li key={index}>✓ {feature}</li>
            ))}
          </ul>
        </div>

        {/* Vendeur */}
        <div className="car-details-seller">
          <h2>Vendeur</h2>
          <div className="seller-card">
            <div className="seller-info">
              <h3>{car.seller.name}</h3>
              <div className="seller-rating">
                {'★'.repeat(Math.floor(car.seller.rating))}
                {'☆'.repeat(5 - Math.floor(car.seller.rating))}
                <span>({car.seller.rating}/5)</span>
              </div>
              <p className="seller-phone">📞 {car.seller.phone}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="car-details-actions">
          <button className="btn btn-primary" onClick={() => setShowContactForm(true)}>
            Contacter
          </button>
          <button className="btn btn-outline" onClick={handleTestDrive}>
            Essai gratuit
          </button>
          <button className="btn btn-secondary" onClick={handleShare}>
            Partager
          </button>
        </div>
      </div>

      {/* Formulaire de contact modal */}
      {showContactForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Contacter le vendeur</h3>
              <button className="modal-close" onClick={() => setShowContactForm(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label>Nom complet *</label>
                <input
                  type="text"
                  value={contactData.name}
                  onChange={(e) => setContactData({...contactData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData({...contactData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Téléphone *</label>
                <input
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  value={contactData.message}
                  onChange={(e) => setContactData({...contactData, message: e.target.value})}
                  placeholder={`Bonjour, je suis intéressé par votre ${car.brand} ${car.model}...`}
                  rows="4"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;