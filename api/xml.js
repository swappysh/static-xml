import path from 'path';
import fs from 'fs/promises';

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    });
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Method not allowed' }));
    return;
  }

  try {
    const xmlPath = path.join(process.cwd(), 'public', 'long_conversation.xml');
    const xmlContent = await fs.readFile(xmlPath, 'utf8');
    
    // Force response type and prevent redirects
    res.writeHead(200, {
      'Content-Type': 'application/xml; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store',
      'Transfer-Encoding': 'chunked',
      'Connection': 'keep-alive'
    });
    
    res.end(xmlContent);
    
  } catch (error) {
    console.error('Detailed error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      message: 'Error reading XML file',
      details: error.message,
      path: path.join(process.cwd(), 'public', 'long_conversation.xml')
    }));
  }
} 