
import React, { useState } from 'react';
import './VehicleFilter.css';
import { cars } from '../../data/cars';

const VehicleFilter = () => {
  // État pour les filtres
  const MAX_PRICE = 100000000;
  const [filters, setFilters] = useState({
    vehicleType: 'Tous les véhicules',
    certification: '',
    condition: '',
    year: '',
    make: '',
    model: '',
    fuel: '',
    transmission: '',
    minPrice: '',
    maxPrice: 0
  });

  // Options dynamiques pour les menus déroulants
  const certificationOptions = ['Certifié', 'Non certifié'];
  const conditionOptions = ['Neuf', 'Occasion'];

  // Générer dynamiquement les types de véhicules, marques, modèles, années
  const vehicleTypes = ['Tous les véhicules', ...Array.from(new Set(cars.map(car => car.category).filter(Boolean)))];
  const yearOptions = Array.from(new Set(cars.map(car => car.year))).sort((a, b) => b - a);
  const makeOptions = Array.from(new Set(cars.map(car => car.brand))).sort();
  const fuelOptions = Array.from(new Set(cars.map(car => car.fuel).filter(Boolean))).sort();
  const transmissionOptions = Array.from(new Set(cars.map(car => car.transmission).filter(Boolean))).sort();
  const filteredModels = filters.make
    ? cars.filter(car => car.brand === filters.make).map(car => car.model)
    : cars.map(car => car.model);
  const modelOptions = Array.from(new Set(filteredModels)).sort();

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Ajout d'une prop pour transmettre le filtre au parent
  const handleSearch = () => {
    if (window.onVehicleFilter) {
      // Si maxPrice vaut 0, on considère qu'il n'y a pas de limite supérieure
      const searchFilters = {
        ...filters,
        maxPrice: filters.maxPrice === 0 ? MAX_PRICE : filters.maxPrice
      };
      window.onVehicleFilter(searchFilters);
    }
  };

  const handleReset = () => {
    setFilters({
      vehicleType: 'Tous les véhicules',
      certification: '',
      condition: '',
      year: '',
      make: '',
      model: '',
      fuel: '',
      transmission: '',
      minPrice: '',
      maxPrice: 0
    });
    if (window.onVehicleFilterReset) {
      window.onVehicleFilterReset();
    }
  };

  return (
    <div className="vehicle-filter-container">
      <div style={{fontSize: '1.3rem', fontWeight: 600, marginBottom: '18px'}}>Je veux acheter</div>
      {/* En-tête du filtre, sans image ni affichage de voitures */}

      <div className="filter-grid">

        {/*
        Ligne unique pour Type, Certification, État
        <div className="filter-row-inline">
          Type de véhicule
          <div className="filter-inline-group">
            <span className="filter-label-inline">Type :</span>
            {vehicleTypes.map(type => (
              <button
                key={type}
                className={`vehicle-type-btn ${filters.vehicleType === type ? 'active' : ''}`}
                onClick={() => handleFilterChange('vehicleType', filters.vehicleType === type ? '' : type)}
              >
                {type}
              </button>
            ))}
          </div>
          Certification
          <div className="filter-inline-group">
            <span className="filter-label-inline">Certification :</span>
            {certificationOptions.map(cert => (
              <button
                key={cert}
                className={`filter-btn ${filters.certification === cert ? 'active' : ''}`}
                onClick={() => handleFilterChange('certification', filters.certification === cert ? '' : cert)}
              >
                {cert}
              </button>
            ))}
          </div>
          État
          <div className="filter-inline-group">
            <span className="filter-label-inline">État :</span>
            {conditionOptions.map(condition => (
              <button
                key={condition}
                className={`filter-btn ${filters.condition === condition ? 'active' : ''}`}
                onClick={() => handleFilterChange('condition', filters.condition === condition ? '' : condition)}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>
        */}

        {/* Filtres avancés - Menu déroulant + slider prix */}
        <div className="advanced-filters">
          <h3 className="filter-label">Filtres avancés</h3>
          <div className="dropdown-filters">
            <div className="dropdown-group">
              {/* Slider de prix */}
              <div className="slider-price-group">
                <label htmlFor="price-slider" className="filter-label">Prix (FCFA)</label>
                <input
                  id="price-slider"
                  type="range"
                  min={0}
                  max={MAX_PRICE}
                  step={100000}
                  value={filters.maxPrice}
                  onChange={e => handleFilterChange('maxPrice', Number(e.target.value))}
                  className="price-slider"
                />
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.95em'}}>
                  <span>0</span>
                  <span>
                    {filters.maxPrice === 0
                      ? 'Aucune limite'
                      : Number(filters.maxPrice).toLocaleString() + ' FCFA'}
                  </span>
                </div>
              </div>
              {/* Menus déroulants */}
              <select 
                className="filter-dropdown"
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
              >
                <option value="">Année</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select 
                className="filter-dropdown"
                value={filters.make}
                onChange={(e) => handleFilterChange('make', e.target.value)}
              >
                <option value="">Marque</option>
                {makeOptions.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>

              <select
                className="filter-dropdown"
                value={filters.model}
                onChange={(e) => handleFilterChange('model', e.target.value)}
                disabled={!filters.make && modelOptions.length === 0}
              >
                <option value="">Modèle</option>
                {modelOptions.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>

              <select
                className="filter-dropdown"
                value={filters.fuel}
                onChange={(e) => handleFilterChange('fuel', e.target.value)}
              >
                <option value="">Carburant</option>
                {fuelOptions.map(fuel => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>

              <select
                className="filter-dropdown"
                value={filters.transmission}
                onChange={(e) => handleFilterChange('transmission', e.target.value)}
              >
                <option value="">Transmission</option>
                {transmissionOptions.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="action-buttons">
          <button className="search-btn" onClick={handleSearch}>
            Rechercher
          </button>
          <button className="reset-btn" onClick={handleReset}>
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilter;