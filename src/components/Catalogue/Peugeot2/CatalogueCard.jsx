import React from "react";


const CatalogueCard = ({ title, image, specs }) => (
  <div className="catalogue-car-card" tabIndex={0} role="button" aria-label={`Voir détails de ${title}`}> 
    <div className="catalogue-car-card__slider">
      <img src={image} alt={title} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8 }} />
    </div>
    <div className="catalogue-car-card__info">
      <h3>{title}</h3>
      <div className="specs">
        {specs.map((s, i) => (
          <div key={i} className="spec-row">
            <span className="label">{s.label}</span>
            <span className="value">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CatalogueCard;
