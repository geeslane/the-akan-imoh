import { site } from "@/lib/site";

export function Newsletter() {
  const subscribe = `${site.substackUrl.replace(/\/$/, "")}/subscribe`;

  return (
    <section className="newsletter" id="letters" aria-labelledby="letters-title" data-reveal>
      <p className="eyebrow">
        <span />
        Newsletter
        <span />
      </p>
      <h2 id="letters-title">Follow the work</h2>
      <p>
        I write an exciting newsletter for young people taking the bulls by the horns, leading and building.
      </p>
      <a className="btn btn-solid" href={subscribe} target="_blank" rel="noreferrer">
        Subscribe on Substack <span className="arrow">→</span>
      </a>
    </section>
  );
}
