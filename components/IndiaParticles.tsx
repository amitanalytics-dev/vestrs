'use client'
import { useEffect, useRef } from 'react'

// ~130-point India outline [lng, lat] — clockwise from Kanyakumari
const INDIA_POLY: [number, number][] = [
  // West coast S → N
  [77.55,8.08],[76.96,8.25],[76.55,8.72],[76.27,9.50],[76.18,9.99],
  [76.24,10.15],[76.13,10.25],[75.74,11.25],[75.37,11.87],[75.01,12.35],
  [74.85,12.87],[74.67,13.33],[74.32,14.79],[73.83,15.40],[73.72,15.88],
  [73.30,16.80],[73.18,17.19],[72.96,18.20],[72.82,18.94],[72.82,19.34],
  [72.70,19.83],[72.82,20.12],[72.59,20.67],[72.88,20.87],
  // Gulf of Khambhat
  [72.62,21.60],[71.74,21.07],[71.28,21.15],[70.45,21.10],[70.05,21.75],
  [69.66,21.96],
  // Saurashtra west tip + Gulf of Kutch
  [68.96,22.47],[68.64,23.01],[69.32,22.92],[70.23,22.98],[71.02,22.83],
  [70.24,23.04],[69.40,23.25],[68.65,23.52],[68.40,23.85],
  // Pakistan border
  [68.11,24.32],[68.00,24.87],[67.76,25.37],[68.15,25.97],
  [68.79,26.59],[69.44,26.89],[70.09,27.55],[70.46,27.97],
  [70.89,28.44],[71.49,28.94],[72.14,29.37],[72.89,29.73],[73.42,30.10],
  // Rajasthan-Punjab
  [73.73,30.85],[73.84,31.35],[73.84,32.06],
  // J&K + PoK western boundary (India's claim incl. Azad Kashmir & Gilgit-Baltistan)
  [73.50,32.30],[73.20,32.70],[73.00,33.20],
  [72.80,33.80],[72.60,34.40],[72.40,35.00],
  [72.30,35.60],[72.60,36.00],[73.10,36.40],
  [73.60,36.70],[74.20,36.90],
  // Siachen Glacier — northernmost India (~37°N)
  [74.80,37.10],[75.40,37.20],[76.00,37.20],
  [76.60,37.10],[77.00,37.10],[77.50,37.20],[77.80,37.10],
  // Karakoram pass area — going east
  [78.20,36.80],[78.60,36.50],[79.00,36.10],
  // Aksai Chin claimed boundary — going south-east
  [79.40,35.60],[79.70,35.00],[80.00,34.30],[80.20,33.80],
  // Ladakh-Uttarakhand border zone
  [79.80,33.20],[79.38,32.54],
  // Uttarakhand
  [80.06,30.33],
  // Nepal border
  [80.54,30.09],[81.27,30.09],[82.18,30.07],[83.07,28.64],[83.65,28.36],
  [84.42,28.22],[85.11,28.33],[85.93,28.22],[87.17,27.80],
  // Sikkim / Siliguri corridor
  [87.77,27.78],[88.18,27.81],[88.56,27.52],[88.86,27.24],[89.46,26.72],
  // Assam / Meghalaya
  [89.83,26.43],[90.08,26.37],[90.40,26.47],[91.00,26.56],
  [91.69,26.44],[92.27,26.52],
  // NE states arc (Manipur, Nagaland, Arunachal)
  [93.13,25.83],[93.73,25.43],[94.26,25.20],[94.68,25.37],
  [95.11,26.24],[95.56,27.28],[96.20,27.84],[97.14,28.28],
  [96.80,28.70],[96.36,29.21],[95.59,29.41],[95.00,29.19],
  [94.23,28.28],[93.67,27.44],[92.62,27.16],
  // Return S (includes Bangladesh inside polygon — acceptable for art piece)
  [91.65,27.31],[90.73,26.77],[89.85,25.85],[88.52,22.20],
  // West Bengal → Odisha coast
  [87.80,21.70],[87.10,21.19],[86.60,20.45],[86.18,20.00],
  [85.58,19.71],[85.06,19.40],[84.59,18.81],
  // Andhra Pradesh coast
  [83.58,18.31],[82.28,16.67],[81.08,16.13],[80.62,15.58],
  [80.31,13.97],[80.28,13.08],
  // Tamil Nadu east coast
  [80.09,12.12],[79.87,11.08],[79.77,10.16],[79.35,9.15],
  [78.95,8.72],[78.17,8.38],[77.55,8.08],
]

