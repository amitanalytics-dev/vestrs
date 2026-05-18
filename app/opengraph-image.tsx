import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'VESTRS — Access India Early'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #07101D 0%, #0A1828 50%, #060E1A 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #059669, #0EA5E9)' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '22px', fontWeight: 400, color: '#ffffff', letterSpacing: '0.35em', fontFamily: 'serif' }}>VESTRS</span>
        </div>

        {/* Headline */}
        <div style={{ fontSize: '64px', fontWeight: 800, color: '#ffffff', lineHeight: 1.05, marginBottom: '24px' }}>
          Access India&apos;s Private<br />
          <span style={{ color: '#34d399' }}>Markets Early.</span>
        </div>

        {/* Subline */}
        <div style={{ fontSize: '22px', color: 'rgba(148,163,184,0.9)', marginBottom: '48px', maxWidth: '700px', lineHeight: 1.5 }}>
          112 unicorns · $1T+ ecosystem · Cross-border compliance handled.<br />
          For verified accredited investors only.
        </div>

        {/* CTA badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(5,150,105,0.15)',
          border: '1px solid rgba(5,150,105,0.3)',
          borderRadius: '100px',
          padding: '10px 24px',
          width: 'fit-content',
        }}>
          <div style={{ width: '8px', height: '8px', background: '#34d399', borderRadius: '50%' }} />
          <span style={{ color: '#34d399', fontSize: '16px', fontWeight: 600, letterSpacing: '0.05em' }}>Limited time · 100 founding member spots only</span>
        </div>

        {/* Bottom URL */}
        <div style={{ position: 'absolute', bottom: '40px', right: '80px', color: 'rgba(148,163,184,0.4)', fontSize: '14px', letterSpacing: '0.08em' }}>
          vestrs.vercel.app
        </div>
      </div>
    ),
    { ...size },
  )
}
