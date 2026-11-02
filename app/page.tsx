import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Feature } from "@/components/sections/Feature";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Newsletter } from "@/components/sections/Newsletter";
import { Practice } from "@/components/sections/Practice";
import { Stories } from "@/components/sections/Stories";
import { Writing } from "@/components/sections/Writing";
import { hasPortrait } from "@/lib/portrait";
import { getGallery, getStories } from "@/lib/sheets";
import { getEssays } from "@/lib/substack";

export const revalidate = 3600;

export default async function Page() {
  const [stories, gallery, essays, portraitReady] = await Promise.all([
    getStories(),
    getGallery(),
    getEssays(),
    hasPortrait(),
  ]);
  const portrait = portraitReady ? "/images/akan-imoh.jpg" : undefined;

  const hasStories = stories.length > 0;

  return (
    <>
      <Header showStories={hasStories} />
      <main id="content">
        <Hero portrait={portrait} hasStories={hasStories} />
        <About portrait={portrait} />
        <Practice />
        {hasStories && <Stories stories={stories} />}
        <Gallery items={gallery} />
        <Writing essays={essays} />
        <Manifesto />
        <Feature />
        <Newsletter />
      </main>
      <Footer showStories={hasStories} />
    </>
  );
}
