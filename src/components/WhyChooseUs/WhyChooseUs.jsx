import React from "react";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <section className="why">
      {/* Bandeau rouge du haut */}
      <div className="why-top">
        <h3>Pourquoi Choisir Nos Services Auto</h3>

        <div className="why-top__contact">
          <div className="phone-icon">📞</div>
          <div className="phone-text">
            <span>Assistance professionnelle</span>
            <strong>(+225) 07 12 34 56 78</strong>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="why-main">
        {/* Bloc gauche bleu */}
        <div className="why-left">
          <h2>
            Pourquoi Choisir <br /> Nos Services Auto
          </h2>

          <p>
            Nous offrons des services automobiles fiables, modernes et orientés
            performance. Notre objectif est de garantir sécurité, transparence
            et satisfaction à chaque client.
          </p>

          <div className="why-features">
            <div className="feature">
              <div className="feature-icon">🛠️</div>
              <div>
                <h4>Contrôle & Maintenance</h4>
                <p>
                  Diagnostic complet, entretien préventif et réparation avec
                  équipements certifiés.
                </p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">📅</div>
              <div>
                <h4>Rendez-vous en ligne</h4>
                <p>
                  Planifiez vos services facilement, sans attente, selon vos
                  disponibilités.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Zone vidéo à droite */}
        <div className="why-video">
          <div className="play-button">
            ▶
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
