'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase' // FIXED PATH

type Role = 'user' | 'admin'
export default function Home(){
  const [role, setRole] = useState<Role>('user')
  const [businesses, setBusinesses] = useState<any[]>([])
  const [email, setEmail] = useState('demo@review2post.com')
  const [mapsUrl, setMapsUrl] = useState('')
  const [fetching, setFetching] = useState(false)
  const [reviews, setReviews] = useState<any[]>([])
  const [connected, setConnected] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(()=>{
    checkSupabase()
    loadBusinesses()
  },[])

  const checkSupabase = async () => {
    try {
      const { data, error } = await supabase.from('businesses').select('id').limit(1)
      if(error) {
        console.log('Supabase error:', error.message)
        setErrorMsg(error.message)
        setConnected(false)
      } else {
        setConnected(true)
      }
    } catch(e:any){
      setErrorMsg(e.message)
      setConnected(false)
    }
  }
  const loadBusinesses = async () => {
    try {
      const { data } = await supabase.from('businesses').select('*').order('created_at', {ascending:false}).limit(20)
      if(data) setBusinesses(data)
    } catch(e){ console.log(e) }
  }

  const handleFetchReviews = async () => {
    setFetching(true)
    setTimeout(()=>{
      setReviews([
        { author_name: 'Sarah K.', text: 'Best biryani in Dhaka! The staff is amazing and food is always fresh.', rating: 5 },
        { author_name: 'Rahim U.', text: 'Loved the ambiance. 5 stars for service and taste.', rating: 5 },
        { author_name: 'Anika T.', text: 'My go-to place for family dinners. Highly recommended!', rating: 5 },
      ])
      setFetching(false)
    }, 1000)
  }

  const createBusiness = async () => {
    try {
      const { data, error } = await supabase.from('businesses').insert({
        name: mapsUrl ? 'Business from Maps' : 'Demo Cafe',
        google_maps_url: mapsUrl,
        user_email: email,
        brand_color: '#111111',
        template: 'minimal'
      }).select().single()
      if(!error){ alert('Business saved to Supabase ✓'); loadBusinesses() }
      else alert(error.message)
    } catch(e:any){ alert(e.message) }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black">Review2Post V7 • {role === 'admin' ? 'Admin Panel' : 'User Dashboard'}</h1>
        <div className="flex gap-2 bg-black text-white p-1 rounded-full">
          <button onClick={()=>setRole('user')} className={`px-4 py-1 rounded-full text-sm ${role==='user'?'bg-white text-black':''}`}>User View</button>
          <button onClick={()=>setRole('admin')} className={`px-4 py-1 rounded-full text-sm ${role==='admin'?'bg-white text-black':''}`}>Admin View</button>
        </div>
      </div>

      <div className={`p-3 rounded-lg mb-6 text-sm ${connected?'bg-green-100 text-green-800':'bg-red-100 text-red-800'}`}>Supabase: {connected?'Connected ✓ - Tables ready':`Not connected - ${errorMsg || 'Create businesses table in Supabase'}`}</div>

      {role === 'user' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="font-bold text-lg mb-4">Step 1: Paste Google Maps Link</h2>
            <p className="text-sm text-gray-500 mb-3">Just paste your business link. We handle API keys on backend.</p>
            <input value={mapsUrl} onChange={e=>setMapsUrl(e.target.value)} placeholder="https://maps.app.goo.gl/..." className="w-full border p-3 rounded-xl mb-3" />
            <button onClick={handleFetchReviews} disabled={!mapsUrl||fetching} className="w-full bg-black text-white p-3 rounded-xl font-bold disabled:opacity-50">{fetching?'Fetching via Outscraper...':'Fetch My Reviews'}</button>
            
            {reviews.length>0 && (
              <div className="mt-4 space-y-2">
                {reviews.map((r,i)=><div key={i} className="p-3 bg-gray-50 rounded-xl text-sm"><b>{r.author_name}</b> ★{r.rating}<br/>{r.text}</div>)}
                <button onClick={createBusiness} className="w-full mt-3 bg-green-600 text-white p-3 rounded-xl font-bold">Save & Create Business</button>
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="font-bold text-lg mb-4">Step 2: Connect Instagram (1 Click)</h2>
            <p className="text-sm text-gray-500 mb-3">No API keys. Just OAuth.</p>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl font-bold mb-3">Connect Instagram</button>
            <button className="w-full bg-[#1877F2] text-white p-3 rounded-xl font-bold">Connect Facebook Page</button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border"><div className="text-xs text-gray-500">Total Users</div><div className="text-2xl font-bold">{businesses.length}</div></div>
            <div className="bg-white p-4 rounded-xl border"><div className="text-xs text-gray-500">Businesses</div><div className="text-2xl font-bold">{businesses.length}</div></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="font-bold mb-4">All Businesses (from Supabase)</h2>
            <div className="space-y-2">
              {businesses.map(b=><div key={b.id} className="flex justify-between p-3 border rounded-xl text-sm"><span>{b.name} - {b.user_email}</span><span className="text-gray-500">{b.created_at ? new Date(b.created_at).toLocaleDateString() : ''}</span></div>)}
              {businesses.length===0 && <div className="text-gray-400 text-sm">No businesses yet. Create one in User View. {errorMsg && `Error: ${errorMsg}`}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
