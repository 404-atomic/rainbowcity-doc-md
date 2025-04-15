const fs = require('fs');
const path = require('path');

// Define the root directory to show
const ROOT_DIR = path.join(process.cwd(), '5-彩虹城AI伴侣一体七翼开发文档-给技术精炼版');

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    res.status(200).send(content);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
} 