import { practice } from "@/lib/site";

export function Practice() {
  return (
    <section className="practice" id="work" data-reveal>
      <div className="section-head">
        <div>
          <p className="eyebrow eyebrow-left">
            <span />
            Practice areas
          </p>
          <h2>What I Do</h2>
        </div>
      </div>
      <p className="practice-lede">
        The people I document work across different industries and spheres of influence. My interests sit at the
        intersection of three broad areas.
      </p>
      <div className="practice-grid">
        {practice.map((item) => (
          <article className="practice-card" key={item.index}>
            <p className="card-kicker">
              <span>{item.index}</span>
            </p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
