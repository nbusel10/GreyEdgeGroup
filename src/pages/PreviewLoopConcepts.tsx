import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import AtlExplainer from '../components/sections/AtlExplainer'
import { proseLinkClass } from '../components/ui'
import { usePageMeta } from '../lib/meta'

/**
 * Preview of Megan's notes on the four How One Loop Does It All graphics.
 * Live /geothermal-101 is unchanged.
 */

const captions: Record<string, string> = {
  'load-sharing':
    'Buildings need heating and cooling on different schedules. In summer, housing often needs cooling in the evening and at night, and offices need it during the workday. Grocery stores and data centers reject heat all year. Cooling is heat leaving a building, so one building’s cooling can warm the building next door. On a shared loop, less energy has to be supplied than if each building heated and cooled on its own. This graphic shows one exchange: heat leaving the civic building for campus, and cooling leaving housing for the hospital.',
  'ground-battery':
    'A geoexchange borefield lets the ground hold excess heat and return it later, across a day, a week, or a season. In this graphic, summer heat from the campus goes into the ground, and that heat later leaves to warm housing in winter.',
  'process-energy':
    'Heat is collected at the data center and redirected to the buildings on the loop. The drawing walks that heat from the hospital to housing, then campus, then the civic building. That order is the path around the loop in the graphic.',
  'multi-source':
    'The data center is rejecting heat. The borefield and the wastewater exchanger supply heat or take it, depending on what the buildings need at that hour and in that season. An ambient loop can use the thermal assets a community already has. Unlocking Local Energy Resources explains those sources.',
}

const more: Record<string, ReactNode> = {
  'load-sharing': (
    <>
      <p>
        A building that is not on the network heats and cools by itself. Two neighbors can be doing opposite things at
        the same moment: one cooling, one heating. Energy sharing puts those loads on one loop so the heat one building
        is rejecting can serve the building that needs it.
      </p>
      <p>
        The same pattern holds across the year, not only in the summer example. A data center or grocery store keeps
        rejecting heat in winter. Housing and offices change with the time of day and the season.
      </p>
    </>
  ),
  'ground-battery': (
    <>
      <p>
        When the loop has more heat than the buildings can use, that heat can go into the borefield and stay in the
        ground until a later hour, a later week, or the next season.
      </p>
      <p>
        The three pulses show the ground filling, then emptying. They are a way to see the charge build. Storage itself
        is not limited to three steps.
      </p>
      <p>
        The blue pulses show cooling. What is stored is heat rejected into the ground. That heat is what the loop can
        draw on later when a building needs cooling.
      </p>
    </>
  ),
  'process-energy': (
    <>
      <p>
        In 2023, Lawrence Livermore National Laboratory estimated that the United States used 93.6 quadrillion Btu of
        primary energy and rejected 61.5 quadrillion Btu, mostly as waste heat. That rejected share is about two-thirds
        of the energy used. A network can collect some of that heat and use it again, instead of letting it go.
      </p>
      <p className="text-[11px] uppercase tracking-[0.14em] text-ge-steel">
        Source: Lawrence Livermore National Laboratory, Estimated U.S. Energy Consumption in 2023. Credit also to the
        U.S. Department of Energy.
      </p>
    </>
  ),
  'multi-source': (
    <>
      <p>
        Multi-source means the thermal assets on the loop: energy sources, sinks, and storage. Those can include waste
        heat, geothermal boreholes, wastewater, bodies of water, and more. Which ones a network uses depends on what
        that community already has.
      </p>
      <p>
        Diversity is how the network prioritizes the most cost effective energy path. It also gives the system more than
        one place to put heat or draw heat, which adds resilience.
      </p>
      <p>
        An ambient loop can take low-grade heat, including wastewater, shallow ground, and data-center heat, because the
        water is already near those temperatures. A district that circulates hot water or chilled water from a central
        plant usually needs that water much hotter or much colder, so those same sources are a poor fit without extra
        equipment.
      </p>
      <p>
        <a href="/geothermal-101#thermal-resources" className={proseLinkClass}>
          Unlocking Local Energy Resources
        </a>{' '}
        is the next section on the live page, and it goes further into those assets.
      </p>
    </>
  ),
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
        more={more}
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
