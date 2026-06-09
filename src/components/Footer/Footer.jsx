import React from "react";
import { useNavigate } from "react-router-dom";
import "./footer.css";
import imgLandCruiser from "../../assets/images/toyota/landcruiser300.png";
import imgPatrol from "../../assets/images/nissan/patrolY62.png";
import imgPeugeot from "../../assets/images/peugeot/3008.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer__overlay"></div>

      <div className="footer__container">
        {/* CONTACT */}
        <div className="footer__col">
          <h4 className="footer__title">Informations de Contact</h4>
          <p className="footer__desc">
            Retrouvez-nous et contactez-nous pour tous vos besoins en véhicules.
          </p>

          <ul className="footer__list">
            <li>
              <span>📍</span> Immeuble Le Walebo, Abidjan
            </li>
            <li>
              <span>📞</span> 07 70 77 07 70
            </li>
            <li>
              <span>✉️</span> support@teracar-motors.com
            </li>
          </ul>
        </div>

{/* POSTS */}
        <div className="footer__col">
          <h4 className="footer__title">Véhicules Récents</h4>

          <div className="footer__post" onClick={() => navigate("/cars/5")}>
            <img src={imgLandCruiser} alt="Toyota Land Cruiser 300" />
            <div>
              <p>Toyota Land Cruiser 300</p>
              <span>2024</span>
            </div>
          </div>

          <div className="footer__post" onClick={() => navigate("/cars/1001")}>
            <img src={imgPatrol} alt="Nissan Patrol Y62" />
            <div>
              <p>Nissan Patrol Y62</p>
              <span>2024</span>
            </div>
          </div>

          <div className="footer__post" onClick={() => navigate("/cars/3008")}>
            <img src={imgPeugeot} alt="Peugeot 3008" />
            <div>
              <p>Peugeot 3008</p>
              <span>2024</span>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="footer__col">
          <h4 className="footer__title">Localisation</h4>

          <div className="footer__map">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1986.0!2d-4.0712193!3d5.3658935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ede221c2cacf%3A0xb957b324749398b1!2sImmeuble%20Le%20Walebo!5e0!3m2!1sfr!2sci!4v1749484800000!5m2!1sfr!2sci"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer__bottom">
        <p>© Copyright 2025 Car Dealer</p>
        <div className="footer__bottom-links">
          <span>Privacy Policy</span>
          <span>Terms and Conditions</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
