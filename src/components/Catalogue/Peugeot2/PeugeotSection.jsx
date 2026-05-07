import React from "react";
import "./PeugeotSection.css";

import { useNavigate } from "react-router-dom";

// IMAGES
import logo from "../../../assets/images/peugeot2/peugeot.png";
import heroImg from "../../../assets/images/peugeot2/landtrek.png";
import tmLogo from "../../../assets/images/TM_catalogue.png";

import rifter from "../../../assets/images/peugeot2/rifter.png";
import partner from "../../../assets/images/peugeot2/partner.png";
import boxer from "../../../assets/images/peugeot2/boxer.png";

import bottomImg from "../../../assets/images/peugeot2/peugeot2_G.png";

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
        onClick={() => navigate('/cars/9001')}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate('/cars/9001')}
      >
        <div className="image-box" style={{ flex: '0 0 340px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', height: '220px' }}>
          <img src={heroImg} alt="Landtrek" className="zoomable-image" style={{ width: '340px', height: '220px', objectFit: 'contain', borderRadius: 8 }} />
        </div>
        <div className="explorer-info" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 32, minWidth: 0 }}>
          <h1 style={{ color: '#b30000', marginBottom: 24 }}>LANDTREK</h1>
          <SpecTable specs={[
            { label: "MOTORISATION", value: "4 CYLINDRES 1,9L" },
            { label: "CARBURANT", value: "DIESEL" },
            { label: "PUISSANCE DIN", value: "150 ch" },
            { label: "ASSISES", value: "05" },
            { label: "PUISSANCE FISCALE", value: "10 CV" },
          ]} />
        </div>
      </div>

      <div className="divider"></div>

      {/* GRID UTILITAIRES */}
      <div className="grid">
        <VehicleCard
          id={10001}
          title="RIFTER"
          image={rifter}
          specs={[
            { label: "MOTORISATION", value: "4 CYLINDRES 1,5L" },
            { label: "CARBURANT", value: "ESSENCE" },
            { label: "PUISSANCE DIN", value: "115 ch" },
            { label: "ASSISES", value: "05" },
            { label: "PUISSANCE FISCALE", value: "07 CV" },
          ]}
        />
        <VehicleCard
          id={10002}
          title="PARTNER"
          image={partner}
          specs={[
            { label: "MOTORISATION", value: "4 CYLINDRES" },
            { label: "CARBURANT", value: "ESSENCE" },
            { label: "PUISSANCE DIN", value: "115 ch" },
            { label: "ASSISES", value: "05" },
            { label: "PUISSANCE FISCALE", value: "07 CV" },
          ]}
        />
        <VehicleCard
          id={10003}
          title="BOXER"
          image={boxer}
          specs={[
            { label: "MOTORISATION", value: "4 CYLINDRES 2,2L HDI" },
            { label: "CARBURANT", value: "DIESEL" },
            { label: "PUISSANCE DIN", value: "130 ch" },
            { label: "ASSISES", value: "05" },
            { label: "PUISSANCE FISCALE", value: "11 CV" },
          ]}
        />
      </div>

      <div className="divider"></div>

      {/* IMAGE BAS */}
      <div className="bottom-visual">
        <img src={bottomImg} alt="Peugeot gamme" />
      </div>

    </div>
  );
};

export default PeugeotSection;