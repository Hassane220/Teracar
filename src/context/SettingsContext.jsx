import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [showPrices, setShowPricesState] = useState(false);
  const [settings, setSettings] = useState({
    dealerName: 'Teracar Motors',
    phone: '07 70 77 07 70',
    email: 'support@teracar-motors.com',
    address: 'Immeuble Le Walebo, Cocody Bonoumin, Abidjan',
    whatsapp: '2250770770770',
  });

  useEffect(() => {
    api.getSettings().then(data => {
      setShowPricesState(data.showPrices === 'true');
      setSettings(prev => ({ ...prev, ...data }));
    }).catch(() => {});
  }, []);

  const updateSettings = async (updates) => {
    const saved = await api.updateSettings(updates);
    setShowPricesState(saved.showPrices === 'true');
    setSettings(prev => ({ ...prev, ...saved }));
    return saved;
  };

  return (
    <SettingsContext.Provider value={{ showPrices, settings, updateSettings, setShowPricesState }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

export default SettingsContext;
