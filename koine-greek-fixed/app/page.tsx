import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/layout/HeroSection'
import { FeaturesSection } from '@/components/layout/FeaturesSection'
import { CurriculumPreview } from '@/components/layout/CurriculumPreview'
import { TestimonialsSection } from '@/components/layout/TestimonialsSection'
import { PricingSection } from '@/components/layout/PricingSection'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CurriculumPreview />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}
