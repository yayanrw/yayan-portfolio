import Link from "next/link";
import HeroRing from "@/components/HeroRing";
import CertSection from "@/components/CertSection";
import RevealSection from "@/components/RevealSection";
import { projects, languages, frameworks, tools } from "@/lib/data";

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

      <RevealSection>
        <section id="work" className="section">
        <div className="work-section-container">
          <div className="section-divider">
            <span className="section-divider__label type-h1-display">Work</span>
          </div>
          <div className="work-list">
          {projects.map((project) => (
            <article key={project.slug} className="project-row">
              <Link href={`/work/${project.slug}`} className="project-row__link">
                <span className="project-row__name type-body">{project.name}</span>
                <span className="project-row__tags type-label">
                  {project.tags.join(" · ")}
                </span>
                <span className="project-row__year type-caption">
                  {project.year}
                </span>
              </Link>
            </article>
          ))}
          </div>
        </div>
      </section>
      </RevealSection>

      <RevealSection>
        <section id="skills" className="section">
        <div className="section-divider">
          <span className="section-divider__label type-h1-display">Skills</span>
        </div>

        <div className="skills-group">
          <div className="skills-group__header">
            <span className="skills-group__label type-label">Languages</span>
            <span className="skills-group__count">{`×${languages.length}`}</span>
          </div>
          <div className="skills-tags">
            {languages.map((skill) => (
              <span key={skill.name} className="skill-tag skill-tag--leveled">
                <span className="skill-tag__name">{skill.name}</span>
                {skill.level && <span className="skill-tag__level">{skill.level}</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="skills-group">
          <div className="skills-group__header">
            <span className="skills-group__label type-label">Frameworks</span>
            <span className="skills-group__count">{`×${frameworks.length}`}</span>
          </div>
          <div className="skills-tags">
            {frameworks.map((skill) => (
              <span key={skill.name} className="skill-tag">
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className="skills-group">
          <div className="skills-group__header">
            <span className="skills-group__label type-label">Tools</span>
            <span className="skills-group__count">{`×${tools.length}`}</span>
          </div>
          <div className="skills-tags">
            {tools.map((skill) => (
              <span key={skill.name} className="skill-tag">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </section>
      </RevealSection>

      <RevealSection>
        <section id="certs" className="section">
        <div className="section-divider">
          <span className="section-divider__label type-h1-display">Certificates</span>
        </div>
        <CertSection />
      </section>
      </RevealSection>

      <RevealSection>
        <section id="about" className="section">
        <div className="section-divider">
          <span className="section-divider__label type-h1-display">About</span>
        </div>
        <div className="about-inner">
          <div className="about-photo">
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4",
                backgroundColor: "var(--color-surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-data)",
                fontSize: "12px",
              }}
            >
              Photo: 600×800px
            </div>
          </div>

          <div className="about-content">
            <h2 className="about-title type-h1-display">Yayan Rahmat Wijaya</h2>
            <p className="about-bio type-body">
              I build systems that run — web apps, data tools, embedded wearables, and a chess engine that beat me last Thursday. Based in Indonesia. Available for work that needs someone who doesn't stop at the surface.
            </p>
            <div className="about-domains">
              <span className="about-domains-label">Domains</span>
              <div className="about-domains-list">
                {["Web", "Wearable", "IoT", "E-commerce", "Data"].map((domain) => (
                  <span key={domain} className="about-domain-tag">
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </RevealSection>

      <RevealSection>
        <section id="contact" className="section">
        <div className="section-divider">
          <span className="section-divider__label type-h1-display">Contact</span>
        </div>
        <div>
          <a href="mailto:yayanraw@gmail.com" className="contact-email">
            yayanraw@gmail.com
          </a>
        </div>
        <div className="contact-links">
          <a
            href="https://github.com/yayanrw"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            GitHub
          </a>
          <a
            href="https://id.linkedin.com/in/yayanrw"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            LinkedIn
          </a>
          <a
            href="https://drive.google.com/file/d/your-cv-id/view"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            Resume
          </a>
        </div>
      </section>
      </RevealSection>
    </main>
  );
}
