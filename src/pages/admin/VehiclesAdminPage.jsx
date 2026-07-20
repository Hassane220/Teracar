import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import '../../components/admin/AdminLayout.css';
import './VehiclesAdminPage.css';

const STATUS_BADGE = {
  'Disponible': 'tcm-admin__badge--disponible',
  'Réservé':    'tcm-admin__badge--reserve',
  'Vendu':      'tcm-admin__badge--vendu',
};

export default function VehiclesAdminPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [bulkAction, setBulkAction] = useState('');

  const load = () => {
    setLoading(true);
    api.getVehicles().then(data => { setCars(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const brands = [...new Set(cars.map(c => c.brand))].sort();

  const filtered = cars.filter(c => {
    const q = search.toLowerCase();
    if (search && !`${c.brand} ${c.model} ${c.title}`.toLowerCase().includes(q)) return false;
    if (filterBrand && c.brand !== filterBrand) return false;
    if (filterStatus && c.status !== filterStatus) return false;
    return true;
  });

  const toggleSelect = (id) => setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleAll = () => selected.size === filtered.length ? setSelected(new Set()) : setSelected(new Set(filtered.map(c => c.id)));

  const applyBulk = async () => {
    if (!bulkAction || selected.size === 0) return;
    if (bulkAction === 'delete') {
      if (!window.confirm(`Supprimer ${selected.size} véhicule(s) ?`)) return;
      await Promise.all([...selected].map(id => api.deleteVehicle(id)));
    } else {
      const fd = new FormData(); fd.append('status', bulkAction);
      await Promise.all([...selected].map(id => {
        const car = cars.find(c => c.id === id);
        if (!car) return;
        const formData = new FormData();
        Object.entries(car).forEach(([k, v]) => {
          if (k !== 'images' && k !== 'features') formData.append(k, v ?? '');
        });
        formData.set('status', bulkAction);
        formData.set('features', JSON.stringify(car.features || []));
        return api.updateVehicle(id, formData);
      }));
    }
    setSelected(new Set());
    setBulkAction('');
    load();
  };

  const deleteOne = async (car) => {
    if (!window.confirm(`Supprimer ${car.title} ?`)) return;
    await api.deleteVehicle(car.id);
    load();
  };

  if (loading) return <div style={{ padding: 40, color: '#8a8a90' }}>Chargement…</div>;

  return (
    <div className="tcm-vehicles-admin">
      <div className="tcm-admin__page-header">
        <h1 className="tcm-admin__page-title">Véhicules <span style={{ color: '#8a8a90', fontSize: 20 }}>({cars.length})</span></h1>
        <Link to="/admin/vehicles/add" className="tcm-admin__btn">+ Ajouter un véhicule</Link>
      </div>

      <div className="tcm-vehicles-admin__filters">
        <input className="tcm-vehicles-admin__search" placeholder="Rechercher un véhicule…" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="tcm-vehicles-admin__select" value={filterBrand} onChange={e => setFilterBrand(e.target.value)}>
          <option value="">Toutes les marques</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select className="tcm-vehicles-admin__select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Tous les statuts</option>
          <option value="Disponible">Disponible</option>
          <option value="Réservé">Réservé</option>
          <option value="Vendu">Vendu</option>
        </select>
      </div>

      {selected.size > 0 && (
        <div className="tcm-vehicles-admin__bulk">
          <span>{selected.size} sélectionné(s)</span>
          <select value={bulkAction} onChange={e => setBulkAction(e.target.value)} className="tcm-vehicles-admin__select">
            <option value="">Action groupée…</option>
            <option value="Disponible">Marquer Disponible</option>
            <option value="Réservé">Marquer Réservé</option>
            <option value="Vendu">Marquer Vendu</option>
            <option value="delete">Supprimer</option>
          </select>
          <button className="tcm-admin__btn" onClick={applyBulk}>Appliquer</button>
          <button className="tcm-admin__btn tcm-admin__btn--outline" onClick={() => setSelected(new Set())}>Annuler</button>
        </div>
      )}

      <div className="tcm-admin__table-wrap">
        <div className="tcm-admin__table-head tcm-vehicles-admin__cols">
          <label className="tcm-vehicles-admin__check-wrap">
            <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="tcm-vehicles-admin__checkbox" />
          </label>
          <span>Véhicule</span><span>Marque</span><span>Année</span><span>Statut</span><span>Prix interne</span><span>Actions</span>
        </div>

        {filtered.length === 0 && <div className="tcm-vehicles-admin__empty">Aucun véhicule trouvé.</div>}

        {filtered.map(car => (
          <div key={car.id} className="tcm-admin__table-row tcm-vehicles-admin__cols">
            <label className="tcm-vehicles-admin__check-wrap">
              <input type="checkbox" checked={selected.has(car.id)} onChange={() => toggleSelect(car.id)} className="tcm-vehicles-admin__checkbox" />
            </label>
            <div className="tcm-vehicles-admin__car-info">
              <div className="tcm-vehicles-admin__car-thumb"><img src={car.image} alt={car.title} /></div>
              <span style={{ fontWeight: 600 }}>{car.title}</span>
            </div>
            <span style={{ color: '#c7c7cd' }}>{car.brand}</span>
            <span style={{ color: '#c7c7cd' }}>{car.year}</span>
            <span className={`tcm-admin__badge ${STATUS_BADGE[car.status]}`}>{car.status}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: '#5ee6a8' }}>
              {new Intl.NumberFormat('fr-FR').format(car.price)} FCFA
            </span>
            <div className="tcm-vehicles-admin__actions">
              <Link to={`/admin/vehicles/edit/${car.id}`} className="tcm-vehicles-admin__action-btn">Modifier</Link>
              <button className="tcm-vehicles-admin__action-btn tcm-vehicles-admin__action-btn--delete" onClick={() => deleteOne(car)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
      <div className="tcm-vehicles-admin__count">{filtered.length} véhicule(s) affiché(s) sur {cars.length}</div>
    </div>
  );
}
