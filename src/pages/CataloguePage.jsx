import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CatalogueList, CatalogueCarCard, CatalogueDetails } from '../components/Catalogue';
import CatalogueModelVoiture from '../components/Catalogue/CataloguePages/CatalogueModelVoiture';
import { cars } from '../data/cars';
import SuzukiSection2 from '../components/Catalogue/Suzuki2/SuzukiSection2';

import '../components/Catalogue/catalogue.css';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const CataloguePage = () => {
  const [showModelCatalogue, setShowModelCatalogue] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="catalogue-page">
      <div className="catalogue-main-container">
        <div className="catalogue-header">
          <button className="catalogue-back-btn" onClick={() => navigate('/')}>&larr; Retour</button>
          <h1 className="catalogue-title">Catalogue</h1>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {showModelCatalogue ? (
            <button className="vehicle-type-btn" onClick={() => navigate('/catalogue-complet')}>
              Voir tout le catalogue
            </button>
          ) : (
            <button className="vehicle-type-btn" onClick={() => setShowModelCatalogue(true)}>
              Catalogue par modèle
            </button>
          )}
        </div>
        {showModelCatalogue ? (
          <CatalogueModelVoiture />
        ) : (
          <>
            <SuzukiSection2 />
            <CatalogueList>
              {cars.map((car) => (
                <CatalogueCarCard key={car.id} car={car} />
              ))}
            </CatalogueList>
          </>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default CataloguePage;
