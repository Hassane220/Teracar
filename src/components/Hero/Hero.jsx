import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import hero1 from '../../assets/images/car_toyota_hero1.jpg';
import hero2 from '../../assets/images/car_nissan_hero2.jpg';
import hero3 from '../../assets/images/car_suzuki_hero3.jpg';

const SLIDES = [hero1, hero2, hero3];
const INTERVAL = 7000;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => {
        setPrev(c);
        return (c + 1) % SLIDES.length;
      });
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => {
    if (i === current) return;
    setPrev(current);
    setCurrent(i);
  };

  const touchStart = React.useRef(null);

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0
        ? (current + 1) % SLIDES.length
        : (current - 1 + SLIDES.length) % SLIDES.length
      );
    }
    touchStart.current = null;
  };

  return (
    <section
      className="tcm-hero"
      aria-label="Accueil — Teracar Motors"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {SLIDES.map((src, i) => (
        <div
          key={i}
          className={`tcm-hero__bg ${i === current ? 'tcm-hero__bg--active' : i === prev ? 'tcm-hero__bg--prev' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden="true"
        />
      ))}

      {/* Gradient overlay */}
      <div className="tcm-hero__overlay" aria-hidden="true" />

      {/* Red radial glow */}
      <div className="tcm-hero__glow" aria-hidden="true" />

      {/* Content */}
      <div className="tcm-hero__content">
        <div className="tcm-hero__badge">
          <span className="tcm-hero__badge-dot" aria-hidden="true" />
          Concessionnaire multimarque · Abidjan
        </div>

        <h1 className="tcm-hero__title">
          Trouvez la<br />
          voiture <span className="tcm-hero__title-accent">parfaite</span>
        </h1>

        <p className="tcm-hero__sub">
          Plus de 80 véhicules neufs et d'occasion certifiés — Toyota, Nissan,
          Peugeot, Ford et plus. Garantie et financement sur place.
        </p>

        <div className="tcm-hero__actions">
          <Link to="/catalogue" className="tcm-hero__btn tcm-hero__btn--primary">
            Explorer les modèles
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
          <Link to="/contact" className="tcm-hero__btn tcm-hero__btn--outline">
            Prendre rendez-vous
          </Link>
        </div>

      </div>

      {/* Prev / Next arrows */}
      <button
        className="tcm-hero__arrow tcm-hero__arrow--prev"
        onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="Slide précédente"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button
        className="tcm-hero__arrow tcm-hero__arrow--next"
        onClick={() => goTo((current + 1) % SLIDES.length)}
        aria-label="Slide suivante"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Slide indicators — centered at bottom */}
      <div className="tcm-hero__dots" role="tablist" aria-label="Diaporama">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`tcm-hero__dot${i === current ? ' tcm-hero__dot--active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
          >
            {i === current && (
              <span key={current} className="tcm-hero__dot-progress" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
