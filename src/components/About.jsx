import { useEffect, useRef, useState } from 'react'

const iconMap = {
  enterprise: (
    <svg viewBox='0 0 24 24' fill='none' className='h-6 w-6'>
      <path
        d='M4 20V7.5C4 6.672 4.672 6 5.5 6H10V4.5C10 3.672 10.672 3 11.5 3H18.5C19.328 3 20 3.672 20 4.5V20'
        stroke='currentColor'
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8 10H8.01M8 14H8.01M13 8H17M13 12H17M13 16H17'
        stroke='currentColor'
        strokeWidth='1.7'
        strokeLinecap='round'
      />
    </svg>
  ),
  ai: (
    <svg viewBox='0 0 24 24' fill='none' className='h-6 w-6'>
      <path
        d='M12 3V6M12 18V21M4.929 4.929L7.05 7.05M16.95 16.95L19.071 19.071M3 12H6M18 12H21M4.929 19.071L7.05 16.95M16.95 7.05L19.071 4.929'
        stroke='currentColor'
        strokeWidth='1.7'
        strokeLinecap='round'
      />
      <circle cx='12' cy='12' r='4' stroke='currentColor' strokeWidth='1.7' />
    </svg>
  ),
  source: (
    <svg viewBox='0 0 24 24' fill='none' className='h-6 w-6'>
      <path
        d='M9 7L5 12L9 17M15 7L19 12L15 17M13 5L11 19'
        stroke='currentColor'
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function About ({ about }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const sectionNode = sectionRef.current

    if (!sectionNode) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(sectionNode)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id='about'
      ref={sectionRef}
      className={`scroll-reveal relative overflow-hidden px-6 py-16 transition-opacity duration-700 sm:px-8 lg:px-12 lg:py-24 ${
        isVisible ? 'about-visible' : 'opacity-0'
      }`}
    >
      <span className='section-number' aria-hidden='true'>
        01
      </span>
      <div className='grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center'>
        <div className='flex justify-center lg:justify-start'>
          <div className='about-avatar-ring relative flex h-[180px] w-[180px] items-center justify-center rounded-full'>
            <div className='absolute inset-[5px] rounded-full bg-background' />
            <div className='relative flex h-[150px] w-[150px] items-center justify-center rounded-full border border-white/10 bg-panel text-center shadow-glow'>
              <div>
                <span className='block text-[10px] uppercase tracking-[0.35em] text-accent'>
                  Amit
                </span>
                <span className='mt-2 block text-3xl font-semibold text-white'>
                  AD
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`space-y-6 ${isVisible ? 'animate-fadeUp' : ''}`}>
          <div>
            <h2 className='text-3xl font-semibold text-white sm:text-4xl'>
              {about.heading}
            </h2>
            <span
              className={`about-underline mt-3 block h-px bg-accent ${
                isVisible ? 'about-underline-visible' : ''
              }`}
            />
          </div>

          <div className='space-y-4 text-base leading-8 text-slate-300'>
            {about.body.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className='grid gap-4 md:grid-cols-3'>
            {about.cards.map((card, index) => (
              <article
                key={card.title}
                className={`about-highlight rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition duration-300 ${
                  isVisible ? 'animate-fadeUp' : 'opacity-0'
                }`}
                style={
                  isVisible ? { animationDelay: `${index * 120}ms` } : undefined
                }
              >
                <div className='flex items-center gap-3 text-accent'>
                  <span className='flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10'>
                    {iconMap[card.icon]}
                  </span>
                  <h3 className='text-base font-semibold text-white'>
                    {card.title}
                  </h3>
                </div>
                <p className='mt-4 text-sm leading-7 text-slate-300'>
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
