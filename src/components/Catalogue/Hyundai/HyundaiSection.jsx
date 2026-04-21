import React from 'react';
import './HyundaiSection.css';
import { useNavigate } from 'react-router-dom';
// ===== IMAGES =====
import tmLogo from '../../../assets/images/TM_catalogue.png';
import teracarMotors from '../../../assets/images/Teracar_motors.png';
import hyundaiLogo from '../../../assets/images/hyundai/HYUNDAI.png';
import palisade from '../../../assets/images/hyundai/palisade.png';
import grandI10 from '../../../assets/images/hyundai/grand_I10_sedan.png';
import sonata from '../../../assets/images/hyundai/sonata.png';
import elantra from '../../../assets/images/hyundai/elantra.png';
import tucson from '../../../assets/images/hyundai/tucson.png';
import venue from '../../../assets/images/hyundai/venue.png';
import interior from '../../../assets/images/hyundai/hyundai_G.png';
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

// ===== CARD CLIQUABLE =====
const VehicleCard = ({ id, title, image, specs, onClick }) => {
  return (
    <div
      className="card"
      style={{ cursor: 'pointer' }}
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <h3>{title}</h3>
      <div className="image-box">
        <img src={image} alt={title} />
      </div>
      <SpecTable specs={specs} />
    </div>
  );
};



const HyundaiSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hyundai-section">
      {/* ===== HEADER ===== */}
      <div className="catalogue-header">
        <img src={tmLogo} alt="TM Catalogue" />
        <img src={hyundaiLogo} alt="Hyundai" />
      </div>
      {/* ===== PALISADE ===== */}
      <div
        className="explorer card"
        style={{ cursor: 'pointer' }}
        tabIndex={0}
        role="button"
        onClick={() => navigate('/cars/20')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/cars/20')}
      >
        <div className="image-box">
          <img src={palisade} alt="Palisade" className="zoomable-image" />
        </div>
        <div className="explorer-info">
          <h1>HYUNDAI PALISADE</h1>
          <SpecTable specs={[
            { label: 'MOTORISATION', value: '6 CYLINDRES 3,5L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '291 ch' },
            { label: 'ASSISES', value: '07' },
            { label: 'PUISSANCE FISCALE', value: '17 CV' },
          ]} />
        </div>
      </div>
      <div className="separator"></div>
      {/* ===== GRID 1 ===== */}
      <div className="grid">
        <VehicleCard
          id={21}
          title="GRAND I10 SEDAN"
          image={grandI10}
          specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 1,2L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '83 ch' },
            { label: 'ASSISES', value: '05' },
            { label: 'PUISSANCE FISCALE', value: '07 CV' },
          ]}
          onClick={() => navigate(`/cars/21`)}
        />
        <VehicleCard
          id={22}
          title="SONATA"
          image={sonata}
          specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 2,0L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '152 ch' },
            { label: 'ASSISES', value: '07' },
            { label: 'PUISSANCE FISCALE', value: '11 CV' },
          ]}
          onClick={() => navigate(`/cars/22`)}
        />
        <VehicleCard
          id={23}
          title="ELANTRA"
          image={elantra}
          specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 2,0L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '147 ch' },
            { label: 'ASSISES', value: '05' },
            { label: 'PUISSANCE FISCALE', value: '11 CV' },
          ]}
          onClick={() => navigate(`/cars/23`)}
        />
      </div>
      <div className="separator"></div>
      {/* ===== GRID 2 + IMAGE ===== */}
      <div className="expedition">
        <VehicleCard
          id={24}
          title="TUCSON"
          image={tucson}
          specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 1,6L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '160 ch' },
            { label: 'ASSISES', value: '07' },
            { label: 'PUISSANCE FISCALE', value: '09 CV' },
          ]}
          onClick={() => navigate('/cars/24')}
        />
        <VehicleCard
          id={25}
          title="VENUE"
          image={venue}
          specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 1,5L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '120 ch' },
            { label: 'ASSISES', value: '05' },
            { label: 'PUISSANCE FISCALE', value: '07 CV' },
          ]}
          onClick={() => navigate('/cars/25')}
        />
        <div className="right">
          <img src={interior} alt="Interior" />
        </div>
      </div>
      {/* Image Teracar Motors à la fin de la section */}
      <div style={{ width: '100%', textAlign: 'center', marginTop: 40 }}>
        <img src={teracarMotors} alt="Teracar Motors" style={{ maxWidth: '300px', width: '100%', height: 'auto', display: 'inline-block' }} />
      </div>
    </section>
  );
};

export default HyundaiSection;