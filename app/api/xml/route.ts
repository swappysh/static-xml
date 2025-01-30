import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST() {
    try {
        // Get the XML file path
        const xmlPath = path.join(process.cwd(), 'public', 'long_conversation.xml')
        const xmlContent = await fs.readFile(xmlPath, 'utf8')
        
        // Create response with appropriate headers
        return new NextResponse(xmlContent, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store'
            }
        })
    } catch (error) {
        console.error('Detailed error:', error)
        return NextResponse.json({ 
            message: 'Error reading XML file',
            details: error.message,
            path: path.join(process.cwd(), 'public', 'long_conversation.xml')
        }, { status: 500 })
    }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400'
        }
    })
} 