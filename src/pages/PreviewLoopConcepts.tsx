import { Link } from 'react-router-dom'
import AtlExplainer from '../components/sections/AtlExplainer'
import { proseLinkClass } from '../components/ui'
import { loopConceptMore } from '../content/loopConceptNotes'
import { usePageMeta } from '../lib/meta'

/**
 * Preview of Megan's notes on the four How One Loop Does It All graphics.
 * The More info notes also appear on the live page.
 */

const captions: Record<string, string> = {
  'load-sharing':
    'Heat moves from the civic building to campus while cooling moves from housing to the hospital.',
  'ground-battery':
    'A geoexchange borefield lets the ground hold excess heat and return it later, across a day, a week, or a season. In this graphic, summer heat from the campus goes into the ground, and that heat later leaves to warm housing in winter.',
  'process-energy':
    'Heat is collected at the data center and redirected to the buildings on the loop. The drawing walks that heat from the hospital to housing, then campus, then the civic building. That order is the path around the loop in the graphic.',
  'multi-source':
    'The data center is rejecting heat. The borefield and the wastewater exchanger supply heat or take it, depending on what the buildings need at that hour and in that season. An ambient loop can use the thermal assets a community already has. Unlocking Local Energy Resources explains those sources.',
}

export default function PreviewLoopConcepts() {
  usePageMeta({
    title: 'Preview — How one loop does it all — The GreyEdge Group',
    description: 'Draft copy for the four Thermal Highway concepts. Not the live site.',
  })

  return (
    <>
      <div className="bg-ge-accent px-5 py-3 text-center">
        <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white">
          Preview only · loop concepts ·{' '}
          <Link to="/geothermal-101#thermal-highway" className="underline underline-offset-2 hover:text-white/80">
            Live page
          </Link>
        </p>
      </div>
      <AtlExplainer
        panelNoun="concept"
        captions={captions}
        more={loopConceptMore('/geothermal-101#thermal-resources')}
        moreFullWidth
        intro={
          <p>
            The Thermal Highway® is GreyEdge’s approach to connecting buildings and{' '}
            <a href="/geothermal-101#thermal-resources" className={proseLinkClass}>
              thermal resources
            </a>{' '}
            across a network through a single ambient temperature loop. Heat pumps are the devices that move thermal
            energy between the loop and each building. They can draw heat from the loop for heating or remove heat from
            a building and return it to the loop for cooling. As energy moves through the network, it can be exchanged
            between buildings, stored for later use, recovered from sources like wastewater or data centers, or supplied
            by multiple thermal resources working together. The four graphics below show different concepts of how the
            same loop continuously balances, moves, and delivers energy and prioritizes the most cost effective energy
            path.
          </p>
        }
      />
    </>
  )
}
