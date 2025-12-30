import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarDetailsPage from './pages/CarDetailsPage'; // Importe la nouvelle page
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
          {/* <Route path="/car/:id" element={<CarDetailsPage />} /> Nouvelle route */}
          <Route path="/cars/:id" element={<CarDetailsPage />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;