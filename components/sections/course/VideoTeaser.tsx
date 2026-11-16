export function VideoTeaser({ videoId }: { videoId: string }) {
  return (
    <aside className="course-stage">
      <p className="course-caption">Programme overview</p>
      <div className="video-frame course-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title="The Boss Approach programme overview"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </aside>
  );
}
