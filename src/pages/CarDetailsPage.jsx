import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarDetails from '../components/CarDetails/CarDetails';
import { cars as carsData } from '../data/cars';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Rechercher la voiture dans les données partagées
    const found = carsData.find((c) => c.id === parseInt(id, 10));
    if (found) {
      // Garantir que la structure attendue par `CarDetails` est présente
      const carWithDefaults = {
        ...found,
        seller: found.seller || { name: 'Vendeur local', phone: 'N/A', rating: 4.5 },
        images: found.images && found.images.length > 0 ? found.images : [found.image],
      };
      setCar(carWithDefaults);
    } else {
      // Si non trouvé, rediriger vers l'accueil
      navigate('/');
    }
  }, [id, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="car-details-page">
      <div className="container">
        <nav className="breadcrumb">
          <button className="back-button" onClick={handleBack} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'1.1rem'}}>
            <span style={{fontSize:'1.5em',lineHeight:1}}>&#8592;</span> Retour
          </button>
        </nav>

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