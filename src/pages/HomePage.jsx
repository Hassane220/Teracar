import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import CarCard from '../components/CarCard/CarCard';
import { api } from '../api/client';
import { useInView } from '../hooks/useInView';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './HomePage.css';

/* ---- Imports brand logos ---- */
import logoToyota    from '../assets/images/partners/Toyota.png';
import logoFord      from '../assets/images/partners/Ford.png';
import logoVW        from '../assets/images/partners/Volkswagen.png';
import logoHonda     from '../assets/images/partners/Honda.png';
import logoAudi      from '../assets/images/partners/Audi.png';
import logoBMW       from '../assets/images/partners/BMW.svg';
import logoMercedes  from '../assets/images/partners/Mercedes.svg';
import mechanic      from '../assets/images/mechanic-car.webp';

const BRANDS_LIST = [
  { src: logoToyota,   alt: 'Toyota' },
  { src: logoFord,     alt: 'Ford' },
  { src: logoVW,       alt: 'Volkswagen' },
  { src: logoHonda,    alt: 'Honda' },
  { src: logoAudi,     alt: 'Audi' },
  { src: logoBMW,      alt: 'BMW' },
  { src: logoMercedes, alt: 'Mercedes' },
];

const CATEGORIES = ['Tous', 'SUV', 'Berline', 'Pickup', 'Citadine', 'Utilitaire'];

