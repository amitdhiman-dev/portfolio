import { useEffect, useRef, useState } from 'react'

function HorizontalScroll ({ panels, sectionNumber }) {
  const numPanels = panels.length
  const outerRef = useRef(null)
  const stripRef = useRef(null)
  const segmentFillRefs = useRef([])
  const activePanelRef = useRef(-1)
  const [activePanel, setActivePanel] = useState(-1)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [sectionHeight, setSectionHeight] = useState(
    () => window.innerWidth * numPanels
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = e => setIsMobile(e.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Keep outer div height in sync with viewport width on resize
  useEffect(() => {
    const onResize = () => setSectionHeight(window.innerWidth * numPanels)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [numPanels])

  // Drive translateX + progress bar + active-panel state from scroll position
  useEffect(() => {
    const onScroll = () => {
      const outer = outerRef.current
      const strip = stripRef.current
      if (!outer || !strip) return

      const outerH = outer.offsetHeight // live DOM read avoids stale state
      const sectionTop = outer.getBoundingClientRect().top + window.scrollY
      const maxScroll = outerH - window.innerHeight
      if (maxScroll <= 0) return

      const progress = Math.max(
        0,
        Math.min(1, (window.scrollY - sectionTop) / maxScroll)
      )

      // Shift horizontal strip
      strip.style.transform = `translateX(${
        -progress * (numPanels - 1) * window.innerWidth
      }px)`

      // Fill each progress-bar segment independently
      for (let i = 0; i < numPanels; i++) {
        const fill = segmentFillRefs.current[i]
        if (fill) {
          fill.style.transform = `scaleX(${Math.max(
            0,
            Math.min(1, progress * numPanels - i)
          )})`
        }
      }

      // Trigger pill stagger-in only when panel changes
      const panel = Math.min(
        numPanels - 1,
        Math.round(progress * (numPanels - 1))
      )
      if (panel !== activePanelRef.current) {
        activePanelRef.current = panel
        setActivePanel(panel)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Deferred initial calculation so we don't call setState synchronously
    const timerId = window.setTimeout(onScroll, 0)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timerId)
    }
  }, [numPanels])

  // ── Mobile: plain vertical stack, no scroll-pinning ─────────
  if (isMobile) {
    return (
      <div className='px-6 py-16 sm:px-8'>
        {sectionNumber && (
          <p className='mb-8 text-xs uppercase tracking-[0.3em] text-accent'>
            Skills
          </p>
        )}
        {panels.map((panel, panelIndex) => (
          <div key={panel.category} className='mb-12 last:mb-0'>
            <p className='text-xs uppercase tracking-[0.3em] text-accent'>
              {`${String(panelIndex + 1).padStart(2, '0')} / ${String(
                numPanels
              ).padStart(2, '0')}`}
            </p>
            <h3 className='mt-2 text-2xl font-bold text-white'>
              {panel.category}
            </h3>
            {panel.description && (
              <p className='mt-2 text-sm leading-relaxed text-slate-400'>
                {panel.description}
              </p>
            )}
            <ul className='mt-5 flex flex-wrap gap-3'>
              {panel.items.map(item => (
                <li
                  key={item}
                  className='hscroll-skill-pill hscroll-skill-pill-visible'
                >
                  {item}
                </li>
              ))}
            </ul>
            {panelIndex < panels.length - 1 && (
              <div className='mt-12 h-px bg-white/8' />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={outerRef} style={{ height: sectionHeight }}>
      <div className='hscroll-sticky'>
        {/* ── Progress bar ─────────────────────────────────────── */}
        <div className='hscroll-progress-bar' aria-hidden='true'>
          {panels.map((panel, i) => (
            <div key={panel.category} className='hscroll-progress-segment'>
              <div className='hscroll-progress-track'>
                <div
                  ref={el => {
                    segmentFillRefs.current[i] = el
                  }}
                  className='hscroll-progress-fill'
                />
              </div>
              <span className='hscroll-progress-label'>{panel.category}</span>
            </div>
          ))}
        </div>

        {/* ── Horizontal strip ─────────────────────────────────── */}
        <div ref={stripRef} className='hscroll-strip'>
          {panels.map((panel, panelIndex) => (
            <div key={panel.category} className='hscroll-panel bg-background'>
              {/* Giant faded category label in background */}
              <span className='hscroll-bg-label' aria-hidden='true'>
                {panel.category}
              </span>

              {/* Foreground content */}
              <div className='hscroll-panel-content'>
                <p className='text-xs uppercase tracking-[0.3em] text-accent'>
                  {`Skills · ${String(panelIndex + 1).padStart(
                    2,
                    '0'
                  )} / ${String(numPanels).padStart(2, '0')}`}
                </p>
                <h3 className='mt-3 text-4xl font-bold text-white lg:text-5xl'>
                  {panel.category}
                </h3>
                {panel.description && (
                  <p className='mt-3 max-w-md text-sm leading-relaxed text-slate-400'>
                    {panel.description}
                  </p>
                )}
                <ul className='mt-8 flex flex-wrap gap-3'>
                  {panel.items.map((item, itemIndex) => (
                    <li
                      key={item}
                      className={`hscroll-skill-pill${
                        activePanel === panelIndex
                          ? ' hscroll-skill-pill-visible'
                          : ''
                      }`}
                      style={{ '--pill-delay': `${itemIndex * 55}ms` }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HorizontalScroll
