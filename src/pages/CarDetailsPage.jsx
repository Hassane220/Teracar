import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CarDetails from '../components/CarDetails/CarDetails';
import { api } from '../api/client';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const CarDetailsPage = () => {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);
  const navigate = useNavigate();
  const location = useLocation();
  const [car, setCar] = useState(null);

  useEffect(() => {
    api.getVehicle(id)
      .then(found => {
        setCar({
          ...found,
          seller: found.seller || { name: 'Vendeur local', phone: 'N/A', rating: 4.5 },
          images: found.images && found.images.length > 0 ? found.images : [found.image],
        });
      })
      .catch(() => navigate('/'));
  }, [id, navigate]);

  const handleBack = () => {
    // Si on a la marque et le modèle dans le state, on retourne explicitement à la page série
    if (location.state && location.state.brand && location.state.model) {
      navigate('/catalogue-complet', { state: { brand: location.state.brand }, replace: true });
      return;
    }
    // Sinon, retour normal
    navigate(-1);
  };

  return (
    <div className="car-details-page">
      {car ? (
        <CarDetails car={car} onClose={handleBack} />
      ) : (
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement des détails...</p>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default CarDetailsPage;