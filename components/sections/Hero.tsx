import { PlayIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export function Hero({ hasStories }: { hasStories: boolean }) {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero-bg">
        <Photo
          src={images.hero.src(2000)}
          alt={images.hero.alt}
          sizes="100vw"
          priority
          fillFrame
          label="Lagos"
        />
        <div className="hero-shade" aria-hidden="true" />
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="hero-copy">
        <h1 className="rise d2">
          <span>I Tell the Stories</span>
          <span>
            Behind <em>Africa’s</em> Most
          </span>
          <span>Powerful Builders.</span>
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
          <a className="btn btn-solid" href="#enquire">
            Book a Feature <span className="arrow">→</span>
          </a>
        </div>
        <a className="scroll-cue rise d5" href="#about">
          Scroll
          <span className="scroll-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
