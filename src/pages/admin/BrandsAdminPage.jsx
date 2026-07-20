import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import '../../components/admin/AdminLayout.css';
import './BrandsAdminPage.css';

import logoToyota   from '../../assets/images/partners/Toyota.png';
import logoFord     from '../../assets/images/partners/Ford.png';
import logoHonda    from '../../assets/images/partners/Honda.png';
import logoAudi     from '../../assets/images/partners/Audi.png';
import logoBMW      from '../../assets/images/partners/BMW.svg';
import logoMercedes from '../../assets/images/partners/Mercedes.svg';
import logoVW       from '../../assets/images/partners/Volkswagen.png';

const LOGO_MAP = { Toyota: logoToyota, Ford: logoFord, Honda: logoHonda, Audi: logoAudi, BMW: logoBMW, Mercedes: logoMercedes, Volkswagen: logoVW };

export default function BrandsAdminPage() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    api.getBrands().then(setBrands).catch(() => {});
  }, []);

  return (
    <div className="tcm-brands-admin">
      <div className="tcm-admin__page-header">
        <h1 className="tcm-admin__page-title">Marques <span style={{ color: '#8a8a90', fontSize: 20 }}>({brands.length})</span></h1>
        <button className="tcm-admin__btn">+ Ajouter une marque</button>
      </div>

      <div className="tcm-brands-admin__grid">
        {brands.map(({ brand, count }) => (
          <div key={brand} className="tcm-admin__card tcm-brands-admin__card">
            <div className="tcm-brands-admin__logo-wrap">
              {LOGO_MAP[brand]
                ? <img src={LOGO_MAP[brand]} alt={brand} />
                : <span className="tcm-brands-admin__initials">{brand.slice(0, 2).toUpperCase()}</span>
              }
            </div>
            <div>
              <div className="tcm-brands-admin__name">{brand}</div>
              <div className="tcm-brands-admin__count">{count} véhicule{count > 1 ? 's' : ''}</div>
            </div>
            <button className="tcm-brands-admin__edit-btn">Modifier</button>
          </div>
        ))}
      </div>
    </div>
  );
}
