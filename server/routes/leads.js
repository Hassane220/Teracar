import { Router } from 'express';
import supabase from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public — create lead (from contact form)
router.post('/', async (req, res) => {
  const { name, phone, email, vehicle_id, vehicle_name, type, message } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Nom et téléphone requis' });

  const { data, error } = await supabase.from('leads').insert({
    name, phone,
    email: email || '',
    vehicle_id: vehicle_id || null,
    vehicle_name: vehicle_name || '',
    type: type || 'Renseignements',
    message: message || '',
  }).select().single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ id: data.id, ok: true });
});

// Admin — list all leads
router.get('/', requireAuth, async (req, res) => {
  const { status } = req.query;
  let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Admin — update lead status
router.put('/:id', requireAuth, async (req, res) => {
  const { status } = req.body;
  const { data, error } = await supabase.from('leads').update({ status }).eq('id', req.params.id).select().single();
  if (error) return res.status(404).json({ error: 'Lead introuvable' });
  res.json(data);
});

// Admin — delete lead
router.delete('/:id', requireAuth, async (req, res) => {
  const { error } = await supabase.from('leads').delete().eq('id', req.params.id);
  if (error) return res.status(404).json({ error: 'Lead introuvable' });
  res.json({ ok: true });
});

export default router;
