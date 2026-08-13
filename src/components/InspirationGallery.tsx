import { galleryItems } from '../data/appData'

export function InspirationGallery({ onViewAll }: { onViewAll: () => void }) {
  return (
    <section className="panel gallery-panel">
      <div className="section-heading"><h2>Inspiration Gallery</h2><button onClick={onViewAll}>View all</button></div>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <article className={`gallery-card ${item.tone}`} key={item.title} style={{ '--position': item.position, '--index': index } as React.CSSProperties}>
            <span>{item.title}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
