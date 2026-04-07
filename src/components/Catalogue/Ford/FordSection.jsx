import React from 'react';
import { useNavigate } from 'react-router-dom';
import fordLogo from '../../../assets/images/ford/FORD.png';
import explorer from '../../../assets/images/ford/explorer.png';
import ranger from '../../../assets/images/ford/ranger.png';
import raptor from '../../../assets/images/ford/raptor.png';
import edge from '../../../assets/images/ford/edge.png';
import expedition from '../../../assets/images/ford/expedition.png';
import expeditionBig from '../../../assets/images/ford/expeditin_G.png';
import tmLogo from '../../../assets/images/TM_catalogue.png';
import './FordSection.css';

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

const VehicleCard = ({ id, title, image, specs }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card"
      style={{ cursor: 'pointer' }}
      tabIndex={0}
      role="button"
      onClick={() => navigate(`/cars/${id}`)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate(`/cars/${id}`)}
    >
      <h3>{title}</h3>
      <div className="image-box">
        <img src={image} alt={title} className="zoomable-image" />
      </div>
      <SpecTable specs={specs} />
    </div>
  );
};

const FordSection = () => {
  const navigate = useNavigate();
  return (
    <section className="ford-section">
      <div className="catalogue-header">
        <img src={tmLogo} alt="TM Catalogue" />
        <img src={fordLogo} alt="Ford" />
      </div>
      {/* Explorer Ford n'existe pas dans cars.js, on désactive la navigation */}
      <div
        className="explorer card"
        // style={{ cursor: 'not-allowed', opacity: 0.6 }}
        tabIndex={-1}
        role="button"
      >
        <div className="image-box">
          <img src={explorer} alt="Explorer" className="zoomable-image" />
        </div>
        <div className="explorer-info">
          <h1>EXPLORER</h1>
          <SpecTable specs={[
            { label: 'MOTORISATION', value: '6 CYLINDRES 2,3L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '280 ch' },
            { label: 'ASSISES', value: '05' },
            { label: 'PUISSANCE FISCALE', value: '14 CV' },
          ]} />
        </div>
      </div>
      <div className="separator"></div>
      {/* Aucun modèle Ford n'existe dans cars.js, on désactive la navigation sur ces cards */}
      <div className="grid">
        <VehicleCard id={11} title="RANGER" image={ranger} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,0L' },
          { label: 'CARBURANT', value: 'DIESEL' },
          { label: 'PUISSANCE DIN', value: '170 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '10 CV' },
        ]} />
        <VehicleCard id={12} title="RAPTOR" image={raptor} specs={[
          { label: 'MOTORISATION', value: '8 CYLINDRES 5,2L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '210 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '24 CV' },
        ]} />
        <VehicleCard id={13} title="EDGE" image={edge} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,3L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '250 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '13 CV' },
        ]} />
      </div>
      <div className="separator"></div>
      {/* Expedition Ford n'existe pas dans cars.js, on désactive la navigation */}
      <div className="expedition">
        <div className="left card"
          // style={{ cursor: 'not-allowed', opacity: 0.6 }}
          tabIndex={-1}
          role="button"
        >
          <h3>EXPEDITION</h3>
          <img src={expedition} alt="Expedition" className="zoomable-image" />
          <SpecTable specs={[
            { label: 'MOTORISATION', value: '6 CYLINDRES 3,5L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '300 ch' },
            { label: 'ASSISES', value: '07' },
            { label: 'PUISSANCE FISCALE', value: '17 CV' },
          ]} />
        </div>
        <div className="right">
          <img src={expeditionBig} alt="Expedition large" className="zoomable-image" />
        </div>
      </div>
    </section>
  );
};

export default FordSection;
