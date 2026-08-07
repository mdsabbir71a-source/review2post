# Review2Post V7 - Final Deployable

## Deploy to Vercel (FREE)

1. Create GitHub repo: review2post
2. Push this code:
   git init
   git add .
   git commit -m "launch"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/review2post.git
   git push -u origin main

3. Go to vercel.com -> New Project -> Import review2post
4. Add Environment Variables:
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY (from Supabase > Settings > API Keys > service_role)
   OUTSCRAPER_API_KEY (optional for real reviews, get free at outscraper.com)
   META_APP_ID (optional for auto-post)

5. Deploy

Your live link: https://review2post.vercel.app

## How User Flow Works (No API stress)

User:
- Paste Google Maps link only -> Your backend /api/reviews/fetch uses OUTSCRAPER_API_KEY hidden in Vercel
- Click Connect Instagram -> Redirects to Facebook OAuth using META_APP_ID hidden

You (Admin):
- Go to / -> Toggle Admin View -> See all users, businesses from Supabase
- API keys only in Vercel env, never in frontend

## Free Launch Mode

For first 20 users:
- Stay in Meta Dev Mode: App Roles > Add Testers > Add their Instagram
- They can auto-post free without App Review
- Or use manual Download mode: user downloads PNG + caption, posts manually (0 cost, 0 risk)

## SQL Already Done

You already ran SQL in Supabase. Tables: businesses, reviews, posts exist.

If need fresh:
drop table if exists posts cascade;
drop table if exists reviews cascade;
drop table if exists businesses cascade;
Then run V4 SQL from banner.
