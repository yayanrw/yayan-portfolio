import HeroRing from "@/components/HeroRing";

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
    </main>
  );
}
