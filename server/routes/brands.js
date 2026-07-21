import { Router } from 'express';
import supabase from '../db.js';

const router = Router();

// Public — list brands with vehicle counts
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('vehicles').select('brand');
  if (error) return res.status(500).json({ error: error.message });

  const counts = data.reduce((acc, { brand }) => {
    acc[brand] = (acc[brand] || 0) + 1;
    return acc;
  }, {});

  const brands = Object.entries(counts)
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => b.count - a.count);

  res.json(brands);
});

export default router;
