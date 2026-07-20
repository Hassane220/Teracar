import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './ContactPage.css';

const INITIAL = { name: '', phone: '', email: '', vehicleId: '', message: '', type: 'RDV' };

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => { api.getVehicles().then(setVehicles).catch(() => {}); }, []);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim())  errs.name  = 'Le nom est obligatoire';
    if (!form.phone.trim()) errs.phone = 'Le téléphone est obligatoire';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSending(true);
    try {
      const selected = vehicles.find(v => String(v.id) === String(form.vehicleId));
      const typeLabel = form.type === 'RDV' ? 'Rendez-vous' : form.type === 'Essai' ? 'Essai routier' : 'Renseignements';
      await api.createLead({
        name: form.name, phone: form.phone, email: form.email,
        vehicle_id: form.vehicleId || null,
        vehicle_name: selected?.title || '',
        type: typeLabel, message: form.message,
      });
      setSubmitted(true);
    } catch {
      setErrors({ submit: 'Erreur lors de l\'envoi. Veuillez réessayer.' });
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <main className="tcm-contact">
        <div className="tcm-contact__success">
          <div className="tcm-contact__success-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--status-available)" strokeWidth="2.2" aria-hidden="true">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1>Message envoyé !</h1>
          <p>
            Merci {form.name}, nous avons bien reçu votre demande et nous vous
            contacterons dans les plus brefs délais au {form.phone}.
          </p>
          <Link to="/" className="tcm-contact__success-btn">Retour à l'accueil</Link>
        </div>
        <ScrollToTop />
      </main>
    );
  }

  return (
    <main className="tcm-contact">
      <div className="tcm-contact__layout">

        {/* Left — info */}
        <div className="tcm-contact__info">
          <nav className="tcm-contact__breadcrumb" aria-label="Fil d'Ariane">
            <Link to="/">Accueil</Link><span>/</span><span>Contact</span>
          </nav>
          <h1 className="tcm-contact__title">Nous contacter</h1>
          <p className="tcm-contact__sub">
            Prenez rendez-vous, demandez un essai ou renseignez-vous sur un
            véhicule. Notre équipe vous répondra rapidement.
          </p>

          <div className="tcm-contact__details">
            <div className="tcm-contact__detail">
              <div className="tcm-contact__detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2">
                  <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.3"/>
                </svg>
              </div>
              <div>
                <div className="tcm-contact__detail-label">Adresse</div>
                <div className="tcm-contact__detail-val">Immeuble Le Walebo, Cocody Bonoumin, Abidjan</div>
              </div>
            </div>
            <div className="tcm-contact__detail">
              <div className="tcm-contact__detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.5 0 1 .5 1 1V20c0 .5-.5 1-1 1-9.4 0-17-7.6-17-17 0-.5.5-1 1-1h3.5c.5 0 1 .5 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"/>
                </svg>
              </div>
              <div>
                <div className="tcm-contact__detail-label">Téléphone</div>
                <a href="tel:0770770770" className="tcm-contact__detail-val">07 70 77 07 70</a>
              </div>
            </div>
            <div className="tcm-contact__detail">
              <div className="tcm-contact__detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff3b42" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
                </svg>
              </div>
              <div>
                <div className="tcm-contact__detail-label">Email</div>
                <a href="mailto:support@teracar-motors.com" className="tcm-contact__detail-val">support@teracar-motors.com</a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="tcm-contact__map">
            <iframe
              title="Teracar Motors"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1986.0!2d-4.0712193!3d5.3658935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ede221c2cacf%3A0xb957b324749398b1!2sImmeuble%20Le%20Walebo!5e0!3m2!1sfr!2sci!4v1749484800000!5m2!1sfr!2sci"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right — form */}
        <div className="tcm-contact__form-wrap">
          <div className="tcm-contact__form-card">
            <h2 className="tcm-contact__form-title">Votre demande</h2>

            {/* Type tabs */}
            <div className="tcm-contact__type-tabs">
              {['RDV', 'Essai', 'Info'].map(t => (
                <button
                  key={t}
                  type="button"
                  className={`tcm-contact__type-tab${form.type === t ? ' tcm-contact__type-tab--active' : ''}`}
                  onClick={() => setForm(prev => ({ ...prev, type: t }))}
                >
                  {t === 'RDV' ? 'Rendez-vous' : t === 'Essai' ? 'Essai routier' : 'Renseignements'}
                </button>
              ))}
            </div>

            <form className="tcm-contact__form" onSubmit={handleSubmit} noValidate>
              <div className="tcm-contact__row">
                <div className="tcm-contact__field">
                  <label htmlFor="contact-name">
                    Nom complet <span className="tcm-contact__required">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Jean-Paul Kouassi"
                    className={errors.name ? 'tcm-contact__input--error' : ''}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name && <span id="err-name" className="tcm-contact__error">{errors.name}</span>}
                </div>
                <div className="tcm-contact__field">
                  <label htmlFor="contact-phone">
                    Téléphone <span className="tcm-contact__required">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="07 00 00 00 00"
                    className={errors.phone ? 'tcm-contact__input--error' : ''}
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                  />
                  {errors.phone && <span id="err-phone" className="tcm-contact__error">{errors.phone}</span>}
                </div>
              </div>

              <div className="tcm-contact__field">
                <label htmlFor="contact-email">Adresse e-mail</label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="votre@email.com"
                />
              </div>

              <div className="tcm-contact__field">
                <label htmlFor="contact-vehicle">Véhicule concerné</label>
                <select
                  id="contact-vehicle"
                  value={form.vehicleId}
                  onChange={set('vehicleId')}
                >
                  <option value="">Choisir un véhicule (optionnel)</option>
                  {vehicles.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="tcm-contact__field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={set('message')}
                  rows={4}
                  placeholder="Décrivez votre demande..."
                />
              </div>

              {errors.submit && <div style={{ color:'#ff3b42', fontSize:13, marginBottom:8 }}>{errors.submit}</div>}
              <button type="submit" className="tcm-contact__submit" disabled={sending}>
                {sending ? 'Envoi…' : 'Envoyer ma demande'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </main>
  );
}
