export default function MovieTrailer({ trailer, title }) {
  if (!trailer || !trailer.key) return null;

  return (
    <section className="detail-section trailer-section" id="trailer">
      <div className="eyebrow">
        <span className="eyebrow-dot" /> A FIRST LOOK
      </div>
      <h2>
        Watch the <em>trailer.</em>
      </h2>
      <div className="trailer-frame">
        <iframe
          title={`${title || 'Movie'} trailer`}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
}
