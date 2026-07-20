import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard/CarCard';
import { api } from '../api/client';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './SearchResultsPage.css';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query     = searchParams.get('q')         || '';
  const brand     = searchParams.get('brand')     || '';
  const category  = searchParams.get('category')  || '';
  const maxPrice  = searchParams.get('maxPrice')  || '';
  const condition = searchParams.get('condition') || '';

  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    api.getVehicles().then(setAllCars).catch(() => {});
  }, []);

  const results = useMemo(() => {
    return allCars.filter(car => {
      if (query) {
        const q = query.toLowerCase();
        const inTitle = car.title?.toLowerCase().includes(q);
        const inBrand = car.brand?.toLowerCase().includes(q);
        const inModel = car.model?.toLowerCase().includes(q);
        if (!inTitle && !inBrand && !inModel) return false;
      }
      if (brand    && car.brand?.toLowerCase() !== brand.toLowerCase()) return false;
      if (category && car.category?.toLowerCase() !== category.toLowerCase()) return false;
      if (maxPrice && car.price > parseInt(maxPrice, 10)) return false;
      if (condition === 'Neuf' && car.mileage !== 0) return false;
      if (condition === 'Occasion' && car.mileage === 0) return false;
      return true;
    });
  }, [allCars, query, brand, category, maxPrice, condition]);

  const activeFilters = [
    query && `"${query}"`,
    brand,
    category,
    maxPrice && `≤ ${(parseInt(maxPrice,10)/1000000).toFixed(0)} M FCFA`,
    condition,
  ].filter(Boolean);

  return (
    <main className="tcm-search">
      <div className="tcm-search__header">
        <nav className="tcm-search__breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link><span>/</span><span>Recherche</span>
        </nav>
        <h1 className="tcm-search__title">Résultats de recherche</h1>

        {activeFilters.length > 0 && (
          <div className="tcm-search__active">
            {activeFilters.map((f, i) => (
              <span key={i} className="tcm-search__filter-tag">{f}</span>
            ))}
          </div>
        )}

        <p className="tcm-search__count">
          <strong>{results.length}</strong> véhicule{results.length !== 1 ? 's' : ''} trouvé{results.length !== 1 ? 's' : ''}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="tcm-search__grid">
          {results.map(car => <CarCard key={car.id} car={car} showPrices={false} />)}
        </div>
      ) : (
        <div className="tcm-search__empty">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>
          </svg>
          <h2>Aucun résultat</h2>
          <p>Aucun véhicule ne correspond à votre recherche. Essayez d'autres critères.</p>
          <Link to="/catalogue" className="tcm-search__empty-btn">Voir tout le catalogue</Link>
        </div>
      )}
      <ScrollToTop />
    </main>
  );
}
