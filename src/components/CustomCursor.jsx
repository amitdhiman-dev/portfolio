import { useEffect, useRef, useState } from 'react'

function CustomCursor ({ disabled = false }) {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const ringRefPosition = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(null)
  const [mode, setMode] = useState('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (disabled) {
      setVisible(false)
      return undefined
    }

    const updateDotPosition = () => {
      const dotNode = dotRef.current

      if (!dotNode) {
        return
      }

      dotNode.style.setProperty('--cursor-x', `${targetRef.current.x}px`)
      dotNode.style.setProperty('--cursor-y', `${targetRef.current.y}px`)
    }

    const updateRingPosition = () => {
      const ringNode = ringRef.current

      if (!ringNode) {
        return
      }

      ringRefPosition.current.x +=
        (targetRef.current.x - ringRefPosition.current.x) * 0.12
      ringRefPosition.current.y +=
        (targetRef.current.y - ringRefPosition.current.y) * 0.12

      ringNode.style.setProperty('--cursor-x', `${ringRefPosition.current.x}px`)
      ringNode.style.setProperty('--cursor-y', `${ringRefPosition.current.y}px`)

      animationFrameRef.current =
        window.requestAnimationFrame(updateRingPosition)
    }

    const handleMouseMove = event => {
      targetRef.current = { x: event.clientX, y: event.clientY }

      if (!visible) {
        ringRefPosition.current = { x: event.clientX, y: event.clientY }
        setVisible(true)
      }

      updateDotPosition()
    }

    const handleMouseOver = event => {
      const hoverTarget = event.target.closest('[data-cursor]')
      const cursorMode = hoverTarget?.getAttribute('data-cursor')

      setMode(cursorMode ?? 'default')
    }

    const handleMouseOut = event => {
      const nextTarget = event.relatedTarget?.closest?.('[data-cursor]')
      const nextMode = nextTarget?.getAttribute('data-cursor')

      setMode(nextMode ?? 'default')
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)

    animationFrameRef.current = window.requestAnimationFrame(updateRingPosition)

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }

      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [disabled, visible])

  if (disabled) {
    return null
  }

  return (
    <>
      <span
        ref={dotRef}
        className={`custom-cursor-dot ${
          visible ? 'custom-cursor-visible' : ''
        }`}
        aria-hidden='true'
      />
      <span
        ref={ringRef}
        className={`custom-cursor-ring custom-cursor-ring-${mode} ${
          visible ? 'custom-cursor-visible' : ''
        }`}
        aria-hidden='true'
      />
    </>
  )
}

export default CustomCursor
