import path from 'path';
import fs from 'fs/promises';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Use the correct path for Vercel
    const xmlPath = path.join(process.cwd(), 'public', 'long_conversation.xml');
    console.log('Attempting to read file from:', xmlPath); // Debug log
    
    const xmlContent = await fs.readFile(xmlPath, 'utf8');
    
    // Set XML headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    
    // Send the XML content
    return res.status(200).send(xmlContent);
  } catch (error) {
    console.error('Detailed error:', error); // Debug log
    return res.status(500).json({ 
      message: 'Error reading XML file',
      details: error.message,
      path: path.join(process.cwd(), 'public', 'long-conversation.xml')
    });
  }
} 