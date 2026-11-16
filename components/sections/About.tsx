import { Photo } from "@/components/ui/Photo";

export function About({ profileUrl }: { profileUrl: string }) {
  return (
    <section className="about" id="about" data-reveal>
      <div className="about-copy">
        <h2>My name is Akan Imoh.</h2>
        <p>I travel across Africa to document how its most consequential leaders and operators think, build and scale.</p>
        <p>
          Through intimate, cinematic conversations with CEOs, founders, policymakers and change agents, I seek to
          capture what rarely makes it into the headlines: the decisions, the doubts, the discipline, the setbacks
          and the vision behind the work.
        </p>
        <p>
          I am interested in more than what people have achieved. I want to understand how they did it, what it
          took, and what their journeys reveal about the future of our continent.
        </p>
        <p className="about-close">
          I don’t just interview leaders. I document the people and ideas shaping the Africa of tomorrow.
        </p>
        {profileUrl && (
          <a className="btn btn-solid about-profile" href={profileUrl} target="_blank" rel="noreferrer">
            Executive Profile <span className="arrow">→</span>
          </a>
        )}
      </div>
      <div className="about-media">
        <Photo
          src="/images/akan-portrait.jpg"
          alt="Portrait of Akan Imoh"
          sizes="(max-width: 900px) 100vw, 42vw"
          ratio="4 / 5"
          priority
          label="Akan Imoh"
        />
      </div>
    </section>
  );
}
