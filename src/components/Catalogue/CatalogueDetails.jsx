import React from 'react';
import CatalogueImageSlider from './CatalogueImageSlider';

const CatalogueDetails = ({ car }) => {
  if (!car) return <div>Aucune voiture sélectionnée.</div>;
  return (
    <div className="catalogue-details">
      <h2>{car.name}</h2>
      <p>Marque : {car.brand}</p>
      <p>{car.description}</p>
      <CatalogueImageSlider images={car.images} />
      {/* Ajouter d'autres infos détaillées ici */}
    </div>
  );
};

export default CatalogueDetails;
