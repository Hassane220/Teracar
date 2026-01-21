import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./featuredCars.css";

import car1 from "../../assets/images/car1.avif";
import car2 from "../../assets/images/car2.avif";
import car3 from "../../assets/images/car3.jpeg";

const FeaturedCars = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [modalImage, setModalImage] = useState(null);
  const navigate = useNavigate();

  const cars = [
    {
      id: 1,
      badge: "Berline Premium",
      title: "Audi A4 Prestige",
      year: 2017,
      body: "Berline",
      transmission: "Automatique",
      fuel: "Essence",
      oldPrice: 48950,
      price: 48450,
      image: car1,
      category: "sedan",
    },
    {
      id: 2,
      badge: "Confort & Performance",
      title: "Audi A7 3.0T Quattro",
      year: 2017,
      body: "Berline",
      transmission: "Automatique 8 rapports",
      fuel: "Essence",
      oldPrice: 72000,
      price: 71375,
      image: car2,
      category: "sedan",
    },
    {
      id: 3,
      badge: "SUV Polyvalent",
      title: "Audi Q3 2.0T Prestige",
      year: 2017,
      body: "SUV",
      transmission: "Automatique",
      fuel: "Essence",
      oldPrice: 37995,
      price: 36555,
      image: car3,
      category: "suv",
    },
  ];

  const filters = [
    { id: "all", label: "Tous" },
    { id: "sedan", label: "Berlines" },
    { id: "suv", label: "SUV" },
  ];

  const filteredCars =
    activeFilter === "all"
      ? cars
      : cars.filter((car) => car.category === activeFilter);

  return (
    <section className="featured-cars">
      <div className="featured-cars__container">
        {/* MODAL IMAGE */}
        {modalImage && (
          <div className="image-modal-overlay" onClick={() => setModalImage(null)}>
            <div className="image-modal" onClick={e => e.stopPropagation()}>
              <button className="image-modal-close" onClick={() => setModalImage(null)}>×</button>
              <img src={modalImage} alt="Agrandissement véhicule" />
            </div>
          </div>
        )}
        {/* HEADER */}
        <div className="featured-cars__header">
          <div>
            <h2>Nos véhicules en vedette</h2>
            <p>
              Découvrez une sélection de véhicules soigneusement inspectés,
              alliant performance, confort et fiabilité pour répondre aux
              exigences les plus élevées.
            </p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/catalogue-complet')}>Voir tout le catalogue</button>
        </div>

        {/* FILTERS */}
        <div className="featured-cars__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="featured-cars__grid">
          {filteredCars.map((car) => (
            <div className="car-card" key={car.id}>
              {/* IMAGE */}
              <div className="car-card__image">
                <img src={car.image} alt={car.title} />

                {/* OVERLAY ACTIONS */}
                <div className="car-card__overlay">
                  <button
                    className="details-button"
                    title="Voir détails"
                    onClick={() => navigate(`/cars/${car.id}`)}
                  >
                    🔍
                  </button>

                  <button title="Comparer">✔</button>
                  <button title="Agrandir" onClick={() => setModalImage(car.image)}>⤢</button>
                </div>

                {/* PRICE */}
                <div className="car-card__price">
                  <span className="old-price">
                    ${car.oldPrice.toLocaleString()}
                  </span>
                  <span className="new-price">
                    ${car.price.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="car-card__content">
                <span className="car-card__badge">{car.badge}</span>
                <h3>{car.title}</h3>

                <div className="car-card__meta">
                  <div>
                    <strong>Année</strong>
                    <span>{car.year}</span>
                  </div>
                  <div>
                    <strong>Carburant</strong>
                    <span>{car.fuel}</span>
                  </div>
                  <div>
                    <strong>Transmission</strong>
                    <span>{car.transmission}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
