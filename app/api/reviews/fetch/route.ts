
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest){
  const url = req.nextUrl.searchParams.get('url')
  if(!url) return NextResponse.json({error:'Missing url'}, {status:400})

  const key = process.env.OUTSCRAPER_API_KEY
  if(!key){
    // No key yet - return demo data so UI still works
    return NextResponse.json({
      demo: true,
      message: 'Add OUTSCRAPER_API_KEY in Vercel to fetch real reviews. Returning demo for now.',
      reviews: [
        { author: 'Demo User', text: 'Amazing food! Will come again.', rating: 5 }
      ]
    })
  }

  try {
    // Real Outscraper call - server side, CORS not an issue, key hidden
    const outscraperUrl = `https://api.app.outscraper.com/maps/reviews-v3?query=${encodeURIComponent(url)}&reviewsLimit=20&reviewsSort=newest&cutoff=4`
    const res = await fetch(outscraperUrl, { headers: { 'X-API-KEY': key } })
    const data = await res.json()
    
    // Parse and return normalized reviews
    // Outscraper returns data.data[0].reviews_data etc
    return NextResponse.json({ real: true, data })
  } catch(e:any){
    return NextResponse.json({ error: e.message }, {status:500})
  }
}
