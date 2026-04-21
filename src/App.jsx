import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarDetailsPage from './pages/CarDetailsPage';
import CataloguePage from './pages/CataloguePage';
import Catalogue from './pages/Catalogue';
import VehicleCatalogue from './components/Catalogue/CataloguePages/VehicleCatalogue';
import HyundaiSection2 from './components/Catalogue/Hyundai2/HyundaiSection2';
import SearchResults from './pages/SearchResults';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/catalogue-complet" element={<Catalogue />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/catalogue-model-voiture" element={<VehicleCatalogue />} />
          <Route path="/hyundai2" element={<HyundaiSection2 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;