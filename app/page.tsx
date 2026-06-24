import HeroRing from "@/components/HeroRing";
import { projects } from "@/lib/data";

const stats = [
  { number: "12", label: "Projects" },
  { number: "4", label: "Languages" },
  { number: "3", label: "Domains" },
  { number: "847", label: "Days" },
];

export default function Home() {
  return (
    <main id="main">
      <section id="hero" className="section">
        <div className="hero-inner">
          <HeroRing readinessValue={94} label="BUILDER" />

          <h1 className="type-display hero-name">Yayan Rahmat Wijaya</h1>

          <p className="type-body-sm hero-descriptor">
            Full-stack engineer. Builder. Athlete.
          </p>

          <div className="stats-block hero-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="stat">
                <span className="stat__number">{stat.number}</span>
                <span className="stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="section">
        <div className="work-list">
          {projects.map((project) => (
            <article key={project.slug} className="project-row">
              <a href={`/work/${project.slug}`} className="project-row__link">
                <span className="project-row__name type-body">{project.name}</span>
                <span className="project-row__tags type-label">
                  {project.tags.join(" · ")}
                </span>
                <span className="project-row__year type-caption">
                  {project.year}
                </span>
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
