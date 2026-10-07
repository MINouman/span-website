// Home (spec §4). Sections: Hero, CompanyIntro (client-requested), FeaturedProjects, QualityPromise, LandownerPitch, SupplierLogos (client-requested), PartnersList, ClosingCta.

import { ClosingCta } from '@/components/sections/ClosingCta'
import { CompanyIntro } from '@/components/sections/CompanyIntro'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { Hero, type HeroSlide } from '@/components/sections/Hero'
import { LandownerPitch } from '@/components/sections/LandownerPitch'
import { PartnersList } from '@/components/sections/PartnersList'
import { QualityPromise } from '@/components/sections/QualityPromise'
import { SupplierLogos } from '@/components/sections/SupplierLogos'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Button } from '@/components/ui/Button'
import { getDictionary, isLocale, localePath, type Locale } from '@/lib/i18n'
import {
  placeholderBeliefs,
  placeholderFounder,
  placeholderIntroLead,
  placeholderLandownerSteps,
  placeholderQualityPillars,
} from '@/lib/placeholder-home'
import { toSummary } from '@/lib/projects'
import { getFeaturedProjects, getPermittedPartners } from '@/lib/queries'
import { placeholderContact } from '@/lib/site'
import { placeholderSuppliers } from '@/lib/placeholder-suppliers'

// Temporary static imports. In step 2 the hero photos, headline and subhead move to the HomePage global.
import hero from '../../../../assets/images/home/hero.jpg'
import hero1 from '../../../../assets/images/home/hero1.jpg'
import hero2 from '../../../../assets/images/home/hero2.jpg'
import hero3 from '../../../../assets/images/home/hero3.jpg'

// Alt text is a [CLIENT] placeholder until each photo is matched to a SPAN project.
const heroSlides: HeroSlide[] = [
  {
    image: hero,
    alt: '[CLIENT] Project name: dark residential tower with white vertical fins against a clear sky',
    position: '30% center',
    projectName: '[CLIENT] Project name 1',
    location: '[CLIENT] Block, Aftabnagar, Dhaka',
  },
  {
    image: hero1,
    alt: '[CLIENT] Project name: brick residential building with white balconies against a deep blue sky',
    position: '80% center',
    projectName: '[CLIENT] Project name 2',
    location: '[CLIENT] Block, Aftabnagar, Dhaka',
  },
  {
    image: hero2,
    alt: '[CLIENT] Project name: cream and terracotta apartment block against a bright sky',
    position: '50% center',
    projectName: '[CLIENT] Project name 3',
    location: '[CLIENT] Block, Aftabnagar, Dhaka',
  },
  {
    image: hero3,
    alt: '[CLIENT] Project name: two residential towers at sunset with the moon in the sky',
    position: '62% center',
    projectName: '[CLIENT] Project name 4',
    location: '[CLIENT] Block, Aftabnagar, Dhaka',
  },
]

type PageProps = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: PageProps) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)

  return (
    <>
      <Hero
        slides={heroSlides}
        labels={dict.hero}
        headline="Homes built to last in Aftabnagar."
        subhead="[CLIENT] One-line subhead."
        actions={
          <>
            <ArrowButton href={localePath(locale, '/projects')}>View projects</ArrowButton>
            <Button href={localePath(locale, '/for-landowners')} variant="text" onDark>
              Talk to us about your land
            </Button>
          </>
        }
      />
      <CompanyIntro
        lead={placeholderIntroLead}
        founder={placeholderFounder}
        beliefs={placeholderBeliefs}
        labels={dict.intro}
        aboutHref={localePath(locale, '/about')}
      />
      <FeaturedProjects
        projects={(await getFeaturedProjects()).map(toSummary)}
        locale={locale}
        dict={dict}
        whatsapp={placeholderContact.whatsapp}
      />
      <QualityPromise
        pillars={placeholderQualityPillars}
        labels={dict.quality}
        aboutHref={localePath(locale, '/about')}
      />
      <LandownerPitch
        steps={placeholderLandownerSteps}
        labels={dict.landowner}
        landownerHref={localePath(locale, '/for-landowners')}
        phone={placeholderContact.phone}
        phoneDisplay={placeholderContact.phoneDisplay}
        continues
      />
      <SupplierLogos suppliers={placeholderSuppliers} labels={dict.suppliers} />
      <PartnersList
        partners={await getPermittedPartners()}
        labels={dict.partners}
        locale={locale}
      />
      <ClosingCta
        contact={placeholderContact}
        labels={dict.closing}
        mapLabels={dict.map}
        contactHref={localePath(locale, '/contact')}
      />
    </>
  )
}
