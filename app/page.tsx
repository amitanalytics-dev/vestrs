import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WhyIndia from '@/components/WhyIndia'
import Proof from '@/components/Proof'
import TheGap from '@/components/TheGap'
import Solution from '@/components/Solution'
import Returns from '@/components/Returns'
import SmartMoney from '@/components/SmartMoney'
import SiliconValley from '@/components/SiliconValley'
import Waitlist from '@/components/Waitlist'
import FinalClose from '@/components/FinalClose'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <WhyIndia />
      <Proof />
      <TheGap />
      <Solution />
      <Returns />
      <SmartMoney />
      <SiliconValley />
      <Waitlist />
      <FinalClose />
      <Footer />
    </main>
  )
}
