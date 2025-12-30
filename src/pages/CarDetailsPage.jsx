import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarDetails from '../components/CarDetails/CarDetails';

// Données de test
const carData = [
  {
    id: 1,
    brand: 'Mercedes-Benz',
    model: 'Classe C',
    year: 2023,
    price: 45000,
    mileage: 15000,
    fuel: 'Diesel',
    transmission: 'Automatique',
    color: 'Noir',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w-800',
    ],
    description: 'Mercedes-Benz Classe C 2023, état impeccable.',
    features: ['Toit panoramique', 'Système audio premium', 'Caméra de recul'],
    seller: {
      name: 'Auto Premium Paris',
      phone: '01 23 45 67 89',
      rating: 4.8
    }
  },
  // Ajoute d'autres voitures...
];

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Simuler appel API
    setTimeout(() => {
      const foundCar = carData.find(c => c.id === parseInt(id));
      if (foundCar) {
        setCar(foundCar);
      } else {
        navigate('/');
      }
    }, 500);
  }, [id, navigate]);

  const handleBack = () => {
    navigate(-1); // Retour à la page précédente
  };

  return (
    <div className="car-details-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button className="back-button" onClick={handleBack}>
            ← Retour
          </button>
        </nav>
        
        {/* Le composant CarDetails */}
        {car ? (
          <CarDetails car={car} onClose={handleBack} />
        ) : (
          <div className="loading">
            <div className="spinner"></div>
            <p>Chargement des détails...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailsPage;