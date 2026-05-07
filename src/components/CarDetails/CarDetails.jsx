import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


  // Convertit une image en dataURL (pour éviter les problèmes CORS)
  function toDataUrl(url) {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg'));
      };
      img.onerror = reject;
      img.src = url;
    });
  }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarDetails.css';

const CarDetails = ({ car, onClose }) => {
    // Génération du PDF avec image principale et infos
    const handleDownloadPDF = async () => {
  try {
    const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Image principale
    const imageElement = document.querySelector('.main-image img');
    let imageHeight = 70;
    let imageWidth = 120;
    let imageY = 40;
    let imageX = (pageWidth - imageWidth) / 2;

    // Titre
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    const title = `${car.brand || ''} ${car.model || ''} ${car.year || ''}`.trim();
    pdf.text(title, pageWidth / 2, 30, { align: 'center' });

    // Image véhicule
    if (imageElement) {
      const imgData = await toDataUrl(imageElement.src);
      pdf.addImage(imgData, 'JPEG', imageX, imageY, imageWidth, imageHeight);
    }

    // 🔥 CLONE VERSION DESKTOP (solution au problème)
    const originalElement = document.querySelector('.car-details-info');
    let tableY = imageY + imageHeight + 30;

    if (originalElement) {
      const clonedElement = originalElement.cloneNode(true);

      // Force rendu desktop
      clonedElement.style.width = '1200px';
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '0';
      clonedElement.style.background = '#ffffff';
      clonedElement.style.padding = '20px';

      document.body.appendChild(clonedElement);

      const canvas = await html2canvas(clonedElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        windowWidth: 1200
      });

      document.body.removeChild(clonedElement);

      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 10, tableY, pageWidth - 20, 0);

      // Filigrane
      const watermarkY = imageY + imageHeight + ((tableY - (imageY + imageHeight)) / 2);
      pdf.saveGraphicsState();
      pdf.setTextColor(245, 245, 245);
      pdf.setFontSize(60);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Teracar motors', pageWidth / 2, watermarkY, {
        align: 'center'
      });
      pdf.restoreGraphicsState();
    }

    pdf.save(`Fiche_${car.brand || ''}_${car.model || ''}.pdf`);

  } catch (err) {
    alert('Erreur lors de la génération du PDF : ' + err);
    console.error('Erreur PDF', err);
  }
};
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Message envoyé:', contactData);
    alert('Message envoyé avec succès !');
    setShowContactForm(false);
    setContactData({ name: '', email: '', phone: '', message: '' });
  };

  const handleTestDrive = () => {
    alert('Demande d\'essai enregistrée !');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${car.brand} ${car.model}`,
        text: `Découvrez cette ${car.brand} ${car.model} ${car.year} à ${car.price}€`,
        url: window.location.href,
      });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié !');
    }
  };

  if (!car) {
    return (
      <div className="car-details-loading">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="car-details">
      {/* Bouton fermer pour modal */}
      {onClose && (
        <button className="car-details-close" onClick={onClose} aria-label="Retour">
          <span className="car-details-back-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L8 12L15 19" stroke="#D90429" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="car-details-back-text">Retour</span>
        </button>
      )}

      {/* Bouton PDF */}
      <div style={{ marginBottom: 16, textAlign: 'right', marginTop: 40 }}>
        <button className="btn btn-primary" onClick={handleDownloadPDF}>
          Télécharger la fiche PDF
        </button>
      </div>
      {/* Galerie d'images */}
      <div className="car-details-gallery">
        <div className="main-image">
          <img 
            src={car.images[selectedImage]} 
            alt={`${car.brand} ${car.model}`}
          />
          {/* <button 
            className="favorite-button"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button> */}
        </div>
        
        <div className="image-thumbnails">
          {car.images.map((img, index) => (
            <button
              key={index}
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={img} alt={`Vue ${index + 1}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Informations principales */}
      <div className="car-details-info">
        <h1>Détails du véhicule</h1>
        <table className="car-details-table">
          <tbody>
            {car.brand && (
              <tr><th>Marque</th><td>{car.brand}</td></tr>
            )}
            {car.model && (
              <tr><th>Modèle</th><td>{car.model}</td></tr>
            )}
            {car.year != null && car.year !== '' && (
              <tr><th>Année</th><td>{car.year}</td></tr>
            )}
            {(car.engine || car.motorisation) && (
              <tr><th>Motorisation</th><td>{car.engine || car.motorisation}</td></tr>
            )}
            {car.transmission && (
              <tr><th>Transmission</th><td>{car.transmission}</td></tr>
            )}
            {car.mileage != null && (
              <tr><th>Kilométrage</th><td>{car.mileage.toLocaleString()} km</td></tr>
            )}
            {car.color && (
              <tr><th>Couleur</th><td>{car.color}</td></tr>
            )}
            {car.fuel && (
              <tr><th>Carburant</th><td>{car.fuel}</td></tr>
            )}
            {car.power != null && (
              <tr><th>Puissance</th><td>{car.power}</td></tr>
            )}
            {car.doors != null && (
              <tr><th>Portes</th><td>{car.doors}</td></tr>
            )}
            {car.seats != null && (
              <tr><th>Places</th><td>{car.seats}</td></tr>
            )}
            {(car.features && car.features.length > 0) && (
              <tr><th>Options/Équipements principaux</th><td><ul>{car.features.map((feature, idx) => (<li key={idx}>{feature}</li>))}</ul></td></tr>
            )}
            {(car.options && car.options.length > 0) && (
              <tr><th>Options/Équipements principaux</th><td><ul>{car.options.map((opt, idx) => (<li key={idx}>{opt}</li>))}</ul></td></tr>
            )}
            {car.description && (
              <tr><th>Description</th><td>{car.description}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarDetails;