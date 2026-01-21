import React, { useState, useEffect } from 'react';
import './hero.css';
import { useNavigate } from 'react-router-dom';
import car1 from '../../assets/images/car1.avif';
import car2 from '../../assets/images/car2.avif';
import car3 from '../../assets/images/car3.jpeg';

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ MODIFICATION ICI UNIQUEMENT
  // Initialisation correcte dès le premier rendu
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);

  // Détecter la taille de l'écran (INCHANGÉ)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const slides = [
    {
      title: "Trouvez la",
      highlighted: "voiture parfaite",
      subtitle: "pour votre style de vie",
      description: "Découvrez notre sélection exclusive de véhicules d'occasion certifiés et neufs avec les meilleures garanties du marché.",
      background: "linear-gradient(135deg, #6b2316ff 0%, #982404ff 100%)",
      image: car1,
    },
    {
      title: "Conduisez",
      highlighted: "l'excellence",
      subtitle: "sur toutes les routes",
      description: "Des véhicules premium rigoureusement inspectés pour des performances et une sécurité optimales.",
      background: "linear-gradient(135deg, #ac2b0aff 0%, #781204ff 100%)",
      image: car2,
    },
    {
      title: "L'élégance",
      highlighted: "automobile",
      subtitle: "à portée de main",
      description: "Un service personnalisé pour vous accompagner dans l'acquisition de votre véhicule de rêve.",
      background: "linear-gradient(135deg, #c71c09ff 0%, #e73b14ff 100%)",
      image: car3,
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section id="accueil" className="hero">

      <div className="hero__catalog-button">
        <button className="btn btn--catalog" onClick={() => navigate('/catalogue-complet')}>
          <span className="catalog-icon">🚗</span>
          <span className="catalog-text">Voir le catalogue complet</span>
        </button>
      </div>

      <div className="hero__slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
            style={
              isMobile
                ? {
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : { background: slide.background }
            }
          >

            {isMobile && <div className="hero__mobile-overlay"></div>}

            <div className="hero__slide-content container">
              <div className="slide__text">
                <div className="text__wrapper">
                  <h1 className="hero__title">
                    {slide.title}{' '}
                    <span className="highlighted">{slide.highlighted}</span>{' '}
                    {slide.subtitle}
                  </h1>
                  <p className="hero__description">{slide.description}</p>

                  <div className="hero__actions">
                    <button className="btn btn--primary btn--large">
                      Explorer les modèles
                    </button>
                    <button className="btn btn--outline btn--large">
                      Prendre rendez-vous
                    </button>
                  </div>
                </div>
              </div>

              {/* DESKTOP — STRICTEMENT INCHANGÉ */}
              {!isMobile && (
                <div className="slide__image">
                  <div
                    className="image__container"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="image__overlay"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="hero__controls">
        <button className="hero__control hero__control--prev" onClick={prevSlide}>‹</button>
        <div className="hero__indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero__indicator ${index === currentSlide ? 'hero__indicator--active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <button className="hero__control hero__control--next" onClick={nextSlide}>›</button>
      </div>

      {isMobile && (
        <div className="mobile__quick-actions">
          <button className="mobile__action-btn mobile__action-btn--primary">📞 Appeler</button>
          <button className="mobile__action-btn mobile__action-btn--secondary">💬 WhatsApp</button>
        </div>
      )}
    </section>
  );
};

export default Hero;
