import React from "react";
import "./footer.css";
import img1 from "../../assets/images/car1.avif";
import img2 from "../../assets/images/car2.avif";
import img3 from "../../assets/images/car3.jpeg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__overlay"></div>

      <div className="footer__container">
        {/* CONTACT */}
        <div className="footer__col">
          <h4 className="footer__title">Contact Information</h4>
          <p className="footer__desc">
            We provide everything you need to build an amazing dealership.
          </p>

          <ul className="footer__list">
            <li>
              <span>📍</span> 1635 Franklin Street Montgomery, AL 36104
            </li>
            <li>
              <span>📞</span> (007) 123 456 7890
            </li>
            <li>
              <span>✉️</span> support@example.com
            </li>
          </ul>
        </div>

        {/* LINKS */}
        <div className="footer__col">
          <h4 className="footer__title">Useful Links</h4>
          <ul className="footer__links">
            <li>Change Oil and Filter</li>
            <li>Brake Pads Replacement</li>
            <li>Timing Belt Replacement</li>
            <li>Pre-purchase Car Inspection</li>
            <li>Starter Replacement</li>
            <li>Air Conditioning</li>
          </ul>
        </div>

        {/* POSTS */}
        <div className="footer__col">
          <h4 className="footer__title">Recent Posts</h4>

          <div className="footer__post">
            <img src={img1} alt="" />
            <div>
              <p>Buy your dream car</p>
              <span>May 17, 2021</span>
            </div>
          </div>

          <div className="footer__post">
            <img src={img2} alt="" />
            <div>
              <p>Does Your Life Lack Meaning</p>
              <span>May 17, 2021</span>
            </div>
          </div>

          <div className="footer__post">
            <img src={img3} alt="" />
            <div>
              <p>The A Z Of Motivation</p>
              <span>May 17, 2021</span>
            </div>
          </div>
        </div>

        {/* MAP (REMPLACE DOWNLOAD APP) */}
        <div className="footer__col">
          <h4 className="footer__title">Localisation</h4>
          {/* <p className="footer__desc">
            Retrouvez-nous facilement grâce à notre emplacement.
          </p> */}

          <div className="footer__map">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=1635+Franklin+Street+Montgomery+AL+36104&output=embed"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer__bottom">
        <p>© Copyright 2025 Car Dealer</p>
        <div className="footer__bottom-links">
          <span>Privacy Policy</span>
          <span>Terms and Conditions</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
