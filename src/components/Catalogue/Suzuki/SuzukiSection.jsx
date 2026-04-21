import React from 'react';
import './SuzukiSection.css';

// ===== LOGOS =====
import tmLogo from '../../../assets/images/TM_catalogue.png';
import suzukiLogo from '../../../assets/images/suzuki/suzuki.png';
import teracarMotors from '../../../assets/images/Teracar_motors.png';

// ===== IMAGES =====
import hero from '../../../assets/images/suzuki/suzuki_title.png';
import multi from '../../../assets/images/suzuki/multi-suzuki.png';

import alto from '../../../assets/images/suzuki/alto.png';
import swift from '../../../assets/images/suzuki/swift.png';
import baleno from '../../../assets/images/suzuki/baleno.png';
import celerio from '../../../assets/images/suzuki/celerio.png';
import dzire from '../../../assets/images/suzuki/dzire.png';

import coffre from '../../../assets/images/suzuki/coffre_suzuki.png';

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
const Card = ({ id, title, image, specs }) => {
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

const SuzukiSection = () => {
  return (
    <section className="suzuki">

      {/* HEADER (logos TM et Suzuki harmonisés comme Mazda/Hyundai) */}
      <div className="catalogue-header suzuki-catalogue-header">
        <img src={tmLogo} alt="TM Catalogue" className="suzuki-header-logo tm" />
        <div style={{ flex: 1 }}></div>
        <img src={suzukiLogo} alt="Suzuki" className="suzuki-header-logo suzuki" />
      </div>
      {/* ===== TOP MOSAIC + HERO ===== */}

      <div className="top">
        <div className="mosaic">
          <img src={multi} alt="multi" className="zoomable-image" />
        </div>
        <div className="hero">
          <img src={hero} alt="Suzuki Dzire" className="zoomable-image" />
        </div>
      </div>

      <div className="separator"></div>

      {/* ===== GRID 1 ===== */}
      <div className="grid">
        <Card id={60} title="ALTO" image={alto} specs={[
          { label: 'MOTORISATION', value: '3 CYLINDRES 1,0L GL BVM' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '50 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '05 CV' },
        ]} />

        <Card id={61} title="SWIFT" image={swift} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,2L GL BVM / GLX BVA' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '85 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '05 CV' },
        ]} />

        <Card id={62} title="BALENO" image={baleno} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,4L GL BVM / BVA' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '95 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '09 CV' },
        ]} />
      </div>

      <div className="separator"></div>

      {/* ===== GRID 2 + IMAGE ===== */}
      <div className="bottom">
        <div className="grid two">
          <Card id={63} title="CELERIO" image={celerio} specs={[
            { label: 'MOTORISATION', value: '3 CYLINDRES 1,0L GL BVA' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '87 ch' },
            { label: 'ASSISES', value: '05' },
            { label: 'PUISSANCE FISCALE', value: '06 CV' },
          ]} />

          <Card id={64} title="DZIRE" image={dzire} specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 1,2L 16V GL BVM / BVA' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '87 ch' },
            { label: 'ASSISES', value: '05' },
            { label: 'PUISSANCE FISCALE', value: '07 CV' },
          ]} />
        </div>

        <div className="side-image">
          <img src={coffre} alt="coffre" className="zoomable-image" />
        </div>
      </div>

    {/* Image Teracar Motors à la fin de la section */}
    <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0 0 0' }}>
      <img src={teracarMotors} alt="Teracar Motors" style={{ maxWidth: '300px', width: '100%', height: 'auto', display: 'inline-block' }} />
    </div>
  </section>
  );
};

export default SuzukiSection;