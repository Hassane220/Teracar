import React, { useState } from 'react';
import './VehicleFilter.css';

const VehicleFilter = () => {
  // État pour les filtres
  const [filters, setFilters] = useState({
    vehicleType: 'Tous les véhicules',
    certification: '',
    condition: '',
    year: '',
    make: '',
    model: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  });

  // Options pour les menus déroulants
  const vehicleTypes = ['Tous les véhicules'];
  const certificationOptions = ['Certifié', 'Non certifié'];
  const conditionOptions = ['Neuf', 'Occasion'];
  const yearOptions = ['1998', '2002', '2004', '2007', '2010', '2015', '2020', '2023'];
  const makeOptions = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi'];
  const modelOptions = ['Model S', 'Civic', 'F-150', '3 Series', 'C-Class', 'A4'];
  const locationOptions = ['Abidjan', 'Bouaké', 'Yamoussoukro', 'San Pedro', 'Korhogo'];

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Ajout d'une prop pour transmettre le filtre au parent
  const handleSearch = () => {
    if (window.onVehicleFilter) {
      window.onVehicleFilter(filters);
    }
  };

  const handleReset = () => {
    setFilters({
      vehicleType: 'All vehicles',
      certification: '',
      condition: '',
      year: '',
      make: '',
      model: '',
      location: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  return (
    <div className="vehicle-filter-container">
      <div style={{fontSize: '1.3rem', fontWeight: 600, marginBottom: '18px'}}>Je veux acheter</div>
      {/* En-tête du filtre, sans image ni affichage de voitures */}

      <div className="filter-grid">
        {/* Filtre par intervalle de prix */}
        <div className="filter-section">
          <h3 className="filter-label">Prix (FCFA)</h3>
          <div className="price-range-fields">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={e => handleFilterChange('minPrice', e.target.value)}
              className="price-input"
              min={0}
            />
            <span style={{margin: '0 8px'}}>—</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={e => handleFilterChange('maxPrice', e.target.value)}
              className="price-input"
              min={0}
            />
          </div>
        </div>

        {/* Ligne unique pour Type, Certification, État */}
        <div className="filter-row-inline">
          {/* Type de véhicule */}
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
          {/* Certification */}
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
          {/* État */}
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

        {/* Filtres avancés - Menu déroulant */}
        <div className="advanced-filters">
          <h3 className="filter-label">Filtres avancés</h3>
          <div className="dropdown-filters">
            <div className="dropdown-group">
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
              >
                <option value="">Modèle</option>
                {modelOptions.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>

              <select 
                className="filter-dropdown"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">Localisation</option>
                {locationOptions.map(location => (
                  <option key={location} value={location}>{location}</option>
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