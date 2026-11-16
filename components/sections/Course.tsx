import { CourseHero } from "@/components/sections/course/CourseHero";
import { CurriculumAccordion } from "@/components/sections/course/CurriculumAccordion";
import { VideoTeaser } from "@/components/sections/course/VideoTeaser";
import { courseOutline, site } from "@/lib/site";

export function Course() {
  return (
    <section className="writing course" id="writing" aria-labelledby="course-title" data-reveal>
      <CourseHero />
      <div className="course-split">
        <CurriculumAccordion modules={courseOutline} />
        <VideoTeaser videoId={site.courseVideoId} />
      </div>
    </section>
  );
}
