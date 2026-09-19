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

// Default route opens audience view
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'audience.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Front-End Slides server running at http://${HOST}:${PORT}`);
});
