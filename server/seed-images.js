import { copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'teracar.db'));

const ASSETS = join(__dirname, '../src/assets/images');
const UPLOADS = join(__dirname, '../public/uploads');

// Mapping vehicle ID → image source file (relative to ASSETS)
const MAP = {
  // Peugeot
  1:  'peugeot/peugeot5008.png',
  2:  'peugeot/301.png',
  3:  'peugeot/408.png',
  4:  'peugeot/508.png',
  5:  'peugeot/2008.png',
  6:  'peugeot/3008.png',
  7:  'peugeot2/landtrek.png',
  8:  'peugeot2/rifter.png',
  9:  'peugeot2/partner.png',
  10: 'peugeot2/boxer.png',
  46: 'peugeot/3008.png',
  // Nissan
  11: 'nissan/patrolY62.png',
  12: 'nissan/micra.png',
  13: 'nissan/kicks.png',
  14: 'nissan/qashqai.png',
  15: 'nissan/x-trail.png',
  16: 'nissan/almera.png',
  17: 'nissan/pathfinder.png',
  18: 'nissan/navara.png',
  19: 'nissan/x-terra.png',
  // Mazda
  20: 'mazda/mazdacx9.png',
  21: 'mazda/mazda6.png',
  22: 'mazda/madzacx3.png',
  23: 'mazda/mazdacx5.png',
  24: 'mazda/mazdabt50.png',
  25: 'mazda/mazdacx60.png',
  // Toyota
  26: 'toyota2/landcruiser79.png',
  27: 'toyota2/hilux.png',
  32: 'toyota/landcruiser300.png',
  33: 'toyota/camry.png',
  34: 'toyota/rush.png',
  35: 'toyota/rav.png',
  36: 'toyota/fortuner.png',
  37: 'toyota/corolla_cross.png',
  38: 'toyota/starlet_cross.png',
  39: 'toyota2/prado_first_edition.png',
  40: 'toyota2/prado_limited.png',
  41: 'toyota2/hiace.png',
  42: 'toyota2/coaster.png',
  43: 'toyota2/urbancruiser.png',
  // Hyundai
  48: 'hyundai/palisade.png',
  49: 'hyundai/grand_I10_sedan.png',
  50: 'hyundai/sonata.png',
  51: 'hyundai/elantra.png',
  52: 'hyundai/tucson.png',
  53: 'hyundai/venue.png',
  61: 'hyundai2/hyundai_santafe.png',
  62: 'hyundai2/creta.png',
  63: 'hyundai2/county.png',
  64: 'hyundai2/hd72.png',
  // Ford
  56: 'ford/explorer.png',
  57: 'ford/ranger.png',
  58: 'ford/raptor.png',
  59: 'ford/edge.png',
  60: 'ford/expedition.png',
  // Suzuki
  65: 'suzuki/alto.png',
  66: 'suzuki/swift.png',
  67: 'suzuki/baleno.png',
  68: 'suzuki/celerio.png',
  69: 'suzuki/dzire.png',
  70: 'suzuki2/ciaz.png',
  71: 'suzuki2/ertiga.png',
  72: 'suzuki2/grand_vitara.png',
  73: 'suzuki2/jimny.png',
  74: 'suzuki2/super_carry.png',
  75: 'suzuki2/suzuki1.png',
  76: 'suzuki2/suzuki2.png',
  77: 'suzuki2/suzuki_G.png',
};

const update = db.prepare('UPDATE vehicles SET image = ? WHERE id = ?');
let ok = 0, skip = 0;

for (const [id, rel] of Object.entries(MAP)) {
  const src = join(ASSETS, rel);
  if (!existsSync(src)) {
    console.log(`⚠️  Source introuvable: ${rel}`);
    skip++;
    continue;
  }
  const ext = rel.split('.').pop();
  const dest = join(UPLOADS, `vehicle-${id}.${ext}`);
  copyFileSync(src, dest);
  update.run(`/uploads/vehicle-${id}.${ext}`, Number(id));
  console.log(`✅  ID ${id} → vehicle-${id}.${ext}`);
  ok++;
}

console.log(`\nTerminé : ${ok} images copiées, ${skip} ignorées.`);
