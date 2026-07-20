import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public — create lead (from contact form)
router.post('/', (req, res) => {
  const { name, phone, email, vehicle_id, vehicle_name, type, message } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Nom et téléphone requis' });

  const result = db.prepare(`
    INSERT INTO leads (name, phone, email, vehicle_id, vehicle_name, type, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(name, phone, email || '', vehicle_id || null, vehicle_name || '', type || 'Renseignements', message || '');

  res.status(201).json({ id: result.lastInsertRowid, ok: true });
});

// Admin — list all leads
router.get('/', requireAuth, (req, res) => {
  const { status } = req.query;
  let sql = 'SELECT * FROM leads';
  const params = [];
  if (status) { sql += ' WHERE status = ?'; params.push(status); }
  sql += ' ORDER BY created_at DESC';
  res.json(db.prepare(sql).all(...params));
});

// Admin — update lead status
router.put('/:id', requireAuth, (req, res) => {
  const { status } = req.body;
  const r = db.prepare('UPDATE leads SET status = ? WHERE id = ?').run(status, req.params.id);
  if (r.changes === 0) return res.status(404).json({ error: 'Lead introuvable' });
  res.json(db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id));
});

// Admin — delete lead
router.delete('/:id', requireAuth, (req, res) => {
  const r = db.prepare('DELETE FROM leads WHERE id = ?').run(req.params.id);
  if (r.changes === 0) return res.status(404).json({ error: 'Lead introuvable' });
  res.json({ ok: true });
});

export default router;
