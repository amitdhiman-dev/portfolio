import { useEffect, useRef } from 'react'

const GRADIENTS = {
  default: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
  primary: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
  card: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)'
}

function AmbientGlow ({ disabled = false }) {
  const glowRef = useRef(null)
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const targetRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  })
  const rafRef = useRef(null)

  useEffect(() => {
    if (disabled) return undefined

    const glow = glowRef.current
    if (!glow) return undefined

    const onMouseMove = e => {
      targetRef.current = { x: e.clientX, y: e.clientY }

      // Detect element under cursor for color mode
      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el) {
        if (el.closest('.btn-primary')) {
          glow.style.background = GRADIENTS.primary
        } else if (el.closest('[data-glow="card"]')) {
          glow.style.background = GRADIENTS.card
        } else {
          glow.style.background = GRADIENTS.default
        }
      }
    }

    const tick = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.06
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.06

      glow.style.transform = `translate(${posRef.current.x - 300}px, ${
        posRef.current.y - 300
      }px)`

      rafRef.current = window.requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [disabled])

  if (disabled) return null

  return (
    <div
      ref={glowRef}
      aria-hidden='true'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 600,
        height: 600,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        background: GRADIENTS.default,
        transition: 'background 0.5s ease',
        willChange: 'transform'
      }}
    />
  )
}

export default AmbientGlow
