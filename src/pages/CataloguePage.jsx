import React, { useState } from 'react';
import { CatalogueList, CatalogueCarCard, CatalogueDetails } from '../components/Catalogue';
import { cars } from '../data/cars';
import '../components/Catalogue/catalogue.css';

const CataloguePage = () => {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div className="catalogue-page">
      <div className="catalogue-main-container">
        <div className="catalogue-header">
          <button className="catalogue-back-btn" onClick={() => window.history.back()}>&larr; Retour</button>
          <h1 className="catalogue-title">Catalogue</h1>
        </div>
        <CatalogueList>
          {cars.map((car) => (
            <CatalogueCarCard key={car.id} car={car} />
          ))}
        </CatalogueList>
      </div>
    </div>
  );
};

export default CataloguePage;
