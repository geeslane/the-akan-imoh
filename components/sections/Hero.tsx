import { PlayIcon } from "@/components/ui/Icons";
import { Portrait } from "@/components/ui/Portrait";
import { site } from "@/lib/site";

export function Hero({ portrait, hasStories }: { portrait?: string; hasStories: boolean }) {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="grain" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow rise d1">
          <span />
          A Documentary Practice
          <span />
        </p>
        <h1 className="rise d2">
          I Tell the Stories
          <br />
          Behind <em>Africa’s</em> Most
          <br />
          Powerful Builders.
        </h1>
        <p className="lede rise d3">
          Cinematic executive mini-documentaries and long-form interviews with Africa’s CEOs, founders, and
          business leaders.
        </p>
        <div className="hero-actions rise d4">
          <a
            className="btn btn-outline"
            href={hasStories ? "#stories" : site.youtubeUrl}
            target={hasStories ? undefined : "_blank"}
            rel={hasStories ? undefined : "noreferrer"}
          >
            <PlayIcon />
            Watch Stories
          </a>
          <a className="btn btn-solid" href="#feature">
            Book a Feature <span className="arrow">→</span>
          </a>
        </div>
        <a className="scroll-cue rise d5" href="#about">
          Scroll
        </a>
      </div>
      <div className="hero-portrait rise d5">
        <Portrait variant="hero" src={portrait} />
      </div>
    </section>
  );
}