const LNG_MIN = 65.0, LNG_MAX = 100.0
const LAT_MIN = 6.0,  LAT_MAX = 38.0

function inIndia(lng: number, lat: number): boolean {
  let inside = false
  const n = INDIA_POLY.length
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [xi, yi] = INDIA_POLY[i], [xj, yj] = INDIA_POLY[j]
    if ((yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi)
      inside = !inside
  }
  return inside
}

function llToXY(lng: number, lat: number, W: number, H: number): [number, number] {
  return [((lng-LNG_MIN)/(LNG_MAX-LNG_MIN))*W, (1-(lat-LAT_MIN)/(LAT_MAX-LAT_MIN))*H]
}
function xyToLL(x: number, y: number, W: number, H: number): [number, number] {
  return [(x/W)*(LNG_MAX-LNG_MIN)+LNG_MIN, (1-y/H)*(LAT_MAX-LAT_MIN)+LAT_MIN]
}

function cityOf(lat: number, lng: number): string {
  if (Math.abs(lat-12.97)<0.5 && Math.abs(lng-77.59)<0.5) return 'Bengaluru'
  if (Math.abs(lat-19.08)<0.5 && Math.abs(lng-72.88)<0.5) return 'Mumbai'
  if (Math.abs(lat-28.54)<0.5 && Math.abs(lng-77.39)<0.5) return 'Delhi'
  if (Math.abs(lat-28.46)<0.5 && Math.abs(lng-77.03)<0.5) return 'Delhi'
  if (Math.abs(lat-13.08)<0.5 && Math.abs(lng-80.27)<0.5) return 'Chennai'
  if (Math.abs(lat-17.38)<0.5 && Math.abs(lng-78.49)<0.5) return 'Hyderabad'
  if (Math.abs(lat-18.52)<0.5 && Math.abs(lng-73.86)<0.5) return 'Pune'
  if (Math.abs(lat-22.57)<0.5 && Math.abs(lng-88.36)<0.5) return 'Kolkata'
  return ''
}

function mColor(m: string): string {
  const v = parseFloat(m)
  if (isNaN(v)) return '#94a3b8'
  if (v >= 100) return '#f0abfc'
  if (v >= 20)  return '#4ade80'
  if (v >= 10)  return '#86efac'
  if (v >= 5)   return '#facc15'
  return '#fb923c'
}

