import { supabase } from '../lib/supabase';

const BUCKET = 'vehicles';

async function uploadImage(file) {
  const filename = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(filename, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

function buildVehicleQuery(params = {}) {
  const { brand, category, status, search, sort } = params;
  let query = supabase.from('vehicles').select('*');

  if (brand)    query = query.eq('brand', brand);
  if (category) query = query.eq('category', category);
  if (status)   query = query.eq('status', status);
  if (search)   query = query.or(`title.ilike.%${search}%,brand.ilike.%${search}%,model.ilike.%${search}%`);

  if (sort === 'price_asc')       query = query.order('price', { ascending: true });
  else if (sort === 'price_desc') query = query.order('price', { ascending: false });
  else if (sort === 'year_desc')  query = query.order('year', { ascending: false });
  else                            query = query.order('created_at', { ascending: false });

  return query;
}

export const api = {
  // ── Auth ─────────────────────────────────────────────────────────────────
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
    return {
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: profile?.name || data.user.email,
        role: profile?.role || 'Vendeur',
      },
    };
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  // ── Vehicles (public) ────────────────────────────────────────────────────
  getVehicles: async (params = {}) => {
    const { admin, ...rest } = params;
    let query = buildVehicleQuery(rest);
    if (!admin) query = query.not('image', 'is', null).not('image', 'eq', '');
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  },

  getVehicle: async (id) => {
    const { data, error } = await supabase.from('vehicles').select('*').eq('id', id).single();
    if (error) throw new Error('Véhicule introuvable');
    return data;
  },

  // ── Vehicles (admin) ─────────────────────────────────────────────────────
  createVehicle: async (formData) => {
    const file = formData.get('image');
    let imageUrl = null;
    if (file && file.size > 0) imageUrl = await uploadImage(file);

    const fields = Object.fromEntries(formData.entries());
    const { data, error } = await supabase.from('vehicles').insert({
      brand: fields.brand, model: fields.model, title: fields.title,
      year: +fields.year, price: +fields.price, mileage: +fields.mileage,
      fuel: fields.fuel, transmission: fields.transmission,
      color: fields.color, category: fields.category,
      status: fields.status || 'Disponible',
      condition: fields.condition || 'Neuf',
      description: fields.description || '',
      image: imageUrl,
      images: imageUrl ? [imageUrl] : [],
      features: JSON.parse(fields.features || '[]'),
    }).select().single();

    if (error) throw new Error(error.message);
    return data;
  },

  updateVehicle: async (id, formData) => {
    const { data: existing } = await supabase.from('vehicles').select('image').eq('id', id).single();
    const file = formData.get('image');
    let imageUrl = existing?.image || null;
    if (file && file.size > 0) imageUrl = await uploadImage(file);

    const fields = Object.fromEntries(formData.entries());
    const { data, error } = await supabase.from('vehicles').update({
      brand: fields.brand, model: fields.model, title: fields.title,
      year: +fields.year, price: +fields.price, mileage: +fields.mileage,
      fuel: fields.fuel, transmission: fields.transmission,
      color: fields.color, category: fields.category,
      status: fields.status, condition: fields.condition || 'Neuf',
      description: fields.description || '',
      image: imageUrl,
      images: imageUrl ? [imageUrl] : [],
      features: JSON.parse(fields.features || '[]'),
    }).eq('id', id).select().single();

    if (error) throw new Error(error.message);
    return data;
  },

  deleteVehicle: async (id) => {
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { ok: true };
  },

  // ── Leads ────────────────────────────────────────────────────────────────
  createLead: async (data) => {
    const { data: lead, error } = await supabase.from('leads').insert({
      name: data.name, phone: data.phone,
      email: data.email || '',
      vehicle_id: data.vehicle_id || null,
      vehicle_name: data.vehicle_name || '',
      type: data.type || 'Renseignements',
      message: data.message || '',
    }).select().single();
    if (error) throw new Error(error.message);
    return { id: lead.id, ok: true };
  },

  getLeads: async (params = {}) => {
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (params.status) query = query.eq('status', params.status);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  },

  updateLead: async (id, body) => {
    const { data, error } = await supabase.from('leads').update({ status: body.status }).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  deleteLead: async (id) => {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { ok: true };
  },

  // ── Settings ──────────────────────────────────────────────────────────────
  getSettings: async () => {
    const { data, error } = await supabase.from('settings').select('key, value');
    if (error) throw new Error(error.message);
    return Object.fromEntries(data.map(r => [r.key, r.value]));
  },

  updateSettings: async (updates) => {
    const upserts = Object.entries(updates).map(([key, value]) => ({ key, value: String(value) }));
    const { error } = await supabase.from('settings').upsert(upserts, { onConflict: 'key' });
    if (error) throw new Error(error.message);
    return api.getSettings();
  },

  // ── Users (profiles) ─────────────────────────────────────────────────────
  getUsers: async () => {
    const { data, error } = await supabase.from('profiles').select('id, name, role, status, can_delete, created_at').order('created_at');
    if (error) throw new Error(error.message);
    return data;
  },

  // ── Brands ───────────────────────────────────────────────────────────────
  getBrands: async () => {
    const { data, error } = await supabase.from('vehicles').select('brand');
    if (error) throw new Error(error.message);
    const counts = data.reduce((acc, { brand }) => {
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => b.count - a.count);
  },
};
