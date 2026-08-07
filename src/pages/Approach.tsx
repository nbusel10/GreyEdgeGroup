import CollaborativeAdvantage from '../components/sections/CollaborativeAdvantage'
import Process from '../components/sections/Process'
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
        title="One team. No handoff gaps."
        lead="Most projects are a relay race between disconnected experts. We operate as a single system from the first conversation — one strategy, one set of numbers, one shared obligation for how the thing performs."
        image={site['design-meeting'].src}
        imageAlt={site['design-meeting'].alt}
      />
      <CollaborativeAdvantage />
      <Process />
      <FinalCta />
    </>
  )
}
