import React from 'react';
import './ToyotaSection.css';

// ===== LOGOS =====
import tmLogo from '../../../assets/images/TM_catalogue.png';
import teracarMotors from '../../../assets/images/Teracar_motors.png';
import toyotaLogo from '../../../assets/images/toyota/toyota.png';

// ===== IMAGES =====
import landCruiser from '../../../assets/images/toyota/landcruiser300.png';
import camry from '../../../assets/images/toyota/camry.png';
import rush from '../../../assets/images/toyota/rush.png';
import rav from '../../../assets/images/toyota/rav.png';
import fortuner from '../../../assets/images/toyota/fortuner.png';
import corollaCross from '../../../assets/images/toyota/corolla_cross.png';
import starletCross from '../../../assets/images/toyota/starlet_cross.png';

// ===== TABLE =====
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

import { useNavigate } from 'react-router-dom';
// ===== CARD CLIQUABLE =====
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

const ToyotaSection = () => {
  const navigate = useNavigate();
  return (
    <section className="toyota">

      {/* ===== HEADER harmonisé avec Hyundai ===== */}
      <div className="catalogue-header">
        <img src={tmLogo} alt="TM Catalogue" />
        <img src={toyotaLogo} alt="Toyota" />
      </div>
      {/* ===== LAND CRUISER (style Palisade) ===== */}
      <div
        className="explorer card toyota-explorer"
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '40px', marginTop: '20px' }}
        tabIndex={0}
        role="button"
        onClick={() => navigate(`/cars/5`)}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate(`/cars/5`)}
      >
        <div className="image-box">
          <img src={landCruiser} alt="LAND CRUISER 300" className="zoomable-image" />
        </div>
        <div className="explorer-info">
          <h1>LAND CRUISER 300</h1>
          <SpecTable specs={[
            { label: 'MOTORISATION', value: '6 CYLINDRES 3.5L V6 Bi-Turbo' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '300 ch' },
            { label: 'ASSISES', value: '07' },
            { label: 'PUISSANCE FISCALE', value: '17 CV' },
          ]} />
        </div>
      </div>

      <div className="separator"></div>

      {/* ===== GRID 1 ===== */}
      <div className="grid">
        <VehicleCard id={10} title="CAMRY" image={camry} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,5L BVA' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '167 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '14 CV' },
        ]} />
        <VehicleCard id={11} title="RUSH" image={rush} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,5L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '110 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '09 CV' },
        ]} />
        <VehicleCard id={12} title="RAV" image={rav} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,4L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '157 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '12 CV' },
        ]} />
      </div>

      <div className="separator"></div>

      {/* ===== GRID 2 ===== */}
      <div className="grid">
        <VehicleCard id={13} title="FORTUNER" image={fortuner} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,7L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '164 ch' },
          { label: 'ASSISES', value: '07' },
          { label: 'PUISSANCE FISCALE', value: '15 CV' },
        ]} />
        <VehicleCard id={14} title="COROLLA CROSS" image={corollaCross} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,0L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '169 ch' },
          { label: 'ASSISES', value: '07' },
          { label: 'PUISSANCE FISCALE', value: '10 CV' },
        ]} />
        <VehicleCard id={15} title="STARLET CROSS" image={starletCross} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,5L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '110 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '07 CV' },
        ]} />
      </div>

      {/* Image Teracar Motors à la fin de la section */}
      <div style={{ width: '100%', textAlign: 'center', marginTop: 40 }}>
        <img src={teracarMotors} alt="Teracar Motors" style={{ maxWidth: '300px', width: '100%', height: 'auto', display: 'inline-block' }} />
      </div>
    </section>
  );
};

export default ToyotaSection;