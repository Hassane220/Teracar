import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Partners from './components/Partners/Partners';
import FeaturedCars from './components/FeaturedCars/FeaturedCars'; // Vérifiez ce chemin
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import GetUpdates from './components/GetUpdates/GetUpdates';
import RecentNews from './components/RecentNews/RecentNews';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Services />
      <Partners />
      <FeaturedCars />
      <WhyChooseUs />
      <GetUpdates />
      <RecentNews />
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;