import { Router } from 'express';
import multer from 'multer';
import supabase from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

const BUCKET = 'vehicles';

async function uploadImage(file) {
  const filename = `${Date.now()}-${file.originalname}`;
  const { error } = await supabase.storage.from(BUCKET).upload(filename, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

// Public — list all vehicles
router.get('/', async (req, res) => {
  try {
    const { brand, category, status, search, sort } = req.query;
    let query = supabase.from('vehicles').select('*');

    if (brand)    query = query.eq('brand', brand);
    if (category) query = query.eq('category', category);
    if (status)   query = query.eq('status', status);
    if (search)   query = query.or(`title.ilike.%${search}%,brand.ilike.%${search}%,model.ilike.%${search}%`);

    if (sort === 'price_asc')  query = query.order('price', { ascending: true });
    else if (sort === 'price_desc') query = query.order('price', { ascending: false });
    else if (sort === 'year_desc')  query = query.order('year', { ascending: false });
    else query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Public — get one vehicle
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('vehicles').select('*').eq('id', req.params.id).single();
    if (error) return res.status(404).json({ error: 'Véhicule introuvable' });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin — create vehicle
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { brand, model, title, year, price, mileage, fuel, transmission, color, category, status, description, features, condition } = req.body;

    let imageUrl = req.body.image || null;
    if (req.file) imageUrl = await uploadImage(req.file);

    const featuresData = typeof features === 'string' ? JSON.parse(features || '[]') : (features || []);

    const { data, error } = await supabase.from('vehicles').insert({
      brand, model, title,
      year: +year, price: +price, mileage: +mileage,
      fuel, transmission, color, category,
      status: status || 'Disponible',
      image: imageUrl,
      images: imageUrl ? [imageUrl] : [],
      description,
      features: featuresData,
      condition: condition || 'Neuf',
    }).select().single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin — update vehicle
router.put('/:id', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { data: existing, error: fetchErr } = await supabase.from('vehicles').select('*').eq('id', req.params.id).single();
    if (fetchErr) return res.status(404).json({ error: 'Véhicule introuvable' });

    const { brand, model, title, year, price, mileage, fuel, transmission, color, category, status, description, features, condition } = req.body;

    let imageUrl = req.file ? await uploadImage(req.file) : (req.body.image || existing.image);
    const featuresData = typeof features === 'string' ? JSON.parse(features || '[]') : (features || existing.features);

    const { data, error } = await supabase.from('vehicles').update({
      brand, model, title,
      year: +year, price: +price, mileage: +mileage,
      fuel, transmission, color, category, status,
      image: imageUrl,
      images: imageUrl ? [imageUrl] : [],
      description,
      features: featuresData,
      condition: condition || 'Neuf',
    }).eq('id', req.params.id).select().single();

    if (error) throw error;
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin — delete vehicle
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { error } = await supabase.from('vehicles').delete().eq('id', req.params.id);
    if (error) return res.status(404).json({ error: 'Véhicule introuvable' });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
