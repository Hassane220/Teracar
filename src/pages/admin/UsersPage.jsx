import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import '../../components/admin/AdminLayout.css';
import './UsersPage.css';

const ROLES = ['Gérant', 'Vendeur', 'Support'];
const ROLE_BADGE = { 'Gérant': 'tcm-admin__badge--gerant', 'Vendeur': 'tcm-admin__badge--vendeur', 'Support': 'tcm-admin__badge--support' };

const PERMISSIONS = [
  { action: 'Voir le tableau de bord',   gerant: true,  vendeur: true,  support: false },
  { action: 'Gérer les véhicules',       gerant: true,  vendeur: true,  support: false },
  { action: 'Gérer les leads',           gerant: true,  vendeur: true,  support: true  },
  { action: 'Gérer les marques',         gerant: true,  vendeur: false, support: false },
  { action: 'Modifier les paramètres',   gerant: true,  vendeur: false, support: false },
  { action: 'Gérer les utilisateurs',    gerant: true,  vendeur: false, support: false },
];

const initials = (name) => name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Vendeur' });
  const [tab, setTab] = useState('users');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.getUsers().then(data => { setUsers(data); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const invite = async (e) => {
    e.preventDefault();
    await api.createUser(newUser);
    setNewUser({ name: '', email: '', role: 'Vendeur' });
    setShowModal(false);
    load();
  };

  const removeUser = async (id) => {
    if (!window.confirm('Retirer cet utilisateur ?')) return;
    await api.deleteUser(id);
    load();
  };

  if (loading) return <div style={{ padding: 40, color: '#8a8a90' }}>Chargement…</div>;

  return (
    <div className="tcm-users">
      <div className="tcm-admin__page-header">
        <h1 className="tcm-admin__page-title">Utilisateurs & rôles</h1>
        <button className="tcm-admin__btn" onClick={() => setShowModal(true)}>+ Inviter un utilisateur</button>
      </div>

      <div className="tcm-users__tabs">
        <button className={`tcm-users__tab${tab === 'users' ? ' tcm-users__tab--active' : ''}`} onClick={() => setTab('users')}>Utilisateurs</button>
        <button className={`tcm-users__tab${tab === 'perms' ? ' tcm-users__tab--active' : ''}`} onClick={() => setTab('perms')}>Permissions par rôle</button>
      </div>

      {tab === 'users' && (
        <div className="tcm-admin__table-wrap">
          <div className="tcm-admin__table-head tcm-users__cols">
            <span>Nom</span><span>Email</span><span>Rôle</span><span>Statut</span><span>Actions</span>
          </div>
          {users.map(user => (
            <div key={user.id} className="tcm-admin__table-row tcm-users__cols">
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div className="tcm-users__avatar">{initials(user.name)}</div>
                <span style={{ fontWeight:600 }}>{user.name}</span>
              </div>
              <span style={{ color:'#a2a2a8' }}>{user.email}</span>
              <span className={`tcm-admin__badge ${ROLE_BADGE[user.role]}`}>{user.role}</span>
              <span style={{ fontSize:12, color: user.status === 'Actif' ? '#5ee6a8' : '#8a8a90' }}>
                {user.status === 'Actif' ? '● ' : ''}{user.status}
              </span>
              <div style={{ display:'flex', gap:12 }}>
                <button style={{ background:'none', border:'none', color:'#c7c7cd', font:'12.5px Manrope', cursor:'pointer' }}>Modifier</button>
                {user.can_delete === 1 && (
                  <button style={{ background:'none', border:'none', color:'#ff3b42', font:'12.5px Manrope', cursor:'pointer' }} onClick={() => removeUser(user.id)}>Retirer</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'perms' && (
        <div className="tcm-admin__table-wrap">
          <div className="tcm-admin__table-head tcm-users__perms-cols">
            <span>Action</span><span>Gérant</span><span>Vendeur</span><span>Support</span>
          </div>
          {PERMISSIONS.map((p, i) => (
            <div key={i} className="tcm-admin__table-row tcm-users__perms-cols">
              <span style={{ color:'#c7c7cd' }}>{p.action}</span>
              <span>{p.gerant ? '✅' : '—'}</span>
              <span>{p.vendeur ? '✅' : '—'}</span>
              <span>{p.support ? '✅' : '—'}</span>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="tcm-users__modal-overlay" onClick={() => setShowModal(false)}>
          <div className="tcm-users__modal" onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <h3 style={{ font:'700 18px/1 Space Grotesk, sans-serif', margin:0 }}>Inviter un utilisateur</h3>
              <button onClick={() => setShowModal(false)} style={{ background:'none', border:'none', color:'#8a8a90', fontSize:20, cursor:'pointer' }}>✕</button>
            </div>
            <form onSubmit={invite} style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div className="tcm-users__modal-field">
                <label>Nom complet</label>
                <input value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} required />
              </div>
              <div className="tcm-users__modal-field">
                <label>Email</label>
                <input type="email" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} required />
              </div>
              <div className="tcm-users__modal-field">
                <label>Rôle</label>
                <select value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))}>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <button type="submit" className="tcm-admin__btn" style={{ marginTop:4 }}>Envoyer l'invitation</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
