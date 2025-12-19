import React from "react";
import "./getUpdates.css";
import mechanicCar from "../../assets/images/mechanic-car.webp";

const UpdatesOffers = () => {
  return (
    <section className="updates">
      <div className="updates__top">
        {/* LEFT */}
        <div className="updates__content">
          <h2>Recevez les dernières offres et actualités</h2>
          <p>
            Promotions exclusives, nouveaux véhicules et services premium pour
            particuliers et professionnels.
          </p>

          {/* <form className="updates__form">
            <input type="email" placeholder="Entrez votre adresse email" />
            <button type="submit">S’abonner</button>
          </form> */}
        </div>

        {/* RIGHT IMAGE */}
        <div className="updates__image">
          <img src={mechanicCar} alt="Expert automobile" />
        </div>
      </div>

      {/* FEATURES */}
      <div className="updates__features">
        <div className="updates__card">
          <span className="icon icon-car" />
          <h4>Toutes Marques</h4>
          <p>
            Véhicules neufs et d’occasion certifiés, toutes marques confondues.
          </p>
        </div>

        <div className="updates__card">
          <span className="icon icon-support" />
          <h4>Support Gratuit</h4>
          <p>
            Assistance complète avant, pendant et après votre achat.
          </p>
        </div>

        <div className="updates__card">
          <span className="icon icon-price" />
          <h4>Prix Accessibles</h4>
          <p>
            Des tarifs compétitifs avec un excellent rapport qualité-prix.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UpdatesOffers;
