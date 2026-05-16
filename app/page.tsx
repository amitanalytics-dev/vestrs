import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import SiliconValley from '@/components/SiliconValley'
import WhyIndia from '@/components/WhyIndia'
import TheGap from '@/components/TheGap'
import Solution from '@/components/Solution'
import Returns from '@/components/Returns'
import SmartMoney from '@/components/SmartMoney'
import Waitlist from '@/components/Waitlist'
import FinalClose from '@/components/FinalClose'
import Footer from '@/components/Footer'
import GoldDivider from '@/components/GoldDivider'

export default function Home() {
  return (
    <main>
      <Nav />
      <GoldDivider />
      <Hero />
      <GoldDivider />
      <WhyIndia />
      <GoldDivider />
      <SiliconValley />
      <GoldDivider />
      <TheGap />
      <GoldDivider />
      <Solution />
      <GoldDivider />
      <Returns />
      <GoldDivider />
      <SmartMoney />
      <GoldDivider />
      <Waitlist />
      <GoldDivider />
      <FinalClose />
      <GoldDivider />
      <Footer />
    </main>
  )
}
