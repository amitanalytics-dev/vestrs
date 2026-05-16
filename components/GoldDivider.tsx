export default function GoldDivider() {
  return (
    <div
      style={{
        height: '4px',
        background: 'linear-gradient(90deg, rgba(255,215,0,0) 0%, #D4AF37 10%, #FFD700 40%, #FFFAAA 50%, #FFD700 60%, #D4AF37 90%, rgba(255,215,0,0) 100%)',
        boxShadow: '0 0 18px 5px rgba(255, 215, 0, 0.55)',
        position: 'relative',
        zIndex: 20,
      }}
    />
  )
}
