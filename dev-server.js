const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Define the root directory to show
const ROOT_DIR = path.join(__dirname, '5-彩虹城AI伴侣一体七翼开发文档-给技术精炼版');

// Serve static files
app.use(express.static(__dirname));

// API routes
app.get('/api/directory', (req, res) => {
  try {
    const requestPath = req.query.path || '';
    const fullPath = path.join(ROOT_DIR, requestPath);

    // Security check to prevent directory traversal
    if (!path.resolve(fullPath).startsWith(ROOT_DIR)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'Path not found' });
    }

    if (!fs.statSync(fullPath).isDirectory()) {
      return res.status(400).json({ error: 'Not a directory' });
    }

    const items = fs.readdirSync(fullPath).map(item => {
      const itemPath = path.join(fullPath, item);
      return {
        name: item,
        type: fs.statSync(itemPath).isDirectory() ? 'directory' : 'file'
      };
    });

    res.json(items);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/file', (req, res) => {
  try {
    const requestPath = req.query.path || '';
    const fullPath = path.join(ROOT_DIR, requestPath);

    // Security check to prevent directory traversal
    if (!path.resolve(fullPath).startsWith(ROOT_DIR)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (!fs.statSync(fullPath).isFile()) {
      return res.status(400).json({ error: 'Not a file' });
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    res.send(content);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Development server running at http://localhost:${PORT}`);
  console.log(`Showing directory: ${ROOT_DIR}`);
}); 