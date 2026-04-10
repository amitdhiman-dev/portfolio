import { useEffect, useRef, useState } from 'react'

const githubIcon = (
  <svg viewBox='0 0 24 24' fill='none' className='h-4 w-4'>
    <path
      d='M12 3C7.029 3 3 7.134 3 12.235C3 16.316 5.578 19.778 9.157 21C9.607 21.084 9.771 20.802 9.771 20.56V18.884C7.266 19.443 6.739 17.795 6.739 17.795C6.33 16.726 5.74 16.442 5.74 16.442C4.923 15.868 5.803 15.88 5.803 15.88C6.706 15.945 7.181 16.828 7.181 16.828C7.984 18.237 9.287 17.83 9.8 17.593C9.881 16.997 10.114 16.591 10.372 16.36C8.372 16.126 6.269 15.332 6.269 11.788C6.269 10.779 6.622 9.955 7.201 9.307C7.107 9.073 6.801 8.131 7.29 6.856C7.29 6.856 8.047 6.607 9.769 7.796C10.49 7.59 11.263 7.487 12.037 7.483C12.811 7.487 13.584 7.59 14.306 7.796C16.027 6.607 16.782 6.856 16.782 6.856C17.272 8.131 16.966 9.073 16.872 9.307C17.452 9.955 17.803 10.779 17.803 11.788C17.803 15.341 15.696 16.123 13.69 16.353C14.014 16.641 14.303 17.205 14.303 18.069V20.56C14.303 20.805 14.465 21.089 14.922 21C18.499 19.776 21 16.315 21 12.235C21 7.134 16.971 3 12 3Z'
      fill='currentColor'
    />
  </svg>
)

