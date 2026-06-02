import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CarDetails from '../components/CarDetails/CarDetails';
import { cars as carsData } from '../data/cars';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const CarDetailsPage = () => {
  const { id } = useParams();
  // Remonte en haut de la page à chaque affichage
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);
  const navigate = useNavigate();
  const location = useLocation();
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