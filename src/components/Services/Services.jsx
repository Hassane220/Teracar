import React from 'react';
import './services.css';
import carImage1 from '../../assets/images/car1.avif';
import carImage2 from '../../assets/images/car2.avif';
import carImage3 from '../../assets/images/car3.jpeg';
import carImage4 from '../../assets/images/car4.jpg'; // Ajoutez cette image
import carImage5 from '../../assets/images/car5.jpeg'; // Ajoutez cette image
import carImage6 from '../../assets/images/car6.webp'; // Ajoutez cette image

const Services = () => {
  const services = [
    {
      title: "Vente de Véhicules Neufs",
      description: "Large sélection de véhicules neufs des meilleures marques avec garantie constructeur.",
      icon: "🆕",
      featured: true
    },
    {
      title: "Véhicules d'Occasion Certifiés",
      description: "Voitures d'occasion rigoureusement inspectées avec certification qualité Premium.",
      icon: "✅",
      featured: true
    },
    {
      title: "Financement Personnalisé",
      description: "Solutions de financement adaptées à votre budget avec taux compétitifs.",
      icon: "💰",
      featured: false
    },
    {
      title: "Service Après-Vente",
      description: "Maintenance, réparations et entretien par des techniciens certifiés.",
      icon: "🔧",
      featured: false
    },
    {
      title: "Essai Routier",
      description: "Testez votre futur véhicule dans des conditions réelles de conduite.",
      icon: "🚘",
      featured: false
    },
    {
      title: "Reprise d'Ancien Véhicule",
      description: "Estimation gratuite et reprise de votre ancien véhicule au meilleur prix.",
      icon: "🔄",
      featured: false
    }
  ];

  const galleryImages = [
    carImage1,
    carImage2,
    carImage3,
    carImage4,
    carImage5,
    carImage6
  ];

  return (
    <section className="services" id="services">
      <div className="services__container container">
        
        {/* Colonne de gauche - Titre, services et galerie */}
        <div className="services__intro">
          <h2 className="services__title">
            Votre Partenaire <span className="highlight">Automobile Premium</span>
          </h2>
          
          <p className="services__description">
            Premium Auto est le concessionnaire le plus moderne et polyvalent pour 
            répondre à tous vos besoins automobiles. Parfait pour les particuliers 
            et les professionnels exigeants.
          </p>
          
          {/* Liste des services */}
          <div className="services__list">
            {services.map((service, index) => (
              <div key={index} className="service__item">
                <div className="service__icon">{service.icon}</div>
                <div className="service__content">
                  <h3 className="service__title">{service.title}</h3>
                  <p className="service__desc">{service.description}</p>
                </div>
                {service.featured && (
                  <div className="service__check">
                    <span className="checkmark">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Galerie d'images */}
          <div className="services__gallery">
            <h3 className="gallery__title">Notre Sélection</h3>
            <div className="gallery__grid">
              {galleryImages.slice(0, 4).map((image, index) => (
                <div key={index} className="gallery__item">
                  <div 
                    className="gallery__image"
                    style={{ backgroundImage: `url(${image})` }}
                    aria-label={`Véhicule premium ${index + 1}`}
                  >
                    <div className="image__overlay">
                      {/* <span className="overlay__text">Voir plus</span> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Colonne de droite - Citation, profil et avantages */}
        <div className="services__quote">
          <div className="quote__content">
            <h3 className="quote__title">Pourquoi Nous Choisir</h3>
            
            <div className="quote__card">
              <div className="quote__text">
                "Nous créons des expériences automobiles exceptionnelles. 
                Chaque véhicule est sélectionné avec soin pour offrir 
                performance, confort et sécurité à nos clients."
              </div>
              
              <div className="quote__author">
                <div className="author__image">
                  <div className="author__avatar">AB</div>
                </div>
                <div className="author__info">
                  <h4 className="author__name">Aleesha Brown</h4>
                  <p className="author__title">CEO & CO Founder</p>
                </div>
              </div>
            </div>
            
            {/* Avantages */}
            <div className="advantages__list">
              <h4 className="advantages__title">Nos Engagements</h4>
              <div className="advantage__item">
                <div className="advantage__icon">⭐</div>
                <div className="advantage__content">
                  <h5>Qualité Premium</h5>
                  <p>Véhicules inspectés selon 150 points de contrôle</p>
                </div>
              </div>
              <div className="advantage__item">
                <div className="advantage__icon">🛡️</div>
                <div className="advantage__content">
                  <h5>Garantie Étendue</h5>
                  <p>Jusqu'à 3 ans de garantie sur nos véhicules d'occasion</p>
                </div>
              </div>
              <div className="advantage__item">
                <div className="advantage__icon">⚡</div>
                <div className="advantage__content">
                  <h5>Service Rapide</h5>
                  <p>Livraison sous 48h pour la plupart des modèles</p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="services__stats">
              <div className="stat__item">
                <span className="stat__number">1500+</span>
                <span className="stat__label">Clients Satisfaits</span>
              </div>
              <div className="stat__item">
                <span className="stat__number">99%</span>
                <span className="stat__label">Recommendation</span>
              </div>
              <div className="stat__item">
                <span className="stat__number">25+</span>
                <span className="stat__label">Marques Disponibles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;