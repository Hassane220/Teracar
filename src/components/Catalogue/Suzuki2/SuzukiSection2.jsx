import React from 'react';
import './SuzukiSection2.css';

// ===== LOGOS =====
import tmLogo from '../../../assets/images/TM_catalogue.png';
import suzukiLogo from '../../../assets/images/suzuki/suzuki.png';
import teracarMotors from '../../../assets/images/Teracar_motors.png';

// ===== TOP IMAGES =====
import leftTop from '../../../assets/images/suzuki2/suzuki1.png';
import rightTop from '../../../assets/images/suzuki2/suzuki2.png';

// ===== VEHICLES =====
import ciaz from '../../../assets/images/suzuki2/ciaz.png';
import ertiga from '../../../assets/images/suzuki2/ertiga.png';
import jimny from '../../../assets/images/suzuki2/jimny.png';
import superCarry from '../../../assets/images/suzuki2/super_carry.png';
import grandVitara from '../../../assets/images/suzuki2/grand_vitara.png';

// ===== SIDE IMAGE =====
import sideImage from '../../../assets/images/suzuki2/suzuki_G.png';

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

const SuzukiSection2 = () => {
  return (
    <section className="suzuki2">

      {/* HEADER (logos TM et Suzuki harmonisés comme Mazda/Hyundai) */}
      <div className="catalogue-header suzuki2-catalogue-header">
        <img src={tmLogo} alt="TM Catalogue" className="suzuki2-header-logo tm" />
        <div style={{ flex: 1 }}></div>
        <img src={suzukiLogo} alt="Suzuki" className="suzuki2-header-logo suzuki" />
      </div>

      {/* ===== TOP SPLIT ===== */}
      <div className="top-split">
        <img src={leftTop} alt="Suzuki gamme" className="zoomable-image" style={{ width: '48%', height: 300, objectFit: 'cover' }} />
        <img src={rightTop} alt="Suzuki Dzire" className="zoomable-image" style={{ width: '48%', height: 300, objectFit: 'cover', background: 'none' }} />
      </div>

      <div className="separator"></div>

      {/* ===== GRID 1 ===== */}
      <div className="grid">
        <Card id={70} title="CIAZ" image={ciaz} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,5L 16V GLX BVM / BVA' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '103 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '08 CV' },
        ]} />

        <Card id={71} title="ERTIGA" image={ertiga} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,5L 16V GA BVM / GL SDVA' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '102 ch' },
          { label: 'ASSISES', value: '07' },
          { label: 'PUISSANCE FISCALE', value: '08 CV' },
        ]} />

        <Card id={73} title="JIMNY" image={jimny} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,5L 16V GLX BVM / BVA' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '100 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '08 CV' },
        ]} />
      </div>

      <div className="separator"></div>

      {/* ===== GRID 2 + IMAGE ===== */}
      <div className="bottom">
        <div className="grid two">
          <Card id={74} title="SUPER CARRY" image={superCarry} specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 1,2L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '75 ch' },
            { label: 'ASSISES', value: '02' },
            { label: 'PUISSANCE FISCALE', value: '07 CV' },
          ]} />

          <Card id={72} title="GRAND VITARA" image={grandVitara} specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 1,5L 16V 4x4 GLX' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '105 ch' },
            { label: 'ASSISES', value: '05' },
            { label: 'PUISSANCE FISCALE', value: '09 CV' },
          ]} />
        </div>

        <div className="side-image">
          <img src={sideImage} alt="interieur suzuki" className="zoomable-image" />
        </div>
      </div>

    {/* Image Teracar Motors à la fin de la section */}
    <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0 0 0' }}>
      <img src={teracarMotors} alt="Teracar Motors" style={{ maxWidth: '300px', width: '100%', height: 'auto', display: 'inline-block' }} />
    </div>
  </section>
  );
};

export default SuzukiSection2;