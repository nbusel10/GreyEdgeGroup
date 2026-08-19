import CollaborativeAdvantage from '../components/sections/CollaborativeAdvantage'
import Process from '../components/sections/Process'
import Services from '../components/sections/Services'
import TwoDoors from '../components/sections/TwoDoors'
import FinalCta from '../components/sections/FinalCta'
import PageHero from '../components/PageHero'
import { site } from '../content/images'
import { usePageMeta } from '../lib/meta'

export default function Approach() {
  usePageMeta({
    title: 'Our Approach — The GreyEdge Group',
    description:
      'One accountable partner from evaluation through expansion. What 300+ years in the field taught us, the full capability set, and a process you can enter at any phase.',
    image: site['design-session'].src,
  })

  return (
    <>
      <PageHero
        eyebrow="The Partnership"
        title="Our Approach"
        lead="Every engagement starts somewhere different: a feasibility question, an existing plant, a growth plan, or a decarbonization goal. Our approach is built to meet that starting point with hard-earned experience, a clear process, and the services to carry it through."
      />
      <CollaborativeAdvantage />
      <Process />
      <Services />
      <TwoDoors />
      <FinalCta />
    </>
  )
}
