import { useEffect, useRef, useState } from 'react'
import useTextScramble from '../hooks/useTextScramble'

function Hero ({ personal, hero, onNavigate, reducedMotion }) {
  const canvasRef = useRef(null)
  const scrambledName = useTextScramble('Amit Dhiman')
  const rotatingTitles = hero.rotatingTitles ?? []
  const [titleIndex, setTitleIndex] = useState(0)
  const [visibleTitle, setVisibleTitle] = useState('')
  const [phase, setPhase] = useState('typing')
  const [parallaxOffset, setParallaxOffset] = useState(0)

  useEffect(() => {
    if (rotatingTitles.length === 0 || reducedMotion) {
      if (rotatingTitles.length > 0) {
        setVisibleTitle(rotatingTitles[0])
      }

      return undefined
    }

    const currentTitle = rotatingTitles[titleIndex]
    const intervalDelay = phase === 'deleting' ? 48 : 92

    const intervalId = window.setInterval(() => {
      setVisibleTitle(previousTitle => {
        if (phase === 'typing') {
          const nextTitle = currentTitle.slice(0, previousTitle.length + 1)

          if (nextTitle === currentTitle) {
            setPhase('holding')
          }

          return nextTitle
        }

        if (phase === 'deleting') {
          const nextTitle = currentTitle.slice(
            0,
            Math.max(previousTitle.length - 1, 0)
          )

          if (nextTitle.length === 0) {
            setTitleIndex(
              previousIndex => (previousIndex + 1) % rotatingTitles.length
            )
            setPhase('typing')
          }

          return nextTitle
        }

        return previousTitle
      })
    }, intervalDelay)

    return () => window.clearInterval(intervalId)
  }, [phase, rotatingTitles, titleIndex])

  useEffect(() => {
    if (phase !== 'holding') {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setPhase('deleting')
    }, 1400)

    return () => window.clearTimeout(timeoutId)
  }, [phase])

  useEffect(() => {
    if (reducedMotion) {
      setParallaxOffset(0)
      return undefined
    }

    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.3)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [reducedMotion])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return undefined
    }

    const particleCount = 60
    const maxLinkDistance = 130
    let width = 0
    let height = 0
    let animationFrameId = null
    let particles = []

    const createParticles = () => {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1
      }))
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement

      if (!parent) {
        return
      }

      const bounds = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      width = bounds.width
      height = bounds.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (particles.length === 0) {
        createParticles()
        return
      }

      particles = particles.map(particle => ({
        ...particle,
        x: Math.min(Math.max(particle.x, 0), width),
        y: Math.min(Math.max(particle.y, 0), height)
      }))
    }

    const drawFrame = () => {
      context.clearRect(0, 0, width, height)

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x <= 0 || particle.x >= width) {
          particle.vx *= -1
          particle.x = Math.min(Math.max(particle.x, 0), width)
        }

        if (particle.y <= 0 || particle.y >= height) {
          particle.vy *= -1
          particle.y = Math.min(Math.max(particle.y, 0), height)
        }
      }

      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const particleA = particles[first]
          const particleB = particles[second]
          const deltaX = particleA.x - particleB.x
          const deltaY = particleA.y - particleB.y
          const distance = Math.hypot(deltaX, deltaY)

          if (distance <= maxLinkDistance) {
            const alpha = (1 - distance / maxLinkDistance) * 0.15
            context.strokeStyle = `rgba(124, 58, 237, ${alpha.toFixed(3)})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(particleA.x, particleA.y)
            context.lineTo(particleB.x, particleB.y)
            context.stroke()
          }
        }
      }

      context.fillStyle = 'rgba(167, 139, 250, 0.4)'

      particles.forEach(particle => {
        context.beginPath()
        context.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2)
        context.fill()
      })
    }

    const animate = () => {
      drawFrame()
      animationFrameId = window.requestAnimationFrame(animate)
    }

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }

    const startAnimation = () => {
      if (animationFrameId === null && !document.hidden) {
        animationFrameId = window.requestAnimationFrame(animate)
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation()
      } else {
        startAnimation()
      }
    }

    resizeCanvas()
    startAnimation()

    window.addEventListener('resize', resizeCanvas)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopAnimation()
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <section
      id='hero'
      className='scroll-reveal hero-section relative flex min-h-screen items-center overflow-hidden bg-background px-6 py-16 sm:px-8 lg:px-12 lg:py-24'
    >
      <canvas
        ref={canvasRef}
        className='absolute inset-0 z-0'
        aria-hidden='true'
      />
      <div
        className='hero-dot-grid absolute inset-0 -z-20'
        style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
        aria-hidden='true'
      />
      <div
        className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2),transparent_38%)]'
        aria-hidden='true'
      />

      <div className='relative z-10 mx-auto flex w-full max-w-7xl justify-center'>
        <div className='flex max-w-4xl flex-col items-center text-center'>
          <p className='hero-title-reveal text-xs uppercase tracking-[0.38em] text-accent sm:text-sm'>
            {hero.eyebrow}
          </p>

          <div className='mt-6 space-y-5 sm:space-y-6'>
            <h1 className='hero-title-reveal hero-name max-w-4xl text-[80px] font-black leading-[0.95] tracking-tight'>
              <span className='text-white'>{scrambledName.slice(0, 4)}</span>
              <span className='hero-name-gradient'>
                {scrambledName.slice(4) || ' Dhiman'}
              </span>
            </h1>

            <div className='hero-type-line mx-auto flex min-h-10 items-center justify-center text-lg font-medium text-slate-200 sm:min-h-12 sm:text-2xl lg:text-3xl'>
              <span>{visibleTitle}</span>
              <span className='hero-cursor' aria-hidden='true'>
                |
              </span>
            </div>

            <p className='mx-auto max-w-2xl text-base leading-8 text-slate-400 sm:text-lg'>
              {hero.subtext}
            </p>
          </div>

          <div className='mt-8 flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center'>
            {hero.ctas.map(cta => {
              const baseClass =
                'hero-cta rounded-full px-7 py-3.5 text-sm font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-accent/60 sm:text-base'

              if (cta.type === 'download') {
                return (
                  <a
                    key={cta.label}
                    href={cta.href}
                    download
                    data-cursor='button'
                    className={`${baseClass} border border-white/20 bg-transparent text-slate-100 hover:border-accent/70 hover:bg-white/5`}
                  >
                    {cta.label}
                  </a>
                )
              }

              return (
                <button
                  key={cta.label}
                  type='button'
                  onClick={() => onNavigate(cta.href)}
                  data-cursor='button'
                  className={
                    cta.variant === 'primary'
                      ? `btn-primary ${baseClass} bg-accent text-white shadow-glow hover:bg-indigo-500`
                      : `${baseClass} border border-white/20 bg-transparent text-slate-100 hover:border-accent/70 hover:bg-white/5`
                  }
                >
                  {cta.label}
                </button>
              )
            })}
          </div>

          <button
            type='button'
            onClick={() => onNavigate('about')}
            data-cursor='button'
            className='hero-scroll-indicator absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-400 transition hover:text-white'
          >
            <span>Scroll</span>
            <span className='text-2xl leading-none' aria-hidden='true'>
              ↓
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
