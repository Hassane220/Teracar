import React, { useState } from 'react';

const CatalogueImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="catalogue-image-slider">
      <img src={images[current]} alt="car" className="catalogue-image-slider__img" />
    </div>
  );
};

export default CatalogueImageSlider;
