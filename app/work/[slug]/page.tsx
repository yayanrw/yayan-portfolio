import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/data'

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.name} — Yayan Rahmat Wijaya`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-night px-[clamp(24px,5vw,80px)] py-[var(--space-9)]">
      <div className="max-w-[680px] mx-auto">
        {/* Back link */}
        <Link
          href="/#work"
          className="type-label text-data opacity-60 hover:opacity-100 transition-opacity mb-[var(--space-8)] inline-block"
        >
          ← WORK
        </Link>

        {/* Title row */}
        <div className="flex justify-between items-baseline gap-[var(--space-4)] mb-[var(--space-3)] flex-wrap">
          <h1 className="type-h1">{project.name}</h1>
          <span className="type-caption opacity-60 shrink-0">{project.year}</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--divider)] mb-[var(--space-5)]" />

        {/* Tags */}
        <p className="type-label text-data mb-[var(--space-7)]">{project.tags.join(' · ')}</p>

        {/* Description */}
        <p className="type-body mb-[var(--space-9)] max-w-[65ch]">{project.longDescription}</p>

        {/* Stack */}
        {project.stack.length > 0 && (
          <div className="mb-[var(--space-7)]">
            <div className="section-divider mb-[var(--space-5)]">
              <span className="section-divider__label">Stack</span>
            </div>
            <div className="flex flex-wrap gap-[var(--space-3)]">
              {project.stack.map((item) => (
                <span key={item} className="skill-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(project.github || project.live) && (
          <div>
            <div className="section-divider mb-[var(--space-5)]">
              <span className="section-divider__label">Links</span>
            </div>
            <div className="flex gap-[var(--space-6)] flex-wrap">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-label text-data hover:text-white transition-colors"
                >
                  GitHub →
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-label text-data hover:text-white transition-colors"
                >
                  Live →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
