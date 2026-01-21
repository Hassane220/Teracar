import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import Filters from '../components/Filters/VehicleFilter';
import { CatalogueList, CatalogueCarCard } from '../components/Catalogue';
import { cars as allCars } from '../data/cars';
import Services from '../components/Services/Services';
import Partners from '../components/Partners/Partners';
import FeaturedCars from '../components/FeaturedCars/FeaturedCars';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import GetUpdates from '../components/GetUpdates/GetUpdates';
// import RecentNews from '../components/RecentNews/RecentNews';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

function HomePage() {
  const [filteredCars, setFilteredCars] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    window.onVehicleFilter = (filters) => {
      let result = allCars.filter(car => {
        // Filtrage par intervalle de prix
        const min = filters.minPrice ? parseInt(filters.minPrice, 10) : 0;
        const max = filters.maxPrice ? parseInt(filters.maxPrice, 10) : Infinity;
        if (car.price < min || car.price > max) return false;

        // Filtrage par certification
        if (filters.certification && car.certification !== filters.certification) return false;

        // Filtrage par état
        if (filters.condition && car.condition !== filters.condition) return false;

        // Filtrage par année
        if (filters.year && String(car.year) !== String(filters.year)) return false;

        // Filtrage par marque
        if (filters.make && car.brand !== filters.make) return false;

        // Filtrage par modèle
        if (filters.model && car.model !== filters.model) return false;

        // Filtrage par localisation
        if (filters.location && car.location !== filters.location) return false;

        return true;
      });
      setFilteredCars(result);
      setHasSearched(true);
    };
    window.onVehicleFilterReset = () => {
      setHasSearched(false);
      setFilteredCars([]);
    };
    return () => { window.onVehicleFilter = null; window.onVehicleFilterReset = null; };
  }, []);

  return (
    <>
      <Hero />
      <Filters />
      {hasSearched && (
        <div className="catalogue-main-container" style={{marginTop:'2rem', marginBottom:'2rem'}}>
          <CatalogueList>
            {filteredCars.map(car => (
              <CatalogueCarCard key={car.id} car={car} />
            ))}
          </CatalogueList>
        </div>
      )}
      <Services />
      <Partners />
      <FeaturedCars />
      <WhyChooseUs />
      <GetUpdates />
      {/* <RecentNews /> */}
      <ScrollToTop />
    </>
  );
}

export default HomePage;