import React from 'react';
import CatalogueShowcase from '../components/CatalogueShowcase';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

const Catalogue = () => {
  return (
    <main style={{ minHeight: '60vh' }}>
      <CatalogueShowcase />
      <ScrollToTop />
    </main>
  );
};

export default Catalogue;
