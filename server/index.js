import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

import authRouter     from './routes/auth.js';
import vehiclesRouter from './routes/vehicles.js';
import leadsRouter    from './routes/leads.js';
import settingsRouter from './routes/settings.js';
import usersRouter    from './routes/users.js';
import brandsRouter   from './routes/brands.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Ensure uploads directory exists
mkdirSync(join(__dirname, '../public/uploads'), { recursive: true });

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, '../public/uploads')));

app.use('/api/auth',     authRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/leads',    leadsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/users',    usersRouter);
app.use('/api/brands',   brandsRouter);

app.get('/api/health', (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Teracar API — http://localhost:${PORT}`));
