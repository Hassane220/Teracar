import { Router } from 'express';
import supabase from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public — get all settings
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('settings').select('key, value');
  if (error) return res.status(500).json({ error: error.message });
  res.json(Object.fromEntries(data.map(r => [r.key, r.value])));
});

// Admin — update settings
router.put('/', requireAuth, async (req, res) => {
  const upserts = Object.entries(req.body).map(([key, value]) => ({ key, value: String(value) }));
  const { error } = await supabase.from('settings').upsert(upserts, { onConflict: 'key' });
  if (error) return res.status(500).json({ error: error.message });

  const { data } = await supabase.from('settings').select('key, value');
  res.json(Object.fromEntries(data.map(r => [r.key, r.value])));
});

export default router;
