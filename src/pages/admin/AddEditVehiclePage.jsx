import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/client';
import '../../components/admin/AdminLayout.css';
import './AddEditVehiclePage.css';

const STATUSES     = ['Disponible', 'Réservé', 'Vendu'];
const CATEGORIES   = ['suv', 'berline', 'pickup', 'citadine', 'utilitaire', 'minibus', 'compacte'];
const FUELS        = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
const TRANSMISSIONS = ['Automatique', 'Manuelle'];
const CONDITIONS   = ['Neuf', 'Occasion'];

const EMPTY = {
  brand: '', model: '', year: new Date().getFullYear(), price: '',
  mileage: 0, fuel: 'Essence', transmission: 'Automatique',
  color: '', category: 'suv', status: 'Disponible', condition: 'Neuf', description: '',
};

export default function AddEditVehiclePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.getVehicle(id).then(v => {
        setForm({
          brand: v.brand, model: v.model, year: v.year, price: v.price,
          mileage: v.mileage, fuel: v.fuel, transmission: v.transmission,
          color: v.color || '', category: v.category, status: v.status,
          condition: v.condition || 'Neuf', description: v.description || '',
        });
        if (v.image) setPreview(v.image);
      }).catch(() => setError('Véhicule introuvable'));
    }
  }, [id]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
      fd.set('title', `${form.brand} ${form.model}`);
      fd.set('features', JSON.stringify([]));
      if (imageFile) fd.append('image', imageFile);

      if (isEdit) {
        await api.updateVehicle(id, fd);
      } else {
        await api.createVehicle(fd);
      }
      navigate('/admin/vehicles');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="tcm-add-vehicle">
      <div className="tcm-admin__page-header">
        <h1 className="tcm-admin__page-title">{isEdit ? 'Modifier le véhicule' : 'Ajouter un véhicule'}</h1>
        <button type="button" className="tcm-admin__btn tcm-admin__btn--outline" onClick={() => navigate(-1)}>← Retour</button>
      </div>

      {error && <div style={{ color: '#ff3b42', marginBottom: 16, padding: '10px 16px', background: 'rgba(255,59,66,.1)', borderRadius: 8 }}>{error}</div>}

      <form className="tcm-add-vehicle__grid" onSubmit={handleSubmit}>
        {/* Infos générales */}
        <div className="tcm-admin__card tcm-add-vehicle__section">
          <div className="tcm-admin__section-title">Informations générales</div>
          <div className="tcm-add-vehicle__fields">
            {[['brand','Marque','Toyota'],['model','Modèle','Land Cruiser 300'],['color','Couleur','Blanc']].map(([k, label, ph]) => (
              <div key={k} className="tcm-add-vehicle__field">
                <label>{label}</label>
                <input value={form[k]} onChange={e => set(k, e.target.value)} placeholder={ph} required={k !== 'color'} />
              </div>
            ))}
            <div className="tcm-add-vehicle__field">
              <label>Année</label>
              <input type="number" value={form.year} onChange={e => set('year', e.target.value)} min="1990" max="2030" required />
            </div>
            <div className="tcm-add-vehicle__field">
              <label>Kilométrage</label>
              <input type="number" value={form.mileage} onChange={e => set('mileage', e.target.value)} min="0" />
            </div>
            <div className="tcm-add-vehicle__field">
              <label>Catégorie</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
              </select>
            </div>
            <div className="tcm-add-vehicle__field">
              <label>Carburant</label>
              <select value={form.fuel} onChange={e => set('fuel', e.target.value)}>
                {FUELS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="tcm-add-vehicle__field">
              <label>Transmission</label>
              <select value={form.transmission} onChange={e => set('transmission', e.target.value)}>
                {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="tcm-add-vehicle__field">
              <label>État</label>
              <select value={form.condition} onChange={e => set('condition', e.target.value)}>
                {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Prix & Statut */}
        <div className="tcm-admin__card tcm-add-vehicle__section">
          <div className="tcm-admin__section-title">Prix & Statut</div>
          <div className="tcm-add-vehicle__fields">
            <div className="tcm-add-vehicle__field tcm-add-vehicle__field--full">
              <label>Prix interne (FCFA) — <span style={{ color: '#ff3b42' }}>jamais affiché publiquement</span></label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="25000000" min="0" required />
            </div>
            <div className="tcm-add-vehicle__field tcm-add-vehicle__field--full">
              <label>Statut</label>
              <div className="tcm-add-vehicle__status-group">
                {STATUSES.map(s => (
                  <button key={s} type="button"
                    className={`tcm-add-vehicle__status-btn${form.status === s ? ' tcm-add-vehicle__status-btn--active' : ''}`}
                    onClick={() => set('status', s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="tcm-admin__section-title" style={{ marginTop: 20 }}>Photo du véhicule</div>
          <div className="tcm-add-vehicle__field tcm-add-vehicle__field--full">
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ color: '#c7c7cd' }} />
            {preview && <img src={preview} alt="preview" style={{ marginTop: 10, maxHeight: 140, borderRadius: 8, objectFit: 'contain', background: '#fff' }} />}
          </div>
        </div>

        {/* Description */}
        <div className="tcm-admin__card tcm-add-vehicle__section tcm-add-vehicle__section--full">
          <div className="tcm-admin__section-title">Description</div>
          <textarea className="tcm-add-vehicle__textarea" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Décrivez le véhicule…" rows={4} />
        </div>

        <div className="tcm-add-vehicle__actions">
          <button type="submit" className="tcm-admin__btn" disabled={loading}>
            {loading ? 'Enregistrement…' : isEdit ? 'Enregistrer les modifications' : 'Ajouter le véhicule'}
          </button>
          <button type="button" className="tcm-admin__btn tcm-admin__btn--outline" onClick={() => navigate(-1)}>Annuler</button>
        </div>
      </form>
    </div>
  );
}
