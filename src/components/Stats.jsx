import { useEffect, useRef, useState } from 'react'

function useCountUp (
  target,
  startCounting,
  duration = 1500,
  decimals = 0,
  reducedMotion = false
) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reducedMotion && startCounting) {
      setCount(target)
      return undefined
    }

    if (!startCounting) {
      return undefined
    }

    let animationFrameId
    let startTime = null

    const animate = timestamp => {
      if (startTime === null) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const nextValue = target * progress

      setCount(progress === 1 ? target : nextValue)

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate)
      }
    }

    animationFrameId = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(animationFrameId)
  }, [duration, reducedMotion, startCounting, target])

  return count.toFixed(decimals)
}

function StatItem ({ item, index, shouldCount, reducedMotion }) {
  const value = useCountUp(
    item.target,
    shouldCount,
    1500,
    item.decimals ?? 0,
    reducedMotion
  )

  return (
    <div className='flex flex-col items-center justify-center px-4 py-4 text-center'>
      <p className='text-4xl font-semibold tracking-tight text-accent sm:text-5xl'>
        {item.prefix ?? ''}
        {value}
        {item.suffix ?? ''}
      </p>
      <p className='mt-3 max-w-[16rem] text-sm leading-6 text-slate-400'>
        {item.label}
      </p>
      {index < 3 ? (
        <span className='stats-divider absolute right-0 top-1/2 hidden h-12 -translate-y-1/2 border-r border-white/10 lg:block' />
      ) : null}
    </div>
  )
}

function Stats ({ stats, reducedMotion }) {
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
      { threshold: 0.3 }
    )

    observer.observe(sectionNode)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id='stats'
      ref={sectionRef}
      className='scroll-reveal w-full bg-[#0d0d18] px-6 py-16 sm:px-8 lg:px-12 lg:py-24'
    >
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-y-0'>
          {stats.items.map((item, index) => (
            <div key={item.label} className='relative'>
              <StatItem
                item={item}
                index={index}
                shouldCount={isVisible}
                reducedMotion={reducedMotion}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
