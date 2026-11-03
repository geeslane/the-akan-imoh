import { site } from "@/lib/site";

export function Newsletter() {
  const subscribe = `${site.substackUrl.replace(/\/$/, "")}/subscribe`;

  return (
    <section className="newsletter" id="letters" aria-labelledby="letters-title" data-reveal>
      <p className="eyebrow">
        <span />
        Letters
        <span />
      </p>
      <h2 id="letters-title">Follow the work.</h2>
      <p>New stories and essays, sent when they are ready. The letter is Conversations with Akan Imoh, on Substack.</p>
      <a className="btn btn-solid" href={subscribe} target="_blank" rel="noreferrer">
        Subscribe on Substack <span className="arrow">→</span>
      </a>
    </section>
  );
}