// Company data (same as GlobeVisual)
const UNICORNS: [string,string,string,string,string,number,number][] = [
  ['Flipkart','E-commerce','Accel India','400x','#1e88e5',12.97,77.59],
  ['Paytm','Fintech','SAIF Partners','30x','#1a6fc4',28.54,77.39],
  ['Ola','Mobility','Matrix India','25x','#888888',12.97,77.59],
  ["BYJU'S",'Edtech','Aarin Capital','80x','#0b3d91',12.97,77.59],
  ['Dream11','Gaming','Kalaari Capital','50x','#e63946',19.08,72.88],
  ['Swiggy','Foodtech','SAIF Partners','30x','#fc8019',12.97,77.59],
  ['Zomato','Foodtech','Info Edge','200x','#e23744',28.46,77.03],
  ['Razorpay','Fintech','Y Combinator','150x','#2eb5c1',12.97,77.59],
  ['CRED','Fintech','Sequoia India','80x','#6366f1',12.97,77.59],
  ['Meesho','E-commerce','Y Combinator','100x','#9b5de5',12.97,77.59],
  ['Nykaa','Beauty','TVS Capital','100x','#fc4f8c',19.08,72.88],
  ['PolicyBazaar','Insurtech','Info Edge','100x','#ef4444',28.46,77.03],
  ['PhonePe','Fintech','Flipkart / SV','50x','#7c3aed',12.97,77.59],
  ['Groww','Fintech','Sequoia India','50x','#00b386',12.97,77.59],
  ['Zepto','Q-Commerce','Y Combinator','60x','#a855f7',19.08,72.88],
  ['BharatPe','Fintech','Sequoia India','10x','#e8192c',28.54,77.39],
  ['Unacademy','Edtech','Sequoia India','12x','#0880ae',12.97,77.59],
  ['Vedantu','Edtech','Omidyar Network','15x','#4d5cde',12.97,77.59],
  ['ShareChat','Social','India Quotient','30x','#f7a51e',12.97,77.59],
  ['Slice','Fintech','Blume Ventures','20x','#f0522b',12.97,77.59],
  ['Darwinbox','HR Tech','Endiya Partners','25x','#1d4ed8',17.38,78.49],
  ['Chargebee','SaaS','Accel India','40x','#f97316',13.08,80.27],
  ['Freshworks','SaaS','Accel India','500x','#25c16f',13.08,80.27],
  ['InMobi','Adtech','Sherpalo','30x','#ff5733',12.97,77.59],
  ['Udaan','B2B','Lightspeed India','12x','#e11d48',12.97,77.59],
  ['Moglix','B2B','Accel India','20x','#f59e0b',28.54,77.39],
  ['Lenskart','Eyewear','IDG Ventures','25x','#0ea5e9',28.46,77.03],
  ['MakeMyTrip','Travel','SAIF Partners','60x','#e60026',28.46,77.03],
  ['MPL','Gaming','RTP Global','15x','#6366f1',12.97,77.59],
  ['Spinny','Auto','Accel India','18x','#3b82f6',28.46,77.03],
  ['Acko','Insurtech','SAIF Partners','20x','#7c3aed',19.08,72.88],
  ['OfBusiness','B2B','Matrix India','18x','#0d9488',28.46,77.03],
  ['Infra.Market','B2B','Accel India','22x','#d97706',19.08,72.88],
  ['Fractal','Analytics','Khazanah','12x','#2563eb',19.08,72.88],
  ['Pristyn Care','Healthtech','Sequoia India','12x','#06b6d4',28.46,77.03],
  ['PharmEasy','Healthtech','Bessemer','4x','#22c55e',19.08,72.88],
  ['BlackBuck','Logistics','Accel India','28x','#1e40af',12.97,77.59],
  ['Zetwerk','Mfg','Accel India','22x','#0891b2',12.97,77.59],
  ['Amagi','Media','Accel India','35x','#dc2626',12.97,77.59],
  ['Rapido','Mobility','WestBridge','12x','#ca8a04',12.97,77.59],
]

const DOMAINS: Record<string,string> = {
  'Flipkart':'flipkart.com','Paytm':'paytm.com','Ola':'olacabs.com',
  "BYJU'S":'byjus.com','Dream11':'dream11.com','Swiggy':'swiggy.com',
  'Zomato':'zomato.com','Razorpay':'razorpay.com','CRED':'cred.club',
  'Meesho':'meesho.com','Nykaa':'nykaa.com','PolicyBazaar':'policybazaar.com',
  'PhonePe':'phonepe.com','Groww':'groww.in','Zepto':'zepto.in',
  'BharatPe':'bharatpe.com','Unacademy':'unacademy.com','Vedantu':'vedantu.com',
  'ShareChat':'sharechat.com','Slice':'sliceit.app','Darwinbox':'darwinbox.com',
  'Chargebee':'chargebee.com','Freshworks':'freshworks.com','InMobi':'inmobi.com',
  'Udaan':'udaan.com','Moglix':'moglix.com','Lenskart':'lenskart.com',
  'MakeMyTrip':'makemytrip.com','MPL':'mpl.live','Spinny':'spinny.com',
  'Acko':'acko.com','OfBusiness':'ofbusiness.in','Infra.Market':'infra.market',
  'Fractal':'fractal.ai','Pristyn Care':'pristyncare.com','PharmEasy':'pharmeasy.in',
  'BlackBuck':'blackbuck.com','Zetwerk':'zetwerk.com','Amagi':'amagi.tv',
  'Rapido':'rapido.bike',
}

const HOTSPOTS = [
  {lat:12.97,lng:77.59,r:0.055,boost:2.8},
  {lat:19.08,lng:72.88,r:0.055,boost:2.4},
  {lat:28.54,lng:77.39,r:0.055,boost:2.4},
  {lat:13.08,lng:80.27,r:0.048,boost:2.0},
  {lat:17.38,lng:78.49,r:0.048,boost:2.0},
  {lat:18.52,lng:73.86,r:0.040,boost:1.7},
]


