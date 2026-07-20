import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const count = db.prepare('SELECT COUNT(*) as c FROM vehicles').get().c;
if (count > 0) {
  console.log(`⏭  Vehicles already seeded (${count} in DB). Skipping.`);
  process.exit(0);
}

const vehicles = JSON.parse(readFileSync(join(__dirname, 'vehicles-seed.json'), 'utf8'));

const insert = db.prepare(`
  INSERT INTO vehicles (brand, model, title, year, price, mileage, fuel, transmission, color, category, status, image, images, description, features, condition)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertAll = db.transaction((cars) => {
  for (const c of cars) {
    insert.run(
      c.brand, c.model, c.title || `${c.brand} ${c.model}`,
      c.year || 2023, c.price || 0, c.mileage || 0,
      c.fuel || 'Essence', c.transmission || 'Automatique',
      c.color || '', c.category || 'suv',
      c.status || 'Disponible',
      null, '[]',
      c.description || '',
      JSON.stringify(Array.isArray(c.features) ? c.features : []),
      c.condition || 'Neuf'
    );
  }
});

insertAll(vehicles);
console.log(`✅ Seeded ${vehicles.length} vehicles into the database.`);
process.exit(0);
