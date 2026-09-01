import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollIndicator from './components/ScrollIndicator'
import Home from './pages/Home'
import PreviewHome from './pages/PreviewHome'
import PreviewLessons from './pages/PreviewLessons'
import PreviewProcess from './pages/PreviewProcess'
import PreviewServices from './pages/PreviewServices'
import PreviewAtlIcons from './pages/PreviewAtlIcons'
import PreviewWordmark from './pages/PreviewWordmark'
import PreviewHero from './pages/PreviewHero'
import Approach from './pages/Approach'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Geothermal101 from './pages/Geothermal101'
import About from './pages/About'
import TeamMemberPage from './pages/TeamMember'
import Insights from './pages/Insights'
import InsightDetail from './pages/InsightDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-ge-offwhite font-body text-ge-black">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ge-black focus:px-5 focus:py-3 focus:font-body focus:text-xs focus:uppercase focus:tracking-widest focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview-home" element={<PreviewHome />} />
          <Route path="/preview-lessons" element={<PreviewLessons />} />
          <Route path="/preview-process" element={<PreviewProcess />} />
          <Route path="/preview-services" element={<PreviewServices />} />
          {/* Temporary: icon review for the ATL explainer. Remove with the page. */}
          <Route path="/preview-atl-icons" element={<PreviewAtlIcons />} />
          {/* Temporary: word-cycle animation review. Remove with the page. */}
          <Route path="/preview-wordmark" element={<PreviewWordmark />} />
          {/* Temporary: home hero drafts. Remove with the page. */}
          <Route path="/preview-hero" element={<PreviewHero />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/geothermal-101" element={<Geothermal101 />} />
          <Route path="/about" element={<About />} />
          <Route path="/team/:slug" element={<TeamMemberPage />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollIndicator />
    </div>
  )
}
