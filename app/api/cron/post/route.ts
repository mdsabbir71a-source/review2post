
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(){
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  
  // Find posts scheduled for now or earlier and status=queued
  const { data: posts } = await supabase.from('posts').select('*').eq('status','queued').lte('scheduled_for', new Date().toISOString()).limit(5)
  
  if(!posts || posts.length===0) return NextResponse.json({ message: 'No posts to publish' })

  // In production: generate image via /api/og, then publish via Meta Graph API or Ayrshare
  // For free V1: just mark as posted and return, user will download manually
  // For Dev Mode Meta: call graph.facebook.com/{ig_id}/media
  
  for(const post of posts){
    await supabase.from('posts').update({ status: 'posted' }).eq('id', post.id)
  }

  return NextResponse.json({ published: posts.length, posts })
}
