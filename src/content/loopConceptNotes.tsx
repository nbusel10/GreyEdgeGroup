import type { ReactNode } from 'react'
import { proseLinkClass } from '../components/ui'

/** Longer notes under the four How One Loop Does It All graphics. */
export function loopConceptMore(resourcesHref = '#thermal-resources'): Record<string, ReactNode> {
  return {
  'load-sharing': (
    <>
      <p>
        Different buildings need heating and cooling at different times of day. Some keep rejecting heat. Others keep
        using it.
      </p>
      <p>
        In summer, housing needs cooling especially in the evening and at night, and offices need cooling especially
        during the workday. In winter, those same hours are when housing and offices need heating. Grocery stores and
        data centers reject heat year-round.
      </p>
      <p>
        Buildings that are not on a network heat and cool separately. One can be cooling while the building next to it
        is heating, so more energy has to be supplied. Energy sharing puts those loads on one loop, and less energy has
        to be supplied in total.
      </p>
      <p>
        Cooling is heat leaving a building. On the loop, the heat one building rejects can warm the building that needs
        it.
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
        <a href={resourcesHref} className={proseLinkClass}>
          Unlocking Local Energy Resources
        </a>{' '}
        is the next section, and it goes further into those assets.
      </p>
    </>
  ),
  }
}
