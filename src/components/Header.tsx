import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useScrolled } from '../lib/hooks'
import { Btn, Container } from './ui'

interface SubItem {
  label: string
  desc: string
  to: string
}

interface NavItem {
  label: string
  to: string
  children?: SubItem[]
}

/**
 * Dropdown panels span the full header width rather than being anchored under each
 * trigger. The review flagged the old menu drifting out of alignment on smaller
 * screens; a full-width panel has nothing to misalign.
 */
const navItems: NavItem[] = [
  {
    label: 'Approach',
    to: '/approach',
    children: [
      { label: 'Built on Experience', desc: 'What 300+ years in the field taught us', to: '/approach#advantage' },
      { label: 'Our Process', desc: 'Assess, define, refine, design, guide', to: '/approach#process' },
      { label: 'Our Services', desc: 'Every role we can play on a project', to: '/approach#services' },
    ],
  },
  { label: 'Projects', to: '/projects' },
  {
    label: 'Geothermal 101',
    to: '/geothermal-101',
    children: [
      { label: 'Thermal Energy Networks', desc: 'District-scale shared infrastructure', to: '/geothermal-101#networks' },
      { label: 'Ambient Temperature Loops', desc: 'The circulatory system of a network', to: '/geothermal-101#ambient-loops' },
      { label: 'The Thermal Highway©', desc: 'How energy moves across a district', to: '/geothermal-101#thermal-highway' },
    ],
  },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'Our Story', desc: 'Founded 2016, built by practitioners', to: '/about#story' },
      { label: 'Our Team', desc: '15 thermal energy specialists', to: '/about#team' },
      { label: 'Industry Leadership', desc: 'Standards, research and training', to: '/about#leadership' },
    ],
  },
  { label: 'Insights', to: '/insights' },
]

export default function Header() {
  const scrolled = useScrolled(32)
  const { pathname } = useLocation()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onHome = pathname === '/' || pathname === '/preview-home'
  // Transparent over the home hero only, and only before scrolling.
  const overHero = onHome && !scrolled && !openMenu

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140)
  }
  const keepOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const active = navItems.find((i) => i.label === openMenu)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overHero
          ? 'bg-gradient-to-b from-black/75 via-black/35 to-transparent'
          : 'border-b border-ge-light bg-ge-offwhite/95 backdrop-blur-md'
      }`}
      onMouseLeave={scheduleClose}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
            <Link to="/" className="shrink-0 text-2xl sm:text-[1.65rem]" aria-label="The GreyEdge Group — home">
              <Logo tone={overHero ? 'light' : 'dark'} />
            </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center lg:flex lg:gap-5 xl:gap-8" aria-label="Main">
            {navItems.map((item) => (
              <div key={item.label} onMouseEnter={() => (item.children ? open(item.label) : setOpenMenu(null))}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-1 py-2 font-body text-[10px] font-medium uppercase tracking-[0.16em] transition-colors xl:text-[11px] ${
                      overHero
                        ? 'text-white/85 hover:text-white'
                        : isActive
                          ? 'text-ge-black'
                          : 'text-ge-graphite hover:text-ge-black'
                    }`
                  }
                  aria-expanded={item.children ? openMenu === item.label : undefined}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {item.children && (
                        <svg className="h-2.5 w-2.5 opacity-50" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[2px] bg-ge-accent transition-all duration-300 ${
                          isActive || openMenu === item.label ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </div>
            ))}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Btn to="/contact" variant={overHero ? 'light' : 'solid'} className="px-6 py-3">
              Start Planning
            </Btn>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className={overHero ? 'text-white' : 'text-ge-charcoal'}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                {mobileOpen ? (
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Full-width dropdown panel */}
      {active?.children && (
        <div
          className="absolute inset-x-0 top-full hidden border-y border-ge-light bg-white shadow-[0_18px_40px_-24px_rgba(20,23,26,0.35)] lg:block"
          onMouseEnter={keepOpen}
          onMouseLeave={scheduleClose}
        >
          <Container>
            <div className="grid grid-cols-3 gap-8 py-9">
              {active.children.map((sub) => (
                <Link key={sub.label} to={sub.to} className="group" onClick={() => setOpenMenu(null)}>
                  <div className="font-display text-lg font-bold uppercase tracking-wide text-ge-black transition-colors group-hover:text-ge-accent">
                    {sub.label}
                  </div>
                  <div className="mt-1 font-body text-xs text-ge-steel">{sub.desc}</div>
                  <span className="rule-grow mt-3" />
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-ge-light bg-white lg:hidden">
          <Container className="py-6">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.label} className="border-b border-ge-light">
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.to}
                      className="flex-1 py-4 font-display text-xl font-bold uppercase tracking-wide text-ge-black"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}
                        aria-label={`${mobileSection === item.label ? 'Collapse' : 'Expand'} ${item.label}`}
                        aria-expanded={mobileSection === item.label}
                        className="p-3 text-ge-steel"
                      >
                        <svg
                          className={`h-4 w-4 transition-transform ${mobileSection === item.label ? 'rotate-180' : ''}`}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.children && mobileSection === item.label && (
                    <ul className="pb-4 pl-1">
                      {item.children.map((sub) => (
                        <li key={sub.label}>
                          <Link to={sub.to} className="block py-2.5 font-body text-sm text-ge-graphite">
                            <span className="mr-2 text-ge-accent" aria-hidden="true">
                              //
                            </span>
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Btn to="/contact" className="mt-6 w-full">
              Start Planning
            </Btn>
          </Container>
        </div>
      )}
    </header>
  )
}