const externalIcon = (
  <svg viewBox='0 0 24 24' fill='none' className='h-4 w-4'>
    <path
      d='M14 5H19V10M10 14L19 5M19 14V18C19 18.552 18.552 19 18 19H6C5.448 19 5 18.552 5 18V6C5 5.448 5.448 5 6 5H10'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

function Projects ({ projects }) {
  const terminalScript = [
    'Uploading resume.pdf...',
    'Querying: what are my key skills?',
    'Answer: Full-stack engineer with RAG expertise...'
  ]
  const [cardTransforms, setCardTransforms] = useState({})
  const [terminalOutput, setTerminalOutput] = useState(['', '', ''])
  const [activeTerminalLine, setActiveTerminalLine] = useState(0)
  const cardRefsRef = useRef([])
  const [revealedCards, setRevealedCards] = useState(new Set())

  useEffect(() => {
    const refs = cardRefsRef.current.filter(Boolean)
    if (!refs.length) return undefined

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const name = entry.target.dataset.projectName
            setRevealedCards(prev => new Set([...prev, name]))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    refs.forEach(ref => observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timeoutIds = []
    const intervalIds = []

    const typeLine = (lineIndex, delay) => {
      const timeoutId = window.setTimeout(() => {
        setActiveTerminalLine(lineIndex)
        let characterIndex = 0

        const intervalId = window.setInterval(() => {
          characterIndex += 1

          setTerminalOutput(previousOutput => {
            const nextOutput = [...previousOutput]
            nextOutput[lineIndex] = terminalScript[lineIndex].slice(
              0,
              characterIndex
            )
            return nextOutput
          })

          if (characterIndex >= terminalScript[lineIndex].length) {
            window.clearInterval(intervalId)
          }
        }, 24)

        intervalIds.push(intervalId)
      }, delay)

      timeoutIds.push(timeoutId)
    }

    typeLine(0, 180)
    typeLine(1, 1320)
    typeLine(2, 2720)

    return () => {
      timeoutIds.forEach(timeoutId => window.clearTimeout(timeoutId))
      intervalIds.forEach(intervalId => window.clearInterval(intervalId))
    }
  }, [])

  const handleMouseMove = (event, projectName) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const pointerX = event.clientX - bounds.left
    const pointerY = event.clientY - bounds.top
    const centerX = bounds.width / 2
    const centerY = bounds.height / 2
    const rotateY = ((pointerX - centerX) / centerX) * 10
    const rotateX = ((centerY - pointerY) / centerY) * 10

    setCardTransforms(previousState => ({
      ...previousState,
      [projectName]: `perspective(800px) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`
    }))
  }

  const handleMouseLeave = projectName => {
    setCardTransforms(previousState => ({
      ...previousState,
      [projectName]:
        'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)'
    }))
  }

  return (
    <section
      id='projects'
      className='scroll-reveal relative overflow-hidden px-6 py-16 sm:px-8 lg:px-12 lg:py-24'
    >
      <span className='section-number' aria-hidden='true'>
        02
      </span>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-sm uppercase tracking-[0.3em] text-accent'>
            Projects
          </p>
          <h2 className='mt-3 text-3xl font-semibold text-white sm:text-4xl'>
            {projects.heading}
          </h2>
        </div>
        <p className='max-w-xl text-sm leading-7 text-slate-400'>
          Applied AI products and enterprise-grade systems with measurable
          engineering impact.
        </p>
      </div>
      <div className='projects-bento-grid mt-10'>
        {projects.items.map((project, index) => (
          <article
            key={project.name}
            ref={el => {
              cardRefsRef.current[index] = el
            }}
            data-project-name={project.name}
            data-glow='card'
            onMouseMove={event => handleMouseMove(event, project.name)}
            onMouseLeave={() => handleMouseLeave(project.name)}
            className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-accent/20 bg-[#13131a] transition-shadow duration-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] ${
              project.name === 'Lumina' ? 'projects-bento-feature' : ''
            }`}
            style={{
              transform:
                cardTransforms[project.name] ??
                'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)',
              clipPath: revealedCards.has(project.name)
                ? 'inset(0 0% 0 0)'
                : 'inset(0 100% 0 0)',
              transition: `transform 0.1s ease, box-shadow 0.2s ease, border-color 0.2s ease, clip-path 0.7s ease ${
                index * 120
              }ms`,
              willChange: 'transform, clip-path'
            }}
          >
            <div
              className='flex h-16 items-center justify-between px-5'
              style={{ backgroundImage: project.iconGradient }}
            >
              <span className='text-xs font-semibold uppercase tracking-[0.28em] text-white/80'>
                {project.category}
              </span>
              <span className='rounded-full border border-white/15 bg-black/15 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/80'>
                {project.badge}
              </span>
            </div>

            <div className='flex flex-1 flex-col p-5'>
              <h3 className='text-xl font-semibold text-white'>
                {project.name}
              </h3>
              <p className='mt-3 truncate text-sm text-slate-400'>
                {project.description}
              </p>

              <ul className='mt-5 flex flex-wrap gap-2'>
                {project.stack.map(item => (
                  <li
                    key={item}
                    className='rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300'
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {project.name === 'Lumina' ? (
                <div className='mt-6 rounded-xl border border-white/10 bg-[#0d1117] p-4 font-mono text-xs text-slate-300'>
                  {terminalScript.map((line, lineIndex) => (
                    <p key={line} className='min-h-5'>
                      <span className='text-emerald-300'>&gt; </span>
                      <span>{terminalOutput[lineIndex]}</span>
                      {activeTerminalLine === lineIndex ? (
                        <span className='terminal-cursor ml-1 text-emerald-300'>
                          _
                        </span>
                      ) : null}
                    </p>
                  ))}
                </div>
              ) : null}

              <div className='mt-auto flex items-center gap-5 border-t border-white/8 pt-6 text-sm text-slate-300'>
                <a
                  href={project.links.code}
                  target='_blank'
                  rel='noreferrer'
                  data-cursor='link'
                  className='inline-flex items-center gap-2 transition hover:text-white'
                >
                  {githubIcon}
                  <span>Code</span>
                </a>
                <a
                  href={project.links.live}
                  target='_blank'
                  rel='noreferrer'
                  data-cursor='link'
                  className='inline-flex items-center gap-2 transition hover:text-white'
                >
                  {externalIcon}
                  <span>Live</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
