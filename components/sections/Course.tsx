import { CourseHero } from "@/components/sections/course/CourseHero";
import { CurriculumAccordion } from "@/components/sections/course/CurriculumAccordion";
import { VideoTeaser } from "@/components/sections/course/VideoTeaser";
import { courseOutline } from "@/lib/site";

export function Course({ videoId }: { videoId: string }) {
  return (
    <section
      className={`writing course${videoId ? "" : " is-solo"}`}
      id="writing"
      aria-labelledby="course-title"
      data-reveal
    >
      <CourseHero />
      <div className={`course-split${videoId ? "" : " is-solo"}`}>
        <CurriculumAccordion modules={courseOutline} />
        {videoId && <VideoTeaser videoId={videoId} />}
      </div>
    </section>
  );
}
