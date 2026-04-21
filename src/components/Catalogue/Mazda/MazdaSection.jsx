import React from 'react';
import './MazdaSection.css';

// LOGOS
import tmLogo from '../../../assets/images/TM_catalogue.png';
import mazdaLogo from '../../../assets/images/mazda/mazda.png';

// HERO
import cx9 from '../../../assets/images/mazda/mazdacx9.png';

// VEHICULES
import mazda3 from '../../../assets/images/mazda/mazda3.png';
import mazda6 from '../../../assets/images/mazda/mazda6.png';
import cx3 from '../../../assets/images/mazda/madzacx3.png';

import cx5 from '../../../assets/images/mazda/mazdacx5.png';
import bt50 from '../../../assets/images/mazda/mazdabt50.png';
import cx60 from '../../../assets/images/mazda/mazdacx60.png';


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

// ===== CARD CLIQUABLE =====
const VehicleCard = ({ id, title, image, specs, navigate }) => (
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
      <img src={image} alt={title} />
    </div>
    <SpecTable specs={specs} />
  </div>
);



import teracarMotors from '../../../assets/images/Teracar_motors.png';
import { useNavigate } from 'react-router-dom';

const MazdaSection = () => {
  const navigate = useNavigate();
  return (
    <section className="mazda-section">

      {/* HEADER (logos TM et Mazda aux extrémités, comme Ford/Toyota) */}
      <div className="catalogue-header mazda-catalogue-header">
        <img src={tmLogo} alt="TM Catalogue" className="mazda-header-logo tm" />
        <div style={{ flex: 1 }}></div>
        <img src={mazdaLogo} alt="Mazda" className="mazda-header-logo mazda" />
      </div>

      {/* HERO style Hilux (explorer/card cliquable) */}
      <div
        className="explorer card mazda-explorer"
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '40px', marginTop: '20px' }}
        tabIndex={0}
        role="button"
        onClick={() => navigate('/cars/200')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/cars/200')}
      >
        <div className="image-box">
          <img src={cx9} alt="Mazda CX9" className="zoomable-image" />
        </div>
        <div className="explorer-info">
          <h1>MAZDA CX9</h1>
          <SpecTable specs={[
            { label: 'MOTORISATION', value: '6 CYLINDRES 2,5L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '242 ch' },
            { label: 'ASSISES', value: '07' },
            { label: 'PUISSANCE FISCALE', value: '12 CV' },
          ]} />
        </div>
      </div>

      <div className="separator"></div>

      {/* GRID 1 */}
      <div className="grid">
        <VehicleCard id={200} title="MAZDA 3" image={mazda3} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,6L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '120 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '09 CV' },
        ]} navigate={navigate} />

        <VehicleCard id={201} title="MAZDA 6" image={mazda6} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,0L / 2,5L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '165 / 192 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '11 / 12 CV' },
        ]} navigate={navigate} />

        <VehicleCard id={202} title="MAZDA CX3" image={cx3} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,3L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '121 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '11 CV' },
        ]} navigate={navigate} />
      </div>

      <div className="separator"></div>

      {/* GRID 2 */}
      <div className="grid">
        <VehicleCard id={203} title="MAZDA CX5" image={cx5} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,0L / 2,5L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '165 / 192 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '11 / 12 CV' },
        ]} navigate={navigate} />

        <VehicleCard id={204} title="MAZDA BT 50" image={bt50} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,9L' },
          { label: 'CARBURANT', value: 'DIESEL' },
          { label: 'PUISSANCE DIN', value: '148 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '10 CV' },
        ]} navigate={navigate} />

        <VehicleCard id={205} title="MAZDA CX60" image={cx60} specs={[
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,5L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '191 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '10 CV' },
        ]} navigate={navigate} />
      </div>

      {/* Image Teracar Motors à la fin de la section */}
      <div style={{ width: '100%', textAlign: 'center', marginTop: 40 }}>
        <img src={teracarMotors} alt="Teracar Motors" style={{ maxWidth: '300px', width: '100%', height: 'auto', display: 'inline-block' }} />
      </div>

    </section>
  );
};

export default MazdaSection;