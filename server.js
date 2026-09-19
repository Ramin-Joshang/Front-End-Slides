import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Serve static assets from root
app.use(express.static(__dirname));

// Route shortcuts
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'audience.html'));
});

app.get('/audience', (req, res) => {
  res.sendFile(path.join(__dirname, 'audience.html'));
});

app.get('/presenter', (req, res) => {
  res.sendFile(path.join(__dirname, 'presenter.html'));
});

// Dynamic slide route helper: /slide/1 or /slide/01 -> slide-01.html
app.get('/slide/:id', (req, res, next) => {
  const rawId = req.params.id;
  const num = rawId.replace(/[^0-9]/g, '');
  if (num) {
    const padded = String(num).padStart(2, '0');
    const slideFile = path.join(__dirname, `slide-${padded}.html`);
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
