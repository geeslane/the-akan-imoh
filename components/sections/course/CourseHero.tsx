"use client";

export function CourseHero() {
  return (
    <div className="course-hero">
      <p className="eyebrow eyebrow-left">
        <span />
        Executive education
      </p>
      <h2 id="course-title">The Boss Approach</h2>
      <p className="course-lede">
        The Boss Approach is a practical executive education programme for ambitious professionals who want to think,
        communicate and lead at a higher level. It covers the mindset, communication skills, executive presence and
        strategic judgement required to operate with confidence and credibility in senior environments. It is built
        for people who want to move from being highly capable professionals to leaders who can influence decisions,
        shape organisations and get things done.
      </p>
      <div className="course-actions">
        <a
          className="btn btn-solid"
          href="#enroll"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("enquiry-intent", { detail: "Book a training session" }));
          }}
        >
          Apply <span className="arrow">→</span>
        </a>
        <a className="course-syllabus" href="#course-outline">
          View syllabus
        </a>
      </div>
    </div>
  );
}
