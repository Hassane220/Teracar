import React from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './ServicesPage.css';

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2">
        <path d="M12 2l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V5z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Garantie constructeur',
    desc: "Chaque véhicule vendu bénéficie d'une garantie constructeur complète avec un contrôle technique 120 points.",
    detail: 'Garantie 2 ans',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2">
        <circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 9"/>
      </svg>
    ),
    title: 'Inspection certifiée',
    desc: 'Nos experts inspectent chaque véhicule en 120 points avant toute mise en vente. Historique complet fourni.',
    detail: '120 points',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2">
        <rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>
      </svg>
    ),
    title: 'Financement flexible',
    desc: 'Bénéficiez de solutions de financement adaptées à votre profil, avec réponse rapide directement en agence.',
    detail: 'Réponse en 24h',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2">
        <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.3"/>
      </svg>
    ),
    title: 'Essai gratuit',
    desc: "Testez le véhicule qui vous intéresse avant l'achat. Prise de rendez-vous rapide, essai sans engagement.",
    detail: 'Sur tous les modèles',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
    title: 'Reprise de votre véhicule',
    desc: 'Votre véhicule actuel est évalué gratuitement. Déduisez sa valeur de votre prochain achat.',
    detail: 'Estimation gratuite',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    title: 'Support après-vente',
    desc: 'Notre équipe reste disponible après votre achat pour toute question ou assistance liée à votre véhicule.',
    detail: 'Service client dédié',
  },
];

export default function ServicesPage() {
  return (
    <main className="tcm-services">
      <div className="tcm-services__header">
        <nav className="tcm-services__breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span>/</span>
          <span>Services</span>
        </nav>
        <h1 className="tcm-services__title">Nos services</h1>
        <p className="tcm-services__sub">
          Chez Teracar Motors, chaque achat s'accompagne d'une palette de services pensés pour votre tranquillité.
        </p>
      </div>

      <div className="tcm-services__grid">
        {SERVICES.map((s, i) => (
          <div key={i} className="tcm-services__card">
            <div className="tcm-services__card-icon">{s.icon}</div>
            <h2 className="tcm-services__card-title">{s.title}</h2>
            <p className="tcm-services__card-desc">{s.desc}</p>
            <span className="tcm-services__card-badge">{s.detail}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="tcm-services__cta">
        <div className="tcm-services__cta-glow" aria-hidden="true" />
        <div className="tcm-services__cta-content">
          <h2>Vous avez une question ?</h2>
          <p>Notre équipe est disponible pour vous accompagner dans votre projet d'achat.</p>
          <div className="tcm-services__cta-actions">
            <Link to="/contact" className="tcm-services__cta-btn tcm-services__cta-btn--primary">
              Nous contacter
            </Link>
            <a href="tel:0770770770" className="tcm-services__cta-btn tcm-services__cta-btn--outline">
              07 70 77 07 70
            </a>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </main>
  );
}
