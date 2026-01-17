import React from 'react';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import Partners from '../components/Partners/Partners';
import FeaturedCars from '../components/FeaturedCars/FeaturedCars';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import GetUpdates from '../components/GetUpdates/GetUpdates';
import RecentNews from '../components/RecentNews/RecentNews';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';

function HomePage() {
  return (
    <>
      <Hero />
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