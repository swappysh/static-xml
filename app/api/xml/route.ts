import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST() {
    try {
        const xmlPath = path.join(process.cwd(), 'public', 'long_conversation.xml')
        
        console.log('Attempting to read file from:', xmlPath)
        
        const xmlContent = await fs.readFile(xmlPath, 'utf8')
        
        console.log('File content length:', xmlContent.length)
        
        return new NextResponse(xmlContent, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Cache-Control': 'no-cache',
                'x-middleware-cache': 'no-cache'
            }
        })
    } catch (error) {
        console.error('Error reading file:', error)
        return NextResponse.json({
            error: 'Failed to read XML file',
            details: error.message
        }, { status: 500 })
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    })
} 