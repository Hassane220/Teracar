import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import '../../components/admin/AdminLayout.css';
import './SettingsAdminPage.css';

export default function SettingsAdminPage() {
  const { showPrices, settings, updateSettings } = useSettings();
  const [info, setInfo] = useState({ dealerName: '', phone: '', email: '', address: '' });
  const [whatsapp, setWhatsapp] = useState({ whatsapp: '' });
  const [saving, setSaving] = useState('');
  const [saved, setSaved] = useState('');

  useEffect(() => {
    setInfo({ dealerName: settings.dealerName || '', phone: settings.phone || '', email: settings.email || '', address: settings.address || '' });
    setWhatsapp({ whatsapp: settings.whatsapp || '' });
  }, [settings]);

  const save = async (data, key) => {
    setSaving(key);
    try {
      await updateSettings(data);
      setSaved(key);
      setTimeout(() => setSaved(''), 2000);
    } catch {}
    setSaving('');
  };

  return (
    <div className="tcm-settings-admin">
      <div className="tcm-admin__page-header">
        <h1 className="tcm-admin__page-title">Paramètres du site</h1>
      </div>

      <div className="tcm-settings-admin__grid">
        {/* Toggle prix */}
        <div className="tcm-admin__card">
          <div className="tcm-settings-admin__setting">
            <div>
              <div className="tcm-settings-admin__setting-title">Afficher les prix publiquement</div>
              <div className="tcm-settings-admin__setting-desc">
                Quand activé, les prix réels remplacent "Prix sur demande" sur tout le site public.
                {showPrices && <span className="tcm-settings-admin__warning"> ⚠️ Les prix sont actuellement visibles par tous les visiteurs.</span>}
              </div>
            </div>
            <button
              className={`tcm-settings-admin__toggle${showPrices ? ' tcm-settings-admin__toggle--on' : ''}`}
              onClick={() => save({ showPrices: String(!showPrices) }, 'prices')}
              aria-pressed={showPrices}
            >
              <span className="tcm-settings-admin__toggle-knob" />
            </button>
          </div>
        </div>

        {/* Infos concessionnaire */}
        <div className="tcm-admin__card">
          <div className="tcm-admin__section-title">Informations du concessionnaire</div>
          <div className="tcm-settings-admin__info-fields">
            {[['dealerName','Nom du concessionnaire'],['phone','Téléphone'],['email','Email'],['address','Adresse']].map(([k, label]) => (
              <div key={k} className="tcm-settings-admin__field">
                <label>{label}</label>
                <input value={info[k]} onChange={e => setInfo(p => ({ ...p, [k]: e.target.value }))} />
              </div>
            ))}
          </div>
          <button className="tcm-admin__btn" style={{ marginTop: 16 }} disabled={saving === 'info'} onClick={() => save(info, 'info')}>
            {saving === 'info' ? 'Enregistrement…' : saved === 'info' ? '✓ Enregistré' : 'Enregistrer'}
          </button>
        </div>

        {/* WhatsApp */}
        <div className="tcm-admin__card">
          <div className="tcm-admin__section-title">WhatsApp Business</div>
          <div className="tcm-settings-admin__field">
            <label>Numéro WhatsApp (format international)</label>
            <input value={whatsapp.whatsapp} onChange={e => setWhatsapp({ whatsapp: e.target.value })} placeholder="2250770000000" />
          </div>
          <button className="tcm-admin__btn" style={{ marginTop: 16 }} disabled={saving === 'wa'} onClick={() => save(whatsapp, 'wa')}>
            {saving === 'wa' ? 'Enregistrement…' : saved === 'wa' ? '✓ Enregistré' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
}
