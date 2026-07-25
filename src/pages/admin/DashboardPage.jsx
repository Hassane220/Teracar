import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import '../../components/admin/AdminLayout.css';
import './DashboardPage.css';

const statusColor = {
  'Nouveau':  'tcm-admin__badge--nouveau',
  'En cours': 'tcm-admin__badge--reserve',
  'Traité':   'tcm-admin__badge--traite',
};

const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function DashboardPage() {
  const [vehicles, setVehicles] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.getVehicles({ admin: true }).then(setVehicles).catch(() => {});
    api.getLeads().then(setLeads).catch(() => {});
  }, []);

  const nouveaux  = leads.filter(l => l.status === 'Nouveau').length;
  const recentCars = vehicles.slice(0, 4);
  const recentLeads = leads.slice(0, 4);

  return (
    <div className="tcm-dashboard">
      <div className="tcm-admin__page-header">
        <h1 className="tcm-admin__page-title">Tableau de bord</h1>
        <span className="tcm-dashboard__date" style={{ textTransform: 'capitalize' }}>{today}</span>
      </div>

      {/* KPIs */}
      <div className="tcm-admin__kpi-grid">
        <div className="tcm-admin__kpi">
          <div className="tcm-admin__kpi-label">Stock total</div>
          <div className="tcm-admin__kpi-value">{vehicles.length}</div>
          <div className="tcm-admin__kpi-sub">véhicules en catalogue</div>
        </div>
        <div className="tcm-admin__kpi">
          <div className="tcm-admin__kpi-label">Leads actifs</div>
          <div className="tcm-admin__kpi-value" style={{ color: '#ff3b42' }}>{leads.length}</div>
          <div className="tcm-admin__kpi-sub">dont {nouveaux} nouveau{nouveaux > 1 ? 'x' : ''}</div>
        </div>
        <div className="tcm-admin__kpi">
          <div className="tcm-admin__kpi-label">RDV ce mois</div>
          <div className="tcm-admin__kpi-value" style={{ color: '#5ee6a8' }}>
            {leads.filter(l => l.type === 'Rendez-vous').length}
          </div>
          <div className="tcm-admin__kpi-sub">rendez-vous confirmés</div>
        </div>
        <div className="tcm-admin__kpi">
          <div className="tcm-admin__kpi-label">Disponibles</div>
          <div className="tcm-admin__kpi-value">{vehicles.filter(v => v.status === 'Disponible').length}</div>
          <div className="tcm-admin__kpi-sub">véhicules disponibles</div>
        </div>
      </div>

      <div className="tcm-dashboard__grid">
        {/* Leads récents */}
        <div>
          <div className="tcm-admin__section-title">Leads récents</div>
          <div className="tcm-admin__table-wrap">
            <div className="tcm-admin__table-head tcm-dashboard__leads-cols">
              <span>Client</span><span>Véhicule</span><span>Date</span><span>Statut</span>
            </div>
            {recentLeads.map(lead => (
              <div key={lead.id} className="tcm-admin__table-row tcm-dashboard__leads-cols">
                <div>
                  <div style={{ fontWeight: 600 }}>{lead.name}</div>
                  <div style={{ fontSize: 11, color: '#8a8a90', marginTop: 2 }}>{lead.phone}</div>
                </div>
                <span style={{ color: '#c7c7cd' }}>{lead.vehicle_name || '—'}</span>
                <span style={{ color: '#8a8a90', fontSize: 12 }}>
                  {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                </span>
                <span className={`tcm-admin__badge ${statusColor[lead.status]}`}>{lead.status}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <Link to="/admin/leads" className="tcm-dashboard__see-all">Voir tous les leads →</Link>
          </div>
        </div>

        {/* Véhicules récents */}
        <div>
          <div className="tcm-admin__section-title">Véhicules récemment ajoutés</div>
          <div className="tcm-admin__card" style={{ padding: 0, overflow: 'hidden' }}>
            {recentCars.map((car, i) => (
              <div key={car.id} className="tcm-dashboard__car-row"
                style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
                <div className="tcm-dashboard__car-img">
                  <img src={car.image} alt={car.title} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{car.title}</div>
                  <div style={{ fontSize: 11, color: '#8a8a90', marginTop: 2 }}>{car.brand} · {car.year}</div>
                </div>
                <span className={`tcm-admin__badge tcm-admin__badge--${car.status === 'Disponible' ? 'disponible' : car.status === 'Réservé' ? 'reserve' : 'vendu'}`}>
                  {car.status}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <Link to="/admin/vehicles" className="tcm-dashboard__see-all">Gérer les véhicules →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
