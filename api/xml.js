export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Read the XML file and send it as response
  const fs = require('fs');
  const path = require('path');
  
  try {
    const xmlPath = path.join(process.cwd(), 'public', 'long-conversation.xml');
    const xmlContent = fs.readFileSync(xmlPath, 'utf8');
    
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(xmlContent);
  } catch (error) {
    console.error('Error reading XML file:', error);
    res.status(500).json({ message: 'Error reading XML file' });
  }
} 