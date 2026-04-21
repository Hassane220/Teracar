import React from 'react';

// Affiche une liste de véhicules du catalogue
const CatalogueList = ({ cars = [], onSelect, children }) => {
  // Si children sont fournis, mode slot
  if (children) {
    return (
      <div className="catalogue-list" style={{ position: 'relative' }}>
        {children}
      </div>
    );
  }
  return (
    <div className="catalogue-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {cars.length === 0 ? (
        <p>Aucun véhicule à afficher.</p>
      ) : (
        cars.map((car, idx) => (
          <div key={idx} className="catalogue-list-card" style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, minWidth: 220, cursor: 'pointer' }} onClick={() => onSelect && onSelect(car)}>
            <h3 style={{ marginBottom: 8 }}>{car.name}</h3>
            {car.image && (
              <img src={car.image} alt={car.name} style={{ width: '100%', height: 120, objectFit: 'cover', marginBottom: 8 }} />
            )}
            <div>{car.description}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default CatalogueList;
