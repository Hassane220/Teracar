const BASE = 'http://localhost:3001/api';

function getToken() {
  return localStorage.getItem('tcm_token');
}

async function request(method, path, body, isFormData = false) {
  const headers = {};
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!isFormData) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur serveur' }));
    throw new Error(err.error || 'Erreur serveur');
  }
  return res.json();
}

export const api = {
  // Auth
  login: (email, password) => request('POST', '/auth/login', { email, password }),

  // Vehicles (public)
  getVehicles: (params = {}) => request('GET', `/vehicles?${new URLSearchParams(params)}`),
  getVehicle:  (id) => request('GET', `/vehicles/${id}`),

  // Vehicles (admin)
  createVehicle: (formData) => request('POST', '/vehicles', formData, true),
  updateVehicle: (id, formData) => request('PUT', `/vehicles/${id}`, formData, true),
  deleteVehicle: (id) => request('DELETE', `/vehicles/${id}`),

  // Leads
  createLead: (data) => request('POST', '/leads', data),
  getLeads:   (params = {}) => request('GET', `/leads?${new URLSearchParams(params)}`),
  updateLead: (id, data) => request('PUT', `/leads/${id}`, data),
  deleteLead: (id) => request('DELETE', `/leads/${id}`),

  // Settings
  getSettings:    () => request('GET', '/settings'),
  updateSettings: (data) => request('PUT', '/settings', data),

  // Users
  getUsers:    () => request('GET', '/users'),
  createUser:  (data) => request('POST', '/users', data),
  updateUser:  (id, data) => request('PUT', `/users/${id}`, data),
  deleteUser:  (id) => request('DELETE', `/users/${id}`),

  // Brands
  getBrands: () => request('GET', '/brands'),
};
