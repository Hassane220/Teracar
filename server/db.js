import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'teracar.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ── Schema ──────────────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS vehicles (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    brand       TEXT NOT NULL,
    model       TEXT NOT NULL,
    title       TEXT NOT NULL,
    year        INTEGER NOT NULL,
    price       INTEGER NOT NULL DEFAULT 0,
    mileage     INTEGER NOT NULL DEFAULT 0,
    fuel        TEXT NOT NULL DEFAULT 'Essence',
    transmission TEXT NOT NULL DEFAULT 'Automatique',
    color       TEXT,
    category    TEXT NOT NULL DEFAULT 'suv',
    status      TEXT NOT NULL DEFAULT 'Disponible',
    image       TEXT,
    images      TEXT DEFAULT '[]',
    description TEXT,
    features    TEXT DEFAULT '[]',
    condition   TEXT NOT NULL DEFAULT 'Neuf',
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS leads (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT NOT NULL,
    phone        TEXT NOT NULL,
    email        TEXT,
    vehicle_id   INTEGER,
    vehicle_name TEXT,
    type         TEXT NOT NULL DEFAULT 'Renseignements',
    message      TEXT,
    status       TEXT NOT NULL DEFAULT 'Nouveau',
    created_at   TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS settings (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT UNIQUE NOT NULL,
    password   TEXT NOT NULL,
    role       TEXT NOT NULL DEFAULT 'Vendeur',
    status     TEXT NOT NULL DEFAULT 'Actif',
    can_delete INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// ── Default data ─────────────────────────────────────────────────────────────

const settingsCount = db.prepare('SELECT COUNT(*) as c FROM settings').get().c;
if (settingsCount === 0) {
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run('showPrices', 'false');
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run('dealerName', 'Teracar Motors');
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run('phone', '07 70 77 07 70');
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run('email', 'support@teracar-motors.com');
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run('address', 'Immeuble Le Walebo, Cocody Bonoumin, Abidjan');
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run('whatsapp', '2250770770770');
}

const usersCount = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
if (usersCount === 0) {
  const hash = bcrypt.hashSync('admin', 10);
  db.prepare(`INSERT INTO users (name, email, password, role, status, can_delete) VALUES (?, ?, ?, ?, ?, ?)`)
    .run('Admin Konan', 'admin@teracar-motors.com', hash, 'Gérant', 'Actif', 0);
  const hash2 = bcrypt.hashSync('vendeur123', 10);
  db.prepare(`INSERT INTO users (name, email, password, role, status, can_delete) VALUES (?, ?, ?, ?, ?, ?)`)
    .run('Sarah Bamba', 'sarah@teracar-motors.com', hash2, 'Vendeur', 'Actif', 1);
}

// ── Sample leads ─────────────────────────────────────────────────────────────

const leadsCount = db.prepare('SELECT COUNT(*) as c FROM leads').get().c;
if (leadsCount === 0) {
  const sampleLeads = [
    ['Yao Kouassi', '07 01 23 45 67', '', null, 'Land Cruiser 300', 'Rendez-vous', 'Intéressé par le Land Cruiser 300', 'Nouveau', '2026-07-20'],
    ['Adjoua Koné', '05 67 89 01 23', '', null, 'Fortuner', 'Essai routier', 'Je souhaite faire un essai', 'En cours', '2026-07-19'],
    ['Koffi Diallo', '01 23 45 67 89', '', null, 'Ford Ranger', 'Renseignements', 'Prix et disponibilité', 'Traité', '2026-07-18'],
    ['Aya Traoré', '07 89 01 23 45', 'aya@email.com', null, 'Peugeot 3008', 'Rendez-vous', '', 'Nouveau', '2026-07-18'],
    ['Ibrahim Coulibaly', '05 11 22 33 44', '', null, 'Nissan Qashqai', 'Renseignements', 'Disponible en blanc ?', 'En cours', '2026-07-17'],
  ];
  const ins = db.prepare(`INSERT INTO leads (name, phone, email, vehicle_id, vehicle_name, type, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const l of sampleLeads) ins.run(...l);
}

export default db;
