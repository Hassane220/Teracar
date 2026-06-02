import React, { useState, useEffect } from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';
import car1 from '../../assets/images/car_toyota_hero1.jpg';
import car2 from '../../assets/images/car_nissan_hero2.jpg';
import car3 from '../../assets/images/car_suzuki_hero3.jpg';

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
      subtitle: "",
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
    <>
      {/* Image brute de test supprimée */}
      <section
        id="accueil"
        className="hero"
        style={!isMobile ? {
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '88vh',
          height: '88vh',
          width: '100%',
          position: 'relative',
        } : {}}
      >
        {/* Overlay desktop */}
        {!isMobile && <div className="hero__overlay" />}
        {/* Mobile : on garde le slider classique */}
        {isMobile && (
          <div className="hero__slides">
            {/* L'image test est retirée, affichage normal */}
            {/* Slides dynamiques */}
            {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`hero__slide hero__slide--${index} ${index === currentSlide ? 'hero__slide--active' : ''}`}
                >
                  <img
                    className="hero__slide-img"
                    src={slide.image}
                    alt=""
                    aria-hidden="true"
                  />
                  <div className="hero__mobile-overlay"></div>
                  {/* Texte et actions sur mobile */}
                  {index === currentSlide && (
                    <div className="hero__slide-content">
                      <div className="slide__text">
                        <div className="text__wrapper">
                          <h1 className="hero__title">
                            {slide.title} <span className="highlighted">{slide.highlighted}</span> {slide.subtitle}
                          </h1>
                          <p className="hero__description">{slide.description}</p>
                        </div>
                        <div className="hero__actions" style={{marginTop: '1.5rem'}}>
                          <button className="btn btn--primary btn--large" onClick={() => navigate('/catalogue-model-voiture')}>
                            Explorer les modèles
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
            ))}
          </div>
        )}
        {/* Desktop : barre de contrôle et boutons en bas */}
        {!isMobile && (
          <>
            {/* Catalogue Button - always visible, top right */}
            {/* <button
              className="hero__catalog-button btn--catalog"
              onClick={() => navigate('/catalogue-model-voiture')}
            >
              <span className="catalog-icon">📚</span>
              <span className="catalog-text">Catalogue</span>
            </button> */}
            <div className="hero__bottom-bar">
              <div className="slide__text" style={{textAlign: 'center', marginBottom: '1.5rem', maxWidth: '700px'}}>
                <div className="text__wrapper">
                  <h1 className="hero__title">
                    {currentSlide === 0 ? (
                      <>
                        {slides[0].title} <span className="highlighted">{slides[0].highlighted}</span><br />{slides[0].subtitle}
                      </>
                    ) : (
                      <>
                        {slides[currentSlide].title} <span className="highlighted">{slides[currentSlide].highlighted}</span> {slides[currentSlide].subtitle}
                      </>
                    )}
                  </h1>
                  <p className="hero__description">{slides[currentSlide].description}</p>
                </div>
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
              <div className="hero__actions" style={{marginTop: '1.5rem'}}>
                <button className="btn btn--primary btn--large" onClick={() => navigate('/catalogue-model-voiture')}>Explorer les modèles</button>
              </div>
            </div>
          </>
        )}
      </section>


    </>
  );
};

export default Hero;
