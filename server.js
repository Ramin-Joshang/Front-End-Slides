import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = process.cwd();

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Serve static assets from both process.cwd() and __dirname
app.use(express.static(rootDir));
app.use(express.static(__dirname));
app.use('/images', express.static(path.join(rootDir, 'images')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Explicit route for projector-theme.css with correct MIME type
app.get('/projector-theme.css', (req, res) => {
  const candidates = [
    path.join(rootDir, 'projector-theme.css'),
    path.join(__dirname, 'projector-theme.css'),
    path.join(__dirname, '..', 'projector-theme.css')
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return res.type('text/css').sendFile(candidate);
    }
  }
  res.status(404).send('/* projector-theme.css not found */');
});

// Explicit route for images
app.get('/images/:file', (req, res) => {
  const fileName = req.params.file;
  const candidates = [
    path.join(rootDir, 'images', fileName),
    path.join(__dirname, 'images', fileName),
    path.join(__dirname, '..', 'images', fileName)
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return res.sendFile(candidate);
    }
  }
  res.status(404).send('Image not found');
});

// Route shortcuts
app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'audience.html'));
});

app.get('/audience', (req, res) => {
  res.sendFile(path.join(rootDir, 'audience.html'));
});

app.get('/presenter', (req, res) => {
  res.sendFile(path.join(rootDir, 'presenter.html'));
});

// Dynamic slide route helper: /slide/1 or /slide/01 -> slide-01.html
app.get('/slide/:id', (req, res, next) => {
  const rawId = req.params.id;
  const num = rawId.replace(/[^0-9]/g, '');
  if (num) {
    const padded = String(num).padStart(2, '0');
    const slideFile = path.join(rootDir, `slide-${padded}.html`);
    return res.sendFile(slideFile, (err) => {
      if (err) next();
    });
  }
  next();
});

// Slide list API endpoint
app.get('/api/slides', (req, res) => {
  const slides = Array.from({ length: 32 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      index: i + 1,
      id: `slide-${num}`,
      url: `/slide-${num}.html`
    };
  });
  res.json({ total: 32, slides });
});

// Start listener for local dev server / Cloud Run container
if (!process.env.VERCEL) {
  app.listen(PORT, HOST, () => {
    console.log(`Front-End Slides server running at http://${HOST}:${PORT}`);
  });
}

export default app;
