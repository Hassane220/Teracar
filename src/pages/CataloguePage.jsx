import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import CarCard from '../components/CarCard/CarCard';
import { api } from '../api/client';
import { useSettings } from '../context/SettingsContext';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './CataloguePage.css';

const PAGE_SIZE = 9;
const CATEGORIES_LIST = ['SUV', 'Berline', 'Pickup', 'Citadine', 'Utilitaire'];
const SORT_OPTIONS = [
  { value: 'default',    label: 'Par défaut' },
  { value: 'price-asc',  label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'year-desc',  label: 'Plus récents' },
];

export default function CataloguePage() {
  const [searchParams] = useSearchParams();
  const { showPrices } = useSettings();
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getVehicles().then(data => { setAllCars(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const brandCounts = useMemo(() => {
    const counts = {};
    allCars.forEach(c => { counts[c.brand] = (counts[c.brand] || 0) + 1; });
    return counts;
  }, [allCars]);
  const uniqueBrands = Object.keys(brandCounts).sort();

  const [selectedBrands,   setSelectedBrands]   = useState(() => { const b = searchParams.get('brand'); return b ? [b] : []; });
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || '');
  const [maxBudget,        setMaxBudget]         = useState(100000000);
  const [condition,        setCondition]         = useState('');
  const [sortBy,           setSortBy]            = useState('default');
  const [page,             setPage]              = useState(1);

  useEffect(() => { setPage(1); }, [selectedBrands, selectedCategory, maxBudget, condition]);

  const toggleBrand = (brand) => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  const resetFilters = () => { setSelectedBrands([]); setSelectedCategory(''); setMaxBudget(100000000); setCondition(''); setSortBy('default'); };

  const filtered = useMemo(() => {
    let result = allCars.filter(car => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(car.brand)) return false;
      if (selectedCategory && car.category?.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      if (maxBudget < 100000000 && car.price > maxBudget) return false;
      if (condition === 'Neuf'     && car.mileage !== 0) return false;
      if (condition === 'Occasion' && car.mileage === 0) return false;
      return true;
    });
    if (sortBy === 'price-asc')  result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'year-desc')  result = [...result].sort((a, b) => b.year - a.year);
    return result;
  }, [allCars, selectedBrands, selectedCategory, maxBudget, condition, sortBy]);

  const displayed = filtered.slice(0, page * PAGE_SIZE);
  const hasMore   = displayed.length < filtered.length;

  return (
    <main className="tcm-catalogue">
      <div className="tcm-catalogue__header">
        <nav className="tcm-catalogue__breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link><span>/</span><span>Catalogue</span>
        </nav>
        <div className="tcm-catalogue__title-row">
          <h1>Tout le catalogue</h1>
          <span className="tcm-catalogue__count"><strong>{filtered.length}</strong> véhicules trouvés</span>
        </div>
      </div>

      <div className="tcm-catalogue__layout">
        <aside className="tcm-catalogue__sidebar" aria-label="Filtres">
          <div className="tcm-filter-card">
            <div className="tcm-filter-card__title">Marque</div>
            <div className="tcm-filter-card__body">
              {uniqueBrands.map(brand => (
                <label key={brand} className="tcm-filter-check">
                  <span className={`tcm-filter-check__box${selectedBrands.includes(brand) ? ' tcm-filter-check__box--active' : ''}`}
                    onClick={() => toggleBrand(brand)} role="checkbox" aria-checked={selectedBrands.includes(brand)} tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && toggleBrand(brand)} />
                  <span className="tcm-filter-check__label" onClick={() => toggleBrand(brand)}
                    style={selectedBrands.includes(brand) ? { color: 'var(--text-primary)' } : {}}>
                    {brand}
                  </span>
                  <span className="tcm-filter-check__count">{brandCounts[brand]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="tcm-filter-card">
            <div className="tcm-filter-card__title">Catégorie</div>
            <div className="tcm-filter-card__pills">
              {CATEGORIES_LIST.map(cat => (
                <button key={cat}
                  className={`tcm-filter-pill${selectedCategory.toLowerCase() === cat.toLowerCase() ? ' tcm-filter-pill--active' : ''}`}
                  onClick={() => setSelectedCategory(prev => prev.toLowerCase() === cat.toLowerCase() ? '' : cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="tcm-filter-card">
            <div className="tcm-filter-card__title">Budget max</div>
            <div className="tcm-filter-range">
              <div className="tcm-filter-range__track">
                <div className="tcm-filter-range__fill" style={{ width: `${(maxBudget / 100000000) * 100}%` }} />
                <div className="tcm-filter-range__thumb" style={{ left: `${(maxBudget / 100000000) * 100}%` }} />
              </div>
              <input type="range" min="0" max="100000000" step="1000000" value={maxBudget}
                onChange={e => setMaxBudget(Number(e.target.value))} className="tcm-filter-range__input" />
            </div>
            <div className="tcm-filter-range__labels">
              <span>0</span>
              <span className="tcm-filter-range__value">
                {maxBudget >= 100000000 ? 'Illimité' : `${(maxBudget / 1000000).toFixed(0)} M FCFA`}
              </span>
            </div>
          </div>

          <div className="tcm-filter-card">
            <div className="tcm-filter-card__title">État</div>
            <div className="tcm-filter-toggle">
              <button className={`tcm-filter-toggle__btn${condition === 'Neuf' ? ' tcm-filter-toggle__btn--active' : ''}`}
                onClick={() => setCondition(prev => prev === 'Neuf' ? '' : 'Neuf')}>Neuf</button>
              <button className={`tcm-filter-toggle__btn${condition === 'Occasion' ? ' tcm-filter-toggle__btn--active' : ''}`}
                onClick={() => setCondition(prev => prev === 'Occasion' ? '' : 'Occasion')}>Occasion</button>
            </div>
          </div>

          <button className="tcm-filter-reset" onClick={resetFilters}>Réinitialiser les filtres</button>
        </aside>

        <div className="tcm-catalogue__content">
          <div className="tcm-catalogue__toolbar">
            <span className="tcm-catalogue__toolbar-label">Trier par</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="tcm-catalogue__sort">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {loading ? (
            <div style={{ color: '#8a8a90', padding: 40, textAlign: 'center' }}>Chargement…</div>
          ) : displayed.length > 0 ? (
            <div className="tcm-catalogue__grid">
              {displayed.map(car => <CarCard key={car.id} car={car} showPrices={showPrices} />)}
            </div>
          ) : (
            <div className="tcm-catalogue__empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>
              </svg>
              <p>Aucun véhicule ne correspond à vos filtres.</p>
              <button className="tcm-filter-reset" onClick={resetFilters}>Réinitialiser les filtres</button>
            </div>
          )}

          {displayed.length > 0 && (
            <div className="tcm-catalogue__load-more">
              <span className="tcm-catalogue__progress">{displayed.length} sur {filtered.length} véhicules affichés</span>
              {hasMore && <button className="tcm-catalogue__load-btn" onClick={() => setPage(p => p + 1)}>Charger plus de véhicules</button>}
            </div>
          )}
        </div>
      </div>
      <ScrollToTop />
    </main>
  );
}
