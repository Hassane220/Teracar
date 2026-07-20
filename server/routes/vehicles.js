import { Router } from 'express';
import multer from 'multer';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: join(__dirname, '../../public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = Router();

// Public — list all vehicles
router.get('/', (req, res) => {
  const { brand, category, status, search, sort } = req.query;
  let sql = 'SELECT * FROM vehicles WHERE 1=1';
  const params = [];

  if (brand)    { sql += ' AND brand = ?';    params.push(brand); }
  if (category) { sql += ' AND category = ?'; params.push(category); }
  if (status)   { sql += ' AND status = ?';   params.push(status); }
  if (search)   { sql += ' AND (title LIKE ? OR brand LIKE ? OR model LIKE ?)'; const q = `%${search}%`; params.push(q, q, q); }

  if (sort === 'price_asc')  sql += ' ORDER BY price ASC';
  else if (sort === 'price_desc') sql += ' ORDER BY price DESC';
  else if (sort === 'year_desc')  sql += ' ORDER BY year DESC';
  else sql += ' ORDER BY created_at DESC';

  const vehicles = db.prepare(sql).all(...params).map(v => ({
    ...v,
    images: JSON.parse(v.images || '[]'),
    features: JSON.parse(v.features || '[]'),
  }));

  res.json(vehicles);
});

// Public — get one vehicle
router.get('/:id', (req, res) => {
  const v = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  if (!v) return res.status(404).json({ error: 'Véhicule introuvable' });
  res.json({ ...v, images: JSON.parse(v.images || '[]'), features: JSON.parse(v.features || '[]') });
});

// Admin — create vehicle
router.post('/', requireAuth, upload.single('image'), (req, res) => {
  const { brand, model, title, year, price, mileage, fuel, transmission, color, category, status, description, features, condition } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : (req.body.image || null);
  const result = db.prepare(`
    INSERT INTO vehicles (brand, model, title, year, price, mileage, fuel, transmission, color, category, status, image, images, description, features, condition)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(brand, model, title, +year, +price, +mileage, fuel, transmission, color, category, status || 'Disponible',
    image, JSON.stringify(image ? [image] : []), description,
    typeof features === 'string' ? features : JSON.stringify(features || []),
    condition || 'Neuf');
  const v = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({ ...v, images: JSON.parse(v.images), features: JSON.parse(v.features) });
});

// Admin — update vehicle
router.put('/:id', requireAuth, upload.single('image'), (req, res) => {
  const existing = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Véhicule introuvable' });

  const { brand, model, title, year, price, mileage, fuel, transmission, color, category, status, description, features, condition } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : (req.body.image || existing.image);

  db.prepare(`
    UPDATE vehicles SET brand=?, model=?, title=?, year=?, price=?, mileage=?, fuel=?, transmission=?, color=?, category=?, status=?, image=?, description=?, features=?, condition=?, images=?
    WHERE id=?
  `).run(brand, model, title, +year, +price, +mileage, fuel, transmission, color, category, status,
    image, description,
    typeof features === 'string' ? features : JSON.stringify(features || []),
    condition || 'Neuf',
    JSON.stringify(image ? [image] : []),
    req.params.id);

  const v = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  res.json({ ...v, images: JSON.parse(v.images), features: JSON.parse(v.features) });
});

// Admin — delete vehicle
router.delete('/:id', requireAuth, (req, res) => {
  const r = db.prepare('DELETE FROM vehicles WHERE id = ?').run(req.params.id);
  if (r.changes === 0) return res.status(404).json({ error: 'Véhicule introuvable' });
  res.json({ ok: true });
});

export default router;
