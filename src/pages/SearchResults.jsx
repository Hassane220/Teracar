import React from 'react';
import { useLocation } from 'react-router-dom';
import { cars as allCars } from '../data/cars';
import CarList from '../components/CarList/CarList';

function parseFilters(search) {
  const params = new URLSearchParams(search);
  return {
    minPrice: params.get('minPrice') || '',
    maxPrice: params.get('maxPrice') || '',
    vehicleType: params.get('vehicleType') || '',
    certification: params.get('certification') || '',
    condition: params.get('condition') || '',
    year: params.get('year') || '',
    make: params.get('make') || '',
    model: params.get('model') || '',
    location: params.get('location') || ''
  };
}

function filterCars(cars, filters) {
  return cars.filter(car => {
    const min = filters.minPrice ? parseInt(filters.minPrice, 10) : 0;
    const max = filters.maxPrice ? parseInt(filters.maxPrice, 10) : Infinity;
    if (car.price < min || car.price > max) return false;
    if (filters.vehicleType && filters.vehicleType !== 'All vehicles' && car.category !== filters.vehicleType.toLowerCase()) return false;
    if (filters.year && String(car.year) !== filters.year) return false;
    if (filters.make && car.brand !== filters.make) return false;
    if (filters.model && car.model !== filters.model) return false;
    if (filters.location && car.location !== filters.location) return false;
    // Ajoute d'autres filtres si besoin
    return true;
  });
}

const SearchResults = () => {
  const location = useLocation();
  const filters = parseFilters(location.search);
  const filteredCars = filterCars(allCars, filters);

  return (
    <div style={{padding: '2rem 0'}}>
      <h2>Résultats de la recherche</h2>
      <CarList cars={filteredCars} title={null} />
    </div>
  );
};

export default SearchResults;
