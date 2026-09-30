import { posterUrl } from '../api/tmdb';

export default function MovieCast({ cast = [] }) {
  if (!cast || cast.length === 0) return null;

  return (
    <section className="detail-section">
      <div className="eyebrow">
        <span className="eyebrow-dot" /> THE PEOPLE BEHIND IT
      </div>
      <h2>
        Leading <em>cast.</em>
      </h2>
      <div className="cast-grid">
        {cast.map((person) => (
          <div className="cast-item" key={person.id || person.name}>
            {person.profile_path ? (
              <img src={posterUrl(person.profile_path, 'w185')} alt={person.name} loading="lazy" />
            ) : (
              <span className="cast-placeholder">{person.name.charAt(0)}</span>
            )}
            <div>
              <strong>{person.name}</strong>
              <span>{person.character}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
