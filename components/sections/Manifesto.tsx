import { pillars } from "@/lib/site";

export function Manifesto() {
  return (
    <section className="manifesto" id="why" aria-labelledby="why-title" data-reveal>
      <h2 id="why-title" className="visually-hidden">
        Why this matters
      </h2>
      <p className="manifesto-text">
        The people building Africa <em>will not be young forever.</em>
      </p>
      <p className="manifesto-close">Akan Imoh exists to make sure they are remembered.</p>
      <div className="pillars">
        {pillars.map((line, index) => (
          <article key={line}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{line}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
