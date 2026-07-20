import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tcm-login">
      <div className="tcm-login__card">
        <div className="tcm-login__header">
          <div className="tcm-login__logo-mark">TM</div>
          <div className="tcm-login__logo-name">TERACAR MOTORS</div>
          <div className="tcm-login__logo-role">Espace admin</div>
        </div>

        <form className="tcm-login__form" onSubmit={handleSubmit}>
          <div className="tcm-login__field">
            <label className="tcm-login__label">Adresse email</label>
            <input
              type="email"
              className="tcm-login__input"
              placeholder="admin@teracar-motors.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="tcm-login__field">
            <label className="tcm-login__label">Mot de passe</label>
            <input
              type="password"
              className="tcm-login__input"
              placeholder="••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="tcm-login__row">
            <label className="tcm-login__remember">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
              Se souvenir de moi
            </label>
            <button type="button" className="tcm-login__forgot">Mot de passe oublié ?</button>
          </div>

          {error && <div className="tcm-login__error">{error}</div>}

          <button type="submit" className="tcm-login__btn" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <div className="tcm-login__footer">Accès réservé à l'équipe Teracar Motors</div>
      </div>
    </div>
  );
}
