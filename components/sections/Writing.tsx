import { site } from "@/lib/site";
import type { Essay } from "@/lib/types";

export function Writing({ essays }: { essays: Essay[] }) {
  return (
    <section className="writing" id="writing">
      <div className="section-head">
        <div>
          <p className="eyebrow eyebrow-left">
            <span />
            Writing
          </p>
          <h2>From the Desk</h2>
        </div>
        <p>Articles and thoughts of Akan Imoh.</p>
      </div>

      {essays.length === 0 ? (
        <div className="writing-empty">
          <p>The latest essays will appear here. Until then, they live on Substack.</p>
          <a className="btn btn-outline" href={site.substackUrl} target="_blank" rel="noreferrer">
            Read on Substack <span className="arrow">→</span>
          </a>
        </div>
      ) : (
        <>
          <div className="writing-grid">
            {essays.map((essay) => (
              <article key={essay.url}>
                {essay.date && <time dateTime={essay.published || undefined}>{essay.date}</time>}
                <h3>{essay.title}</h3>
                {essay.excerpt && <p>{essay.excerpt}</p>}
                <a href={essay.url} target="_blank" rel="noreferrer">
                  Read the essay <span className="arrow">→</span>
                </a>
              </article>
            ))}
          </div>
          <p className="section-link">
            <a href={site.substackUrl} target="_blank" rel="noreferrer">
              View all on Substack <span className="arrow">→</span>
            </a>
          </p>
        </>
      )}
    </section>
  );
}
