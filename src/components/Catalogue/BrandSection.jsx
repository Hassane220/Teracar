import React from 'react';

const BrandSection = ({ brand, logo, vehicles }) => (
  <section className="brand-section">
    <div className="brand-header">
      <img src={logo} alt={brand} className="brand-logo" />
      <h2>{brand}</h2>
    </div>
    <div className="brand-vehicles">
      {vehicles.map((vehicle, idx) => (
        <div className="card" key={idx}>
          <h3>{vehicle.name}</h3>
          <div className="image-box">
            <img src={vehicle.image} alt={vehicle.name} />
          </div>
          <div className="specs">
            {vehicle.specs.map((s, i) => (
              <div key={i} className="spec-row">
                <span className="label">{s.label}</span>
                <span className="value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default BrandSection;
