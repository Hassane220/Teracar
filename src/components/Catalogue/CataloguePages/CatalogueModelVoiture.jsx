import React from "react";
import "./CatalogueModelVoiture.css";

const CatalogueModelVoiture = () => {
  return (
    <div className="catalogue-page">

      {/* HERO */}
      <section className="catalogue-hero">

        <h1 className="catalogue-title">
          TERACAR MOTORS
        </h1>

        <img
          className="hero-car"
          src="/images/toyota.png"
          alt="Toyota"
        />

        <h2 className="catalogue-subtitle">
          — CATALOGUE —
        </h2>

        <p className="catalogue-desc">
          GAMME DE VÉHICULES
        </p>

        <div className="brands">
          <img src="/brands/toyota.png" alt="" />
          <img src="/brands/ford.png" alt="" />
          <img src="/brands/bmw.png" alt="" />
          <img src="/brands/nissan.png" alt="" />
          <img src="/brands/mitsubishi.png" alt="" />
          <img src="/brands/lexus.png" alt="" />
          <img src="/brands/hyundai.png" alt="" />
          <img src="/brands/peugeot.png" alt="" />
          <img src="/brands/mazda.png" alt="" />
          <img src="/brands/suzuki.png" alt="" />
        </div>

      </section>

      {/* MODELE PRINCIPAL */}
      <section className="model-main">

        <div className="model-image">
          <img src="/cars/explorer.png" alt="Explorer" />
        </div>

        <div className="model-specs">

          <h2 className="model-title">EXPLORER</h2>

          <table>
            <tbody>

              <tr>
                <td>MOTORISATION</td>
                <td>6 CYLINDRES 2,3L</td>
              </tr>

              <tr>
                <td>CARBURANT</td>
                <td>ESSENCE</td>
              </tr>

              <tr>
                <td>PUISSANCE DIN</td>
                <td>280 ch</td>
              </tr>

              <tr>
                <td>ASSISES</td>
                <td>05</td>
              </tr>

              <tr>
                <td>PUISSANCE FISCALE</td>
                <td>14 CV</td>
              </tr>

            </tbody>
          </table>

        </div>

      </section>

      {/* MODELES */}
      <section className="models-grid">

        <div className="model-card">

          <h3>RANGER</h3>

          <img src="/cars/ranger.png" alt="" />

          <table>
            <tbody>

              <tr>
                <td>MOTORISATION</td>
                <td>4 CYLINDRES 2,0L</td>
              </tr>

              <tr>
                <td>CARBURANT</td>
                <td>DIESEL</td>
              </tr>

              <tr>
                <td>PUISSANCE DIN</td>
                <td>170 ch</td>
              </tr>

              <tr>
                <td>ASSISES</td>
                <td>05</td>
              </tr>

              <tr>
                <td>PUISSANCE FISCALE</td>
                <td>10 CV</td>
              </tr>

            </tbody>
          </table>

        </div>

        <div className="model-card">

          <h3>RAPTOR</h3>

          <img src="/cars/raptor.png" alt="" />

          <table>
            <tbody>

              <tr>
                <td>MOTORISATION</td>
                <td>8 CYLINDRES 5,2L</td>
              </tr>

              <tr>
                <td>CARBURANT</td>
                <td>ESSENCE</td>
              </tr>

              <tr>
                <td>PUISSANCE DIN</td>
                <td>210 ch</td>
              </tr>

              <tr>
                <td>ASSISES</td>
                <td>05</td>
              </tr>

              <tr>
                <td>PUISSANCE FISCALE</td>
                <td>24 CV</td>
              </tr>

            </tbody>
          </table>

        </div>

        <div className="model-card">

          <h3>EDGE</h3>

          <img src="/cars/edge.png" alt="" />

          <table>
            <tbody>

              <tr>
                <td>MOTORISATION</td>
                <td>4 CYLINDRES 2,3L</td>
              </tr>

              <tr>
                <td>CARBURANT</td>
                <td>ESSENCE</td>
              </tr>

              <tr>
                <td>PUISSANCE DIN</td>
                <td>250 ch</td>
              </tr>

              <tr>
                <td>ASSISES</td>
                <td>05</td>
              </tr>

              <tr>
                <td>PUISSANCE FISCALE</td>
                <td>13 CV</td>
              </tr>

            </tbody>
          </table>

        </div>

      </section>

    </div>
  );
};

export default CatalogueModelVoiture;