const BUDGET_OPTIONS = [
  { label: 'Tous budgets', value: '' },
  { label: '≤ 15 M FCFA',  value: '15000000' },
  { label: '≤ 25 M FCFA',  value: '25000000' },
  { label: '≤ 40 M FCFA',  value: '40000000' },
  { label: '≤ 60 M FCFA',  value: '60000000' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [featuredCars,   setFeaturedCars]   = useState([]);
  const [brandsUnique,   setBrandsUnique]   = useState([]);
  const [searchBrand,    setSearchBrand]    = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchBudget,   setSearchBudget]   = useState('');
  const [searchCondition,setSearchCondition]= useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const [brandsRef,    brandsVisible]    = useInView();
  const [featuredRef,  featuredVisible]  = useInView();
  const [trustRef,     trustVisible]     = useInView();
  const [statsRef,     statsVisible]     = useInView();
  const [nlRef,        nlVisible]        = useInView();
  const [ctaRef,       ctaVisible]       = useInView();

  useEffect(() => {
    api.getVehicles().then(data => {
      setFeaturedCars(data.slice(0, 3));
      setBrandsUnique([...new Set(data.map(c => c.brand))].sort());
    }).catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchBrand)     params.set('brand',    searchBrand);
    if (searchCategory)  params.set('category', searchCategory.toLowerCase());
    if (searchBudget)    params.set('maxPrice', searchBudget);
    if (searchCondition) params.set('condition',searchCondition);
    navigate(`/catalogue?${params.toString()}`);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <main className="tcm-home">

      {/* Hero */}
      <Hero />

      {/* Floating Search Bar */}
      <section className="tcm-home__searchbar-wrap" aria-label="Recherche rapide">
        <form className="tcm-home__searchbar" onSubmit={handleSearch}>
          <div className="tcm-home__search-field">
            <span className="tcm-home__search-label">Marque</span>
            <select
              value={searchBrand}
              onChange={e => setSearchBrand(e.target.value)}
              className="tcm-home__search-select"
              aria-label="Filtrer par marque"
            >
              <option value="">Toutes</option>
              {brandsUnique.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="tcm-home__search-field">
            <span className="tcm-home__search-label">Catégorie</span>
            <select
              value={searchCategory}
              onChange={e => setSearchCategory(e.target.value)}
              className="tcm-home__search-select"
              aria-label="Filtrer par catégorie"
            >
              {CATEGORIES.map(c => <option key={c} value={c === 'Tous' ? '' : c}>{c}</option>)}
            </select>
          </div>

          <div className="tcm-home__search-field">
            <span className="tcm-home__search-label">Budget max</span>
            <select
              value={searchBudget}
              onChange={e => setSearchBudget(e.target.value)}
              className="tcm-home__search-select"
              aria-label="Filtrer par budget"
            >
              {BUDGET_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div className="tcm-home__search-field">
            <span className="tcm-home__search-label">État</span>
            <select
              value={searchCondition}
              onChange={e => setSearchCondition(e.target.value)}
              className="tcm-home__search-select"
              aria-label="Filtrer par état"
            >
              <option value="">Tous</option>
              <option value="Neuf">Neuf</option>
              <option value="Occasion">Occasion</option>
            </select>
          </div>

          <div className="tcm-home__search-btn-wrap">
            <button type="submit" className="tcm-home__search-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <circle cx="11" cy="11" r="7"/>
                <path d="M21 21l-4-4"/>
              </svg>
              Rechercher
            </button>
          </div>
        </form>
      </section>

      {/* Brands ticker */}
      <section className="tcm-home__brands" aria-label="Marques partenaires">
        <p className="tcm-home__brands-label">Les grandes marques, un seul concessionnaire</p>
        <div className="tcm-home__ticker-wrap">
          <div className="tcm-home__ticker">
            {[...BRANDS_LIST, ...BRANDS_LIST].map(({ src, alt }, i) => (
              <Link
                key={i}
                to={`/catalogue?brand=${alt}`}
                className="tcm-home__brand-logo"
                aria-label={`Voir les véhicules ${alt}`}
                tabIndex={i >= BRANDS_LIST.length ? -1 : 0}
              >
                <img src={src} alt={i < BRANDS_LIST.length ? alt : ''} loading="lazy" aria-hidden={i >= BRANDS_LIST.length} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section ref={featuredRef} className={`tcm-home__featured tcm-reveal${featuredVisible ? ' tcm-visible' : ''}`} aria-label="Véhicules en vedette">
        <div className="tcm-home__featured-header">
          <div>
            <div className="tcm-home__section-kicker">// Sélection du moment</div>
            <h2 className="tcm-home__section-title">Véhicules en vedette</h2>
          </div>
          <Link to="/catalogue" className="tcm-home__see-all">
            Tout le catalogue
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d21f28" strokeWidth="2.4" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>
        <div className="tcm-home__featured-grid">
          {featuredCars.map(car => (
            <CarCard key={car.id} car={car} showPrices={false} />
          ))}
        </div>
      </section>

      {/* Trust cards */}
      <section ref={trustRef} className={`tcm-home__trust tcm-reveal${trustVisible ? ' tcm-visible' : ''}`} aria-label="Nos garanties">
        <div className="tcm-home__trust-grid">
          <div className={`tcm-home__trust-card tcm-reveal tcm-delay-1${trustVisible ? ' tcm-visible' : ''}`}>
            <div className="tcm-home__trust-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2" aria-hidden="true">
                <path d="M12 2l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V5z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h3>Garantie constructeur</h3>
            <p>Chaque véhicule couvert par une garantie claire et un contrôle technique complet.</p>
          </div>
          <div className={`tcm-home__trust-card tcm-reveal tcm-delay-2${trustVisible ? ' tcm-visible' : ''}`}>
            <div className="tcm-home__trust-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <path d="M8 12l2.5 2.5L16 9"/>
              </svg>
            </div>
            <h3>Véhicules certifiés</h3>
            <p>Inspection en 120 points avant chaque mise en vente. Historique transparent.</p>
          </div>
          <div className={`tcm-home__trust-card tcm-reveal tcm-delay-3${trustVisible ? ' tcm-visible' : ''}`}>
            <div className="tcm-home__trust-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="5" width="18" height="15" rx="2"/>
                <path d="M3 10h18M8 3v4M16 3v4"/>
              </svg>
            </div>
            <h3>Financement facile</h3>
            <p>Solutions de paiement adaptées et réponse rapide, directement en agence.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className={`tcm-home__stats tcm-reveal${statsVisible ? ' tcm-visible' : ''}`} aria-label="Chiffres clés">
        <div className="tcm-home__stats-grid">
          <div className={`tcm-home__stat tcm-reveal tcm-delay-1${statsVisible ? ' tcm-visible' : ''}`}>
            <div className="tcm-home__stat-number">1500+</div>
            <div className="tcm-home__stat-label">Clients satisfaits</div>
          </div>
          <div className={`tcm-home__stat tcm-reveal tcm-delay-2${statsVisible ? ' tcm-visible' : ''}`}>
            <div className="tcm-home__stat-number">99%</div>
            <div className="tcm-home__stat-label">Taux de recommandation</div>
          </div>
          <div className={`tcm-home__stat tcm-reveal tcm-delay-3${statsVisible ? ' tcm-visible' : ''}`}>
            <div className="tcm-home__stat-number">25+</div>
            <div className="tcm-home__stat-label">Marques disponibles</div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section ref={nlRef} className={`tcm-home__newsletter-wrap tcm-reveal${nlVisible ? ' tcm-visible' : ''}`} aria-label="Newsletter et avantages">
        <div className="tcm-home__newsletter-card">
          <div className="tcm-home__newsletter-content">
            <h2>Recevez les dernières offres et actualités</h2>
            <p>Promotions exclusives, nouveaux véhicules et services premium pour particuliers et professionnels.</p>
            {subscribed ? (
              <div className="tcm-home__subscribed">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--status-available)" strokeWidth="2.4">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                Merci ! Vous êtes bien inscrit.
              </div>
            ) : (
              <form className="tcm-home__newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="tcm-home__email-input"
                  aria-label="Adresse e-mail"
                />
                <button type="submit" className="tcm-home__newsletter-btn">S'abonner</button>
              </form>
            )}
          </div>
          <div
            className="tcm-home__newsletter-img"
            style={{ backgroundImage: `url(${mechanic})` }}
            aria-hidden="true"
          />
        </div>

        <div className="tcm-home__mini-cards">
          <div className={`tcm-home__mini-card tcm-reveal tcm-delay-1${nlVisible ? ' tcm-visible' : ''}`}>
            <h4>Toutes marques</h4>
            <p>Véhicules neufs et d'occasion certifiés, toutes marques confondues.</p>
          </div>
          <div className={`tcm-home__mini-card tcm-reveal tcm-delay-2${nlVisible ? ' tcm-visible' : ''}`}>
            <h4>Support gratuit</h4>
            <p>Assistance complète avant, pendant et après votre achat.</p>
          </div>
          <div className={`tcm-home__mini-card tcm-reveal tcm-delay-3${nlVisible ? ' tcm-visible' : ''}`}>
            <h4>Prix accessibles</h4>
            <p>Des tarifs compétitifs avec un excellent rapport qualité-prix.</p>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section ref={ctaRef} className={`tcm-home__cta-band tcm-reveal${ctaVisible ? ' tcm-visible' : ''}`} aria-label="Prendre rendez-vous">
        <div className="tcm-home__cta-glow" aria-hidden="true" />
        <div className="tcm-home__cta-content">
          <div>
            <div className="tcm-home__cta-kicker">Prêt à conduire ?</div>
            <h2 className="tcm-home__cta-title">Prenez rendez-vous à Cocody</h2>
            <p className="tcm-home__cta-sub">Immeuble Le Walebo, Bonoumin · Essai gratuit sur tous nos modèles.</p>
          </div>
          <div className="tcm-home__cta-actions">
            <a href="tel:0770770770" className="tcm-home__cta-btn tcm-home__cta-btn--white">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.5 0 1 .5 1 1V20c0 .5-.5 1-1 1-9.4 0-17-7.6-17-17 0-.5.5-1 1-1h3.5c.5 0 1 .5 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"/>
              </svg>
              07 70 77 07 70
            </a>
            <Link to="/contact" className="tcm-home__cta-btn tcm-home__cta-btn--outline">
              Nous écrire
            </Link>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </main>
  );
}
