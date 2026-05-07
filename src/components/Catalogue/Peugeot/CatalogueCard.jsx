import React from "react";

const CatalogueCard = ({ title, image, specs }) => (
  <div className="catalogue-card">
    <h3>{title}</h3>
    <div className="image-box">
      <img src={image} alt={title} />
    </div>
    <div className="specs">
      {specs.map((s, i) => (
        <div key={i} className="spec-row">
          <span className="label">{s.label}</span>
          <span className="value">{s.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default CatalogueCard;
