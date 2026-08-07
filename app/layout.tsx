
import './globals.css'
export const metadata = { title: 'Review2Post - Turn Google Reviews into Instagram Posts', description: 'Auto-post 5-star reviews' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
