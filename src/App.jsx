import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import About from './components/About'
import AmbientGlow from './components/AmbientGlow'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Stats from './components/Stats'
import portfolio from './data/portfolio'

function App () {
  const [isNavVisible, setIsNavVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isLoaded, setIsLoaded] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [sweepKey, setSweepKey] = useState(0)
  const prevActiveSectionRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (
      prevActiveSectionRef.current !== null &&
      prevActiveSectionRef.current !== activeSection
    ) {
      setSweepKey(k => k + 1)
    }
    prevActiveSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = e => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.95 },
      colors: ['#7c3aed', '#38bdf8', '#34d399', '#f472b6', '#fbbf24']
    })
  }

  const handleNavigate = sectionId => {
    setMenuOpen(false)
    const target = document.getElementById(sectionId)

    if (target) {
      const offset = 96
      const top = target.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateReducedMotion = () => {
      setReducedMotion(mediaQuery.matches)
    }

    updateReducedMotion()
    mediaQuery.addEventListener('change', updateReducedMotion)

    return () => mediaQuery.removeEventListener('change', updateReducedMotion)
  }, [])

  useEffect(() => {
    const animationFrameId = window.requestAnimationFrame(() => {
      setIsLoaded(true)
    })

    return () => window.cancelAnimationFrame(animationFrameId)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsNavVisible(window.scrollY > 80)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'skills', 'contact']
    const sections = sectionIds
      .map(sectionId => document.getElementById(sectionId))
      .filter(Boolean)

    if (sections.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-40% 0px -45% 0px',
        threshold: 0
      }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll('section.scroll-reveal')
    )

    if (sections.length === 0) {
      return undefined
    }

    if (reducedMotion) {
      sections.forEach(section => {
        section.classList.add('scroll-reveal-visible')
      })

      return undefined
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    )

    sections.forEach((section, index) => {
      section.style.setProperty('--reveal-delay', `${index * 70}ms`)
      observer.observe(section)
    })

    return () => {
      sections.forEach(section => {
        section.style.removeProperty('--reveal-delay')
      })
      observer.disconnect()
    }
  }, [reducedMotion])

  return (
    <div className='min-h-screen bg-background text-slate-100'>
      <div className='pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 overflow-hidden'>
        <div
          className='h-full w-full origin-left bg-accent transition-transform duration-[600ms] ease-out'
          style={{ transform: `scaleX(${isLoaded ? 1 : 0})` }}
        />
      </div>

      {!reducedMotion && (
        <div key={sweepKey} className='section-sweep-line' aria-hidden='true' />
      )}

      <header
        className={`site-nav fixed inset-x-0 top-0 z-50 ${
          isNavVisible ? 'site-nav-scrolled' : 'site-nav-visible'
        }`}
      >
        <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12'>
          <button
            type='button'
            onClick={() => handleNavigate('hero')}
            data-cursor='button'
            className='font-mono text-xl font-semibold tracking-[0.22em] text-accent'
          >
            AD
          </button>

          <nav className='hidden md:flex flex-wrap items-center justify-end gap-x-5 gap-y-2'>
            {portfolio.navigation.map(item => {
              const isActive = activeSection === item.href

              return (
                <button
                  key={item.href}
                  type='button'
                  onClick={() => handleNavigate(item.href)}
                  data-cursor='button'
                  className={`nav-link text-sm transition ${
                    isActive ? 'text-accent' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`nav-link-dot ${
                      isActive ? 'nav-link-dot-active' : ''
                    }`}
                    aria-hidden='true'
                  />
                </button>
              )
            })}
          </nav>

          <button
            type='button'
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(m => !m)}
            data-cursor='button'
            className='burger-btn md:hidden'
          >
            <span
              className={`burger-line${
                menuOpen ? ' burger-line-top-open' : ''
              }`}
            />
            <span
              className={`burger-line burger-line-mid${
                menuOpen ? ' burger-line-mid-open' : ''
              }`}
            />
            <span
              className={`burger-line${
                menuOpen ? ' burger-line-bot-open' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <div
        className={`mobile-nav-overlay${
          menuOpen ? ' mobile-nav-overlay-open' : ''
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className='flex flex-col items-center'>
          {portfolio.navigation.map((item, i) => {
            const isActive = activeSection === item.href
            return (
              <button
                key={item.href}
                type='button'
                onClick={() => handleNavigate(item.href)}
                style={{ '--mobile-link-delay': `${i * 60}ms` }}
                className={`mobile-nav-link${
                  isActive ? ' mobile-nav-link-active' : ''
                }${menuOpen ? ' mobile-nav-link-visible' : ''}`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
        <p className='mt-12 text-xs uppercase tracking-[0.3em] text-slate-600'>
          Amit Dhiman · Portfolio
        </p>
      </div>

      <Hero
        personal={portfolio.personal}
        hero={portfolio.hero}
        onNavigate={handleNavigate}
        reducedMotion={reducedMotion}
      />

      <main className='mx-auto max-w-7xl'>
        <About about={portfolio.about} />
        <Projects projects={portfolio.projects} />
        <Skills skills={portfolio.skills} />
        <Stats stats={portfolio.stats} reducedMotion={reducedMotion} />
        <Contact contact={portfolio.contact} personal={portfolio.personal} />
      </main>

      <CustomCursor disabled={reducedMotion} />
      <AmbientGlow disabled={reducedMotion} />

      <footer className='border-t border-white/8 py-8 text-center text-sm text-slate-500'>
        <p>
          Built with React + Vite +{' '}
          <button
            type='button'
            onClick={triggerConfetti}
            data-cursor='button'
            className='cursor-pointer text-slate-400 underline decoration-dotted underline-offset-4 transition hover:text-white'
          >
            too much coffee ☕
          </button>
        </p>
      </footer>
    </div>
  )
}

export default App
