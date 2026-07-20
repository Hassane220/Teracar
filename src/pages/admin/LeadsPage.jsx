import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import '../../components/admin/AdminLayout.css';
import './LeadsPage.css';

const TABS = ['Tous', 'Nouveau', 'En cours', 'Traité'];
const statusBadge = { 'Nouveau': 'tcm-admin__badge--nouveau', 'En cours': 'tcm-admin__badge--reserve', 'Traité': 'tcm-admin__badge--traite' };

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [tab, setTab] = useState('Tous');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.getLeads().then(data => { setLeads(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = tab === 'Tous' ? leads : leads.filter(l => l.status === tab);

  const markStatus = async (id, status) => {
    await api.updateLead(id, { status });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Supprimer ce lead ?')) return;
    await api.deleteLead(id);
    setLeads(prev => prev.filter(l => l.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  if (loading) return <div style={{ padding: 40, color: '#8a8a90' }}>Chargement…</div>;

  return (
    <div className="tcm-leads">
      <div className="tcm-admin__page-header">
        <h1 className="tcm-admin__page-title">Leads & RDV <span style={{ color: '#8a8a90', fontSize: 20 }}>({leads.length})</span></h1>
      </div>

      <div className="tcm-leads__tabs">
        {TABS.map(t => (
          <button key={t} className={`tcm-leads__tab${tab === t ? ' tcm-leads__tab--active' : ''}`} onClick={() => setTab(t)}>
            {t} <span className="tcm-leads__tab-count">{t === 'Tous' ? leads.length : leads.filter(l => l.status === t).length}</span>
          </button>
        ))}
      </div>

      <div className="tcm-admin__table-wrap">
        <div className="tcm-admin__table-head tcm-leads__cols">
          <span>Client</span><span>Véhicule</span><span>Date</span><span>Statut</span><span>Actions</span>
        </div>
        {filtered.length === 0 && <div style={{ padding: '24px 16px', color: '#8a8a90' }}>Aucun lead.</div>}
        {filtered.map(lead => (
          <div key={lead.id} className="tcm-admin__table-row tcm-leads__cols">
            <div>
              <div style={{ fontWeight: 600 }}>{lead.name}</div>
              <div style={{ fontSize: 11, color: '#8a8a90', marginTop: 2 }}>{lead.phone}</div>
            </div>
            <span style={{ color: '#c7c7cd' }}>{lead.vehicle_name || '—'}</span>
            <span style={{ fontSize: 12, color: '#8a8a90' }}>{new Date(lead.created_at).toLocaleDateString('fr-FR')}</span>
            <span className={`tcm-admin__badge ${statusBadge[lead.status]}`}>{lead.status}</span>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ background:'none', border:'none', color:'#c7c7cd', font:'12.5px Manrope', cursor:'pointer' }} onClick={() => setSelected(lead)}>Voir</button>
              {lead.status !== 'Traité' && (
                <button style={{ background:'none', border:'none', color:'#5ee6a8', font:'12.5px Manrope', cursor:'pointer' }} onClick={() => markStatus(lead.id, 'Traité')}>Traité</button>
              )}
              <button style={{ background:'none', border:'none', color:'#ff3b42', font:'12.5px Manrope', cursor:'pointer' }} onClick={() => deleteLead(lead.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="tcm-leads__detail-overlay" onClick={() => setSelected(null)}>
          <div className="tcm-leads__detail" onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <h3 style={{ font:'700 18px Space Grotesk, sans-serif', margin:0 }}>{selected.name}</h3>
              <button onClick={() => setSelected(null)} style={{ background:'none', border:'none', color:'#8a8a90', fontSize:20, cursor:'pointer' }}>✕</button>
            </div>
            <div className="tcm-leads__detail-grid">
              {[['Téléphone', selected.phone], ['Email', selected.email||'—'], ['Véhicule', selected.vehicle_name||'—'], ['Type', selected.type], ['Statut', selected.status], ['Date', new Date(selected.created_at).toLocaleDateString('fr-FR')]].map(([k,v]) => (
                <div key={k}><div style={{ fontSize:11, color:'#8a8a90', marginBottom:3 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
              ))}
            </div>
            {selected.message && (
              <div style={{ marginTop:16, padding:'12px 14px', background:'rgba(255,255,255,.04)', borderRadius:8, fontSize:13, color:'#c7c7cd', lineHeight:1.6 }}>
                {selected.message}
              </div>
            )}
            <div style={{ display:'flex', gap:10, marginTop:20 }}>
              <a href={`https://wa.me/${selected.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                className="tcm-admin__btn" style={{ background:'#25D366', textDecoration:'none', textAlign:'center', flex:1 }}>
                WhatsApp
              </a>
              {selected.status !== 'Traité' && (
                <button className="tcm-admin__btn" style={{ flex:1 }} onClick={() => markStatus(selected.id, 'Traité')}>Marquer traité</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
