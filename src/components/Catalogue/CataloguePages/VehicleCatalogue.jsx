import React from 'react';
import './VehicleCatalogue.css';

// ===== IMAGES =====
import catalogueImage from '../../../assets/images/catalogue_gamme_de_vehicule.png';

import explorer from '../../../assets/images/ford/explorer.png';
import ranger from '../../../assets/images/ford/ranger.png';
import raptor from '../../../assets/images/ford/raptor.png';
import edge from '../../../assets/images/ford/edge.png';
import expedition from '../../../assets/images/ford/expedition.png';
import expeditionBig from '../../../assets/images/ford/expeditin_G.png';

import fordLogo from '../../../assets/images/ford/FORD.png';
import tmLogo from '../../../assets/images/TM_catalogue.png';
import teracarMotorsLogo from '../../../assets/images/Teracar_motors.png';

import FordSection from '../Ford/FordSection.jsx';
import HyundaiSection from '../Hyundai/HyundaiSection.jsx';

// ===== TABLE SPECS =====
const SpecTable = ({ specs }) => (
  <div className="specs">
    {specs.map((s, i) => (
      <div key={i} className="spec-row">
        <span className="label">{s.label}</span>
        <span className="value">{s.value}</span>
      </div>
    ))}
  </div>
);

// ===== CARD =====
const VehicleCard = ({ title, image, specs }) => (
  <div className="card">
    <h3>{title}</h3>
    <div className="image-box">
      <img src={image} alt={title} />
    </div>
    <SpecTable specs={specs} />
  </div>
);

const VehicleCatalogue = () => {
  return (
    <div className="catalogue">
      {/* ===== IMAGE PRINCIPALE ===== */}
      <div className="catalogue-image-container">
        <img 
          src={catalogueImage} 
          alt="Catalogue"
          className="catalogue-full-image"
        />
      </div>

      {/* ===== SECTION FORD ===== */}
      <FordSection />

      {/* ===== SECTION HYUNDAI ===== */}
      <HyundaiSection />

      {/* Ici tu pourras importer d'autres sections de marques comme <ToyotaSection /> etc. */}

      {/* ===== FOOTER ===== */}
      <div className="catalogue-footer">
        <img src={teracarMotorsLogo} alt="Teracar Motors" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
      </div>
    </div>
  );
};

export default VehicleCatalogue;