
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest){
  // Step 1: Redirect user to Facebook OAuth
  const appId = process.env.META_APP_ID
  if(!appId) return NextResponse.json({ error: 'Add META_APP_ID in Vercel. For V1 free launch, use manual Download mode.' })
  
  const redirectUri = `${req.nextUrl.origin}/api/auth/meta/callback`
  const scope = 'instagram_basic,instagram_content_publish,facebook_page_publish,pages_show_list'
  const url = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`
  
  return NextResponse.redirect(url)
}
