import { Portrait } from "@/components/ui/Portrait";

export function About({ portrait }: { portrait?: string }) {
  return (
    <section className="about" id="about">
      <div className="about-copy">
        <h2>My name is Akan Imoh.</h2>
        <p>I travel across Africa to document how its most important business leaders think, build, and lead.</p>
        <p>
          This is not journalism for entertainment. It is executive storytelling for legacy. I sit across from CEOs
          and founders at the peak of their building years and capture what most people never see: the decisions,
          the doubt, the discipline, and the vision.
        </p>
        <p className="about-close">I don’t just interview leaders. I document how Africa is being built.</p>
      </div>
      <div className="about-media">
        <Portrait variant="about" src={portrait} />
      </div>
    </section>
  );
}
