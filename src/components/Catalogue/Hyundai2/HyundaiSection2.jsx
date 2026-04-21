import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HyundaiSection2.css';

// ===== LOGOS =====
import tmLogo from '../../../assets/images/TM_catalogue.png';
import teracarMotors from '../../../assets/images/Teracar_motors.png';
import hyundaiLogo from '../../../assets/images/hyundai/HYUNDAI.png';

// ===== IMAGES HYUNDAI 2 =====
import santaFe from '../../../assets/images/hyundai2/hyundai_santafe.png';
import creta from '../../../assets/images/hyundai2/creta.png';
import county from '../../../assets/images/hyundai2/county.png';
import hd72 from '../../../assets/images/hyundai2/hd72.png';
import bottomImage from '../../../assets/images/hyundai2/hyundai_santafe_G.png';

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

const HyundaiSection2 = () => {
  const navigate = useNavigate();
  return (
    <section className="hyundai2">
      {/* ===== HEADER ===== */}
      <div className="catalogue-header">
        <img src={tmLogo} alt="TM Catalogue" />
        <img src={hyundaiLogo} alt="Hyundai" />
      </div>

      {/* ===== SANTA FE (style Palisade) ===== */}
      <div
        className="explorer card hyundai2-explorer"
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '40px', marginTop: '20px' }}
        tabIndex={0}
        role="button"
        onClick={() => navigate('/cars/40')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/cars/40')}
      >
        <div className="image-box">
          <img src={santaFe} alt="Santa Fe" className="zoomable-image" />
        </div>
        <div className="explorer-info">
          <h1>HYUNDAI SANTA FE</h1>
          <SpecTable specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 2,2L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '277 ch' },
            { label: 'ASSISES', value: '07' },
            { label: 'PUISSANCE FISCALE', value: '14 CV' },
          ]} />
        </div>
      </div>

      <div className="separator"></div>

      {/* ===== GRID ===== */}
      <div className="grid">
        <VehicleCard
          id={41}
          title="CRETA"
          image={creta}
          specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 1,6L' },
            { label: 'CARBURANT', value: 'ESSENCE' },
            { label: 'PUISSANCE DIN', value: '123 ch' },
            { label: 'ASSISES', value: '07' },
            { label: 'PUISSANCE FISCALE', value: '09 CV' },
          ]}
        />
        <VehicleCard
          id={42}
          title="COUNTY"
          image={county}
          specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 3,9L' },
            { label: 'CARBURANT', value: 'DIESEL' },
            { label: 'PUISSANCE DIN', value: '118 ch' },
            { label: 'ASSISES', value: '30' },
            { label: 'PUISSANCE FISCALE', value: '14 CV' },
          ]}
        />
        <VehicleCard
          id={43}
          title="HD72"
          image={hd72}
          specs={[
            { label: 'MOTORISATION', value: '4 CYLINDRES 3,9L' },
            { label: 'CARBURANT', value: 'DIESEL' },
            { label: 'PUISSANCE DIN', value: '120 ch' },
            { label: 'ASSISES', value: '03' },
            { label: 'PUISSANCE FISCALE', value: '13 CV / 4,5T' },
          ]}
        />
      </div>

      <div className="separator"></div>

      {/* ===== IMAGE BAS ===== */}
      <div className="bottom">
        <img src={bottomImage} alt="Hyundai gamme" className="zoomable-image" />
      </div>

      

      {/* Image Teracar Motors à la fin de la section */}
      <div style={{ width: '100%', textAlign: 'center', marginTop: 40 }}>
        <img src={teracarMotors} alt="Teracar Motors" style={{ maxWidth: '300px', width: '100%', height: 'auto', display: 'inline-block' }} />
      </div>
    </section>
  );
};

export default HyundaiSection2;