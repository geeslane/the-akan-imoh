import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Feature } from "@/components/sections/Feature";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Newsletter } from "@/components/sections/Newsletter";
import { Practice } from "@/components/sections/Practice";
import { Stories } from "@/components/sections/Stories";
import { Writing } from "@/components/sections/Writing";
import { Reveal } from "@/components/ui/Reveal";
import { getStories } from "@/lib/sheets";
import { getEssays } from "@/lib/substack";

export const revalidate = 3600;

export default async function Page() {
  const [stories, essays] = await Promise.all([getStories(), getEssays()]);

  const hasStories = stories.length > 0;

  return (
    <>
      <Reveal />
      <Header showStories={hasStories} />
      <main id="content">
        <Hero hasStories={hasStories} />
        <About />
        <Practice />
        {hasStories && <Stories stories={stories} />}
        <Writing essays={essays} />
        <Manifesto />
        <Feature />
        <Newsletter />
      </main>
      <Footer showStories={hasStories} />
    </>
  );
}
