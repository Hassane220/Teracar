import { Router } from 'express';
import bcrypt from 'bcryptjs';
import supabase from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const sanitize = u => ({ id: u.id, name: u.name, email: u.email, role: u.role, status: u.status, can_delete: u.can_delete, created_at: u.created_at });

// Admin — list users
router.get('/', requireAuth, async (req, res) => {
  const { data, error } = await supabase.from('users').select('*').order('id');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data.map(sanitize));
});

// Admin — invite user
router.post('/', requireAuth, async (req, res) => {
  const { name, email, role, password } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Nom et email requis' });
  const hash = bcrypt.hashSync(password || 'teracar2026', 10);

  const { data, error } = await supabase.from('users').insert({
    name, email, password: hash,
    role: role || 'Vendeur',
    status: 'Invité — en attente',
  }).select().single();

  if (error) return res.status(409).json({ error: 'Email déjà utilisé' });
  res.status(201).json(sanitize(data));
});

// Admin — update user
router.put('/:id', requireAuth, async (req, res) => {
  const { data: user, error: fetchErr } = await supabase.from('users').select('*').eq('id', req.params.id).single();
  if (fetchErr) return res.status(404).json({ error: 'Utilisateur introuvable' });

  const { name, email, role, status, password } = req.body;
  const updates = {
    name: name || user.name,
    email: email || user.email,
    role: role || user.role,
    status: status || user.status,
    password: password ? bcrypt.hashSync(password, 10) : user.password,
  };

  const { data, error } = await supabase.from('users').update(updates).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(sanitize(data));
});

// Admin — delete user
router.delete('/:id', requireAuth, async (req, res) => {
  const { data: user, error: fetchErr } = await supabase.from('users').select('*').eq('id', req.params.id).single();
  if (fetchErr) return res.status(404).json({ error: 'Utilisateur introuvable' });
  if (!user.can_delete) return res.status(403).json({ error: 'Cet utilisateur ne peut pas être supprimé' });

  const { error } = await supabase.from('users').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

export default router;
