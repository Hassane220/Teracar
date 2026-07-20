import { Router } from 'express';
import db from '../db.js';

const router = Router();

// Public — list brands with vehicle counts
router.get('/', (req, res) => {
  const brands = db.prepare(`
    SELECT brand, COUNT(*) as count
    FROM vehicles
    GROUP BY brand
    ORDER BY count DESC
  `).all();
  res.json(brands);
});

export default router;
