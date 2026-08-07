
import { NextRequest } from 'next/server'
export const runtime = 'edge'

export async function GET(req: NextRequest){
  const text = req.nextUrl.searchParams.get('text') || 'Best service ever! ★★★★★'
  const author = req.nextUrl.searchParams.get('author') || 'Sarah K.'
  const color = req.nextUrl.searchParams.get('color') || '#111111'

  // Simple HTML image generation for edge - in production use @vercel/og
  const html = `
    <div style="width:1080px;height:1080px;background:${color};color:white;display:flex;flex-direction:column;justify-content:center;padding:80px;font-family:sans-serif">
      <div style="font-size:48px;line-height:1.2">“${text}”</div>
      <div style="margin-top:40px;font-size:24px;opacity:0.8">— ${author} ★★★★★</div>
    </div>
  `
  return new Response(html, { headers: { 'Content-Type': 'text/html' } })
}
