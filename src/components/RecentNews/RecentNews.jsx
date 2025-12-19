import React from "react";
import "./RecentNews.css";

import mainImg from "../../assets/images/car4.jpg";
import img1 from "../../assets/images/car1.avif";
import img2 from "../../assets/images/car2.avif";
import img3 from "../../assets/images/car3.jpeg";

const RecentNews = () => {
  return (
    <section className="news">
      <div className="news__header">
        <h2>Nos actualités & articles récents</h2>
        <p>
          Découvrez les dernières tendances automobiles, conseils d’experts
          et opportunités à ne pas manquer.
        </p>
      </div>

      <div className="news__grid">
        {/* LEFT BIG CARD */}
        <article className="news__main">
          <div className="image-wrapper">
            <img src={mainImg} alt="Actualité automobile" />
          </div>

          <span className="date">17 Mai 2021</span>
          <h3>Achetez la voiture de vos rêves</h3>

          <a href="#" className="read-more">
            Lire plus <span>→</span>
          </a>
        </article>

        {/* RIGHT LIST */}
        <div className="news__list">
          {[{
            img: img1,
            title: "Votre quotidien manque-t-il de sens ?"
          }, {
            img: img2,
            title: "De A à Z : la motivation automobile"
          }, {
            img: img3,
            title: "La motivation dans la vie"
          }].map((item, index) => (
            <article className="news__item" key={index}>
              <div className="thumb">
                <img src={item.img} alt="" />
              </div>

              <div className="content">
                <span className="date">17 Mai 2021</span>
                <h4>{item.title}</h4>

                <a href="#" className="read-more small">
                  Lire plus <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
