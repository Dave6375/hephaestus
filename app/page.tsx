import React from 'react'
import { Navbar } from '@/components/sections/navbar'
import { HeroSection } from '@/components/sections/hero-section'
import { CompanyShowcase } from '@/components/sections/company-showcase'
import {BentoSection} from "@/components/bento-section";
import QuoteSection from "@/components/sections/quote-section";
import {FeatureSection} from "@/components/sections/feature-section";
import {HypeSection} from "@/components/sections/hype-section";
import {PricingSection} from "@/components/sections/pricing-section";
import {CTASection} from "@/components/sections/cta-section";
import {FooterSection} from "@/components/sections/footer-section";

const HomeSection = () => {
    /**
     * Those two divs that close on themselves are responsible for the two-line columns that seem to be on the left and on the right
     * They are meant to give a polished look to the background
     */
    return (
        <div className='relative mx-auto max-w-7xl border-x'>
            <div className='absolute top-0 left-6 z-10 block h-full w-px bg-border'></div>
            <div className='absolute top-0 right-6 z-10 block h-full w-px bg-border'></div>

            <Navbar />
            <main className='flex min-h-screen w-full flex-col items-center justify-center divide-y divide-border'>
                <article className="w-full">
                    <HeroSection />
                    <CompanyShowcase />
                    <BentoSection />
                   <QuoteSection />
                    <FeatureSection />
                    <HypeSection />
                    <PricingSection />
                    <CTASection />
                    <FooterSection />

                </article>
            </main>
          </div>
    )
}
export default HomeSection
