import React from 'react';
import './partners.css';
import partner1 from '../../assets/images/partners/Audi.png';
import partner2 from '../../assets/images/partners/BMW.svg';
import partner3 from '../../assets/images/partners/Mercedes.png';
import partner4 from '../../assets/images/partners/Volkswagen.png';
import partner5 from '../../assets/images/partners/Ford.png';
import partner6 from '../../assets/images/partners/Toyota.png';
import partner7 from '../../assets/images/partners/Honda.png';

// Fallback si les images ne sont pas disponibles
const Partners = () => {
  // Liste des partenaires avec logos et noms
  const partners = [
    { id: 1, name: "Audi", logo: partner1, url: "https://www.audi.com" },
    { id: 2, name: "BMW", logo: partner2, url: "https://www.bmw.com" },
    { id: 3, name: "Mercedes-Benz", logo: partner3, url: "https://www.mercedes-benz.com" },
    { id: 4, name: "Volkswagen", logo: partner4, url: "https://www.volkswagen.com" },
    { id: 5, name: "Ford", logo: partner5, url: "https://www.ford.com" },
    { id: 6, name: "Toyota", logo: partner6, url: "https://www.toyota.com" },
    { id: 7, name: "Honda", logo: partner7, url: "https://www.honda.com" },
  ];

  // Dupliquer les partenaires pour créer un effet de défilement infini
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="partners" id="partners">
      <div className="partners__container container">
        {/* En-tête */}
        <div className="partners__header">
          <h2 className="partners__title">Nos Partenaires <span className="highlight">Prestigieux</span></h2>
          <p className="partners__subtitle">
            Nous collaborons avec les plus grandes marques automobiles pour vous offrir 
            une sélection premium de véhicules.
          </p>
        </div>

        {/* Carrousel de logos - Premier */}
        <div className="partners__carousel-wrapper">
          <div className="partners__carousel">
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={`${partner.id}-${index}`} 
                className="partner__item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="partner__logo">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={`Logo ${partner.name}`} 
                      className="logo__image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="logo__placeholder">
                      <span className="logo__text">{partner.name}</span>
                    </div>
                  )}
                </div>
                <div className="partner__name">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Carrousel de logos - Deuxième (dans l'autre sens) */}
        <div className="partners__carousel-wrapper">
          <div className="partners__carousel partners__carousel--reverse">
            {[...duplicatedPartners].reverse().map((partner, index) => (
              <div 
                key={`reverse-${partner.id}-${index}`} 
                className="partner__item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="partner__logo">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={`Logo ${partner.name}`} 
                      className="logo__image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="logo__placeholder">
                      <span className="logo__text">{partner.name}</span>
                    </div>
                  )}
                </div>
                <div className="partner__name">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistiques */}
        <div className="partners__stats">
          <div className="stat__item">
            <div className="stat__number">25+</div>
            <div className="stat__label">Marques Partenaires</div>
          </div>
          <div className="stat__item">
            <div className="stat__number">50+</div>
            <div className="stat__label">Modèles Disponibles</div>
          </div>
          <div className="stat__item">
            <div className="stat__number">100%</div>
            <div className="stat__label">Garantie Officielle</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;