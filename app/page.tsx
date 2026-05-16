import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import SiliconValley from '@/components/SiliconValley'
import WhyIndia from '@/components/WhyIndia'
import Proof from '@/components/Proof'
import UnicornGrid from '@/components/UnicornGrid'
import TheGap from '@/components/TheGap'
import Solution from '@/components/Solution'
import Returns from '@/components/Returns'
import SmartMoney from '@/components/SmartMoney'
import Waitlist from '@/components/Waitlist'
import FinalClose from '@/components/FinalClose'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <WhyIndia />
      <SiliconValley />
      <Proof />
      <UnicornGrid />
      <TheGap />
      <Solution />
      <Returns />
      <SmartMoney />
      <Waitlist />
      <FinalClose />
      <Footer />
    </main>
  )
}
