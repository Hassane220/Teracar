import React from 'react';
import CatalogueImageSlider from './CatalogueImageSlider';

const field = (label, value) => value ? (
  <div className="spec-row"><span className="label">{label}</span><span className="value">{value}</span></div>
) : null;

const CatalogueDetails = ({ car }) => {
  if (!car) return <div>Aucune voiture sélectionnée.</div>;
  return (
    <div className="catalogue-details">
      <h2>{car.name || car.model}</h2>
      <CatalogueImageSlider images={car.images} />
      <div className="specs">
        {field('Marque', car.brand)}
        {field('Modèle', car.model)}
        {field('Année', car.year)}
        {field('Motorisation', car.engine || car.motorisation)}
        {field('Transmission', car.transmission)}
        {field('Kilométrage', car.kilometrage)}
        {field('Couleur', car.color)}
        {field('Carburant', car.fuel)}
        {field('Puissance', car.power)}
        {field('Portes', car.doors)}
        {field('Places', car.seats)}
      </div>
      {car.options && car.options.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <strong>Équipements principaux :</strong>
          <ul>
            {car.options.map((opt, idx) => <li key={idx}>{opt}</li>)}
          </ul>
        </div>
      )}
      {car.description && <div style={{ marginTop: 16 }}>{car.description}</div>}
    </div>
  );
};

export default CatalogueDetails;
