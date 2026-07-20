import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const sanitize = u => ({ id: u.id, name: u.name, email: u.email, role: u.role, status: u.status, can_delete: u.can_delete, created_at: u.created_at });

// Admin — list users
router.get('/', requireAuth, (req, res) => {
  res.json(db.prepare('SELECT * FROM users ORDER BY id').all().map(sanitize));
});

// Admin — invite user
router.post('/', requireAuth, (req, res) => {
  const { name, email, role, password } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Nom et email requis' });
  const hash = bcrypt.hashSync(password || 'teracar2026', 10);
  try {
    const r = db.prepare('INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)').run(name, email, hash, role || 'Vendeur', 'Invité — en attente');
    res.status(201).json(sanitize(db.prepare('SELECT * FROM users WHERE id = ?').get(r.lastInsertRowid)));
  } catch {
    res.status(409).json({ error: 'Email déjà utilisé' });
  }
});

// Admin — update user
router.put('/:id', requireAuth, (req, res) => {
  const { name, email, role, status, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });

  const newPassword = password ? bcrypt.hashSync(password, 10) : user.password;
  db.prepare('UPDATE users SET name=?, email=?, role=?, status=?, password=? WHERE id=?')
    .run(name || user.name, email || user.email, role || user.role, status || user.status, newPassword, req.params.id);
  res.json(sanitize(db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id)));
});

// Admin — delete user
router.delete('/:id', requireAuth, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
  if (!user.can_delete) return res.status(403).json({ error: 'Cet utilisateur ne peut pas être supprimé' });
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
