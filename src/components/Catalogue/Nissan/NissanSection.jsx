import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NissanSection.css';

// LOGOS
import tmLogo from '../../../assets/images/TM_catalogue.png';
import nissanLogo from '../../../assets/images/nissan/nissan.png';

// VEHICULES
import patrol from '../../../assets/images/nissan/patrolY62.png';
import micra from '../../../assets/images/nissan/micra.png';
import kicks from '../../../assets/images/nissan/kicks.png';

import qashqai from '../../../assets/images/nissan/qashqai.png';
import xtrail from '../../../assets/images/nissan/x-trail.png';
import almera from '../../../assets/images/nissan/almera.png';

import pathfinder from '../../../assets/images/nissan/pathfinder.png';
import navara from '../../../assets/images/nissan/navara.png';
import xterra from '../../../assets/images/nissan/x-terra.png';


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


// ===== CARD =====
const VehicleCard = ({ title, image, specs, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (id) navigate(`/cars/${id}`);
  };
  return (
    <div className="card" style={{ cursor: id ? 'pointer' : 'default' }} onClick={handleClick} tabIndex={id ? 0 : -1} role={id ? 'button' : undefined} aria-label={id ? `Voir détails de ${title}` : undefined}>
      <h3>{title}</h3>
      <div className="image-box">
        <img src={image} alt={title} />
      </div>
      <SpecTable specs={specs} />
    </div>
  );
};


const NissanSection = () => {
  return (
    <section className="nissan-section">

      {/* HEADER */}
      <div className="catalogue-header">
        <img src={tmLogo} alt="TM Catalogue" />
        <img src={nissanLogo} alt="Nissan" />
      </div>

      {/* GRID 1 */}
      <div className="grid">

        <VehicleCard title="PATROL Y62" image={patrol} specs={[ 
          { label: 'MOTORISATION', value: '6 CYLINDRES 4,6L / 8 CYLINDRES 5,6L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '305 ch' },
          { label: 'ASSISES', value: '08' },
          { label: 'PUISSANCE FISCALE', value: '32 CV' },
        ]} id={1001} />

        <VehicleCard title="MICRA" image={micra} specs={[ 
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,2L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '109 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '08 CV' },
        ]} id={1002} />

        <VehicleCard title="KICKS" image={kicks} specs={[ 
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,6L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '141 ch' },
          { label: 'ASSISES', value: '07' },
          { label: 'PUISSANCE FISCALE', value: '09 CV' },
        ]} id={1003} />

      </div>

      <div className="separator"></div>

      {/* GRID 2 */}
      <div className="grid">

        <VehicleCard title="QASHQAI" image={qashqai} specs={[ 
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,0L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '138 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '11 CV' },
        ]} id={1004} />

        <VehicleCard title="X-TRAIL" image={xtrail} specs={[ 
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,5L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '169 ch' },
          { label: 'ASSISES', value: '07' },
          { label: 'PUISSANCE FISCALE', value: '14 CV' },
        ]} id={1005} />

        <VehicleCard title="ALMERA" image={almera} specs={[ 
          { label: 'MOTORISATION', value: '4 CYLINDRES 1,5L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '100 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '08 CV' },
        ]} id={1006} />

      </div>

      <div className="separator"></div>

      {/* GRID 3 */}
      <div className="grid">

        <VehicleCard title="PATHFINDER" image={pathfinder} specs={[ 
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,0L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '160 ch' },
          { label: 'ASSISES', value: '07' },
          { label: 'PUISSANCE FISCALE', value: '14 CV' },
        ]} id={1007} />

        <VehicleCard title="NAVARA" image={navara} specs={[ 
          { label: 'MOTORISATION', value: '4 CYLINDRES' },
          { label: 'CARBURANT', value: 'DIESEL' },
          { label: 'PUISSANCE DIN', value: '174 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '10 CV' },
        ]} id={1008} />

        <VehicleCard title="X-TERRA" image={xterra} specs={[ 
          { label: 'MOTORISATION', value: '4 CYLINDRES 2,5L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '165 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '10 CV' },
        ]} id={1009} />

      </div>

    </section>
  );
};

export default NissanSection;