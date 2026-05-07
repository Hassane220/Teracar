import React from "react";
import "./PeugeotSection.css";

import { useNavigate } from "react-router-dom";

// IMAGES
import logo from "../../../assets/images/peugeot/peugeot.png";
import mainCar from "../../../assets/images/peugeot/peugeot5008.png";
import tmLogo from "../../../assets/images/TM_catalogue.png";

import img301 from "../../../assets/images/peugeot/301.png";
import img408 from "../../../assets/images/peugeot/408.png";
import img508 from "../../../assets/images/peugeot/508.png";
import img2008 from "../../../assets/images/peugeot/2008.png";
import img3008 from "../../../assets/images/peugeot/3008.png";

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
        <img src={image} alt={title} />
      </div>
      <SpecTable specs={specs} />
    </div>
  );
};

const PeugeotSection = () => {
  const navigate = useNavigate();
  return (
    <div className="peugeot-section" style={{ background: '#fff' }}>

      {/* HEADER */}
      <div className="section-header">
        <img src={tmLogo} alt="TM Catalogue" className="tm-logo" />
        <img src={logo} alt="peugeot" className="brand-logo" />
      </div>


      {/* HERO CARD Ford/Hyundai style */}
      <div
        className="explorer card"
        style={{
          display: 'flex',
          marginBottom: 40,
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
        tabIndex={0}
        role="button"
        onClick={() => navigate('/cars/5008')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/cars/5008')}
      >
        <div className="image-box" style={{ flex: '0 0 340px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', height: '220px' }}>
          <img src={mainCar} alt="Peugeot 5008" className="zoomable-image" style={{ width: '340px', height: '220px', objectFit: 'contain', borderRadius: 8 }} />
        </div>
        <div className="explorer-info" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 32, minWidth: 0 }}>
          <h1 style={{ color: '#b30000', marginBottom: 24 }}>PEUGEOT 5008</h1>
          <SpecTable specs={[
            { label: "MOTORISATION", value: "4 CYLINDRES 1,6L" },
            { label: "CARBURANT", value: "ESSENCE" },
            { label: "PUISSANCE DIN", value: "156 ch" },
            { label: "ASSISES", value: "07" },
            { label: "PUISSANCE FISCALE", value: "09 CV" },
          ]} />
        </div>
      </div>

      <div className="divider"></div>

      {/* GRID 1 */}
      <div className="grid">
        <VehicleCard
          id={301}
          title="301"
          image={img301}
          specs={[
            { label: "MOTORISATION", value: "4 CYLINDRES 1.2L / 1.6L" },
            { label: "CARBURANT", value: "ESSENCE" },
            { label: "PUISSANCE DIN", value: "82 / 115 ch" },
            { label: "ASSISES", value: "05" },
            { label: "PUISSANCE FISCALE", value: "07 / 08 CV" },
          ]}
        />
        <VehicleCard
          id={508}
          title="508"
          image={img508}
          specs={[
            { label: "MOTORISATION", value: "4 CYLINDRES 1.6L" },
            { label: "CARBURANT", value: "ESSENCE" },
            { label: "PUISSANCE DIN", value: "165 ch" },
            { label: "ASSISES", value: "05" },
            { label: "PUISSANCE FISCALE", value: "11 CV" },
          ]}
        />
        <VehicleCard
          id={408}
          title="408"
          image={img408}
          specs={[
            { label: "MOTORISATION", value: "4 CYLINDRES 1.6L" },
            { label: "CARBURANT", value: "ESSENCE" },
            { label: "PUISSANCE DIN", value: "180 ch" },
            { label: "ASSISES", value: "05" },
            { label: "PUISSANCE FISCALE", value: "10 CV" },
          ]}
        />
      </div>

      <div className="divider"></div>

      {/* GRID 2 */}
      <div className="grid">
        <VehicleCard
          id={2008}
          title="2008"
          image={img2008}
          specs={[
            { label: "MOTORISATION", value: "3 CYLINDRES 1.2L / 1.6L" },
            { label: "CARBURANT", value: "ESSENCE" },
            { label: "PUISSANCE DIN", value: "100 ch" },
            { label: "ASSISES", value: "05" },
            { label: "PUISSANCE FISCALE", value: "06 CV" },
          ]}
        />
        <VehicleCard
          id={3008}
          title="3008"
          image={img3008}
          specs={[
            { label: "MOTORISATION", value: "4 CYLINDRES 1.6L" },
            { label: "CARBURANT", value: "ESSENCE" },
            { label: "PUISSANCE DIN", value: "165 ch" },
            { label: "ASSISES", value: "05" },
            { label: "PUISSANCE FISCALE", value: "09 CV" },
          ]}
        />
      </div>

    </div>
  );
};

export default PeugeotSection;