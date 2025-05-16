import {LandingNavbar} from './landing-navbar'
import {LandingHero} from './landing-hero'
import {LandingFeatures} from './landing-features'
import { LandingHowItWorks } from './landing-howitworks'
import {LandingCta} from './landing-cta'
import {LandingFooter} from './landing-footer'

export default function LandingPage() {
  return (
    <div className="flex justify-items-center items-center flex-col min-w-screen">
      <LandingNavbar />
      <main className="flex w-full justify-center items-center flex-col">
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  )
}
