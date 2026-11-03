"use client";

import { useEffect, useState } from "react";
import { PlayIcon } from "@/components/ui/Icons";
import { Overlay } from "@/components/ui/Overlay";
import { site } from "@/lib/site";
import type { Story } from "@/lib/types";

type StoriesProps = {
  stories: Story[];
};

export function Stories({ stories }: StoriesProps) {
  const [active, setActive] = useState<Story | null>(null);

  return (
    <section className="stories" id="stories" data-reveal>
      <div className="section-head">
        <div>
          <p className="eyebrow eyebrow-left">
            <span />
            Stories
          </p>
          <h2>Featured Stories</h2>
        </div>
      </div>

      <div className="stories-grid">
        {stories.map((story) => (
          <StoryTile key={story.id} story={story} onOpen={() => setActive(story)} />
        ))}
      </div>

      <p className="section-link stories-more">
        <a href={site.youtubeUrl} target="_blank" rel="noreferrer">
          Watch more on YouTube <span className="arrow">→</span>
        </a>
      </p>

      {active && (
        <Overlay label={active.title} onClose={() => setActive(null)}>
          <button className="overlay-close" type="button" data-autofocus onClick={() => setActive(null)}>
            Close
          </button>
          {active.youtubeId ? (
            <VideoFrame story={active} />
          ) : (
            <div className="video-pending">
              <p className="card-kicker">{active.guest || "Akan Imoh"}</p>
              <h3>{active.title}</h3>
              <p>{active.hook}</p>
              <a className="btn btn-outline" href={site.youtubeUrl} target="_blank" rel="noreferrer">
                <PlayIcon /> Watch on YouTube
              </a>
            </div>
          )}
        </Overlay>
      )}
    </section>
  );
}

function VideoFrame({ story }: { story: Story }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPlay(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const poster = story.thumbnail || `https://i.ytimg.com/vi/${story.youtubeId}/hqdefault.jpg`;

  return (
    <div className="video-frame">
      <img className="video-poster" src={poster} alt="" />
      {play && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${story.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={story.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
}

function StoryTile({ story, onOpen }: { story: Story; onOpen: () => void }) {
  const sources = [
    story.thumbnail,
    story.youtubeId ? `https://i.ytimg.com/vi/${story.youtubeId}/hq720.jpg` : "",
    story.youtubeId ? `https://i.ytimg.com/vi/${story.youtubeId}/mqdefault.jpg` : "",
  ].filter((url, index, all) => url && all.indexOf(url) === index);
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex] ?? "";

  const advance = () => setSourceIndex((current) => (current + 1 < sources.length ? current + 1 : current));

  return (
    <button className="story" type="button" onClick={onOpen}>
      <span className="story-media">
        {src && (
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={(event) => {
              if (event.currentTarget.naturalWidth < 200) advance();
            }}
            onError={advance}
          />
        )}
        <span className="play-badge">
          <PlayIcon />
        </span>
      </span>
      <span className="story-copy">
        <span className="story-guest">{story.guest}</span>
        <span className="story-title">{story.title}</span>
        <span className="story-hook">{story.hook}</span>
      </span>
    </button>
  );
}
