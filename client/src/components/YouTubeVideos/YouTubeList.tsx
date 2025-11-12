
import { useYoutube } from "../../hooks/useYoutube";
import "./YouTubeList.css";

export default function YouTubeList() {
  const { channelTitle, videos, loading, error, refresh } = useYoutube();

  if (loading) return <div className="yt-list">Loading latest videos…</div>;
  if (error) return (
    <div className="yt-list">
      <div>Error loading videos: {error.message}</div>
      <button onClick={() => refresh()}>Retry</button>
    </div>
  );

  return (
    <section className="yt-list">
      <h3 className="yt-list__title">{channelTitle || "Latest Videos"}</h3>
      <div className="yt-list__grid">
        {videos.map((v) => (
          <article key={v.id} className="yt-card">
            <a
              className="yt-card__thumb"
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              title={v.title}
            >
              <img src={v.thumbnailUrl} alt={v.title} />
            </a>
            <div className="yt-card__body">
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="yt-card__title"
              >
                {v.title}
              </a>
              <div className="yt-card__meta">{new Date(v.published).toLocaleString()}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