const GOLD = ['#FFD700','#FFC200','#FFB347','#FF9933','#FFCC02','#F0C040','#E8A000','#FFDF00']

const CARD_DUR = 3800
const FADE_DUR = 550

interface P {
  bx:number;by:number;x:number;y:number
  sz:number;col:string;ph:number;os:number;or:number;al:number;big:boolean
  arc:boolean;ax:number;ay:number;acx:number;acy:number;ap:number;asp:number
}

export default function IndiaParticles() {
  const cvRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({x:-1,y:-1})

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    let W = cv.offsetWidth || 500
    let H = cv.offsetHeight || 500

    const setup = () => { cv.width=W*dpr; cv.height=H*dpr; ctx.scale(dpr,dpr) }
    setup()

    // Pre-load favicons
    const logos = new Map<string,HTMLImageElement>()
    UNICORNS.forEach(u => {
      const d = DOMAINS[u[0]]; if (!d) return
      const img = new Image(); img.crossOrigin='anonymous'
      img.onload = () => logos.set(u[0], img)
      img.src = `https://www.google.com/s2/favicons?domain=${d}&sz=128`
    })

    // Generate particles
    const pts: P[] = []
    const N = Math.min(7000, Math.max(3500, Math.round(W * H * 0.025)))
    while (pts.length < N) {
      const x = 3 + Math.random()*(W-6), y = 3 + Math.random()*(H-6)
      const [lng, lat] = xyToLL(x, y, W, H)
      if (!inIndia(lng, lat)) continue
      let boost = 1
      const nx = x/W, ny = y/H
      for (const h of HOTSPOTS) {
        const [hx,hy] = llToXY(h.lng,h.lat,1,1)
        const d = Math.hypot(nx-hx, ny-hy)
        if (d < h.r) boost = Math.max(boost, h.boost*(1-d/h.r))
      }
      const big = Math.random() < 0.04 || boost > 2.0
      pts.push({
        bx:x,by:y,x,y,
        sz: big ? 2.2+Math.random()*0.8 : Math.random()<0.22 ? 1.5 : 1.0,
        col: GOLD[Math.floor(Math.random()*GOLD.length)],
        ph: Math.random()*Math.PI*2,
        os: (0.12+Math.random()*0.5)*(Math.random()<0.5?1:-1),
        or: (0.8+Math.random()*3.2)*(big?1.6:1),
        al: Math.min(1, 0.3+Math.random()*0.5+(boost-1)*0.18),
        big,
        arc:false,ax:0,ay:0,acx:0,acy:0,ap:0,asp:0,
      })
    }

    // Mouse
    const onMM = (e:MouseEvent) => { const r=cv.getBoundingClientRect(); mouse.current={x:e.clientX-r.left,y:e.clientY-r.top} }
    const onML = () => { mouse.current={x:-1,y:-1} }
    cv.addEventListener('mousemove',onMM)
    cv.addEventListener('mouseleave',onML)

    let animId=0, lastArc=0
    const tStart = performance.now()

    // ── Draw a single company card ────────────────────────────────────────────
    function drawCard(
      u: [string,string,string,string,string,number,number],
      alpha: number, now: number,
    ) {
      if (alpha < 0.02) return
      const [cityX, cityY] = llToXY(u[6], u[5], W, H)

      // Pulsing city dot
      const pulse = 0.5 + 0.5*Math.sin(now*0.005)
      ctx.save()
      ctx.globalAlpha = alpha * 0.35
      ctx.fillStyle = u[4]
      ctx.beginPath(); ctx.arc(cityX,cityY,5+pulse*8,0,Math.PI*2); ctx.fill()
      ctx.globalAlpha = alpha
      ctx.fillStyle = u[4]
      ctx.beginPath(); ctx.arc(cityX,cityY,5,0,Math.PI*2); ctx.fill()
      ctx.strokeStyle='rgba(255,255,255,0.85)'; ctx.lineWidth=1.5; ctx.stroke()
      ctx.restore()

      const CW=190, CH=58
      // Position card: right if city in left half, else left
      const onRight = cityX < W*0.55
      let cx = onRight ? Math.min(cityX+18, W-CW-6) : Math.max(cityX-CW-18, 6)
      let cy = Math.max(6, Math.min(cityY - CH/2, H-CH-6))

      // Connector
      ctx.save()
      ctx.globalAlpha = alpha * 0.55
      ctx.strokeStyle = u[4]; ctx.lineWidth=1; ctx.setLineDash([3,3])
      const anchorX = onRight ? cx : cx+CW
      ctx.beginPath(); ctx.moveTo(cityX,cityY); ctx.lineTo(anchorX, cy+CH/2); ctx.stroke()
      ctx.restore()

      // Card bg
      ctx.save()
      ctx.globalAlpha = alpha * 0.95
      ctx.fillStyle = 'rgba(4,12,28,0.92)'
      const r=6
      ctx.beginPath()
      ctx.moveTo(cx+r,cy); ctx.lineTo(cx+CW-r,cy); ctx.arcTo(cx+CW,cy,cx+CW,cy+r,r)
      ctx.lineTo(cx+CW,cy+CH-r); ctx.arcTo(cx+CW,cy+CH,cx+CW-r,cy+CH,r)
      ctx.lineTo(cx+r,cy+CH); ctx.arcTo(cx,cy+CH,cx,cy+CH-r,r)
      ctx.lineTo(cx,cy+r); ctx.arcTo(cx,cy,cx+r,cy,r)
      ctx.closePath(); ctx.fill()
      // left accent bar
      ctx.globalAlpha = alpha * 0.85
      ctx.fillStyle = u[4]
      ctx.beginPath()
      ctx.moveTo(cx+r,cy); ctx.lineTo(cx+4,cy)
      ctx.arcTo(cx,cy,cx,cy+r,r); ctx.lineTo(cx,cy+CH-r)
      ctx.arcTo(cx,cy+CH,cx+r,cy+CH,r); ctx.lineTo(cx+4,cy+CH); ctx.lineTo(cx+4,cy)
      ctx.closePath(); ctx.fill()
      ctx.restore()

      // Logo circle
      const lr=15, lx=cx+lr+8, ly=cy+CH/2
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.beginPath(); ctx.arc(lx,ly,lr,0,Math.PI*2)
      ctx.fillStyle=u[4]; ctx.fill()
      const logo = logos.get(u[0])
      if (logo && logo.complete && logo.naturalWidth>0) {
        ctx.save(); ctx.beginPath(); ctx.arc(lx,ly,lr-1,0,Math.PI*2); ctx.clip()
        ctx.drawImage(logo,lx-lr+1,ly-lr+1,(lr-1)*2,(lr-1)*2); ctx.restore()
      } else {
        ctx.font=`bold ${Math.round(lr*0.85)}px system-ui,sans-serif`
        ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.textBaseline='middle'
        ctx.fillText(u[0].charAt(0),lx,ly)
      }
      const tx = cx+lr*2+14
      ctx.font='600 11px system-ui,sans-serif'
      ctx.fillStyle='#FF9933'; ctx.textAlign='left'; ctx.textBaseline='alphabetic'
      ctx.fillText(u[0], tx, cy+21)
      ctx.font='9px system-ui,sans-serif'
      ctx.fillStyle='rgba(255,255,255,0.45)'
      const city = cityOf(u[5], u[6])
      ctx.fillText(city ? `${u[1]} · ${city}` : u[1], tx, cy+35)
      ctx.font='bold 14px system-ui,sans-serif'
      ctx.fillStyle=mColor(u[3]); ctx.textAlign='right'
      ctx.fillText(u[3], cx+CW-8, cy+CH/2+5)
      ctx.restore()
    }

    const draw = (t: number) => {
      animId = requestAnimationFrame(draw)
      ctx.clearRect(0,0,W,H)

      // Ambient glow
      const bcx=W*0.5, bcy=H*0.52
      const bg=ctx.createRadialGradient(bcx,bcy,0,bcx,bcy,W*0.46)
      bg.addColorStop(0,'rgba(255,150,20,0.04)'); bg.addColorStop(1,'rgba(255,80,0,0)')
      ctx.fillStyle=bg; ctx.beginPath()
      ctx.ellipse(bcx,bcy,W*0.46,H*0.44,0,0,Math.PI*2); ctx.fill()

      // Launch arc particles
      if (t-lastArc > 750) {
        lastArc=t; let launched=0
        for (let k=0; k<400 && launched<2; k++) {
          const p=pts[Math.floor(Math.random()*pts.length)]
          if (!p.arc) {
            p.arc=true; p.ap=0
            p.ax=W*(0.2+Math.random()*0.6); p.ay=H*(0.15+Math.random()*0.45)
            p.acx=(p.bx+p.ax)/2+(Math.random()-0.5)*90
            p.acy=Math.min(p.by,p.ay)-55-Math.random()*70
            p.asp=0.006+Math.random()*0.009; launched++
          }
        }
      }

      const now=t*0.001
      const {x:mx,y:my}=mouse.current
      const hovering=mx>=0

      for (let i=0; i<pts.length; i++) {
        const p=pts[i]
        if (p.arc) {
          p.ap+=p.asp
          if (p.ap>=1) { p.arc=false; p.x=p.bx; p.y=p.by; continue }
          const e=1-Math.pow(1-p.ap,3)
          p.x=(1-e)*(1-e)*p.bx+2*(1-e)*e*p.acx+e*e*p.ax
          p.y=(1-e)*(1-e)*p.by+2*(1-e)*e*p.acy+e*e*p.ay
          const a=p.al*(1-e), s=p.sz*(1+e*3)
          ctx.fillStyle=p.col
          ctx.globalAlpha=a*0.28; ctx.beginPath(); ctx.arc(p.x,p.y,s*2.8,0,Math.PI*2); ctx.fill()
          ctx.globalAlpha=a*0.6;  ctx.beginPath(); ctx.arc(p.x,p.y,s*1.4,0,Math.PI*2); ctx.fill()
          ctx.globalAlpha=a;       ctx.beginPath(); ctx.arc(p.x,p.y,s,0,Math.PI*2); ctx.fill()
          continue
        }
        const angle=now*p.os+p.ph
        p.x=p.bx+Math.cos(angle)*p.or
        p.y=p.by+Math.sin(angle)*p.or*0.65
        let hb=1.0
        if (hovering) { const d=Math.hypot(p.x-mx,p.y-my); if (d<100) hb=1.2+(1-d/100)*2.5 }
        const pulse2=0.82+0.18*Math.sin(now*Math.abs(p.os)*2.8+p.ph)
        const a=Math.min(1,p.al*pulse2*(hovering?hb:1))
        ctx.fillStyle=p.col
        if (p.big || hb>1.8) {
          ctx.globalAlpha=a*0.15; ctx.beginPath(); ctx.arc(p.x,p.y,p.sz*5,0,Math.PI*2); ctx.fill()
          ctx.globalAlpha=a*0.4;  ctx.beginPath(); ctx.arc(p.x,p.y,p.sz*2.2,0,Math.PI*2); ctx.fill()
          ctx.globalAlpha=a;       ctx.beginPath(); ctx.arc(p.x,p.y,p.sz,0,Math.PI*2); ctx.fill()
        } else if (p.sz>1.3) {
          ctx.globalAlpha=a; ctx.beginPath(); ctx.arc(p.x,p.y,p.sz,0,Math.PI*2); ctx.fill()
        } else {
          ctx.globalAlpha=a; ctx.fillRect(p.x-p.sz,p.y-p.sz,p.sz*2,p.sz*2)
        }
      }

      // Company card cycling
      const total=t-tStart
      const idx=Math.floor(total/CARD_DUR) % UNICORNS.length
      const elapsed=total % CARD_DUR
      let alpha = elapsed < FADE_DUR
        ? elapsed/FADE_DUR
        : elapsed > CARD_DUR-FADE_DUR
          ? (CARD_DUR-elapsed)/FADE_DUR
          : 1.0
      alpha=Math.max(0,Math.min(1,alpha))
      drawCard(UNICORNS[idx], alpha, t)

    }

    requestAnimationFrame(draw)

    const ro=new ResizeObserver(()=>{
      const pw=W,ph=H; W=cv.offsetWidth; H=cv.offsetHeight
      cv.width=W*dpr; cv.height=H*dpr; ctx.scale(dpr,dpr)
      const sx=W/pw,sy=H/ph
      pts.forEach(p=>{ p.bx*=sx;p.by*=sy;p.x*=sx;p.y*=sy })
    })
    ro.observe(cv)

    return () => {
      cancelAnimationFrame(animId); ro.disconnect()
      cv.removeEventListener('mousemove',onMM)
      cv.removeEventListener('mouseleave',onML)
    }
  }, [])

  return <canvas ref={cvRef} className="w-full h-full block" />
}
