import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import imgLandCruiser from '../../assets/images/toyota/landcruiser300.png';
import imgFortuner from '../../assets/images/toyota/fortuner.png';
import imgPeugeot from '../../assets/images/peugeot/3008.png';

const NAV_LINKS = [
  { to: '/',          label: 'Accueil' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/marques',   label: 'Marques' },
  { to: '/services',  label: 'Services' },
  { to: '/contact',   label: 'Contact' },
];

const RECENT_VEHICLES = [
  { img: imgLandCruiser, name: 'Land Cruiser 300', year: '2023', id: 5 },
  { img: imgFortuner,    name: 'Fortuner',          year: '2023', id: 3 },
  { img: imgPeugeot,     name: 'Peugeot 3008',      year: '2023', id: 3008 },
];

const Footer = () => (
  <footer className="tcm-footer">
    <div className="tcm-footer__grid">

      {/* Col 1 — Brand */}
      <div className="tcm-footer__col tcm-footer__col--brand">
        <Link to="/" className="tcm-footer__logo">
          <div className="tcm-footer__logo-mark">TM</div>
          <span className="tcm-footer__logo-name">TERACAR MOTORS</span>
        </Link>
        <p className="tcm-footer__desc">
          Concessionnaire multimarque à Abidjan — véhicules neufs et d'occasion certifiés,
          garantie et financement sur place.
        </p>
        <div className="tcm-footer__contacts">
          <div className="tcm-footer__contact-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z"/>
              <circle cx="12" cy="9" r="2.3"/>
            </svg>
            Immeuble Le Walebo, Cocody Bonoumin, Abidjan
          </div>
          <div className="tcm-footer__contact-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.5 0 1 .5 1 1V20c0 .5-.5 1-1 1-9.4 0-17-7.6-17-17 0-.5.5-1 1-1h3.5c.5 0 1 .5 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"/>
            </svg>
            <a href="tel:0770770770">07 70 77 07 70</a>
          </div>
          <div className="tcm-footer__contact-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2"/>
              <path d="M3 7l9 6 9-6"/>
            </svg>
            <a href="mailto:support@teracar-motors.com">support@teracar-motors.com</a>
          </div>
        </div>
      </div>

      {/* Col 2 — Quick links */}
      <div className="tcm-footer__col">
        <div className="tcm-footer__col-title">Liens rapides</div>
        <nav className="tcm-footer__links">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className="tcm-footer__link">{label}</Link>
          ))}
        </nav>
      </div>

      {/* Col 3 — Recent vehicles */}
      <div className="tcm-footer__col">
        <div className="tcm-footer__col-title">Véhicules récents</div>
        <div className="tcm-footer__vehicles">
          {RECENT_VEHICLES.map(({ img, name, year, id }) => (
            <Link key={id} to={`/cars/${id}`} className="tcm-footer__vehicle">
              <div className="tcm-footer__vehicle-img">
                <img src={img} alt={name} />
              </div>
              <div>
                <div className="tcm-footer__vehicle-name">{name}</div>
                <div className="tcm-footer__vehicle-year">{year}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Col 4 — Map */}
      <div className="tcm-footer__col">
        <div className="tcm-footer__col-title">Localisation</div>
        <div className="tcm-footer__map">
          <iframe
            title="Teracar Motors — Cocody Bonoumin"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1986.0!2d-4.0712193!3d5.3658935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ede221c2cacf%3A0xb957b324749398b1!2sImmeuble%20Le%20Walebo!5e0!3m2!1sfr!2sci!4v1749484800000!5m2!1sfr!2sci"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

    </div>

    <div className="tcm-footer__bottom">
      <span>© 2026 Teracar Motors — L'automobile à votre image</span>
      <div className="tcm-footer__bottom-links">
        <span>Politique de confidentialité</span>
        <span>Conditions générales</span>
      </div>
    </div>
  </footer>
);

export default Footer;
