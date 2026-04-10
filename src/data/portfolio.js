const portfolio = {
    personal: {
        name: 'Amit Dhiman',
        title: 'Full-Stack & AI Engineer',
        location: 'India',
        availability: 'Open to impactful product and AI engineering roles',
        intro:
            'I design reliable full-stack systems and practical AI products that move from prototype to production with measurable business value.',
        tagline: 'Building intelligent products with clean architecture and sharp execution.',
        email: 'amit.dhiman.dev@gmail.com',
        phone: '+91 98765 43210',
        resumeLabel: 'Download Resume',
        resumeHref: '/Amit-Dhiman-CV.html',
    },
    navigation: [
        { label: 'Home', href: 'hero' },
        { label: 'About', href: 'about' },
        { label: 'Projects', href: 'projects' },
        { label: 'Skills', href: 'skills' },
        { label: 'Contact', href: 'contact' },
    ],
    hero: {
        eyebrow: 'Full-stack systems, AI workflows, and product execution',
        subtext: 'Building scalable systems. Shipping AI-powered products.',
        rotatingTitles: [
            'Full-Stack Engineer',
            'AI & RAG Systems Builder',
            'Enterprise App Developer',
        ],
        ctas: [
            { label: 'View My Work', href: 'projects', variant: 'primary', type: 'scroll' },
            { label: 'Download CV', href: '/Amit-Dhiman-CV.html', variant: 'secondary', type: 'download' },
        ],
    },
    about: {
        heading: 'About me',
        body: [
            'Full-Stack Engineer with enterprise experience in HR and Finance domains.',
            'Strong in React, Node.js, and PostgreSQL — with a 35% query optimization win in production.',
            'Currently building AI-powered products including a RAG document assistant and a voice-enabled chatbot.',
        ],
        cards: [
            {
                title: 'Enterprise APIs',
                text: 'Designing dependable backend contracts and integrations for production-grade business workflows.',
                icon: 'enterprise',
            },
            {
                title: 'AI & RAG Systems',
                text: 'Building document-aware assistants and applied AI systems with strong retrieval and product fit.',
                icon: 'ai',
            },
            {
                title: 'Open Source',
                text: 'Contributing practical solutions, reusable tooling, and developer-friendly implementation patterns.',
                icon: 'source',
            },
        ],
    },
    projects: {
        heading: 'Selected Projects',
        items: [
            {
                name: 'Lumina',
                category: 'AI RAG Study Assistant',
                badge: 'RAG',
                description: 'Upload PDFs, query with LLMs.',
                iconGradient: 'linear-gradient(135deg, rgba(59,130,246,0.92), rgba(99,102,241,0.92))',
                stack: ['Python', 'FastAPI', 'LangChain', 'Qdrant', 'Ollama', 'React', 'Docker'],
                links: {
                    code: 'https://github.com/amitdhiman/lumina',
                    live: 'https://lumina-demo.example.com',
                },
            },
            {
                name: 'Convo',
                category: 'Conversational AI Chatbot',
                badge: 'Voice',
                description: 'Voice-to-text + streaming chat.',
                iconGradient: 'linear-gradient(135deg, rgba(14,165,233,0.9), rgba(16,185,129,0.85))',
                stack: ['Python', 'Flask', 'Whisper', 'React', 'Vite', 'Docker'],
                links: {
                    code: 'https://github.com/amitdhiman/convo',
                    live: 'https://convo-demo.example.com',
                },
            },
            {
                name: 'Enterprise Invoice Platform',
                category: 'Finance System',
                badge: '35% Gain',
                description: '35% query perf gain, multi-vendor finance system.',
                iconGradient: 'linear-gradient(135deg, rgba(244,114,182,0.88), rgba(99,102,241,0.88))',
                stack: ['Node.js', 'Express', 'PostgreSQL', 'React', 'TypeScript'],
                links: {
                    code: 'https://github.com/amitdhiman/enterprise-invoice-platform',
                    live: 'https://invoice-platform.example.com',
                },
            },
            {
                name: 'HRIS Onboarding Module',
                category: 'HR Workflow System',
                badge: 'Enterprise',
                description: 'Multi-stage approval flows, document management.',
                iconGradient: 'linear-gradient(135deg, rgba(250,204,21,0.88), rgba(249,115,22,0.86))',
                stack: ['Angular', 'Ionic', 'Spring Boot', 'Node.js'],
                links: {
                    code: 'https://github.com/amitdhiman/hris-onboarding-module',
                    live: 'https://hris-onboarding.example.com',
                },
            },
        ],
    },
    skills: {
        heading: 'Core Skills',
        marquee: ['React', 'Node.js', 'Python', 'PostgreSQL', 'LangChain', 'Docker', 'FastAPI', 'TypeScript', 'Qdrant'],
        groups: [
            {
                title: 'AI & ML',
                items: ['LangChain', 'RAG Systems', 'Qdrant', 'Ollama', 'FastAPI', 'OpenAI Whisper', 'Prompt Engineering', 'LM Studio'],
            },
            {
                title: 'Frontend',
                items: ['React', 'TypeScript', 'JavaScript ES6+', 'Tailwind CSS', 'Angular', 'Ionic', 'HTML5/CSS3'],
            },
            {
                title: 'Backend & DB',
                items: ['Node.js', 'Express.js', 'PostgreSQL', 'Spring Boot', 'Redis', 'Docker', 'JWT Auth', 'REST APIs'],
            },
            {
                title: 'Open Source',
                items: ['Git', 'GitHub Actions', 'Docker', 'Linux', 'npm / pnpm', 'ESLint', 'Prettier', 'CI/CD'],
            },
        ],
    },
    stats: {
        heading: 'Impact Snapshot',
        items: [
            { target: 35, suffix: '%', label: 'Query performance gain' },
            { target: 20, prefix: '~', suffix: '%', label: 'Dev time saved via component library' },
            { target: 2, label: 'AI projects shipped' },
            { target: 1.5, suffix: ' yrs', decimals: 1, label: 'Enterprise production experience' },
        ],
    },
    contact: {
        heading: 'Let\'s build something together',
        message:
            'Open to full-stack and AI engineering roles. Based in Gurugram, India.',
        methods: [
            { label: 'Email', value: 'dhimanamitkkr@gmail.com', href: 'mailto:dhimanamitkkr@gmail.com' },
            { label: 'LinkedIn', value: 'linkedin.com/in/amitdhiman07', href: 'https://linkedin.com/in/amitdhiman07' },
            { label: 'GitHub', value: 'github.com/amitdhiman', href: 'https://github.com/amitdhiman' },
        ],
    },
}

export default portfolio