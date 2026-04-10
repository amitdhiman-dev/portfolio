import HorizontalScroll from './HorizontalScroll'

const GROUP_DESCRIPTIONS = {
  'AI & ML': 'LangChain, RAG pipelines, vector search, and LLM integration.',
  Frontend: 'Component-driven UIs with type-safe, performant architecture.',
  'Backend & DB':
    'Scalable APIs, relational databases, auth, containers and DevOps.',
  'Open Source': 'Git workflows, CI/CD pipelines, code-quality and DX tooling.'
}

function Skills ({ skills }) {
  const panels = skills.groups.map(group => ({
    category: group.title,
    description: GROUP_DESCRIPTIONS[group.title] ?? '',
    items: group.items
  }))

  return (
    <section id='skills'>
      <HorizontalScroll panels={panels} sectionNumber='03' />
    </section>
  )
}

export default Skills
